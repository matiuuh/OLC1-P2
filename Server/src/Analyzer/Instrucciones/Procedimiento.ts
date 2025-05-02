import { lista_errores } from "../../controllers/Controllers";
import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
//import Detener from "./Detener";
//import Continuar from "./Continuar";
import Retornar from "./Retornar";

export default class Procedimiento extends Instruccion {
    public id: string
    public parametros: any[]
    public instrucciones: Instruccion[]
    // public tipoS: string

    constructor(id:string, tipo: Tipo, instrucciones: Instruccion[], linea:number, columna: number, parametros: any[]) {
        super(tipo, linea, columna)
        this.id = id
        this.parametros = parametros
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        if(this.tipo_dato.getTipo() != tipo_dato.VOID) return new Errores("Semantico", "El metodo debe de ser de tipo void", this.linea, this.columna)
            for(let i of this.instrucciones) {
                if( i instanceof Errores) {
                    lista_errores.push(i)
                    arbol.actualizarConsola((<Errores>i).obtenerError())
                }
                let resultado = i.interpretar(arbol, tabla)
        
                if( resultado instanceof Errores) {
                    lista_errores.push(resultado)
                    arbol.actualizarConsola((<Errores>resultado).obtenerError())
                }
                    if(resultado instanceof Retornar) {
                        if(resultado.valor != null) {
                            return new Errores("Semantico", "No se puede devolver un valor en un metodo", this.linea, this.columna)
                        }
                        break
                    }
            }
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()
        let resultado = ""

        let paramsT = []
        let params = []
        let instru = []

        let nodoP = `n${cont.get()}`
        let nodoT = `n${cont.get()}`
        let nodoPI = `n${cont.get()}`
        let nodoID = `n${cont.get()}`
        let nodoP1 = `n${cont.get()}`
        let nodoPar = `n${cont.get()}`

        let nodoP2 = `n${cont.get()}`
        let nodoL1 = `n${cont.get()}`
        let nodoL2 = `n${cont.get()}`
        let nodoPIns = `n${cont.get()}`

        for(let i = 0; i < this.parametros.length; i++){
            paramsT.push(`n${cont.get()}`)
            params.push(`n${cont.get()}`)
        }

        for(let i= 0; i< this.instrucciones.length; i++){
            instru.push(`n${cont.get()}`)
        }

        resultado += `${nodoP}[label="METODO"]\n`
        resultado += `${nodoT}[label="VOID"]\n`

        resultado += `${nodoPI}[label="ID"]\n`
        resultado += `${nodoID}[label="${this.id}"]\n`
        resultado += `${nodoP1}[label="("]\n`
        resultado += `${nodoPar}[label="PARAMS"]\n`

        for(let i = 0; i < this.parametros.length; i++){
            if(this.parametros[i].tipo.getTipo() == tipo_dato.INT){
                resultado += `${paramsT[i]}[label="INT"]\n`
            }else if(this.parametros[i].tipo.getTipo() == tipo_dato.DOUBLE){
                resultado += `${paramsT[i]}[label="DOUBLE"]\n`
            }else if(this.parametros[i].tipo.getTipo() == tipo_dato.CADENA){
                resultado += `${paramsT[i]}[label="std::string"]\n`
            }else if(this.parametros[i].tipo.getTipo() == tipo_dato.BOOL){
                resultado += `${paramsT[i]}[label="BOOL"]\n`
            }else if(this.parametros[i].tipo.getTipo() == tipo_dato.VOID){
                resultado += `${paramsT[i]}[label="VOID"]\n`
            }else if(this.parametros[i].tipo.getTipo() == tipo_dato.CHAR){
                resultado += `${paramsT[i]}[label="CHAR"]\n`
            }
            
            resultado += `${params[i]}[label="${this.parametros[i].id}"]\n`
        }

        resultado += `${nodoP2}[label=")"]\n`
        resultado += `${nodoL1}[label="{"]\n`
        resultado += `${nodoPIns}[label="INSTRUCCIONES"]\n`
        for(let i = 0; i < this.instrucciones.length; i++){
            resultado += `${instru[i]}[label="INSTRUCCION"]\n`
        }
        resultado += `${nodoL2}[label="}"]\n`

        resultado += `${nodoP} -> ${nodoT}\n`
        resultado += `${nodoP} -> ${nodoPI}\n`
        resultado += `${nodoPI} -> ${nodoID}\n`
        resultado += `${nodoP} -> ${nodoP1}\n`
        resultado += `${nodoP} -> ${nodoPar}\n`

        for(let i = 0; i < this.parametros.length; i++){
            resultado += `${nodoPar} -> ${paramsT[i]}\n`
            resultado += `${nodoPar} -> ${params[i]}\n`
        }

        resultado += `${nodoP} -> ${nodoP2}\n`

        resultado += `${nodoP} -> ${nodoL1}\n`

        resultado += `${nodoP} -> ${nodoPIns}\n`

        for(let i = 0; i < this.instrucciones.length; i++){
            resultado += `${nodoPIns} -> ${instru[i]}\n`
        }

        resultado += `${nodoP} -> ${nodoL2}\n`

        resultado += `${anterior} -> ${nodoP}\n`

        for(let i = 0; i < this.instrucciones.length; i++){
            resultado += this.instrucciones[i].nodo(instru[i])
        }


        return resultado

    }*/

}