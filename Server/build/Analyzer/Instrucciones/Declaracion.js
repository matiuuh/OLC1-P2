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
            // Conversión especial: entero -> decimal
            if (tipoValor === Tipo_1.tipo_dato.ENTERO && this.tipo_dato.getTipo() === Tipo_1.tipo_dato.DECIMAL) {
                valEvaluado = parseFloat(valEvaluado);
            }
            else if (tipoValor !== this.tipo_dato.getTipo()) {
                return new Errors_1.default("Semántico", `Tipo incompatible en variable ${this.identificador[i]}`, this.linea, this.columna);
            }
            // Declarar la variable
            if (!tabla.setVariable(new Simbolo_1.default(this.tipo_dato, this.identificador[i], valEvaluado))) {
                const err = new Errors_1.default("Semántico", `La variable ${this.identificador[i]} ya existe`, this.linea, this.columna);
                Controllers_1.lista_errores.push(err);
                arbol.actualizarConsola(err.obtenerError());
                return err;
            }
            // Reporte
            let simboloN = new Report_1.Report(this.identificador[i], valEvaluado, this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()), tabla.getNombre().toString(), this.linea.toString(), this.columna.toString(), "variable");
            arbol.simbolos.push(simboloN);
        } //sdfasfasf
        // REVISAR
        /*if (this.valor.tipo_dato.getTipo() == tipo_dato.ENTERO && this.tipo_dato.getTipo() == tipo_dato.DECIMAL) {
            this.identificador.forEach(id => {
                valorf = parseFloat(valorf);
                if (!tabla.setVariable(new Simbolo(this.tipo_dato, id, valorf))) {
                    let error = new Errors("Semantico", "No se puede declarar variable " + id + " porque ya existe", this.linea, this.columna)
                    lista_errores.push(error)
                    console.log("error comentado rey");
                    arbol.actualizarConsola((<Errors>error).obtenerError())
                    return new Errors("Semantico", "No se puede declarar variable " + id + " porque ya existe", this.linea, this.columna)
                } else {
                    if (!arbol.tablaSimbolos(id, valorf, this.linea.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                        let simboloN = new Reporte(id, valorf, this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()), tabla.getNombre().toString(), this.linea.toString(), this.columna.toString())
                        arbol.simbolos.push(simboloN)
                    }
                }
            })
        } else {
            if (this.valor.tipo_dato.getTipo() != this.tipo_dato.getTipo()) {
                return new Errors("Semantico", "No se pueden declarar variables de diferentes tipos", this.linea, this.columna)
            }
            this.identificador.forEach(id => {
                if (!tabla.setVariable(new Simbolo(this.tipo_dato, id, valorf))) {
                    let error = new Errors("Semantico", "No se puede declarar variable " + id + " porque ya existe", this.linea, this.columna)
                    lista_errores.push(error)
                    arbol.actualizarConsola((<Errors>error).obtenerError())
                    return new Errors("Semantico", "No se puede declarar variable " + id + " porque ya existe", this.linea, this.columna)
                } else {
                    if (!arbol.tablaSimbolos(id, valorf, this.linea.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                        console.log("accion comentada en el ultimo else de declaracion");
                        let simboloN = new Reporte(id, valorf, this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()), tabla.getNombre().toString(), this.linea.toString(), this.columna.toString())
                        arbol.simbolos.push(simboloN)
                    }
                }
            });
        }*/
    }
}
exports.default = Declaracion;
