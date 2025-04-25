import { lista_errores } from "../../controllers/Controllers";
import { Instruccion } from "../Abstracto/Instruccion";
import Errors from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import { Report } from "../Simbolo/Report";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Declaracion extends Instruccion {
    private identificador: Array<any>;
    private valor: Instruccion[];

    constructor(tipo: Tipo, Linea: number, Columna: number, id: Array<any>, valor: Instruccion[]) {
        super(tipo, Linea, Columna);
        this.identificador = id;
        this.valor = valor;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        if (this.identificador.length !== this.valor.length) {
            return new Errors("Semántico", "Cantidad de variables y valores no coincide", this.linea, this.columna);
        }

        for (let i = 0; i < this.identificador.length; i++) {
            let valEvaluado = this.valor[i].interpretar(arbol, tabla);
            if (valEvaluado instanceof Errors) return valEvaluado;
    
            let tipoValor = this.valor[i].tipo_dato.getTipo();
    
            // Conversión especial: entero -> decimal
            if (tipoValor === tipo_dato.ENTERO && this.tipo_dato.getTipo() === tipo_dato.DECIMAL) {
                valEvaluado = parseFloat(valEvaluado);
            } else if (tipoValor !== this.tipo_dato.getTipo()) {
                return new Errors("Semántico", `Tipo incompatible en variable ${this.identificador[i]}`, this.linea, this.columna);
            }
    
            // Declarar la variable
            if (!tabla.setVariable(new Simbolo(this.tipo_dato, this.identificador[i], valEvaluado))) {
                const err = new Errors("Semántico", `La variable ${this.identificador[i]} ya existe`, this.linea, this.columna);
                lista_errores.push(err);
                arbol.actualizarConsola(err.obtenerError());
                return err;
            }
    
            // Reporte
            let simboloN = new Report(
                this.identificador[i],
                valEvaluado,
                this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()),
                tabla.getNombre().toString(),
                this.linea.toString(),
                this.columna.toString(), "variable"
            );
            arbol.simbolos.push(simboloN);
        }//sdfasfasf


        // REVISAR
        /*if (this.valor.tipo_dato.getTipo() == tipo_dato.ENTERO && this.tipo_dato.getTipo() == tipo_dato.DECIMAL) {
            this.identificador.forEach(id => {
                valorf = parseFloat(valorf);
                if (!tabla.setVariable(new Simbolo(this.tipo_dato, id, valorf))) {
                    let error = new Errors("Semantico", "No se puede declarar variable " + id + " porque ya existe", this.linea, this.columna)
                    lista_errores.push(error)
                    console.log("error comentado rey");
                    arbol.actualizarConsola((<Errors>error).obtenerError())
                    return new Errors("Semantico", "No se puede declarar variable " + id + " porque ya existe", this.linea, this.columna)
                } else {
                    if (!arbol.tablaSimbolos(id, valorf, this.linea.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                        let simboloN = new Reporte(id, valorf, this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()), tabla.getNombre().toString(), this.linea.toString(), this.columna.toString())
                        arbol.simbolos.push(simboloN)
                    }
                }
            })
        } else {
            if (this.valor.tipo_dato.getTipo() != this.tipo_dato.getTipo()) {
                return new Errors("Semantico", "No se pueden declarar variables de diferentes tipos", this.linea, this.columna)
            }
            this.identificador.forEach(id => {
                if (!tabla.setVariable(new Simbolo(this.tipo_dato, id, valorf))) {
                    let error = new Errors("Semantico", "No se puede declarar variable " + id + " porque ya existe", this.linea, this.columna)
                    lista_errores.push(error)
                    arbol.actualizarConsola((<Errors>error).obtenerError())
                    return new Errors("Semantico", "No se puede declarar variable " + id + " porque ya existe", this.linea, this.columna)
                } else {
                    if (!arbol.tablaSimbolos(id, valorf, this.linea.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                        console.log("accion comentada en el ultimo else de declaracion");
                        let simboloN = new Reporte(id, valorf, this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()), tabla.getNombre().toString(), this.linea.toString(), this.columna.toString())
                        arbol.simbolos.push(simboloN)
                    }
                }
            });
        }*/
    }

    /*
    nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoD = `n${cont.get()}`
        let nodoT = `n${cont.get()}`
        let nodoID = `n${cont.get()}`

        let ids = []

        for(let i= 0; i < this.id.length; i++){
            ids.push(`n${cont.get()}`)

        }
        let nodoI = `n${cont.get()}`
        let nodoV = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`

        resultado += `${nodoD}[label="DECLARACION"]\n`

        switch (this.tipoD.getTipo()) {
            case tipoD.INT:
                resultado += `${nodoT}[label="int"]\n`
                break;
            case tipoD.DOUBLE:
                resultado += `${nodoT}[label="double"]\n`
                break;
            case tipoD.CADENA:
                resultado += `${nodoT}[label="std::string"]\n`
                break;
            case tipoD.CHAR:
                resultado += `${nodoT}[label="char"]\n`
                break;
            case tipoD.BOOL:
                resultado += `${nodoT}[label="bool"]\n`
                break;
        }

        resultado += `${nodoID}[label="ID"]\n`

        for(let i= 0; i < this.id.length; i++){
            resultado += `${ids[i]} [label = "${this.id[i]}"]\n`
        }

        resultado += `${nodoI}[label="="]\n`
        resultado += `${nodoV}[label="EXPRESION"]\n`
        resultado += `${nodoPC}[label=";"]\n`

        resultado += `${anterior} -> ${nodoD}\n`
        resultado += `${nodoD} -> ${nodoID}\n`
        resultado += `${nodoD} -> ${nodoT}\n`
        
        for(let i= 0; i < this.id.length; i++){
            resultado += `${nodoID} -> ${ids[i]}\n`
        }

        resultado += `${nodoD} -> ${nodoI}\n`
        resultado += `${nodoD} -> ${nodoV}\n`
        resultado += `${nodoD} -> ${nodoPC}\n`

        this.valor.nodo(nodoV)

        return resultado
    }
    */
}