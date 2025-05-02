//import { lista_errores } from "../../controllers/Controllers";
import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo from "../Simbolo/Tipo";
//import Detener from "./Detener";
//import Continuar from "./Continuar";
import Retornar from "./Retornar";
//import SeleccionMultiple from "./SeleccionMultiple";

export default class Funcion extends Instruccion {
    public id: string
    public parametros: any[]
    public instrucciones: Instruccion[]

    constructor(id:string, tipo: Tipo, instrucciones: Instruccion[], linea:number, columna: number, parametros: any[]) {
        super(tipo, linea, columna)
        this.id = id
        this.parametros = parametros
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, entorno: TablaSimbolos) {
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
    
            if (!instruccion || typeof instruccion.interpretar !== "function") {
                return new Errores("Semantico", `Nodo inválido dentro de la función '${this.id}'`, this.linea, this.columna);
            }
    
            const resultado = instruccion.interpretar(arbol, entorno); // 👈 usamos el entorno con parámetros
    
            if (resultado instanceof Errores) return resultado;
    
            if (resultado instanceof Retornar) {
                if (resultado.valor !== null) {
                    if (this.tipo_dato.getTipo() !== resultado.tipo_dato.getTipo()) {
                        return new Errores("Semantico", "El tipo de la función y del valor de retorno son diferentes", this.linea, this.columna);
                    }
                    return resultado.valor;
                }
            }
    
            if (i === this.instrucciones.length - 1) {
                return new Errores("Semantico", "Debe de retornar un valor", this.linea, this.columna);
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

        resultado += `${nodoP}[label="FUNCION"]\n`
        switch (this.tipo_dato.getTipo()) {
            case tipo_dato.INT:
                
                resultado += `${nodoT}[label="INT"]\n`
                break
            case tipo_dato.DOUBLE:
                
                resultado += `${nodoT}[label="DOUBLE"]\n`
                break
            case tipo_dato.CHAR:
                
                resultado += `${nodoT}[label="INT"]\n`
                break
            case tipo_dato.BOOL:
                
                resultado += `${nodoT}[label="BOOL"]\n`
                break
            case tipo_dato.CADENA:
                
                resultado += `${nodoT}[label="STD::STRING"]\n`
                break
        }

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