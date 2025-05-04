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
exports.Operadores = void 0;
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errors_1 = __importDefault(require("../Errors/Errors"));
const Singleton_1 = __importDefault(require("../Simbolo/Singleton"));
const Tipo_1 = __importStar(require("../Simbolo/Tipo"));
class Aritmeticas extends Instruccion_1.Instruccion {
    constructor(operacion, fila, columna, valor1, valor2) {
        super(new Tipo_1.default(Tipo_1.tipo_dato.VOID), fila, columna);
        this.operacion = operacion;
        if (!valor2)
            this.opU = valor1;
        else {
            this.valor1 = valor1;
            this.valor2 = valor2;
        }
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let oprI, oprD, unico = null;
        if (this.opU != null) {
            unico = this.opU.interpretar(arbol, tabla);
            if (unico instanceof Errors_1.default)
                return unico;
        }
        else {
            oprI = (_a = this.valor1) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (oprI instanceof Errors_1.default)
                return oprI;
            oprD = (_b = this.valor2) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
            if (oprD instanceof Errors_1.default)
                return oprD;
        }
        switch (this.operacion) {
            case Operadores.SUMA:
                return this.suma(oprI, oprD);
            case Operadores.RESTA:
                return this.resta(oprI, oprD);
            case Operadores.NEGACION:
                return this.negacion(unico);
            case Operadores.MUL:
                return this.multi(oprI, oprD);
            case Operadores.DIV:
                return this.div(oprI, oprD);
            case Operadores.POW:
                return this.pow(oprI, oprD);
            case Operadores.MOD:
                return this.mod(oprI, oprD);
            default:
                return new Errors_1.default('Semantico', 'Operador invalido', this.linea, this.columna);
        }
    }
    suma(valor1, valor2) {
        var _a, _b;
        let tipo1 = (_a = this.valor1) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.valor2) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO); //el tipo de dato que se va a devolver
                        return parseInt(valor1) + parseInt(valor2); //la operacion
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) + parseFloat(valor2);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(valor1) + valor2;
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return valor1 + valor2;
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(valor1) + parseInt(valor2.charCodeAt(0));
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " + " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) + parseFloat(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) + parseFloat(valor2);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) + valor2;
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return valor1 + valor2;
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) + parseFloat(valor2.charCodeAt(0));
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " + " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return valor1 + parseInt(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return valor1 + parseFloat(valor2);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return valor1 + valor2;
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " + " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.CADENA:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return valor1 + valor2;
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return valor1 + valor2;
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return valor1 + valor2;
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return valor1 + valor2;
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return valor1 + valor2;
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " + " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(valor1.charCodeAt[0]) + (valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1.charCodeAt[0]) + parseFloat(valor2);
                    case Tipo_1.tipo_dato.CADENA:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return valor1 + valor2;
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.CADENA);
                        return valor1 + valor2;
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " + " + tipo2, this.linea, this.columna);
                }
            default:
                return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " + " + tipo2, this.linea, this.columna);
        }
    }
    resta(valor1, valor2) {
        var _a, _b;
        let tipo1 = (_a = this.valor1) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.valor2) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(valor1) - parseInt(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) - parseFloat(valor2);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(valor1) - valor2;
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(valor1) - parseInt(valor2.charCodeAt(0));
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " - " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) - parseFloat(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) - parseFloat(valor2);
                    case Tipo_1.tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) - valor2;
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) - parseFloat(valor2.charCodeAt(0));
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " - " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return valor1 - parseInt(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return valor1 - parseFloat(valor2);
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " - " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(valor1.charCodeAt(0)) - (valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1.charCodeAt(0)) - parseFloat(valor2);
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " + " + tipo2, this.linea, this.columna);
                }
            default:
                return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " + " + tipo2, this.linea, this.columna);
        }
    }
    negacion(valor1) {
        var _a;
        let opeU = (_a = this.opU) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        switch (opeU) {
            case Tipo_1.tipo_dato.ENTERO:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                return parseInt(valor1) * -1;
            case Tipo_1.tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                return parseFloat(valor1) * -1;
            default:
                return new Errors_1.default('Semantico', 'No se puede hacer negar ' + opeU, this.linea, this.columna);
        }
    }
    multi(valor1, valor2) {
        var _a, _b;
        let tipo1 = (_a = this.valor1) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.valor2) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(valor1) * parseInt(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) * parseFloat(valor2);
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(valor1) * parseInt(valor2.charCodeAt(0));
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " * " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) * parseFloat(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) * parseFloat(valor2);
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) * parseFloat(valor2.charCodeAt(0));
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " * " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return parseInt(valor1.charCodeAt(0)) * (valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1.charCodeAt(0)) * parseFloat(valor2);
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " * " + tipo2, this.linea, this.columna);
                }
            default:
                return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " * " + tipo2, this.linea, this.columna);
        }
    }
    div(valor1, valor2) {
        var _a, _b;
        let tipo1 = (_a = this.valor1) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.valor2) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) / parseFloat(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) / parseFloat(valor2);
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) / parseFloat(valor2.charCodeAt(0));
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " / " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) / parseFloat(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) / parseFloat(valor2);
                    case Tipo_1.tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) / parseFloat(valor2.charCodeAt(0));
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " / " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.CARACTER:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1.charCodeAt[0]) / parseFloat(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1.charCodeAt[0]) / parseFloat(valor2);
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " / " + tipo2, this.linea, this.columna);
                }
            default:
                return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " / " + tipo2, this.linea, this.columna);
        }
    }
    pow(valor1, valor2) {
        var _a, _b;
        let tipo1 = (_a = this.valor1) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.valor2) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.ENTERO);
                        return Math.pow(parseInt(valor1), parseInt(valor2));
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return Math.pow(parseFloat(valor1), parseFloat(valor2));
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + "^" + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return Math.pow(parseFloat(valor1), parseFloat(valor2));
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return Math.pow(parseFloat(valor1), parseFloat(valor2));
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + "^" + tipo2, this.linea, this.columna);
                }
            default:
                return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + "^" + tipo2, this.linea, this.columna);
        }
    }
    mod(valor1, valor2) {
        var _a, _b;
        let tipo1 = (_a = this.valor1) === null || _a === void 0 ? void 0 : _a.tipo_dato.getTipo();
        let tipo2 = (_b = this.valor2) === null || _b === void 0 ? void 0 : _b.tipo_dato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipo_dato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) % parseFloat(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) % parseFloat(valor2);
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " % " + tipo2, this.linea, this.columna);
                }
            case Tipo_1.tipo_dato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) % parseFloat(valor2);
                    case Tipo_1.tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo_1.default(Tipo_1.tipo_dato.DECIMAL);
                        return parseFloat(valor1) % parseFloat(valor2);
                    default:
                        return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " % " + tipo2, this.linea, this.columna);
                }
            default:
                return new Errors_1.default('Semantico', 'No se puede hacer ' + tipo1 + " % " + tipo2, this.linea, this.columna);
        }
    }
    nodo(anterior) {
        var _a, _b;
        let Singleton = Singleton_1.default.getInstancia();
        let resultado = "";
        if (this.opU != undefined) {
            let nodoN = `N${Singleton.getContador()}`;
            let nodoExp = `N${Singleton.getContador()}`;
            resultado += `${nodoN}[label=\"-\"]\n`;
            resultado += `${nodoExp}[label=\"EXPRESION\"]\n`;
            resultado += `${anterior}->${nodoN}\n`;
            resultado += `${anterior}->${nodoExp}\n`;
            //resultado += this.opU?.nodo(nodoExp)
            return resultado;
        }
        let nodoE1 = `n${Singleton.getContador()}`;
        let nodoop = `n${Singleton.getContador()}`;
        let nodoE2 = `n${Singleton.getContador()}`;
        resultado += `${nodoE1}[label=\"EXPRESION\"]\n`;
        resultado += `${nodoop}[label=\"${this.getOperacion(this.operacion)}\"]\n`;
        resultado += `${nodoE2}[label=\"EXPRESION\"]\n`;
        resultado += `${anterior}->${nodoE1}\n`;
        resultado += `${anterior}->${nodoop}\n`;
        resultado += `${anterior}->${nodoE2}\n`;
        resultado += (_a = this.valor1) === null || _a === void 0 ? void 0 : _a.nodo(nodoE1);
        resultado += (_b = this.valor2) === null || _b === void 0 ? void 0 : _b.nodo(nodoE2);
        return resultado;
    }
    getOperacion(num) {
        switch (num) {
            case 0:
                return '+';
            case 1:
                return '-';
            case 2:
                return '-';
            case 3:
                return '*';
            case 4:
                return '/';
            case 6:
                return '%';
        }
    }
}
exports.default = Aritmeticas;
var Operadores;
(function (Operadores) {
    Operadores[Operadores["SUMA"] = 0] = "SUMA";
    Operadores[Operadores["RESTA"] = 1] = "RESTA";
    Operadores[Operadores["NEGACION"] = 2] = "NEGACION";
    Operadores[Operadores["MUL"] = 3] = "MUL";
    Operadores[Operadores["DIV"] = 4] = "DIV";
    Operadores[Operadores["POW"] = 5] = "POW";
    Operadores[Operadores["MOD"] = 6] = "MOD";
})(Operadores || (exports.Operadores = Operadores = {}));
