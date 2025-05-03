import TablaSimbolos from "./TablaSimbolo";

import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Funcion from "../Instrucciones/Funcion";
import Procedimiento from "../Instrucciones/Procedimiento";
import { Report } from "./Report";

export default class Arbol {
    private instrucciones: Array<Instruccion>
    private consola: string
    private tablaGlobal: TablaSimbolos      //funciona para los entornos, considerar tablas globales y locales
    private errores: Array<Errores>
    private funciones: Array<Instruccion>
    public simbolos: Array<Report>

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones
        this.consola = ""
        this.tablaGlobal = new TablaSimbolos()
        this.errores = new Array<Errores>
        this.funciones = new Array<Instruccion>
        this.simbolos = new Array<Report>
    }

    public getConsola(): string {
        return this.consola
    }

    public setConsola(consola: string): void {
        this.consola = consola
    }

    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones
    }

    public setInstrucciones(instrucciones: Array<Instruccion>): void {
        this.instrucciones = instrucciones
    }

    public getTablaGlobal(): TablaSimbolos {
        return this.tablaGlobal
    }

    public setTablaGlobal(tabla: TablaSimbolos) {
        this.tablaGlobal = tabla
    }

    public getErrores(): any {
        return this.errores
    }

    public Imprimir(contenido: any) {
        this.consola = `${this.consola}${contenido}`
    }
    
    public actualizarConsola(contenido: any){
        this.consola = `${this.consola}\n${contenido}\n`
    }

    public getFunciones() {
        return this.funciones
    }

    public setFunciones(funciones: Array<Instruccion>) {
        this.funciones = funciones
    }

    public addFuncion(funcion: Instruccion) {
        this.funciones.push(funcion)
    }

    public getFuncion(id: string) {
        for(let i of this.instrucciones) {
            if(i instanceof Procedimiento) {
                if(i.id == id) {
                    if(!this.tablaSimbolos(i.id.toString(), '', i.linea.toString(), "Global", i.columna.toString())){
                        let simboloN = new Report(i.id, '', "void",  "Global", i.linea.toString(), i.columna.toString(), "Procedimiento")
                        this.simbolos.push(simboloN)
                    }
                    return i
                }
            }
            else if(i instanceof Funcion) {
                if(i.id == id) {
                    if(!this.tablaSimbolos(i.id.toString(), '', i.linea.toString(), "Global", i.columna.toString())){
                        let simboloN = new Report(i.id, '', i.tipo_dato.getNombreTipo(i.tipo_dato.getTipo()),  "Global", i.linea.toString(), i.columna.toString(), "Funcion")
                        this.simbolos.push(simboloN)
                    }
                    return i
                }
            }
        }
        return null
    }

    public tablaSimbolos(id: string, valor: string, linea: string, entorno: string, columna: string) : boolean{
        for(let ele of this.simbolos){
            if(ele.getId().toString() == id && ele.getEntorno().toString() == entorno.toString()){

                ele.setValor(valor)
                ele.setLinea(linea)
                ele.setValor(columna)
                return true
            }
        }

        return false
    }

    public getTipoS(id:string): string{
        for(let ele of this.simbolos){
            if(ele.getId().toString() == id){
                return ele.getTipoS().toString()
            }
        }
        return "none"
    }

    public getSimbolos(): Array<Report> {
        return this.simbolos
    }

}