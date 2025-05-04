"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controllers_1 = require("../../controllers/Controllers");
const Instruccion_1 = require("../Abstracto/Instruccion");
const Errors_1 = __importDefault(require("../Errors/Errors"));
const Report_1 = require("../Simbolo/Report");
const Simbolo_1 = __importDefault(require("../Simbolo/Simbolo"));
const Singleton_1 = __importDefault(require("../Simbolo/Singleton"));
const Tipo_1 = require("../Simbolo/Tipo");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, linea, columna, id, valor) {
        super(tipo, linea, columna);
        this.identificador = id;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        var _a, _b, _c;
        if (this.identificador.length !== this.valor.length) {
            const err = new Errors_1.default("Semántico", "Cantidad de variables y valores no coincide", this.linea, this.columna);
            Controllers_1.lista_errores.push(err);
            //arbol.actualizarConsola(err.obtenerError());
            return err;
        }
        for (let i = 0; i < this.identificador.length; i++) {
            let valEvaluado = this.valor[i].interpretar(arbol, tabla);
            if (valEvaluado instanceof Errors_1.default)
                return valEvaluado;
            let tipoValor = this.valor[i].tipo_dato.getTipo();
            //Conversión especial: entero -> decimal
            if (tipoValor === Tipo_1.tipo_dato.ENTERO && this.tipo_dato.getTipo() === Tipo_1.tipo_dato.DECIMAL) {
                valEvaluado = parseFloat(valEvaluado);
            }
            //Conversión especial: "Verdadero"/"Falso" como string → boolean
            if (this.tipo_dato.getTipo() === Tipo_1.tipo_dato.BOOLEANO && typeof valEvaluado === "string") {
                if (valEvaluado === "Verdadero")
                    valEvaluado = true;
                else if (valEvaluado === "Falso")
                    valEvaluado = false;
            }
            //Verificación de tipos
            if (tipoValor !== this.tipo_dato.getTipo()) {
                const err = new Errors_1.default("Semántico", `Tipo incompatible en variable ${this.identificador[i]}`, this.linea, this.columna);
                Controllers_1.lista_errores.push(err);
                //arbol.actualizarConsola(err.obtenerError());
                return err;
            }
            //Declarar la variable
            if (!tabla.setVariable(new Simbolo_1.default(this.tipo_dato, this.identificador[i], valEvaluado))) {
                const err = new Errors_1.default("Semántico", `La variable ${this.identificador[i]} ya existe`, this.linea, this.columna);
                console.log("La variable " + this.identificador[i] + " ya existe");
                Controllers_1.lista_errores.push(err);
                //arbol.actualizarConsola(err.obtenerError());
                return err;
            }
            console.log("DEBUG:", {
                id: this.identificador[i],
                lineaValor: this.valor[i].linea.toString(),
                columnaValor: this.valor[i].columna,
                tipoValor: this.valor[i].tipo_dato
            });
            //Reporte
            let simboloN = new Report_1.Report(this.identificador[i], valEvaluado, this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()), tabla.getNombre().toString(), (_a = this.valor[i].linea) === null || _a === void 0 ? void 0 : _a.toString(), // 👈 Usa la línea de la expresión si existe
            (_c = (_b = this.valor[i].columna) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : this.columna.toString(), // 👈 Igual para columna
            "variable");
            arbol.simbolos.push(simboloN);
        }
    }
    nodo(anterior) {
        let Singleton = Singleton_1.default.getInstancia();
        let resultado = "";
        let nodoD = `n${Singleton.getContador()}`;
        let nodoT = `n${Singleton.getContador()}`;
        let nodoID = `n${Singleton.getContador()}`;
        let nodoI = `n${Singleton.getContador()}`;
        let nodoV = `n${Singleton.getContador()}`;
        let nodoPC = `n${Singleton.getContador()}`;
        // Nodos individuales por cada ID
        let ids = [];
        for (let i = 0; i < this.identificador.length; i++) {
            ids.push(`n${Singleton.getContador()}`);
        }
        resultado += `${nodoD}[label="DECLARACION"]\n`;
        // Tipo
        switch (this.tipo_dato.getTipo()) {
            case Tipo_1.tipo_dato.ENTERO:
                resultado += `${nodoT}[label="entero"]\n`;
                break;
            case Tipo_1.tipo_dato.DECIMAL:
                resultado += `${nodoT}[label="decimal"]\n`;
                break;
            case Tipo_1.tipo_dato.CADENA:
                resultado += `${nodoT}[label="cadena"]\n`;
                break;
            case Tipo_1.tipo_dato.CARACTER:
                resultado += `${nodoT}[label="caracter"]\n`;
                break;
            case Tipo_1.tipo_dato.BOOLEANO:
                resultado += `${nodoT}[label="booleano"]\n`;
                break;
        }
        // ID y conexiones
        resultado += `${nodoID}[label="ID"]\n`;
        for (let i = 0; i < this.identificador.length; i++) {
            resultado += `${ids[i]}[label="${this.identificador[i]}"]\n`;
        }
        // Estructura de árbol
        resultado += `${nodoI}[label="="]\n`;
        resultado += `${nodoV}[label="EXPRESIONES"]\n`;
        resultado += `${nodoPC}[label=";"]\n`;
        resultado += `${anterior} -> ${nodoD}\n`;
        resultado += `${nodoD} -> ${nodoT}\n`;
        resultado += `${nodoD} -> ${nodoID}\n`;
        for (let i = 0; i < this.identificador.length; i++) {
            resultado += `${nodoID} -> ${ids[i]}\n`;
        }
        resultado += `${nodoD} -> ${nodoI}\n`;
        resultado += `${nodoD} -> ${nodoV}\n`;
        resultado += `${nodoD} -> ${nodoPC}\n`;
        // Expresiones (valores)
        for (let i = 0; i < this.valor.length; i++) {
            let nodoExpr = `n${Singleton.getContador()}`;
            resultado += `${nodoV} -> ${nodoExpr}\n`;
            resultado += this.valor[i].nodo(nodoExpr);
        }
        return resultado;
    }
}
exports.default = Declaracion;
