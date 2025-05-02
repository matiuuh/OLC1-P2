//import { lista_errores } from "../../controllers/Controllers";
import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import Declaracion from "./Declaracion";
// import ProcedimientoFunciones from "./Procedimiento.funciones";
import Procedimiento from "./Procedimiento";

export default class Ejecutar extends Instruccion {

    private id: string
    private params: Instruccion[]

    constructor(id: string, linea:number, columna: number, params: Instruccion[]){
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.id = id
        this.params = params
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let busqueda = arbol.getFuncion(this.id)

        if(busqueda == null) return new Errores("Semantico", "La funcion con id: "+this.id+" no existe.", this.linea, this.columna)
        
        if(busqueda instanceof Procedimiento) {
            if(busqueda.parametros.length < this.params.length) new Errores("Semantico", "Se recibieron mas parametros de los que se esperaban", this.linea, this.columna)
            if(busqueda.parametros.length > this.params.length) new Errores("Semantico", "Se recibieron menos parametros de los que se esperaban", this.linea, this.columna)
            let tablaN = new TablaSimbolos(arbol.getTablaGlobal())
            tablaN.setNombre("execute")

            for (let i = 0; i < busqueda.parametros.length; i++) {
                let decla = new Declaracion(busqueda.parametros[i].tipo, this.linea, this.columna, busqueda.parametros[i].id, [this.params[i]])
                
                let resultado = decla.interpretar(arbol, tablaN)
                if(resultado instanceof Errores) return resultado
            }

            let resultadoM: any = busqueda.interpretar(arbol, tablaN)
            if(resultadoM instanceof Errores) return resultadoM
        }
    }

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoE = `n${cont.get()}`
        let nodoI = `n${cont.get()}`
        let nodoP1 = `n${cont.get()}`
        let nodoP2 = `n${cont.get()}`
        let nodoPP = `n${cont.get()}`
        let nodoCP = [];
        let nodoPC = `n${cont.get()}`

        for (let i = 0; i < this.params.length; i++) {
            nodoCP.push(`n${cont.get()}`)
        }

        resultado += `${nodoE}[label="Execute"]\n`
        resultado += `${nodoI}[label="${this.id}"]\n`
        resultado += `${nodoP1}[label="("]\n`
        resultado += `${nodoPP}[label="Params"]\n`
        resultado += `${nodoP2}[label=")"]\n`
        resultado += `${nodoPC}[label=";"]\n`

        for(let i = 0; i < this.params.length; i++){
            resultado += `${nodoCP[i]}[label="EXPRESION"]\n`
        }

        resultado += `${anterior} -> ${nodoE}\n`
        resultado += `${anterior} -> ${nodoI}\n`
        resultado += `${anterior} -> ${nodoP1}\n`
        resultado += `${anterior} -> ${nodoPP}\n`
        for(let i = 0; i < this.params.length; i++){
            resultado += `${nodoPP} -> ${nodoCP[i]}\n`
        }
        resultado += `${anterior} -> ${nodoP2}\n`
        resultado += `${anterior} -> ${nodoPC}\n`

        for (let i = 0; i < this.params.length; i++) {
            resultado += this.params[i].nodo(nodoCP[i])
        }

        return resultado
    }*/
}