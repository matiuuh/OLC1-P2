import { lista_errores } from "../../controllers/Controllers";
import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
//import Cont from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";
import Continuar from "./Continuar";
import Declaracion from "./Declaracion";
import Detener from "./Detener";
import Retornar from "./Retornar";

export default class Para extends Instruccion {
    private id: string
    private inicio: Instruccion
    private fin: Instruccion
    private salto: Instruccion
    private instrucciones: Instruccion[]
    private tipoSalto: string  // 'incremento' o 'decremento'

    constructor(id: string, inicio: Instruccion, fin: Instruccion, salto: any, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.id = id
        this.inicio = inicio
        this.fin = fin
        this.salto = salto.operacion
        this.tipoSalto = salto.tipo
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        const entorno = new TablaSimbolos(tabla)
        entorno.setNombre("Para")

        // Declarar variable tipo entero implícita
        const decl = new Declaracion(
            new Tipo(tipo_dato.ENTERO),
            this.linea,
            this.columna,
            [this.id],
            [this.inicio]
        )
        const resDecl = decl.interpretar(arbol, entorno)
        if (resDecl instanceof Errores) return resDecl

        // Evaluar una sola vez el valor final
        let valorFin = this.fin.interpretar(arbol, entorno)
        console.log("[DEBUG] ValorFin =", valorFin, typeof valorFin)
        
        if (typeof valorFin === "string" && !isNaN(Number(valorFin))) {
            valorFin = parseFloat(valorFin)
        } else if (typeof valorFin !== "number") {
            return new Errores("Semántico", "El valor final del ciclo debe ser numérico", this.linea, this.columna)
        }

        while (true) {
            const simbolo = entorno.getVariable(this.id)
            if (!simbolo) {
                return new Errores("Semántico", `Variable '${this.id}' no existe`, this.linea, this.columna)
            }

            const valorActual = simbolo.getValor()
            const actual = typeof valorActual === "string" && !isNaN(Number(valorActual))
                ? parseFloat(valorActual)
                : valorActual

            if (typeof actual !== "number") {
                return new Errores("Semántico", "El valor actual del ciclo debe ser numérico", this.linea, this.columna)
            }

            const condicion = this.tipoSalto === 'incremento'
                ? actual <= valorFin
                : actual >= valorFin

            if (!condicion) break

            const local = new TablaSimbolos(entorno)
            local.setNombre("Bloque Para")

            for (const instr of this.instrucciones) {
                const res = instr.interpretar(arbol, local)
                if (res instanceof Errores) lista_errores.push(res)
                if (res instanceof Detener) return
                if (res instanceof Continuar) break
                if (res instanceof Retornar) return res
            }

            const actualizacion = this.salto.interpretar(arbol, entorno)
            if (actualizacion instanceof Errores) return actualizacion
        }
    }
    
//}

    /*nodo(anterior: string): string {
        let cont = Cont.getInstancia()

        let resultado = ""
        let instruc = []

        let nodoP = `n${cont.get()}`
        let nodoF = `n${cont.get()}`
        let nodoP1 = `n${cont.get()}`
        let nodoD = `n${cont.get()}`
        let nodoC = `n${cont.get()}`
        let nodoI = `n${cont.get()}`
        let nodoP2 = `n${cont.get()}`
        let nodoL1 = `n${cont.get()}`
        let nodoPI = `n${cont.get()}`
        let nodoL2 = `n${cont.get()}`

        for(let i = 0; i < this.instrucciones.length; i++){
            instruc.push(`n${cont.get()}`)
        }

        resultado += `${nodoP}[label="LOOP"]\n`
        resultado += `${nodoF}[label="for"]\n`
        resultado += `${nodoP1}[label="("]\n`
        resultado += `${nodoD}[label="EXPRESION"]\n`
        resultado += `${nodoC}[label="CONDICION"]\n`;
        resultado += `${nodoI}[label="EXPRESION"]\n`
        resultado += `${nodoP2}[label=")"]\n`
        resultado += `${nodoL1}[label="{"]\n`
        resultado += `${nodoPI}[label="INSTRUCCION"]\n`

        for(let i = 0; i < instruc.length; i++){
            resultado += ` ${instruc[i]}[label="INSTRUCCION"]\n`
        }

        resultado += `${nodoL2}[label="}"]\n`

        resultado += `${anterior} -> ${nodoP}\n`
        resultado += `${nodoP} -> ${nodoF}\n`
        resultado += `${nodoP} -> ${nodoP1}\n`
        resultado += `${nodoP} -> ${nodoD}\n`
        resultado += `${nodoP} -> ${nodoC}\n`
        resultado += `${nodoP} -> ${nodoI}\n`
        resultado += `${nodoP} -> ${nodoP2}\n`
        resultado += `${nodoP} -> ${nodoL1}\n`
        resultado += `${nodoP} -> ${nodoPI}\n`

        for(let i = 0; i < instruc.length; i++){
            resultado += `${nodoPI} -> ${instruc[i]}\n`
        }

        resultado += `${nodoD} -> ${nodoL2}\n`

        resultado += this.declaracion.nodo(nodoD)
        resultado += this.condicion.nodo(nodoC)
        resultado += this.actualizacion.nodo(nodoI)

        for(let i = 0; i < instruc.length; i++){
            resultado += this.instrucciones[i].nodo(instruc[i])
        }

        return resultado
    }*/
}