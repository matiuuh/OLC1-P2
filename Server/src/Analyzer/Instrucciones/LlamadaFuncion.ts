//import { lista_errores } from "../../controllers/Controllers";
import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
//import AccesoVar from "../Expresiones/AccesoVariable";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import Declaracion from "./Declaracion";
import Funcion from "./Funcion";


export default class LlamadaFuncion extends Instruccion {
    private id: string;
    private params: Instruccion[];

    constructor(id: string, linea: number, columna: number, params: Instruccion[]) {
        super(new Tipo(tipo_dato.VOID), linea, columna);
        this.id = id;
        this.params = params;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        const funcion = arbol.getFuncion(this.id);
        
        if (!(funcion instanceof Funcion)) {
            return new Errores("Semántico", `La función '${this.id}' no existe.`, this.linea, this.columna);
        }
    
        if (funcion.parametros.length !== this.params.length) {
            return new Errores("Semántico", `Cantidad de parámetros inválida para función '${this.id}'.`, this.linea, this.columna);
        }
    
        const nuevoEntorno = new TablaSimbolos(tabla);
        nuevoEntorno.setNombre("LlamadaFuncion:" + this.id);
        console.log(`[LlamadaFuncion] -> Nuevo entorno creado para función '${this.id}'`);
    
        // Declarar los parámetros con su tipo y valor desde el inicio
        for (let i = 0; i < this.params.length; i++) {
            const tipoEsperado = funcion.parametros[i].tipo;
            const idParam = funcion.parametros[i].id;
    
            const declaracion = new Declaracion(tipoEsperado, this.linea, this.columna, idParam, [this.params[i]]);
            const resultadoDeclaracion = declaracion.interpretar(arbol, nuevoEntorno);
            if (resultadoDeclaracion instanceof Errores) return resultadoDeclaracion;
    
            console.log(`[LlamadaFuncion] -> Param ${i + 1}: Declarado '${idParam}' con valor evaluado`);
        }
    
        // Mostrar entorno antes de ejecutar
        console.log(`[LlamadaFuncion] -> Entorno de función antes de ejecutar:`);
        for (let [key, sym] of nuevoEntorno.getTabla()) {
            console.log(`   - ${key}: ${JSON.stringify(sym)}`);
        }
    
        const resultadoFuncion = funcion.interpretar(arbol, nuevoEntorno);
        if (resultadoFuncion instanceof Errores) return resultadoFuncion;
    
        this.tipo_dato = funcion.tipo_dato;
        console.log(`[LlamadaFuncion] -> Resultado retornado:`, resultadoFuncion);
        return resultadoFuncion;
    }
    
    
    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoLL = `n${cont.get()}`
        let nodoID = `n${cont.get()}`
        let nodoP1 = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`
        let nodoP2 = `n${cont.get()}`

        let params = []

        for (let i = 0; i < this.params.length; i++) {
            params.push(`n${cont.get()}`)
        }

        resultado += `${nodoLL}[label="LLAMADA"]\n`
        resultado += `${nodoID}[label="${this.id}"]\n`
        resultado += `${nodoP1}[label="("]\n`

        for(let i = 0; i < this.params.length; i++){
            resultado += `${params[i]}[label="PARAMS"]\n`
        }

        resultado += `${nodoP2}[label=")"]\n`
        resultado += `${nodoPC}[label=";"]\n`


        resultado += `${anterior} -> ${nodoLL}\n`
        resultado += `${nodoLL} -> ${nodoID}\n`
        resultado += `${nodoLL} -> ${nodoP1}\n`

        for(let i = 0; i < this.params.length; i++){
            resultado += `${nodoLL} -> ${params[i]}\n`
        }

        resultado += `${nodoLL} -> ${nodoP2}\n`
        resultado += `${nodoLL} -> ${nodoPC}\n`
        
        for(let i = 0; i < this.params.length; i++){
            resultado += this.params[i].nodo(params[i])
        }

        return resultado
    }*/
}