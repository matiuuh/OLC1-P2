import { Instruccion } from "../Abstracto/Instruccion";
import Errors from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Singleton from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class AsignacionVariable extends Instruccion {
    private ids: string[]
    private expresiones : Instruccion[]

    constructor(ids: string[], expresiones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.ids = ids
        this.expresiones = expresiones
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        if (this.ids.length !== this.expresiones.length) {
            return new Errors('Semántico', 'Cantidad de variables y valores no coincide', this.linea, this.columna);
        }

        for (let i = 0; i < this.ids.length; i++) {
            const nombre = this.ids[i].toLowerCase();
            const expr = this.expresiones[i];

            const valorEvaluado = expr.interpretar(arbol, tabla);
            if (valorEvaluado instanceof Errors) return valorEvaluado;

            const variable = tabla.getVariable(nombre);
            if (!variable) {
                return new Errors('Semántico', `Variable ${nombre} no existe`, this.linea, this.columna);
            }

            const tipoExpr = expr.tipo_dato.getTipo();
            const tipoVar = variable.getTipo().getTipo();

            if (tipoExpr !== tipoVar) {
                if (tipoVar === tipo_dato.DECIMAL && tipoExpr === tipo_dato.ENTERO) {
                    variable.setValor(parseFloat(valorEvaluado)); // coerción
                } else {
                    return new Errors('Semántico', `Tipos incompatibles en asignación a ${nombre}`, this.linea, this.columna);
                }
            } else {
                variable.setValor(valorEvaluado);
            }

            arbol.tablaSimbolos(nombre, valorEvaluado, this.linea.toString(), tabla.getNombre().toString(), this.columna.toString());
        }

        return null;
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoP = `n${cont.get()}`
        let nodoV = `n${cont.get()}`
        let nodoN = `n${cont.get()}`
        let nodoI = `n${cont.get()}`
        let nodoA = `n${cont.get()}`

        resultado += `${nodoP}[label="ASIGNACION"]\n`
        resultado += `${nodoV}[label="ID"]\n`
        resultado += `${nodoN}[label="${this.id}"]\n`
        resultado += `${nodoI}[label="="]\n`
        resultado += `${nodoA}[label="EXPRESION"]\n`

        resultado += `${anterior}->${nodoP}\n`
        resultado += `${nodoP}->${nodoV}\n`
        resultado += `${nodoV}->${nodoN}\n`
        resultado += `${nodoP}->${nodoI}\n`
        resultado += `${nodoP}->${nodoA}\n`

        resultado += this.expresion.nodo(nodoA)
        return resultado
    }*/
}