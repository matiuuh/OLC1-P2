import { lista_errores } from "../../controllers/Controllers";
import { Instruccion } from "../Abstracto/Instruccion";
import Errors from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import { Report } from "../Simbolo/Report";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Declaracion extends Instruccion {
    private identificador: Array<any>;
    private valor: Instruccion[];

    constructor(tipo: Tipo, Linea: number, Columna: number, id: Array<any>, valor: Instruccion[]) {
        super(tipo, Linea, Columna);
        this.identificador = id;
        this.valor = valor;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        if (this.identificador.length !== this.valor.length) {
            const err = new Errors("Semántico", "Cantidad de variables y valores no coincide", this.linea, this.columna);
            lista_errores.push(err);
            //arbol.actualizarConsola(err.obtenerError());
            return err;
        }

        for (let i = 0; i < this.identificador.length; i++) {
            let valEvaluado = this.valor[i].interpretar(arbol, tabla);
            if (valEvaluado instanceof Errors) return valEvaluado;
        
            let tipoValor = this.valor[i].tipo_dato.getTipo();
        
            //Conversión especial: entero -> decimal
            if (tipoValor === tipo_dato.ENTERO && this.tipo_dato.getTipo() === tipo_dato.DECIMAL) {
                valEvaluado = parseFloat(valEvaluado);
            }
        
            //Conversión especial: "Verdadero"/"Falso" como string → boolean
            if (this.tipo_dato.getTipo() === tipo_dato.BOOLEANO && typeof valEvaluado === "string") {
                if (valEvaluado === "Verdadero") valEvaluado = true;
                else if (valEvaluado === "Falso") valEvaluado = false;
            }
        
            //Verificación de tipos
            if (tipoValor !== this.tipo_dato.getTipo()) {
                const err = new Errors("Semántico", `Tipo incompatible en variable ${this.identificador[i]}`, this.linea, this.columna);
                lista_errores.push(err);
                //arbol.actualizarConsola(err.obtenerError());
                return err;
            }
        
            //Declarar la variable
            if (!tabla.setVariable(new Simbolo(this.tipo_dato, this.identificador[i], valEvaluado))) {
                const err = new Errors("Semántico", `La variable ${this.identificador[i]} ya existe`, this.linea, this.columna);
                console.log("La variable " + this.identificador[i] + " ya existe");
                lista_errores.push(err);
                //arbol.actualizarConsola(err.obtenerError());
                return err;
            }
        
            //Reporte
            let simboloN = new Report(
                this.identificador[i],
                valEvaluado,
                this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()),
                tabla.getNombre().toString(),
                this.linea.toString(),
                this.columna.toString(), "variable"
            );
            arbol.simbolos.push(simboloN);
        }
    }

    /*
    nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""

        let nodoD = `n${cont.get()}`
        let nodoT = `n${cont.get()}`
        let nodoID = `n${cont.get()}`

        let ids = []

        for(let i= 0; i < this.id.length; i++){
            ids.push(`n${cont.get()}`)

        }
        let nodoI = `n${cont.get()}`
        let nodoV = `n${cont.get()}`
        let nodoPC = `n${cont.get()}`

        resultado += `${nodoD}[label="DECLARACION"]\n`

        switch (this.tipoD.getTipo()) {
            case tipoD.INT:
                resultado += `${nodoT}[label="int"]\n`
                break;
            case tipoD.DOUBLE:
                resultado += `${nodoT}[label="double"]\n`
                break;
            case tipoD.CADENA:
                resultado += `${nodoT}[label="std::string"]\n`
                break;
            case tipoD.CHAR:
                resultado += `${nodoT}[label="char"]\n`
                break;
            case tipoD.BOOL:
                resultado += `${nodoT}[label="bool"]\n`
                break;
        }

        resultado += `${nodoID}[label="ID"]\n`

        for(let i= 0; i < this.id.length; i++){
            resultado += `${ids[i]} [label = "${this.id[i]}"]\n`
        }

        resultado += `${nodoI}[label="="]\n`
        resultado += `${nodoV}[label="EXPRESION"]\n`
        resultado += `${nodoPC}[label=";"]\n`

        resultado += `${anterior} -> ${nodoD}\n`
        resultado += `${nodoD} -> ${nodoID}\n`
        resultado += `${nodoD} -> ${nodoT}\n`
        
        for(let i= 0; i < this.id.length; i++){
            resultado += `${nodoID} -> ${ids[i]}\n`
        }

        resultado += `${nodoD} -> ${nodoI}\n`
        resultado += `${nodoD} -> ${nodoV}\n`
        resultado += `${nodoD} -> ${nodoPC}\n`

        this.valor.nodo(nodoV)

        return resultado
    }
    */
}