import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Ternario extends Instruccion {
    private condicion: Instruccion
    private exp1: Instruccion
    private exp2: Instruccion

    constructor(condicion: Instruccion, exp1: Instruccion, exp2: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.condicion = condicion
        this.exp1 = exp1
        this.exp2 = exp2
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let condicion = this.condicion.interpretar(arbol, tabla)
        if(condicion instanceof Errores) return condicion

        let expresion1 = this.exp1.interpretar(arbol, tabla)
        if(expresion1 instanceof Errores) return expresion1

        let expresion2 = this.exp2.interpretar(arbol, tabla)
        if(expresion2 instanceof Errores) return expresion2

        if(this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO ) return new Errores("Semantico", "La condicion debe ser de tipo bool", this.linea, this.columna)


        if(condicion) {
            this.tipo_dato = this.exp1.tipo_dato
            return expresion1
        }else {
            this.tipo_dato = this.exp2.tipo_dato
            return expresion2
        }
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoIFT = `n${cont.get()}`
        let nodoCON = `n${cont.get()}`
        let nodoIT = `n${cont.get()}`
        let nodoE1 = `n${cont.get()}`
        let nodoDP = `n${cont.get()}`
        let nodoE2 = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`

        resultado += `${nodoIFT}[label="TERNARIO"]\n`
        resultado += `${nodoCON}[label="CONDICION"]\n`
        // resultado += `${nodoC}[label=""]\n`
        resultado += `${nodoIT}[label="?"]\n`
        resultado += `${nodoE1}[label="EXPRESION"]\n`
        resultado += `${nodoDP}[label=":"]\n`
        resultado += `${nodoE2}[label="EXPRESION"]\n`
        resultado += `${nodoPC}[label=";"]\n`

        resultado += `${anterior}->${nodoIFT}\n`
        resultado += `${nodoIFT}->${nodoCON}\n`
        resultado += `${nodoIFT}->${nodoIT}\n`
        resultado += `${nodoIFT}->${nodoE1}\n`
        resultado += `${nodoIFT}->${nodoDP}\n`
        resultado += `${nodoIFT}->${nodoE2}\n`
        resultado += `${nodoIFT}->${nodoPC}\n`

        resultado += this.condicion.nodo(nodoCON)
        resultado += this.exp1.nodo(nodoE1)
        resultado += this.exp2.nodo(nodoE2)

        return resultado
    }*/
}