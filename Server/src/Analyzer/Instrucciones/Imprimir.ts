import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Imprimir extends Instruccion {
    private expresion : Instruccion
    private salto: string

    constructor(expresion: Instruccion, linea: number, columna: number, salto:string) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.expresion = expresion
        this.salto = salto
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let valor = this.expresion.interpretar(arbol, tabla)
        if (valor instanceof Errores) return valor

        let salida = valor;

        if (typeof valor === "number" && this.expresion.tipo_dato.getTipo() === tipo_dato.DECIMAL) {
            // Si ya es número, forzamos el decimal visible
            salida = valor % 1 === 0 ? valor.toFixed(1) : valor;
        }

        //console.log("[DEBUG Imprimir] =>", valor + this.salto);
        arbol.Imprimir(salida+this.salto)
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()
        let nodoCout = `n${cont.get()}`
        let nodoC = `n${cont.get()}`
        let nodoM1 = `n${cont.get()}`
        let nodoE = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`
        let resultado = `${nodoCout}[label="PRINT"]\n`
        resultado += `${nodoC}[label="cout"]\n`
        resultado += `${nodoM1}[label="<<"]\n`
        resultado += `${nodoE}[label="EXPRESION"]\n`
        if(this.salto != "") {
            let nodoM2 = `n${cont.get()}`
            let nodoS = `n${cont.get()}`
            resultado += `${nodoM2}[label="<<"]\n`
            resultado += `${nodoS}[label="\n"]\n`
            resultado += `${anterior}->${nodoM2}\n`
            resultado += `${anterior}->${nodoS}\n`
        }
        resultado += `${nodoPC}[label=";"]\n`

        resultado += `${anterior}->${nodoCout}\n`
        resultado += `${nodoCout}->${nodoC}\n`
        resultado += `${nodoCout}->${nodoM1}\n`
        resultado += `${nodoCout}->${nodoE}\n`
        resultado += `${nodoCout}->${nodoPC}\n`

        resultado += this.expresion.nodo(nodoE)
        
        return resultado
    }*/
}