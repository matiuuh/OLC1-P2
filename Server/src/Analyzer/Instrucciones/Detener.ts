import { Instruccion } from "../Abstracto/Instruccion";
//import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Singleton from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Detener extends Instruccion {
    constructor(linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        return
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoB = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`

        resultado += `${nodoB}[label="Break"]\n`
        resultado += `${nodoPC}[label=";"]\n`

        resultado += `${anterior}-> ${nodoB}\n`
        resultado += `${anterior}-> ${nodoPC}\n`
        return resultado
    }*/
}