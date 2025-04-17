import { Instruccion } from "../Abstracto/Instruccion";
import Errors from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo from "../Simbolo/Tipo";

export default class Declaracion extends Instruccion {
    private identificador : string;
    private valor : Instruccion;

    constructor(tipo: Tipo, Linea: number, Columna: number, id: string, valor: Instruccion) {
        super(tipo, Linea, Columna);
        this.identificador = id;
        this.valor = valor;
    }
    
    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let resValor = this.valor.interpretar(arbol, tabla);
        if(resValor instanceof Errors) return resValor;     //estamos validando que el resultado no sea un error
    
        if(this.valor.tipo_dato.getTipo() != this.tipo_dato.getTipo()){
            return new Errors("Semantico", "El tipo de dato no coincide con el tipo de la variable", this.linea, this.columna);
        }

        if(!tabla.setVariable(new Simbolo(this.tipo_dato, this.identificador, resValor)))
            return new Errors("Semantico", "La variable ya existe", this.linea, this.columna);
            this.linea, this.columna;
    }
}