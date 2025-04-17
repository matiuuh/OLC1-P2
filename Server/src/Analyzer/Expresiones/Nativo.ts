import { Instruccion } from "../Abstracto/Instruccion";
import Arbol from "../Simbolo/Arbol";
import tablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo from "../Simbolo/Tipo";

export default class Nativo extends Instruccion {
    valor: any

    constructor(tipo: Tipo, valor: any, linea: number, col: number) {
        super(tipo, linea, col)
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return this.valor
    }
}

/*
Cada clase que tengamos tendra que extender de la clase instruccion,
es por eso que cada una de ellas debera de tener su metodo interpretar
*/