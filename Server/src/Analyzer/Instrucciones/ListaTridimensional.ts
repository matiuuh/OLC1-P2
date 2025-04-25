import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class ListaTridimensional extends Instruccion {
    private id: string;
    private tipoElemento: Tipo;
    private valores: Instruccion[][][];

    constructor(id: string, tipoElemento: Tipo, valores: Instruccion[][][], linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna);
        this.id = id;
        this.tipoElemento = tipoElemento;
        this.valores = valores;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        const arreglo: any[][][] = [];

        for (let i = 0; i < this.valores.length; i++) {
            const matriz: any[][] = [];
            for (let j = 0; j < this.valores[i].length; j++) {
                const fila: any[] = [];
                for (let k = 0; k < this.valores[i][j].length; k++) {
                    const expr = this.valores[i][j][k];
                    const resultado = expr.interpretar(arbol, tabla);
                    if (resultado instanceof Errores) return resultado;

                    if (expr.tipo_dato.getTipo() !== this.tipoElemento.getTipo()) {
                        return new Errores(
                            "Semántico",
                            `Tipo incompatible en lista ${this.id}[${i}][${j}][${k}]: se esperaba ${this.tipoElemento.getTipo()}, pero se obtuvo ${expr.tipo_dato.getTipo()}`,
                            this.linea,
                            this.columna
                        );
                    }

                    fila.push(resultado);
                }
                matriz.push(fila);
            }
            arreglo.push(matriz);
        }

        const simbolo = new Simbolo(this.tipoElemento, this.id, arreglo);
        if (!tabla.setVariable(simbolo)) {
            return new Errores("Semántico", `La lista '${this.id}' ya fue declarada`, this.linea, this.columna);
        }

        arbol.tablaSimbolos(
            this.id,
            JSON.stringify(arreglo),
            this.linea.toString(),
            tabla.getNombre().toString(),
            this.columna.toString()
        );
        return null;
    }
}
