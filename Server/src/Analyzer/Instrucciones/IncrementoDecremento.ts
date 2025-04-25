import { Instruccion } from "../Abstracto/Instruccion"
import Errores from "../Errors/Errors"
import Arbol from "../Simbolo/Arbol"
import TablaSimbolos from "../Simbolo/TablaSimbolo"
import Tipo, { tipo_dato } from "../Simbolo/Tipo"
//import Singleton from "../Simbolo/Singleton"


export default class IncrementoDecremento extends Instruccion{
    private id: string
    private accion: string

    constructor(id: string, linea: number, columna: number, accion: string) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.id = id
        this.accion = accion
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        const variable = tabla.getVariable(this.id);
        if (!variable) return new Errores('Semántico', `Variable '${this.id}' no existe`, this.linea, this.columna);
    
        const tipo = variable.getTipo().getTipo();
        if (tipo !== tipo_dato.ENTERO && tipo !== tipo_dato.DECIMAL) {
            return new Errores('Semántico', 'Solo se puede incrementar o decrementar enteros o decimales', this.linea, this.columna);
        }
    
        let valorActual = variable.getValor();

        if (tipo === tipo_dato.ENTERO) {
            valorActual = parseInt(valorActual);
            valorActual = this.accion === "mas" ? valorActual + 1 : valorActual - 1;
        } else {
            valorActual = parseFloat(valorActual);
            valorActual = this.accion === "mas" ? valorActual + 1.0 : valorActual - 1.0;
        }
    
        console.log("[DEBUG IncrementoDecremento] =>", valorActual);
        variable.setValor(valorActual);
        return null;
    }
    

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()
        let resultado = ""

        let nodoI = `n${cont.get()}`
        let nodoN = `n${cont.get()}`
        let nodoMA = `n${cont.get()}`
        let nodoME = `n${cont.get()}`
        let nodoPC= `n${cont.get()}`

        resultado += ` ${nodoI}[label="ID"]\n`
        resultado += ` ${nodoN}[label="${this.id}"]\n`
        
        if(this.accion == "mas"){
            resultado += `${nodoMA}[label="++"]\n`
            resultado += `${anterior} -> ${nodoMA}\n`
        }else{
            resultado += ` ${nodoME}[label="--"]\n`
            resultado += `${anterior} -> ${nodoME}\n`
        }
        
        resultado += ` ${nodoPC}[label=";"]\n`
        
        resultado += ` ${anterior} -> ${nodoI}\n`
        resultado += ` ${nodoI} -> ${nodoN}\n`
        resultado += ` ${anterior} -> ${nodoPC}\n`

        return resultado
    }*/
}