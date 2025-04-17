"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errors_1 = __importDefault(require("../Errors/Errors"));
const Simbolo_1 = __importDefault(require("../Simbolo/Simbolo"));
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, Linea, Columna, id, valor) {
        super(tipo, Linea, Columna);
        this.identificador = id;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        let resValor = this.valor.interpretar(arbol, tabla);
        if (resValor instanceof Errors_1.default)
            return resValor; //estamos validando que el resultado no sea un error
        if (this.valor.tipo_dato.getTipo() != this.tipo_dato.getTipo()) {
            return new Errors_1.default("Semantico", "El tipo de dato no coincide con el tipo de la variable", this.linea, this.columna);
        }
        if (!tabla.setVariable(new Simbolo_1.default(this.tipo_dato, this.identificador, resValor)))
            return new Errors_1.default("Semantico", "La variable ya existe", this.linea, this.columna);
        this.linea, this.columna;
    }
}
exports.default = Declaracion;
