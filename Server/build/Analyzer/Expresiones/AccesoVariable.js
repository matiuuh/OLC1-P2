"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errors_1 = __importDefault(require("../Errors/Errors"));
const Singleton_1 = __importDefault(require("../Simbolo/Singleton"));
const Tipo_1 = __importStar(require("../Simbolo/Tipo"));
class AccesoVariable extends Instruccion_1.Instruccion {
    constructor(id, linea, columna) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), linea, columna);
        this.id = id;
    }
    interpretar(arbol, tabla) {
        let valorV = tabla.getVariable(this.id);
        if (valorV == null)
            return new Errors_1.default("Semantico", "Acceso invalido para ID: " + this.id, this.linea, this.columna);
        this.tipo_dato = valorV.getTipo();
        this.valor = valorV.getValor();
        return valorV.getValor();
    }
    nodo(anterior) {
        let cont = Singleton_1.default.getInstancia();
        let resultado = "";
        let nodoD = `n${cont.getContador()}`;
        let nodoID = `n${cont.getContador()}`;
        resultado += `${nodoID}[label="${this.id}"]\n`;
        resultado += `${nodoD}[label="${this.valor}"]\n`;
        resultado += `${anterior}->${nodoID}\n`;
        resultado += `${nodoID}->${nodoD}\n`;
        return resultado;
    }
}
exports.default = AccesoVariable;
