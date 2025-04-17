"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipo_dato = void 0;
class Tipo {
    constructor(tipo) {
        this.tipo = tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    getNombreTipo() {
        switch (this.tipo) {
            case tipo_dato.ENTERO:
                return "ENTERO";
            case tipo_dato.DECIMAL:
                return "DECIMAL";
            case tipo_dato.BOOLEANO:
                return "BOOLEANO";
            case tipo_dato.CARACTER:
                return "CARACTER";
            case tipo_dato.CADENA:
                return "CADENA";
            default:
                return "Tipo No Valido";
        }
    }
}
exports.default = Tipo;
/*
Usamos una clase enum para definir un conjunto de valores constantes con nombre,
que están relacionados entre sí y permiten trabajar con opciones predefinidas
de manera clara y segura.
*/
var tipo_dato;
(function (tipo_dato) {
    tipo_dato[tipo_dato["ENTERO"] = 0] = "ENTERO";
    tipo_dato[tipo_dato["DECIMAL"] = 1] = "DECIMAL";
    tipo_dato[tipo_dato["BOOLEANO"] = 2] = "BOOLEANO";
    tipo_dato[tipo_dato["CARACTER"] = 3] = "CARACTER";
    tipo_dato[tipo_dato["CADENA"] = 4] = "CADENA";
    tipo_dato[tipo_dato["VOID"] = 5] = "VOID";
})(tipo_dato || (exports.tipo_dato = tipo_dato = {}));
