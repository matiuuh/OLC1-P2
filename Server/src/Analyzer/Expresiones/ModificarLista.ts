import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class ModificarLista extends Instruccion {
    private id: string;
    private indices: Instruccion[];
    private nuevoValor: Instruccion;

    constructor(id: string, indices: Instruccion[], nuevoValor: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna);
        this.id = id;
        this.indices = indices;
        this.nuevoValor = nuevoValor;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        const variable = tabla.getVariable(this.id);

        if (!variable) {
            return new Errores("Semántico", `La variable '${this.id}' no existe`, this.linea, this.columna);
        }

        let arreglo = variable.getValor();

        if (!Array.isArray(arreglo)) {
            return new Errores("Semántico", `La variable '${this.id}' no es una lista`, this.linea, this.columna);
        }

        // Interpretar los índices
        let indicesNum: number[] = [];

        for (let expr of this.indices) {
            if (
                expr.tipo_dato.getTipo() !== tipo_dato.ENTERO &&
                expr.tipo_dato.getTipo() !== tipo_dato.DECIMAL
            ) {
                return new Errores("Semántico", `Los índices deben ser valores enteros o decimales`, this.linea, this.columna);
            }
        
            const resIndice = expr.interpretar(arbol, tabla);
            if (resIndice instanceof Errores) return resIndice;
        
            indicesNum.push(parseInt(resIndice));
        }
        

        // Interpretar el nuevo valor
        const nuevoValorInterpretado = this.nuevoValor.interpretar(arbol, tabla);
        if (nuevoValorInterpretado instanceof Errores) return nuevoValorInterpretado;

        // Validar tipo de datos
        if (variable.getTipo().getTipo() !== this.nuevoValor.tipo_dato.getTipo()) {
            return new Errores("Semántico", `El tipo del nuevo valor no coincide con el tipo de la lista '${this.id}'`, this.linea, this.columna);
        }

        try {
            if (indicesNum.length === 1) {
                // Lista unidimensional
                if (indicesNum[0] < 0 || indicesNum[0] >= arreglo.length) {
                    return new Errores("Semántico", `Índice fuera de rango en lista '${this.id}'`, this.linea, this.columna);
                }
                arreglo[indicesNum[0]] = nuevoValorInterpretado;
            } else if (indicesNum.length === 2) {
                // Lista bidimensional
                if (indicesNum[0] < 0 || indicesNum[0] >= arreglo.length ||
                    indicesNum[1] < 0 || indicesNum[1] >= arreglo[indicesNum[0]].length) {
                    return new Errores("Semántico", `Índices fuera de rango en lista '${this.id}'`, this.linea, this.columna);
                }
                arreglo[indicesNum[0]][indicesNum[1]] = nuevoValorInterpretado;
            } else if (indicesNum.length === 3) {
                // Lista tridimensional
                if (indicesNum[0] < 0 || indicesNum[0] >= arreglo.length ||
                    indicesNum[1] < 0 || indicesNum[1] >= arreglo[indicesNum[0]].length ||
                    indicesNum[2] < 0 || indicesNum[2] >= arreglo[indicesNum[0]][indicesNum[1]].length) {
                    return new Errores("Semántico", `Índices fuera de rango en lista '${this.id}'`, this.linea, this.columna);
                }
                arreglo[indicesNum[0]][indicesNum[1]][indicesNum[2]] = nuevoValorInterpretado;
            } else {
                return new Errores("Semántico", `Número incorrecto de índices para modificar lista '${this.id}'`, this.linea, this.columna);
            }
        } catch (error) {
            return new Errores("Semántico", `Error modificando la lista '${this.id}'`, this.linea, this.columna);
        }

        // Guardar de vuelta el arreglo modificado
        variable.setValor(arreglo);
        return null;
    }
}
