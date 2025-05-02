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
const Tipo_1 = require("../Simbolo/Tipo");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, Linea, Columna, id, valor) {
        super(tipo, Linea, Columna);
        this.identificador = id;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        if (this.identificador.length !== this.valor.length) {
            return new Errors_1.default("Semántico", "Cantidad de variables y valores no coincide", this.linea, this.columna);
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
                if (valEvaluado.toLowerCase() === "verdadero")
                    valEvaluado = true;
                else if (valEvaluado.toLowerCase() === "falso")
                    valEvaluado = false;
            }
            //Verificación de tipos
            if (tipoValor !== this.tipo_dato.getTipo()) {
                return new Errors_1.default("Semántico", `Tipo incompatible en variable ${this.identificador[i]}`, this.linea, this.columna);
            }
            //Declarar la variable
            if (!tabla.setVariable(new Simbolo_1.default(this.tipo_dato, this.identificador[i], valEvaluado))) {
                const err = new Errors_1.default("Semántico", `La variable ${this.identificador[i]} ya existe`, this.linea, this.columna);
                Controllers_1.lista_errores.push(err);
                arbol.actualizarConsola(err.obtenerError());
                return err;
            }
            //Reporte
            let simboloN = new Report_1.Report(this.identificador[i], valEvaluado, this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()), tabla.getNombre().toString(), this.linea.toString(), this.columna.toString(), "variable");
            arbol.simbolos.push(simboloN);
        }
    }
}
exports.default = Declaracion;
