import { Instruccion } from "../Abstracto/Instruccion";
//import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Continuar extends Instruccion {
    constructor(linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        return
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoC = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`

        resultado += `${nodoC}[label="continue"]\n`
        resultado += `${nodoPC}[label=";"]\n`

        resultado += `${anterior} -> ${nodoC};\n`
        resultado += `${anterior} -> ${nodoPC};\n`

        return resultado
    }*/
}