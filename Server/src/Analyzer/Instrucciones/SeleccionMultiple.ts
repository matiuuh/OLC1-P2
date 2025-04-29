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
import Case from "./Seleccion_caso";
//import Default from "./SeleccionDefault";

export default class SeleccionMultiple extends Instruccion {
    private condicion: Instruccion
    private casos: Case[] | undefined
    private default_: Instruccion | undefined

    constructor(condicion: Instruccion, linea: number, columna: number, casos: Case[], defecto: Instruccion) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.condicion = condicion
        this.casos = casos
        this.default_ = defecto
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let condi = this.condicion.interpretar(arbol, tabla)

        if(condi instanceof Errores) return condi

        // let tablaN = new TablaSimbolos(tabla)
        // tablaN.setNombre("Sentencia Switch")

        if(this.casos != undefined) {
            for(let caso of this.casos) {
                caso.condicionCase = this.condicion
                let resultado = caso.interpretar(arbol, tabla)
                // if(caso instanceof Case) {
                    
                    // if(resultado instanceof Errores) return resultado
                    if( resultado instanceof Errores) {
                        lista_errores.push(resultado)
                        arbol.actualizarConsola((<Errores>resultado).obtenerError())
                    }

                    if(resultado instanceof Detener) return
                    if(resultado instanceof Retornar) return resultado
                    
                    if(resultado instanceof Continuar) return new Errores("Semantico", "Continuar no esta en un ciclo", this.linea, this.columna)
                            // console.log(resultado.getCondicion(), "|", condi)
                // if(caso.getCondicion().interpretar(arbol, tabla) == condi) {
                //     let i = resultado.interpretar(arbol, tabla)
                    // if(resultado instanceof Errores) return resultado
                //     }
                // }
            }
        }

        if(this.default_ != undefined) {
            let defecto = this.default_.interpretar(arbol, tabla)
            if(defecto instanceof Detener) return
            if(defecto instanceof Continuar) return new Errores("Semantico", "Continuar no esta en un ciclo", this.linea, this.columna)
            if( defecto instanceof Errores) return defecto
        }

        // for(let i of this.casos) {
            
        //     let resultado = i
        //     if(i instanceof Case) {
                
        //         // console.log(resultado.getCondicion(), "|", condi)
        //         if(i.getCondicion().interpretar(arbol, tablaN) == condi) {
        //             let caso = resultado.interpretar(arbol, tablaN)
        //             if(caso instanceof Detener) return caso;
        //             if(caso instanceof Continuar) return new Errores("Semantico", "Continuar no esta en un ciclo", this.linea, this.columna)
        //             if( caso instanceof Errores) return caso
        //         }
        //     }else if(i instanceof Default) {
        //         let default_ = resultado.interpretar(arbol, tablaN)
        //         if(default_ instanceof Detener) return default_;
        //         if(default_ instanceof Continuar) return new Errores("Semantico", "Continuar no esta en un ciclo", this.linea, this.columna)
        //         if( default_ instanceof Errores) return default_
        //     }
        // }

    }

    /*nodo(anterior: string): string {
        return ""
    }*/
}