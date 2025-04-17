"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errors {
    constructor(tipo, descripcion, fila, columna) {
        this.tipo_error = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    obtenerError() {
        return ('-> Error ' + this.tipo_error + ': ' + this.descripcion + " en linea: " + this.fila + " en columna: " + this.columna);
    }
}
exports.default = Errors;
