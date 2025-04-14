import { Request, Response } from "express"
import Errores from "../Analyzer/Errors/Errors"
/*import Metodo from "../Analyzer/instrucciones/metodo"
import Declaracion from "../Analyzer/instrucciones/declaracion"
import Execute from "../Analyzer/instrucciones/execute"
import Asignacion from "../Analyzer/instrucciones/asignacion"
import Vector1D from "../Analyzer/instrucciones/vectores.ud"
import Vector2D from "../Analyzer/instrucciones/vector.dd"
import Creacion from "../Analyzer/instrucciones/creacion.var"
import ModificarVector1D from "../Analyzer/instrucciones/modificar.vectorud"
import ModificarVector2D from "../Analyzer/instrucciones/modificar.vectordd"
import Funcion from "../Analyzer/instrucciones/funcion"*/
import { Reporte } from "../Analyzer/Simbolo/Report"
import { parse } from '../Analyzer/grammar'

export let lista_errores: Array<Errores> = []
export let dot: string = ""
export let tablaS: Array<Reporte>
tablaS = new Array<Reporte>

class Controller {

    public analizarPrueba(req: Request, res: Response) {
        console.log("REQ.BODY:", req.body)

        lista_errores = []
        try {
            const entrada: string = req.body.entrada

            if (!entrada || entrada.trim() === "") {
                return res.status(400).json({ message: "Entrada vacía." })
            }

            // Intentar parsear
            const resultado = parse(entrada)

            // Si el parseo devuelve algo, asumimos que fue exitoso
            res.json({
                message: "Análisis sintáctico exitoso.",
                ast: resultado // esto puede ser un array o una raíz de nodos, depende de tu grammar
            })

        } catch (error: any) {
            console.log("Error en análisis sintáctico:", error.message)
            res.status(500).json({
                message: "Error durante el análisis sintáctico.",
                error: error.message
            })
        }
    }

    /*public analizar(req: Request, res: Response) {
        lista_errores = new Array<Errores>
        try {
            let parser = require('../Analyzer/grammar.js')
            let ast = new Arbol(parser.parse(req.body.entrada))
            let tabla = new TablaSimbolos()
            tabla.setNombre("Global")
            ast.setTablaGlobal(tabla)
            ast.setConsola("")
            let execute = null

            let contador = Cont.getInstancia()

            dot = "digraph ast{\n"
            dot += "nINICIO[label=\"INICIO\"];\n"
            dot += "nINSTRUCCIONES[label=\"INSTRUCCIONES\"];\n"
            dot += "nINICIO->nINSTRUCCIONES;\n"

            for (let error of lista_errores) {
                ast.actualizarConsola((<Errores>error).obtenerError())
            }

            for (let i of ast.getInstrucciones()) {
                if (i instanceof Metodo || i instanceof Funcion) {
                    i.id = i.id.toLocaleLowerCase()
                    ast.addFuncion(i)
                }
            }

            for (let i of ast.getInstrucciones()) {

                if (i instanceof Errores) {
                    lista_errores.push(i)
                    ast.actualizarConsola((<Errores>i).obtenerError())
                }
                if (i instanceof Metodo || i instanceof Funcion || i instanceof Execute) continue

                if (i instanceof Declaracion || i instanceof Asignacion || i instanceof Vector1D || i instanceof Vector2D
                    || i instanceof Creacion || i instanceof ModificarVector1D || i instanceof ModificarVector2D
                ) {
                    let resultado = i.interpretar(ast, tabla)
                    if (resultado instanceof Errores) {
                        lista_errores.push(resultado)
                        ast.actualizarConsola((<Errores>resultado).obtenerError())
                    }
                } else {
                    let error = new Errores("Semantico", "Sentencia fuera de un metodo", i.linea, i.columna)
                    lista_errores.push(error)
                    ast.actualizarConsola((<Errores>error).obtenerError())
                }
            }
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Execute) {
                    let resultado = i.interpretar(ast, tabla)
                    if (resultado instanceof Errores) {
                        lista_errores.push(resultado)
                        ast.actualizarConsola((<Errores>resultado).obtenerError())
                    }
                }

                let nodo = `n${contador.getContador()}`
                dot += `${nodo}[label=\"INSTRUCCION\"];\n`
                dot += `nINSTRUCCIONES->${nodo};\n`
                dot += i.nodo(nodo)
            }
            dot += "\n}"
            tablaS.length = 0
            for (let i = 0; i < ast.getSimbolos().length; i++) {
                tablaS.push(ast.getSimbolos()[i])
            }
            console.log(tabla)
            res.json({ "respuesta": ast.getConsola(), "lista_errores": lista_errores, "ast": dot, "simbolos": tablaS })
            console.log(lista_errores)
            console.log(ast.getFunciones())
        } catch (error: any) {
            console.log(error)
            res.json({ message: "Ya no sale" })
        }
    }*/

    public getErrores(req: Request, res: Response) {
        console.log(lista_errores)
        // return res.send({
        //     "lista_errores": lista_errores
        // })

        try {
            res.json({ "lista_errores": lista_errores })
        } catch (error) {
            console.log(error)
            res.json({ message: "Ya no sale" })
        }
    }

    public getAST(req: Request, res: Response) {

        try {
            res.json({ "ast": dot })
        } catch (error) {
            console.log(error)
            res.json({ message: "Ya no sale" })
        }
    }
}

export const indexController = new Controller()