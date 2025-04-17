"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, linea, col) {
        super(tipo, linea, col);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        return this.valor;
    }
}
exports.default = Nativo;
/*
Cada clase que tengamos tendra que extender de la clase instruccion,
es por eso que cada una de ellas debera de tener su metodo interpretar
*/ 
