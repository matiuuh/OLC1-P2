"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Singleton_1 = __importDefault(require("../Simbolo/Singleton"));
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, linea, col) {
        super(tipo, linea, col);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        return this.valor;
    }
    /*
    Cada clase que tengamos tendra que extender de la clase instruccion,
    es por eso que cada una de ellas debera de tener su metodo interpretar
    */
    nodo(anterior) {
        let Singleton = Singleton_1.default.getInstancia();
        let nodoN = `n${Singleton.getContador()}`;
        let nodoV = `n${Singleton.getContador()}`;
        let resultado = `${nodoN}[label="NATIVO"]\n`;
        resultado += `${nodoV}[label="${this.valor}"]\n`;
        resultado += `${nodoN}->${nodoV}\n`;
        resultado += `${anterior}->${nodoN}\n`;
        return resultado;
    }
}
exports.default = Nativo;
