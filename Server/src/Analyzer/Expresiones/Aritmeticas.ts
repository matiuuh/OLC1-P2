import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Aritmeticas extends Instruccion {
    private valor1 : Instruccion | undefined
    private valor2 : Instruccion | undefined
    private operacion: Operadores
    private opU: Instruccion | undefined
    
    constructor(operacion: Operadores, fila: number, columna: number, valor1: Instruccion, valor2: Instruccion) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.operacion = operacion
        if(!valor2) this.opU = valor1
        else {
            this.valor1 = valor1
            this.valor2 = valor2
        }
    }
    
    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let oprI, oprD, unico = null
        if(this.opU != null) {
            unico = this.opU.interpretar(arbol, tabla)
            if(unico instanceof Errores) return unico
        }else {
            oprI = this.valor1?.interpretar(arbol, tabla)
            if(oprI instanceof Errores) return oprI
            oprD = this.valor2?.interpretar(arbol, tabla)
            if(oprD instanceof Errores) return oprD
        }
        switch (this.operacion) {
            case Operadores.SUMA:
                return this.suma(oprI, oprD)
            
            case Operadores.RESTA:
                return this.resta(oprI, oprD)

            case Operadores.NEGACION:
                return this.negacion(unico)

            case Operadores.MUL:
                return this.multi(oprI, oprD)

            case Operadores.DIV:
                return this.div(oprI, oprD)
            
            case Operadores.POW:
                return this.pow(oprI, oprD)
        
            case Operadores.MOD:
                return this.mod(oprI, oprD)
            default:
                return new Errores('Semantico', 'Operador invalido', this.linea, this.columna)
        }

        
    }

    suma(valor1: any, valor2: any) {
        let tipo1 = this.valor1?.tipo_dato.getTipo()
        let tipo2 = this.valor2?.tipo_dato.getTipo()

        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO) //el tipo de dato que se va a devolver
                        return parseInt(valor1) + parseInt(valor2) //la operacion
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) + parseFloat(valor2)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(valor1) + valor2
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return valor1 + valor2
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(valor1) + parseInt(valor2.charCodeAt(0))
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" + "+tipo2, this.linea, this.columna )
                }

            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) + parseFloat(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) + parseFloat(valor2)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) + valor2
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return valor1 + valor2
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) + parseFloat(valor2.charCodeAt(0))
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" + "+tipo2, this.linea, this.columna )
                }
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return valor1 + parseInt(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return valor1 + parseFloat(valor2)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return valor1 + valor2
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" + "+tipo2, this.linea, this.columna )
                }
            case tipo_dato.CADENA:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return valor1 + valor2
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return valor1 + valor2
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return valor1 + valor2
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return valor1 + valor2
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return valor1 + valor2
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" + "+tipo2, this.linea, this.columna )
                }
            case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(valor1.charCodeAt[0]) + (valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1.charCodeAt[0]) + parseFloat(valor2)
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return valor1 + valor2
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.CADENA)
                        return valor1 + valor2
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" + "+tipo2, this.linea, this.columna )
                }
            default:
                return new Errores('Semantico', 'No se puede hacer '+tipo1+" + "+tipo2, this.linea, this.columna )
        }
    }
    
    resta(valor1: any, valor2: any) {
        let tipo1 = this.valor1?.tipo_dato.getTipo()
        let tipo2 = this.valor2?.tipo_dato.getTipo()

        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(valor1) - parseInt(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) - parseFloat(valor2)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(valor1) - valor2
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(valor1) - parseInt(valor2.charCodeAt(0))
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" - "+tipo2, this.linea, this.columna )
                }

            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) - parseFloat(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) - parseFloat(valor2)
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) - valor2
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) - parseFloat(valor2.charCodeAt(0))
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" - "+tipo2, this.linea, this.columna )
                }
            case tipo_dato.BOOLEANO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return valor1 - parseInt(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return valor1 - parseFloat(valor2)
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" - "+tipo2, this.linea, this.columna )
                }
            case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(valor1.charCodeAt(0)) - (valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1.charCodeAt(0)) - parseFloat(valor2)
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" + "+tipo2, this.linea, this.columna )
                }
            default:
                return new Errores('Semantico', 'No se puede hacer '+tipo1+" + "+tipo2, this.linea, this.columna )
        }
    }

    negacion(valor1: any) {
        let opeU = this.opU?.tipo_dato.getTipo()

        switch (opeU) {
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return parseInt(valor1) * -1
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                return parseFloat(valor1) * -1
            default:
                return new Errores('Semantico', 'No se puede hacer negar '+opeU, this.linea, this.columna )
        }
    }

    multi(valor1: any, valor2: any) {
        let tipo1 = this.valor1?.tipo_dato.getTipo()
        let tipo2 = this.valor2?.tipo_dato.getTipo()

        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(valor1) * parseInt(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) * parseFloat(valor2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(valor1) * parseInt(valor2.charCodeAt(0))
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" * "+tipo2, this.linea, this.columna )
                }
            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) * parseFloat(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) * parseFloat(valor2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) * parseFloat(valor2.charCodeAt(0))
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" * "+tipo2, this.linea, this.columna )
                }
            case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return parseInt(valor1.charCodeAt(0)) * (valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1.charCodeAt(0)) * parseFloat(valor2)
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" * "+tipo2, this.linea, this.columna )
                }
            default:
                return new Errores('Semantico', 'No se puede hacer '+tipo1+" * "+tipo2, this.linea, this.columna )
        }
    }

    div(valor1: any, valor2: any) {
        let tipo1 = this.valor1?.tipo_dato.getTipo()
        let tipo2 = this.valor2?.tipo_dato.getTipo()

        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) / parseFloat(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) / parseFloat(valor2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) / parseFloat(valor2.charCodeAt(0))
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" / "+tipo2, this.linea, this.columna )
                }

            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) / parseFloat(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) / parseFloat(valor2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) / parseFloat(valor2.charCodeAt(0))
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" / "+tipo2, this.linea, this.columna )
                }
            case tipo_dato.CARACTER:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1.charCodeAt[0]) / parseFloat(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1.charCodeAt[0]) / parseFloat(valor2)
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" / "+tipo2, this.linea, this.columna )
                }
            default:
                return new Errores('Semantico', 'No se puede hacer '+tipo1+" / "+tipo2, this.linea, this.columna )
        }
    }

    pow(valor1: any, valor2: any) {
        let tipo1 = this.valor1?.tipo_dato.getTipo()
        let tipo2 = this.valor2?.tipo_dato.getTipo()

        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                        return Math.pow(parseInt(valor1), parseInt(valor2))
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return Math.pow(parseFloat(valor1), parseFloat(valor2))
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+"^"+tipo2, this.linea, this.columna )
                }

            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return Math.pow(parseFloat(valor1), parseFloat(valor2))
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return Math.pow(parseFloat(valor1), parseFloat(valor2))
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+"^"+tipo2, this.linea, this.columna )
                }
            default:
                return new Errores('Semantico', 'No se puede hacer '+tipo1+"^"+tipo2, this.linea, this.columna )
        }
    }

    mod(valor1: any, valor2: any) {
        let tipo1 = this.valor1?.tipo_dato.getTipo()
        let tipo2 = this.valor2?.tipo_dato.getTipo()

        switch (tipo1) {
            case tipo_dato.ENTERO:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) % parseFloat(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) % parseFloat(valor2)
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" % "+tipo2, this.linea, this.columna )
                }

            case tipo_dato.DECIMAL:
                switch (tipo2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) % parseFloat(valor2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.DECIMAL)
                        return parseFloat(valor1) % parseFloat(valor2)
                    default:
                        return new Errores('Semantico', 'No se puede hacer '+tipo1+" % "+tipo2, this.linea, this.columna )
                }
            default:
                return new Errores('Semantico', 'No se puede hacer '+tipo1+" % "+tipo2, this.linea, this.columna )
        }
    }

    /*public nodo(anterior: string): string {
        let cont = Cont.getInstancia()
        let resultado = ""
        if(this.opU != undefined){
            let nodoN = `N${cont.getContador()}`
            let nodoExp = `N${cont.getContador()}`
            resultado += `${nodoN}[label=\"-\"]\n`
            resultado += `${nodoExp}[label=\"EXPRESION\"]\n`
            resultado += `${anterior}->${nodoN}\n`
            resultado += `${anterior}->${nodoExp}\n`
            resultado += this.opU?.nodo(nodoExp)
            return resultado
        }

        let nodoE1 = `n${cont.getContador()}`
        let nodoop = `n${cont.getContador()}`
        let nodoE2 = `n${cont.getContador()}`

        resultado += `${nodoE1}[label=\"EXPRESION\"]\n`
        resultado += `${nodoop}[label=\"${this.getOperacion(this.operacion)}\"]\n`
        resultado += `${nodoE2}[label=\"EXPRESION\"]\n`
        resultado += `${anterior}->${nodoE1}\n`
        resultado += `${anterior}->${nodoop}\n`
        resultado += `${anterior}->${nodoE2}\n`
        resultado += this.valor1?.nodo(nodoE1)
        resultado += this.valor2?.nodo(nodoE2)
        
        return resultado
    }*/

    getOperacion(num: any){
        switch (num) {
            case 0:
                return '+'

            case 1:
                return '-'
                
            case 2:
                return '-'
                
            case 3:
                return '*'
                
            case 4:
                return '/'
                
            case 6:
                return '%'
                
        }
    }
}

export enum Operadores {
    SUMA,
    RESTA,
    NEGACION,
    MUL,
    DIV,
    POW,
    MOD
}