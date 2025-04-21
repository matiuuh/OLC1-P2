import { Instruccion } from "../Abstracto/Instruccion";
import Errors from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import { Reporte } from "../Simbolo/Report";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
//import Tipo, {tipo_dato} from "../Simbolo/Tipo";
//import { lista_errores } from "../../controllers/Controllers";

export default class Declaracion extends Instruccion {
    private identificador: Array<any>;
    private valor: Instruccion;

    constructor(tipo: Tipo, Linea: number, Columna: number, id: Array<any>, valor: Instruccion) {
        super(tipo, Linea, Columna);
        this.identificador = id;
        this.valor = valor;
    }

    /*interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let resValor = this.valor.interpretar(arbol, tabla);
        if(resValor instanceof Errors) return resValor;     //estamos validando que el resultado no sea un error
    
        //si estos tipos no son iguales entonces habra un errror
        if(this.valor.tipo_dato.getTipo() != this.tipo_dato.getTipo()){
            return new Errors("Semantico", "El tipo de dato no coincide con el tipo de la variable", this.linea, this.columna);
        }

        //guardarlo en la tabla de simbolos
        if(!tabla.setVariable(new Simbolo(this.tipo_dato, this.identificador, resValor)))
            return new Errors("Semantico", "La variable ya existe", this.linea, this.columna);
            this.linea, this.columna;
    }*/

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        // let pasa = true
        let valorf = this.valor.interpretar(arbol, tabla)
        if (valorf instanceof Errors) return valorf

        // REVISAR
        if (this.valor.tipo_dato.getTipo() == tipo_dato.ENTERO && this.tipo_dato.getTipo() == tipo_dato.DECIMAL) {
            this.identificador.forEach(id => {
                valorf = parseFloat(valorf);
                if (!tabla.setVariable(new Simbolo(this.tipo_dato, id, valorf))) {
                    let error = new Errors("Semantico", "No se puede declarar variable " + id + " porque ya existe", this.linea, this.columna)
                    //lista_errores.push(error)
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
                    //lista_errores.push(error)
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
        }

    }
}