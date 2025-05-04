import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import singleton from "../Simbolo/Singleton";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Logicas extends Instruccion {
    private condicion1: Instruccion | undefined
    private condicion2: Instruccion | undefined
    private condicionU: Instruccion | undefined
    private logico: Logico

    constructor(logico: Logico, linea: number, columna: number, condicion1: Instruccion, condicion2?: Instruccion){
        super(new Tipo(tipo_dato.BOOLEANO), linea, columna)
        this.logico = logico
        if(!condicion2) this.condicionU = condicion1
        else {
            this.condicion1 = condicion1
            this.condicion2 = condicion2
        }
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let condIzq, condDer, unico = null
        if(this.condicionU != null) {
            unico = this.condicionU.interpretar(arbol, tabla)
            if(unico instanceof Errores) return unico

            if(this.condicionU.tipo_dato.getTipo() != tipo_dato.BOOLEANO ) return new Errores("Semantico", "La condicion debe ser de tipo BOOLEANO1", this.linea, this.columna)
        }else {
            condIzq = this.condicion1?.interpretar(arbol, tabla)
            if(condIzq instanceof Errores) return condIzq

            condDer = this.condicion2?.interpretar(arbol, tabla)
            if(condDer instanceof Errores) return condDer
        }

        switch (this.logico) {
            case Logico.OR:
                
                return this.or(condIzq, condDer)
            case Logico.AND:
                
                return this.and(condIzq, condDer)
            case Logico.NOT:
                
                return this.not(unico)
            default:
                return new Errores("Semantico", "Operador logico invalido", this.linea, this.columna)
        }
    }

    or(cond1: any, cond2: any) {
        let tipo1 = this.condicion1?.tipo_dato.getTipo()
        let tipo2 = this.condicion2?.tipo_dato.getTipo()

        switch (tipo1) {
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 || cond2
                    default:
                        return new Errores('Semantico', 'OR invalido', this.linea, this.columna )
                }
            
            default:
                return new Errores("Semantico", "Operador logico invalido", this.linea, this.columna)
        }
    }

    and(cond1: any, cond2: any) {
        let tipo1 = this.condicion1?.tipo_dato.getTipo()
        let tipo2 = this.condicion2?.tipo_dato.getTipo()

        switch (tipo1) {
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 && cond2
                    default:
                        return new Errores('Semantico', 'AND invalido', this.linea, this.columna )
                }
            
            default:
                return new Errores("Semantico", "Operador logico invalido", this.linea, this.columna)
        }
    }

    not(cond1: any){
        let tipo1 = this.condicionU?.tipo_dato.getTipo()

        switch (tipo1) {
            case tipo_dato.BOOLEANO:
                this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                return !cond1
            default:
                return new Errores("Semantico", "Operador logico invalido", this.linea, this.columna)
        }
    }

    nodo(anterior: string): string {
        let Singleton = singleton.getInstancia()
        let resultado = ""

        let nodoE1 = `n${Singleton.getContador()}`
        let nodoE2 = `n${Singleton.getContador()}`
        let nodoOp = `n${Singleton.getContador()}`
        
        resultado += `${nodoE1}[label="EXPRESION"]\n`
        resultado += `${nodoE2}[label="EXPRESION"]\n`
        resultado += `${nodoOp}[label="${this.getLogic(this.logico)}"]\n`

        resultado += `${anterior}->${nodoE1}\n`
        resultado += `${anterior}->${nodoOp}\n`
        resultado += `${anterior}->${nodoE2}\n`

        resultado += this.condicion1?.nodo(nodoE1)
        resultado += this.condicion2?.nodo(nodoE2)

        return resultado
    }

    getLogic(op:any){
        switch (op) {
            case 0:
                return '||'
            case 1:
                return '&&'
            case 2:
                return '!'
        }
    }
}

export enum Logico {
    OR,
    AND,
    NOT
}