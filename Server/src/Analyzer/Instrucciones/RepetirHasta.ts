import { lista_errores } from "../../controllers/Controllers";
import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import Continuar from "./Continuar";
import Detener from "./Detener";
import Retornar from "./Retornar";

export default class RepetirHasta extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]

    constructor(condicion: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.condicion = condicion
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let condicion = this.condicion.interpretar(arbol, tabla)
        if( condicion instanceof Errores) return condicion

        if(this.condicion.tipo_dato.getTipo() != tipo_dato.BOOLEANO) return new Errores("Semantico", "La condicion debe ser de tipo bool", this.linea, this.columna)
        

        do {
            let tablaN = new TablaSimbolos(tabla)
            tablaN.setNombre("Sentencia Hasta que")
            for(let i of this.instrucciones) {

                if(i instanceof Detener) return
                if(i instanceof Continuar) break
                if(i instanceof Retornar) return i

                let resultado = i.interpretar(arbol, tablaN)
                // if( resultado instanceof Errores) return resultado
                if( resultado instanceof Errores) {
                    lista_errores.push(resultado)
                    arbol.actualizarConsola((<Errores>resultado).obtenerError())
                }

                if(resultado instanceof Detener) return
                if(resultado instanceof Continuar) break
                if(resultado instanceof Retornar) return resultado
                // AGREGAR ERRORES
            }
        } while (!this.condicion.interpretar(arbol, tabla));
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""
        let instruc = []

        let nodoP = `n${cont.get()}`
        let nodoD = `n${cont.get()}`
        let nodoL1 = `n${cont.get()}`
        let nodoPI = `n${cont.get()}`

        let nodoL2 = `n${cont.get()}`
        let nodoW = `n${cont.get()}`
        let nodoP1 = `n${cont.get()}`
        let nodoC = `n${cont.get()}`
        let nodoP2 = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`

        for(let i= 0; i < this.instrucciones.length; i++){
            instruc.push(`n${cont.get()}`)
        }

        resultado += ` ${nodoP}[label="LOOP"];\n`
        resultado += ` ${nodoD}[label="do"];\n`
        resultado += ` ${nodoL1}[label="{"];\n`
        resultado += ` ${nodoPI}[label="INSTRUCCIONES"];\n`

        for(let i= 0; i < this.instrucciones.length; i++){
            resultado += ` ${instruc[i]}[label="Instruccion"];\n`
        }

        resultado += ` ${nodoL2}[label="}"];\n`
        resultado += ` ${nodoW}[label="while"];\n`
        resultado += ` ${nodoP1}[label="("];\n`
        resultado += ` ${nodoC}[label="EXPRESION"];\n`
        resultado += ` ${nodoP2}[label=")"];\n`
        resultado += ` ${nodoPC}[label=";"];\n`

        resultado += ` ${anterior} -> ${nodoP};\n`
        resultado += ` ${nodoP} -> ${nodoD};\n`
        resultado += ` ${nodoP} -> ${nodoL1};\n`
        resultado += ` ${nodoP} -> ${nodoPI};\n`

        for(let i= 0; i < this.instrucciones.length; i++){
            resultado += ` ${nodoPI} -> ${instruc[i]};\n`
        }

        resultado += ` ${nodoP} -> ${nodoL2};\n`
        resultado += ` ${nodoP} -> ${nodoW};\n`
        resultado += ` ${nodoP} -> ${nodoP1};\n`
        resultado += ` ${nodoP} -> ${nodoC};\n`
        resultado += ` ${nodoP} -> ${nodoP2};\n`
        resultado += ` ${nodoP} -> ${nodoPC};\n`

        for(let i= 0; i < this.instrucciones.length; i++){
            resultado += this.instrucciones[i].nodo(instruc[i])
        }

        resultado += this.condicion.nodo(nodoC)

        return resultado

    }*/
}