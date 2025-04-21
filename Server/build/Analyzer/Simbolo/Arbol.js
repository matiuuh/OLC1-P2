"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TablaSimbolo_1 = __importDefault(require("./TablaSimbolo"));
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new TablaSimbolo_1.default();
        this.errores = new Array;
        //this.funciones = new Array<Instruccion>
        //this.simbolos = new Array<Reporte>
    }
    getConsola() {
        return this.consola;
    }
    setConsola(consola) {
        this.consola = consola;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getTablaGlobal() {
        return this.tablaGlobal;
    }
    setTablaGlobal(tabla) {
        this.tablaGlobal = tabla;
    }
    getErrores() {
        return this.errores;
    }
    Cout(contenido) {
        this.consola = `${this.consola}${contenido}`;
    }
    actualizarConsola(contenido) {
        this.consola = `${this.consola}\n${contenido}\n`;
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
    getFuncion(id) {
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
        return null;
    }
    tablaSimbolos(id, valor, linea, entorno, columna) {
        for (let ele of this.simbolos) {
            if (ele.getId().toString() == id.toLocaleLowerCase() && ele.getEntorno().toString() == entorno.toString()) {
                ele.setValor(valor);
                ele.setLinea(linea);
                ele.setValor(columna);
                return true;
            }
        }
        return false;
    }
}
exports.default = Arbol;
