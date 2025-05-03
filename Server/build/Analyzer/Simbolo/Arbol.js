"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TablaSimbolo_1 = __importDefault(require("./TablaSimbolo"));
const Funcion_1 = __importDefault(require("../Instrucciones/Funcion"));
const Procedimiento_1 = __importDefault(require("../Instrucciones/Procedimiento"));
const Report_1 = require("./Report");
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new TablaSimbolo_1.default();
        this.errores = new Array;
        this.funciones = new Array;
        this.simbolos = new Array;
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
    Imprimir(contenido) {
        this.consola = `${this.consola}${contenido}`;
    }
    actualizarConsola(contenido) {
        this.consola = `${this.consola}\n${contenido}\n`;
    }
    getFunciones() {
        return this.funciones;
    }
    setFunciones(funciones) {
        this.funciones = funciones;
    }
    addFuncion(funcion) {
        this.funciones.push(funcion);
    }
    getFuncion(id) {
        for (let i of this.instrucciones) {
            if (i instanceof Procedimiento_1.default) {
                if (i.id == id) {
                    if (!this.tablaSimbolos(i.id.toString(), '', i.linea.toString(), "Global", i.columna.toString())) {
                        let simboloN = new Report_1.Report(i.id, '', "void", "Global", i.linea.toString(), i.columna.toString(), "Procedimiento");
                        this.simbolos.push(simboloN);
                    }
                    return i;
                }
            }
            else if (i instanceof Funcion_1.default) {
                if (i.id == id) {
                    if (!this.tablaSimbolos(i.id.toString(), '', i.linea.toString(), "Global", i.columna.toString())) {
                        let simboloN = new Report_1.Report(i.id, '', i.tipo_dato.getNombreTipo(i.tipo_dato.getTipo()), "Global", i.linea.toString(), i.columna.toString(), "Funcion");
                        this.simbolos.push(simboloN);
                    }
                    return i;
                }
            }
        }
        return null;
    }
    tablaSimbolos(id, valor, linea, entorno, columna) {
        for (let ele of this.simbolos) {
            if (ele.getId().toString() == id && ele.getEntorno().toString() == entorno.toString()) {
                ele.setValor(valor);
                ele.setLinea(linea);
                ele.setValor(columna);
                return true;
            }
        }
        return false;
    }
    getTipoS(id) {
        for (let ele of this.simbolos) {
            if (ele.getId().toString() == id) {
                return ele.getTipoS().toString();
            }
        }
        return "none";
    }
    getSimbolos() {
        return this.simbolos;
    }
}
exports.default = Arbol;
