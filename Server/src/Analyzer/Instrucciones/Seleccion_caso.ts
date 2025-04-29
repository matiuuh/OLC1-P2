import { lista_errores } from "../../controllers/Controllers";
import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import Continuar from "./Continuar";
import Detener from "./Detener";
import Retornar from "./Retornar";

export default class SeleccionCaso extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]
    public condicionCase?: Instruccion

    constructor(condicion: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.condicion = condicion
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let condi = this.condicion.interpretar(arbol, tabla)
        if( condi instanceof Errores) return condi
        let condiCase = this.condicionCase?.interpretar(arbol, tabla)
        if( condiCase instanceof Errores) return condiCase

        if(this.condicion.tipo_dato.getTipo() != this.condicionCase?.tipo_dato.getTipo()) return new Errores("Semantico", "Condicion es de tipo diferente", this.linea, this.columna)

        if(condi == condiCase) {
            let tablaN = new TablaSimbolos(tabla)
            tablaN.setNombre("Sentencia Case")
    
            for(let i of this.instrucciones) {
    
                if(i instanceof Detener) return i 
                if(i instanceof Continuar) return i 
                if(i instanceof Retornar) return i 
    
                let resultado = i.interpretar(arbol, tablaN)
                // if( resultado instanceof Errores) return resultado
                if( resultado instanceof Errores) {
                    lista_errores.push(resultado)
                    arbol.actualizarConsola((<Errores>resultado).obtenerError())
                }
    
                if(resultado instanceof Detener) return resultado
                if(resultado instanceof Continuar) return resultado
                if(resultado instanceof Retornar) return resultado
                // AGREGAR ERRORES
            }
        }

        // if(this.condicion.tipo_dato.getTipo() != tipo_dato.BOOL) return new Errores("Semantico", "La condicion debe ser de tipo bool", this.linea, this.columna)
        

        // let tablaN = new TablaSimbolos(tabla)
        // tablaN.setNombre("Sentencia Case")

        // for(let i of this.instrucciones) {

        //     if(i instanceof Detener) return
        //     if(i instanceof Continuar) Detener

        //     let resultado = i.interpretar(arbol, tablaN)
        //     if( resultado instanceof Errores) return resultado

        //     if(resultado instanceof Detener) return
        //     if(resultado instanceof Continuar) Detener
        //     // AGREGAR ERRORES
        // }
    }

    public getCondicion() {
        
        if( this.condicion instanceof Errores) return this.condicion
        return this.condicion
    }

    nodo(anterior: string): string {
        return ""
    }
}