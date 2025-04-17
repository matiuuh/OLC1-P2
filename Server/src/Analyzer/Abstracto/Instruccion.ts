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

    //tenemos un metodo abstracto que recibe un arbol y una tabla, que nos puedes retornoar cualquier cosa
    abstract interpretar(arbol: Arbol, tabla: TablaSimbolos): any
    /*
    El metodo interpretar la instruccion, lo que hara es procesar, recibe y devuelve la informacion procesada

    y lo tendremos en todas las clases del proyecto, porque eso nos va a permitir movilizarnos por todo
    el codigo
    */

    //abstract nodo(anterior: string): string //recordar descomentar esto y revisar la clase nativo, en general revisar los metodos comentados de la clase de instruccion
}