import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import { Report } from "../Simbolo/Report";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";


export default class CreacionVariable extends Instruccion {
    private id: Array<any>
    private valor: any

    constructor(tipo: Tipo, linea: number, columna: number, id: Array<any>) {
        super(tipo, linea, columna)
        this.id = id
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let valor: any;
        this.id.forEach(id => {
            switch (this.tipo_dato.getTipo()) {
                case tipo_dato.ENTERO:
                    valor = 0
                    break;
                case tipo_dato.DECIMAL:
                    valor = 0.0
                    break;
                case tipo_dato.BOOLEANO:
                    valor = true
                    break;
                case tipo_dato.CARACTER:
                    valor = '\u0000'
                    break;
                case tipo_dato.CADENA:
                    valor = ""
                    break;
                default:
                    return new Errores("Semantico", "No se existe ese tipo de dato", this.linea, this.columna)
            }
            if (!tabla.setVariable(new Simbolo(this.tipo_dato, id, valor))) {
                return new Errores("Semantico", "No se puede declarar variable que ya existe", this.linea, this.columna)
            } else {
                if (!arbol.tablaSimbolos(id, valor, this.linea.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                    let simboloN = new Report(id, valor, this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()), tabla.getNombre().toString(), this.linea.toString(), this.columna.toString(), "variable")
                    arbol.simbolos.push(simboloN)
                }
            }
        });

    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()
        let resultado = ""

        let nodoD = `n${cont.get()}`
        let nodoID = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`

        let ids = []

        for (let i = 0; i < this.id.length; i++) {
            ids.push(`n${cont.get()}`)
        }

        resultado += `${nodoD}[label="DECLARACION"]\n`
        resultado += `${nodoID}[label="ID"]\n`

        for (let i = 0; i < this.id.length; i++) {
            resultado += `${ids[i]}[label="${this.id[i]}"]\n`

        }

        resultado += `${nodoPC}[label=";"];\n`;

        resultado += `${anterior} -> ${nodoD};\n`;
        resultado += `${nodoD} -> ${nodoID};\n`;

        for (let i = 0; i < this.id.length; i++) {
            resultado += `${nodoID} -> ${ids[i]};\n`;
        }

        resultado += `${nodoD} -> ${nodoPC};\n`;

        return resultado;


    }*/
}