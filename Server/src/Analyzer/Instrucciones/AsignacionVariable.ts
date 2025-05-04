import { Instruccion } from "../Abstracto/Instruccion";
import Errors from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Simbolo from "../Simbolo/Simbolo";
import singleton from "../Simbolo/Singleton";
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

    nodo(anterior: string): string {
        const Singleton = singleton.getInstancia();
        let resultado = "";
    
        const nodoAsign = `n${Singleton.getContador()}`;
        const nodoIds = `n${Singleton.getContador()}`;
        const nodoFlecha = `n${Singleton.getContador()}`;
        const nodoExprs = `n${Singleton.getContador()}`;
        const nodoPuntoComa = `n${Singleton.getContador()}`;
    
        resultado += `${nodoAsign}[label="ASIGNACION"];\n`;
        resultado += `${nodoIds}[label="VARIABLES"];\n`;
        resultado += `${nodoFlecha}[label="->"];\n`;
        resultado += `${nodoExprs}[label="VALORES"];\n`;
    
        resultado += `${anterior} -> ${nodoAsign};\n`;
        resultado += `${nodoAsign} -> ${nodoIds};\n`;
        resultado += `${nodoAsign} -> ${nodoFlecha};\n`;
        resultado += `${nodoAsign} -> ${nodoExprs};\n`;
        resultado += `${nodoAsign} -> ${nodoPuntoComa};\n`;
    
        // IDs (variables)
        for (let i = 0; i < this.ids.length; i++) {
            const nodoId = `n${Singleton.getContador()}`;
            resultado += `${nodoId}[label="${this.ids[i]}"];\n`;
            resultado += `${nodoIds} -> ${nodoId};\n`;
        }
    
        // Expresiones
        for (let i = 0; i < this.expresiones.length; i++) {
            const nodoExpCont = `n${Singleton.getContador()}`;
            resultado += `${nodoExprs} -> ${nodoExpCont};\n`;
    
            if (typeof this.expresiones[i].nodo === "function") {
                resultado += this.expresiones[i].nodo(nodoExpCont);
            } else {
                resultado += `${nodoExpCont}[label="exp"];\n`;
            }
        }
    
        return resultado;
    }
    
}