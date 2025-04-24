import { Instruccion } from "../Abstracto/Instruccion";
import Errors from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Singleton from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class AsignacionVariable extends Instruccion {
    private id: string
    private expresion : Instruccion

    constructor(id: string, expresion: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.id = id
        this.expresion = expresion
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valorN = this.expresion.interpretar(arbol, tabla)
        if(valorN instanceof Errors) return valorN

        let valor = tabla.getVariable(this.id.toLocaleLowerCase())
        if(valor == null) return new Errors('Semantico', 'Variable '+this.id+' no existe', this.linea, this.columna)
        
        //Si los tipos no son iguales
        if(this.expresion.tipo_dato.getTipo() != valor.getTipo().getTipo()){
            return new Errors('Semantico', 'Asignacion de diferentes tipos', this.linea, this.columna)
        } else {
            //asignar el valor
            this.tipo_dato = valor.getTipo()
            valor.setValor(valorN)
            arbol.tablaSimbolos(this.id, valor.getValor(), this.linea.toString(), tabla.getNombre().toString(), this.columna.toString())
        }
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoP = `n${cont.get()}`
        let nodoV = `n${cont.get()}`
        let nodoN = `n${cont.get()}`
        let nodoI = `n${cont.get()}`
        let nodoA = `n${cont.get()}`

        resultado += `${nodoP}[label="ASIGNACION"]\n`
        resultado += `${nodoV}[label="ID"]\n`
        resultado += `${nodoN}[label="${this.id}"]\n`
        resultado += `${nodoI}[label="="]\n`
        resultado += `${nodoA}[label="EXPRESION"]\n`

        resultado += `${anterior}->${nodoP}\n`
        resultado += `${nodoP}->${nodoV}\n`
        resultado += `${nodoV}->${nodoN}\n`
        resultado += `${nodoP}->${nodoI}\n`
        resultado += `${nodoP}->${nodoA}\n`

        resultado += this.expresion.nodo(nodoA)
        return resultado
    }*/
}