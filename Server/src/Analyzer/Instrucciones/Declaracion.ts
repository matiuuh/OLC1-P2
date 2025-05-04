import { lista_errores } from "../../controllers/Controllers";
import { Instruccion } from "../Abstracto/Instruccion";
import Errors from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import { Report } from "../Simbolo/Report";
import Simbolo from "../Simbolo/Simbolo";
import singleton from "../Simbolo/Singleton";
import TablaSimbolo from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Declaracion extends Instruccion {
    private identificador: Array<any>;
    private valor: Instruccion[];

    constructor(tipo: Tipo, linea: number, columna: number, id: Array<any>, valor: Instruccion[]) {
        super(tipo, linea, columna);
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
            console.log("DEBUG:", {
                id: this.identificador[i],
                lineaValor: this.valor[i].linea.toString(),
                columnaValor: this.valor[i].columna,
                tipoValor: this.valor[i].tipo_dato
            });
            
            //Reporte
            let simboloN = new Report(
                this.identificador[i],
                valEvaluado,
                this.tipo_dato.getNombreTipo(this.tipo_dato.getTipo()),
                tabla.getNombre().toString(),
                this.valor[i].linea?.toString(),   // 👈 Usa la línea de la expresión si existe
                this.valor[i].columna?.toString() ?? this.columna.toString(), // 👈 Igual para columna
                "variable"
            );
            arbol.simbolos.push(simboloN);
        }
    }

    nodo(anterior: string): string {
        let Singleton = singleton.getInstancia();
        let resultado = "";
    
        let nodoD = `n${Singleton.getContador()}`;
        let nodoT = `n${Singleton.getContador()}`;
        let nodoID = `n${Singleton.getContador()}`;
        let nodoI = `n${Singleton.getContador()}`;
        let nodoV = `n${Singleton.getContador()}`;
        let nodoPC = `n${Singleton.getContador()}`;
    
        // Nodos individuales por cada ID
        let ids: string[] = [];
        for (let i = 0; i < this.identificador.length; i++) {
            ids.push(`n${Singleton.getContador()}`);
        }
    
        resultado += `${nodoD}[label="DECLARACION"]\n`;
    
        // Tipo
        switch (this.tipo_dato.getTipo()) {
            case tipo_dato.ENTERO:
                resultado += `${nodoT}[label="entero"]\n`; break;
            case tipo_dato.DECIMAL:
                resultado += `${nodoT}[label="decimal"]\n`; break;
            case tipo_dato.CADENA:
                resultado += `${nodoT}[label="cadena"]\n`; break;
            case tipo_dato.CARACTER:
                resultado += `${nodoT}[label="caracter"]\n`; break;
            case tipo_dato.BOOLEANO:
                resultado += `${nodoT}[label="booleano"]\n`; break;
        }
    
        // ID y conexiones
        resultado += `${nodoID}[label="ID"]\n`;
        for (let i = 0; i < this.identificador.length; i++) {
            resultado += `${ids[i]}[label="${this.identificador[i]}"]\n`;
        }
    
        // Estructura de árbol
        resultado += `${nodoI}[label="="]\n`;
        resultado += `${nodoV}[label="EXPRESIONES"]\n`;
        resultado += `${nodoPC}[label=";"]\n`;
    
        resultado += `${anterior} -> ${nodoD}\n`;
        resultado += `${nodoD} -> ${nodoT}\n`;
        resultado += `${nodoD} -> ${nodoID}\n`;
        for (let i = 0; i < this.identificador.length; i++) {
            resultado += `${nodoID} -> ${ids[i]}\n`;
        }
        resultado += `${nodoD} -> ${nodoI}\n`;
        resultado += `${nodoD} -> ${nodoV}\n`;
        resultado += `${nodoD} -> ${nodoPC}\n`;
    
        // Expresiones (valores)
        for (let i = 0; i < this.valor.length; i++) {
            let nodoExpr = `n${Singleton.getContador()}`;
            resultado += `${nodoV} -> ${nodoExpr}\n`;
            resultado += this.valor[i].nodo(nodoExpr);
        }
    
        return resultado;
    }
    
}