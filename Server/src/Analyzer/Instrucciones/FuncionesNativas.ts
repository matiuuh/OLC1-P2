import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class FuncionesN extends Instruccion {
    private valor1 : Instruccion | undefined
    private operacion: Operadores

    constructor(operacion: Operadores, fila: number, columna: number, valor1: Instruccion) {
        super(new Tipo(tipo_dato.VOID), fila, columna)
        this.operacion = operacion
        this.valor1 = valor1
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let unico = null
        if(this.valor1 != null) {
            unico = this.valor1.interpretar(arbol, tabla)
            if(unico instanceof Errores) return unico
        }

        switch (this.operacion) {
            case Operadores.LOWER:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                if(this.valor1?.tipo_dato.getTipo() != tipo_dato.CADENA) return new Errores('Semantico', 'No se puede hacer la funcion con este tipo de dato', this.linea, this.columna)
                return unico.toLocaleLowerCase()
            case Operadores.UPPER:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                if(this.valor1?.tipo_dato.getTipo() != tipo_dato.CADENA) return new Errores('Semantico', 'No se puede hacer la funcion con este tipo de dato', this.linea, this.columna)
                return unico.toLocaleUpperCase()
            case Operadores.ROUND:
                return this.round(unico)
            case Operadores.LENGTH:
                if(Array.isArray(unico)) {
                    return this.longitud2(unico)
                }
                return this.longitud(unico)
            case Operadores.TIPODATO:
                return this.tipo()
            case Operadores.TRUNCAR: // 👈 Agregado
                return this.truncar(unico);
            default:
                break;
        }
    }

    round(valor:any){
        let tipo = this.valor1?.tipo_dato.getTipo()
        switch (tipo) {
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return Math.round(valor)
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return Math.round(parseFloat(valor))
            default:
                return new Errores('Semantico', 'No se puede hacer redondear ese tipo de dato', this.linea, this.columna )
        }
    }

    longitud(valor:any) {
        let tipo = this.valor1?.tipo_dato.getTipo()
        switch (tipo) {
            case tipo_dato.CADENA:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return valor.length
            default:
                return new Errores('Semantico', 'No se puede realizar el length ese tipo de dato', this.linea, this.columna )
        }
    }

    longitud2(valor:any) {
        let tipo = this.valor1?.tipo_dato.getTipo()
        switch (tipo) {
            case tipo_dato.CADENA:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return valor.length
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return valor.length

            case tipo_dato.CARACTER:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return valor.length

            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return valor.length
            case tipo_dato.BOOLEANO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO)
                return valor.length
            default:
                return new Errores('Semantico', 'No se puede realizar el length ese tipo de dato', this.linea, this.columna )
        }
    }

    tipo() {
        let tipo = this.valor1?.tipo_dato.getTipo()
        switch (tipo) {
            case tipo_dato.CADENA:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return "cadena"
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return "entero"
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return "decimal"
            case tipo_dato.BOOLEANO:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return "booleano"
            case tipo_dato.CARACTER:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return "caracter"
            default:
                return new Errores('Semantico', 'No se puede retornar ese tipo de dato', this.linea, this.columna )
        }
    }

    string(valor: any) {
        let tipo = this.valor1?.tipo_dato.getTipo()
        switch (tipo) {
            case tipo_dato.CADENA:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return valor.toString()
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return valor.toString()
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return valor.toString()
            case tipo_dato.BOOLEANO:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return valor.toString()
            case tipo_dato.CARACTER:
                this.tipo_dato = new Tipo(tipo_dato.CADENA)
                return valor.toString()
            default:
                return new Errores('Semantico', 'No se puede retornar ese tipo de dato', this.linea, this.columna )
        }
    }

    truncar(valor: any) {
        let tipo = this.valor1?.tipo_dato.getTipo();
        switch (tipo) {
            case tipo_dato.DECIMAL:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO);
                return Math.trunc(valor);  // Truncar un decimal
            case tipo_dato.ENTERO:
                this.tipo_dato = new Tipo(tipo_dato.ENTERO);
                return valor;  // Si ya es entero, lo regresamos igual
            default:
                return new Errores('Semántico', 'No se puede truncar este tipo de dato', this.linea, this.columna);
        }
    }
    

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()
        let resultado = ""

        if(this.operacion == Operadores.LOWER){

            let nodoN = `n${cont.get()}`
            let nodoOU = `n${cont.get()}`
            let nodoP1 = `n${cont.get()}`
            let nodoE = `n${cont.get()}`
            let nodoP2 = `n${cont.get()}`
            let nodoPC = `n${cont.get()}`
    
            resultado += `${nodoN}[label="NATIVO"]\n`
            resultado += `${nodoOU}[label="toLower"]\n`
            resultado += `${nodoP1}[label="("]\n`
            resultado += `${nodoE}[label="EXPRESION"]\n`
            resultado += `${nodoP2}[label=")"]\n`
            resultado += `${nodoPC}[label=";"]\n`
    
            resultado += `${anterior} -> ${nodoN}\n`
            resultado += `${nodoN} -> ${nodoOU}\n`
            resultado += `${nodoN} -> ${nodoP1}\n`
            resultado += `${nodoN} -> ${nodoE}\n`
            resultado += `${nodoN} -> ${nodoP2}\n`
            resultado += `${nodoN} -> ${nodoPC}\n`
    
            resultado += this.valor1?.nodo(nodoE);
        }
            
        if(this.operacion == Operadores.UPPER) {

            let nodoN = `n${cont.get()}`
            let nodoOU = `n${cont.get()}`
            let nodoP1 = `n${cont.get()}`
            let nodoE = `n${cont.get()}`
            let nodoP2 = `n${cont.get()}`
            let nodoPC = `n${cont.get()}`
    
            resultado += `${nodoN}[label="NATIVO"]\n`
            resultado += `${nodoOU}[label="toUpper"]\n`
            resultado += `${nodoP1}[label="("]\n`
            resultado += `${nodoE}[label="EXPRESION"]\n`
            resultado += `${nodoP2}[label=")"]\n`
            resultado += `${nodoPC}[label=";"]\n`
    
            resultado += `${anterior} -> ${nodoN}\n`
            resultado += `${nodoN} -> ${nodoOU}\n`
            resultado += `${nodoN} -> ${nodoP1}\n`
            resultado += `${nodoN} -> ${nodoE}\n`
            resultado += `${nodoN} -> ${nodoP2}\n`
            resultado += `${nodoN} -> ${nodoPC}\n`
    
            resultado += this.valor1?.nodo(nodoE);
        }

        if(this.operacion == Operadores.TYPEOF) {

            let nodoN = `n${cont.get()}`
            let nodoOU = `n${cont.get()}`
            let nodoP1 = `n${cont.get()}`
            let nodoE = `n${cont.get()}`
            let nodoP2 = `n${cont.get()}`
            let nodoPC = `n${cont.get()}`
    
            resultado += `${nodoN}[label="NATIVO"]\n`
            resultado += `${nodoOU}[label="typeOf"]\n`
            resultado += `${nodoP1}[label="("]\n`
            resultado += `${nodoE}[label="EXPRESION"]\n`
            resultado += `${nodoP2}[label=")"]\n`
            resultado += `${nodoPC}[label=";"]\n`
    
            resultado += `${anterior} -> ${nodoN}\n`
            resultado += `${nodoN} -> ${nodoOU}\n`
            resultado += `${nodoN} -> ${nodoP1}\n`
            resultado += `${nodoN} -> ${nodoE}\n`
            resultado += `${nodoN} -> ${nodoP2}\n`
            resultado += `${nodoN} -> ${nodoPC}\n`
    
            resultado += this.valor1?.nodo(nodoE);
        }

        if(this.operacion == Operadores.TOSTRING) {

            let nodoN = `n${cont.get()}`
            let nodoSTD = `n${cont.get()}`
            let nodoOU = `n${cont.get()}`
            let nodoP1 = `n${cont.get()}`
            let nodoE = `n${cont.get()}`
            let nodoP2 = `n${cont.get()}`
            let nodoPC = `n${cont.get()}`
    
            resultado += `${nodoN}[label="NATIVO"]\n`
            resultado += `${nodoSTD}[label="std::string"]\n`
            resultado += `${nodoOU}[label="toString"]\n`
            resultado += `${nodoP1}[label="("]\n`
            resultado += `${nodoE}[label="EXPRESION"]\n`
            resultado += `${nodoP2}[label=")"]\n`
            resultado += `${nodoPC}[label=";"]\n`
    
            resultado += `${anterior} -> ${nodoN}\n`
            resultado += `${nodoN} -> ${nodoSTD}\n`
            resultado += `${nodoN} -> ${nodoOU}\n`
            resultado += `${nodoN} -> ${nodoP1}\n`
            resultado += `${nodoN} -> ${nodoE}\n`
            resultado += `${nodoN} -> ${nodoP2}\n`
            resultado += `${nodoN} -> ${nodoPC}\n`
    
            resultado += this.valor1?.nodo(nodoE);
        }
        
        if(this.operacion == Operadores.ROUND) {

            let nodoN = `n${cont.get()}`
            let nodoOU = `n${cont.get()}`
            let nodoP1 = `n${cont.get()}`
            let nodoE = `n${cont.get()}`
            let nodoP2 = `n${cont.get()}`
            let nodoPC = `n${cont.get()}`
    
            resultado += `${nodoN}[label="NATIVO"]\n`
            resultado += `${nodoOU}[label="round"]\n`
            resultado += `${nodoP1}[label="("]\n`
            resultado += `${nodoE}[label="EXPRESION"]\n`
            resultado += `${nodoP2}[label=")"]\n`
            resultado += `${nodoPC}[label=";"]\n`
    
            resultado += `${anterior} -> ${nodoN}\n`
            resultado += `${nodoN} -> ${nodoOU}\n`
            resultado += `${nodoN} -> ${nodoP1}\n`
            resultado += `${nodoN} -> ${nodoE}\n`
            resultado += `${nodoN} -> ${nodoP2}\n`
            resultado += `${nodoN} -> ${nodoPC}\n`
    
            resultado += this.valor1?.nodo(nodoE);
        }

        if(this.operacion == Operadores.LENGTH) {

            let nodoN = `n${cont.get()}`
            let nodoOU = `n${cont.get()}`
            let nodoP1 = `n${cont.get()}`
            let nodoE = `n${cont.get()}`
            let nodoP2 = `n${cont.get()}`
            let nodoPC = `n${cont.get()}`
    
            resultado += `${nodoN}[label="NATIVO"]\n`
            resultado += `${nodoOU}[label=".length"]\n`
            resultado += `${nodoP1}[label="("]\n`
            resultado += `${nodoE}[label="EXPRESION"]\n`
            resultado += `${nodoP2}[label=")"]\n`
            resultado += `${nodoPC}[label=";"]\n`
    
            resultado += `${anterior} -> ${nodoN}\n`
            resultado += `${nodoN} -> ${nodoOU}\n`
            resultado += `${nodoN} -> ${nodoP1}\n`
            resultado += `${nodoN} -> ${nodoE}\n`
            resultado += `${nodoN} -> ${nodoP2}\n`
            resultado += `${nodoN} -> ${nodoPC}\n`
    
            resultado += this.valor1?.nodo(nodoE);
        }

        if(this.operacion == Operadores.CSTR) {

            let nodoN = `n${cont.get()}`
            let nodoOU = `n${cont.get()}`
            let nodoP1 = `n${cont.get()}`
            let nodoE = `n${cont.get()}`
            let nodoP2 = `n${cont.get()}`
            let nodoPC = `n${cont.get()}`
    
            resultado += `${nodoN}[label="NATIVO"]\n`
            resultado += `${nodoOU}[label=".c_str"]\n`
            resultado += `${nodoP1}[label="("]\n`
            resultado += `${nodoE}[label="EXPRESION"]\n`
            resultado += `${nodoP2}[label=")"]\n`
            resultado += `${nodoPC}[label=";"]\n`
    
            resultado += `${anterior} -> ${nodoN}\n`
            resultado += `${nodoN} -> ${nodoOU}\n`
            resultado += `${nodoN} -> ${nodoP1}\n`
            resultado += `${nodoN} -> ${nodoE}\n`
            resultado += `${nodoN} -> ${nodoP2}\n`
            resultado += `${nodoN} -> ${nodoPC}\n`
    
            resultado += this.valor1?.nodo(nodoE);
        }

        return resultado

    }*/
}

export enum Operadores {
    LOWER,
    UPPER,
    ROUND,
    LENGTH,
    TIPODATO,
    TRUNCAR
}