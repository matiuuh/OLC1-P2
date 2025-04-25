import { Instruccion } from "../Abstracto/Instruccion"
import Errores from "../Errors/Errors"
import Arbol from "../Simbolo/Arbol"
import TablaSimbolos from "../Simbolo/TablaSimbolo"
import Tipo, { tipo_dato } from "../Simbolo/Tipo"
//import Simbolo from "../Simbolo/Simbolo"
//import Singleton from "../Simbolo/Singleton"

export default class Casteo extends Instruccion {
    private exp: Instruccion
    private tipo: Tipo

    constructor(exp: Instruccion, tipo: Tipo, linea: number, columna:number) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.exp = exp
        this.tipo = tipo
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let expresion = this.exp.interpretar(arbol, tabla)
        switch (this.tipo.getTipo()) {
            case tipo_dato.ENTERO:
                return this.casteoInt(expresion)

            case tipo_dato.DECIMAL:
                return this.casteoDouble(expresion)

            case tipo_dato.CADENA:
                return this.casteoString(expresion)

            case tipo_dato.CARACTER:
                return this.casteoChar(expresion)
        
            default:
                return new Errores("Semantico", "No es posible ese casteo", this.linea, this.columna)
        }
    }

    casteoInt(exp:any) {
        let tipo = this.exp.tipo_dato.getTipo()
        switch (tipo) {
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(exp)

            case tipo_dato.CARACTER:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(exp.charCodeAt(0))
        
            default:
                return new Errores("Semantico", "No es posible castear el valor", this.linea, this.columna)
        }
    }

    casteoString(exp:any) {
        let tipo = this.exp.tipo_dato.getTipo()
        switch (tipo) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return parseInt(exp).toString()

            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return parseFloat(exp).toString()

            case tipo_dato.CARACTER:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return exp.charCodeAt(0).toString()
        
            default:
                return new Errores("Semantico", "No es posible castear el valor", this.linea, this.columna)
        }
    }

    casteoDouble(exp:any) {
        let tipo = this.exp.tipo_dato.getTipo()
        switch (tipo) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                return parseFloat(exp)

            case tipo_dato.CARACTER:
                this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                return parseFloat(exp.charCodeAt(0))
        
            default:
                return new Errores("Semantico", "No es posible castear el valor", this.linea, this.columna)
        }
    }

    casteoChar(exp:any) {
        let tipo = this.exp.tipo_dato.getTipo()
        switch (tipo) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.CARACTER)
                return String.fromCharCode(parseInt(exp))
        
            default:
                return new Errores("Semantico", "No es posible castear el valor", this.linea, this.columna)
        }
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoP = `n${cont.get()}`
        let nodoP1 = `n${cont.get()}`
        let nodoT = `n${cont.get()}`
        let nodoP2 = `n${cont.get()}`
        let nodoV = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`

        resultado += `${nodoP}[label="CASTEO"]\n`
        resultado += `${nodoP1}[label="("]\n`

        switch (this.tipo.getTipo()) {
            case tipo_dato.INT:
                resultado += `${nodoT}[label="int"]\n`

            case tipo_dato.DOUBLE:
                resultado += `${nodoT}[label="double"]\n`

            case tipo_dato.CADENA:
                resultado += `${nodoT}[label="std::string"]\n`

            case tipo_dato.CHAR:
                resultado += `${nodoT}[label="char"]\n`
        
        }

        resultado += `${nodoP2}[label=")"]\n`
        resultado += `${nodoV}[label="EXPRESION"]\n`
        resultado += `${nodoPC}[label=";"]\n`


        resultado += `${anterior} -> ${nodoP};\n`
        resultado += `${nodoP} -> ${nodoP1};\n`
        resultado += `${nodoP} -> ${nodoT};\n`
        resultado += `${nodoP} -> ${nodoP2};\n`
        resultado += `${nodoP} -> ${nodoV};\n`
        resultado += `${nodoP} -> ${nodoPC};\n`

        return resultado
    }*/
}