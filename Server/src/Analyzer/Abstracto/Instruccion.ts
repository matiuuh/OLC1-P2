import Arbol from "../Simbolo/Arbol";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo from "../Simbolo/Tipo";

export abstract class Instruccion {
    public tipo_dato : Tipo
    public linea: number
    public columna: number

    constructor(tipo: Tipo, linea: number, columna: number) {
        this.tipo_dato = tipo
        this.linea = linea
        this.columna = columna
    }

    abstract interpretar(arbol: Arbol, tabla: TablaSimbolos): any
    abstract nodo(anterior: string): string
}