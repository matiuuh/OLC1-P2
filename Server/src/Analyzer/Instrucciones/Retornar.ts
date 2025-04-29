import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Retornar extends Instruccion {
    private exp?: Instruccion
    public valor = null

    constructor(linea: number, columna: number, exp?: Instruccion) {
        super(new Tipo(tipo_dato.ENTERO), linea, columna)
        this.exp = exp
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        if(this.exp) {
            let val = this.exp.interpretar(arbol, tabla)
            this.valor = val
            if(val instanceof Errores) return val
            this.tipo_dato.setTipo(this.exp.tipo_dato.getTipo())
        }
        return this
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoR = `n${cont.get()}`
        let nodoE = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`

        resultado += `${nodoR}[label="RETURN"]\n`
        if(this.exp != undefined){
            resultado += `${nodoE}[label="EXPRESION"]\n`
            resultado += `${anterior} -> ${nodoE}\n`
            resultado += this.exp?.nodo(nodoE);
        }

        resultado += `${nodoPC}[label=";"]\n`

        resultado += `${anterior} -> ${nodoR}\n`

        resultado += `${anterior} -> ${nodoPC}\n`
        

        return resultado
    }*/
}