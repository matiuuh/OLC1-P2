import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Minuscula extends Instruccion {
    private expresion: Instruccion;

    constructor(expresion: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipo_dato.CADENA), linea, columna);
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        const valor = this.expresion.interpretar(arbol, tabla);

        if (valor instanceof Errores) return valor;

        if (typeof valor !== "string") {
            return new Errores("Semántico", "La función minuscula solo acepta cadenas", this.linea, this.columna);
        }

        return valor.toLowerCase();
    }
}
