import TablaSimbolos from "./TablaSimbolo";

import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
//import Metodo from "../instrucciones/metodo";
//import Funcion from "../instrucciones/funcion";
<<<<<<< HEAD
import { Report } from "./Report";
=======
//import Tipo, { tipo_dato } from "./Tipo";
>>>>>>> origin/main

export default class Arbol {
    private instrucciones: Array<Instruccion>
    private consola: string
    private tablaGlobal: TablaSimbolos      //funciona para los entornos, considerar tablas globales y locales
    private errores: Array<Errores>
    //private funciones: Array<Instruccion>
<<<<<<< HEAD
    public simbolos: Array<Report>
=======
    //public simbolos: Array<Reporte>
>>>>>>> origin/main

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones
        this.consola = ""
        this.tablaGlobal = new TablaSimbolos()
        this.errores = new Array<Errores>
        //this.funciones = new Array<Instruccion>
<<<<<<< HEAD
        this.simbolos = new Array<Report>
=======
        //this.simbolos = new Array<Reporte>
>>>>>>> origin/main
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

<<<<<<< HEAD
    public Imprimir(contenido: any) {
        //console.log("[IMPRIMIR]:", contenido); // <- visible en consola
=======
    public Cout(contenido: any) {
>>>>>>> origin/main
        this.consola = `${this.consola}${contenido}`
    }
    
    public actualizarConsola(contenido: any){
        this.consola = `${this.consola}\n${contenido}\n`
    }

    /*public getFunciones() {
        return this.funciones
    }

    public setFunciones(funciones: Array<Instruccion>) {
        this.funciones = funciones
    }

    public addFuncion(funcion: Instruccion) {
        this.funciones.push(funcion)
    }*/

    public getFuncion(id: string) {
        
        /*for(let i of this.instrucciones) {
            if(i instanceof Metodo) {
                if(i.id.toLocaleLowerCase() == id.toLocaleLowerCase()) {
                    if(!this.tablaSimbolos(i.id.toString(), '', i.linea.toString(), "Global", i.columna.toString())){
                        let simboloN = new Reporte(i.id, '', "void",  "Global", i.linea.toString(), i.columna.toString(), "Metodo")
                        this.simbolos.push(simboloN)
                    }
                    return i
                }
            }
            else if(i instanceof Funcion) {
                // const tipoo = new Tipo(tipoD.VOID)
                if(i.id.toLocaleLowerCase() == id.toLocaleLowerCase()) {
                    if(!this.tablaSimbolos(i.id.toString(), '', i.linea.toString(), "Global", i.columna.toString())){
                        let simboloN = new Reporte(i.id, '', i.tipoD.getTipoD(i.tipoD.getTipo()),  "Global", i.linea.toString(), i.columna.toString(), "Funcion")
                        this.simbolos.push(simboloN)
                    }
                    return i
                }
            }
        }*/
        return null
    }

<<<<<<< HEAD
    public tablaSimbolos(id: string, valor: string, linea: string, entorno: string, columna: string) : boolean{
        for(let ele of this.simbolos){
            if(ele.getId().toString() == id && ele.getEntorno().toString() == entorno.toString()){
=======
    /*public tablaSimbolos(id: string, valor: string, linea: string, entorno: string, columna: string) : boolean{
        for(let ele of this.simbolos){
            if(ele.getId().toString() == id.toLocaleLowerCase() && ele.getEntorno().toString() == entorno.toString()){
>>>>>>> origin/main

                ele.setValor(valor)
                ele.setLinea(linea)
                ele.setValor(columna)
                return true
            }
        }

        return false
    }

<<<<<<< HEAD
    public getTipoS(id:string): string{
        for(let ele of this.simbolos){
            if(ele.getId().toString() == id){
                return ele.getTipoS().toString()
            }
        }
        return "none"
    }

    /*public getSimbolos(): Array<Reporte> {
=======
    public getSimbolos(): Array<Reporte> {
>>>>>>> origin/main
        return this.simbolos
    }*/

}