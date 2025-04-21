"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporte = void 0;
class Reporte {
    constructor(id, valor, tipo, entorno, linea, columna) {
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
    }
    getId() {
        return this.id;
    }
    getEntorno() {
        return this.entorno;
    }
    getTipo() {
        return this.tipo;
    }
    getValor() {
        return this.valor;
    }
    getLinea() {
        return this.linea;
    }
    getColumna() {
        return this.columna;
    }
    setLinea(linea) {
        this.linea = linea;
    }
    setColumna(columna) {
        this.columna = columna;
    }
    setEntorno(entorno) {
        this.entorno = entorno;
    }
    setValor(valor) {
        this.valor = valor;
    }
}
exports.Reporte = Reporte;
