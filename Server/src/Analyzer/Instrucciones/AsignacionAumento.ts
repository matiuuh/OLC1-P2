import { Instruccion } from "../Abstracto/Instruccion";
import Errors from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class AsignacionAumento extends Instruccion {
    private id: string;
    private expresion: Instruccion;

    constructor(id: string, expresion: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna);
        this.id = id;
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        const variable = tabla.getVariable(this.id);

        if (!variable) {
            return new Errors('Semántico', `Variable '${this.id}' no existe`, this.linea, this.columna);
        }

        const valorEvaluado = this.expresion.interpretar(arbol, tabla);
        if (valorEvaluado instanceof Errors) return valorEvaluado;

        const tipoExpr = this.expresion.tipo_dato.getTipo();
        const tipoVar = variable.getTipo().getTipo();

        if (tipoVar !== tipoExpr) {
            // Permitir coerción de entero a decimal
            if (tipoVar === tipo_dato.DECIMAL && tipoExpr === tipo_dato.ENTERO) {
                variable.setValor(parseFloat(valorEvaluado));
            } else {
                return new Errors('Semántico', `Tipo incompatible al asignar a '${this.id}'`, this.linea, this.columna);
            }
        } else {
            variable.setValor(valorEvaluado);
        }

        return null;
    }
}
