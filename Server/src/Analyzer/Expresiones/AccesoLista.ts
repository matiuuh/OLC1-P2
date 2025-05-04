import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Simbolo from "../Simbolo/Simbolo";
import singleton from "../Simbolo/Singleton";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class AccesoLista extends Instruccion {
    private id: string;
    private posiciones: Instruccion[];

    constructor(id: string, posiciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna);
        this.id = id;
        this.posiciones = posiciones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        const variable = tabla.getVariable(this.id);

        if (variable == null) {
            return new Errores("Semántico", `La lista '${this.id}' no existe`, this.linea, this.columna);
        }

        let valorActual = variable.getValor();
        
        for (let i = 0; i < this.posiciones.length; i++) {
            const pos = this.posiciones[i].interpretar(arbol, tabla);
            if (pos instanceof Errores) return pos;

            if (this.posiciones[i].tipo_dato.getTipo() !== tipo_dato.ENTERO) {
                return new Errores("Semántico", `El índice debe ser de tipo entero`, this.linea, this.columna);
            }

            if (Array.isArray(valorActual)) {
                if (pos < 0 || pos >= valorActual.length) {
                    return new Errores("Semántico", `Índice fuera de rango en la dimensión ${i}`, this.linea, this.columna);
                }
                valorActual = valorActual[pos];
            } else {
                return new Errores("Semántico", `Acceso inválido: No es una lista en la dimensión ${i}`, this.linea, this.columna);
            }
        }

        return valorActual;
    }

    nodo(anterior: string): string {
        const Singleton = singleton.getInstancia();
        let resultado = "";
    
        const nodoAcceso = `n${Singleton.getContador()}`;
        const nodoId = `n${Singleton.getContador()}`;
        const nodoPosiciones = `n${Singleton.getContador()}`;
    
        resultado += `${nodoAcceso}[label="ACCESO_LISTA"];\n`;
        resultado += `${anterior} -> ${nodoAcceso};\n`;
    
        resultado += `${nodoId}[label="ID: ${this.id}"];\n`;
        resultado += `${nodoAcceso} -> ${nodoId};\n`;
    
        resultado += `${nodoPosiciones}[label="POSICIONES"];\n`;
        resultado += `${nodoAcceso} -> ${nodoPosiciones};\n`;
    
        for (let expr of this.posiciones) {
            const nodoExpr = `n${Singleton.getContador()}`;
            resultado += `${nodoExpr}[label="INDEX"];\n`;
            resultado += `${nodoPosiciones} -> ${nodoExpr};\n`;
            if (typeof expr.nodo === "function") {
                resultado += expr.nodo(nodoExpr);
            }
        }
    
        return resultado;
    }
    
}
