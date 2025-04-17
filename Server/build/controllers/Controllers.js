"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.tablaS = exports.dot = exports.lista_errores = void 0;
//import { parser } from '../Analyzer/grammar'
exports.lista_errores = [];
exports.dot = "";
exports.tablaS = new Array;
class Controller {
    /*public interpretar(req: Request, res: Response) {
        try {
            let parser = require('./analizador/analizador')
            let ast = new Arbol(parser.parse(req.body.entrada))
            let tabla = new tablaSimbolo()
            tabla.setNombre("Ejemplo")
            ast.setTablaGlobal(tabla)
            ast.setConsola("")

            // primer recorrido del arbol -> almacenar funcion o metodos (structs y clases)
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Metodo) {
                    ast.addFunciones(i);
                }
            }

            // segundo recorrido del arbol -> declaracion de variables o vectores (asignacion)
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Declaracion) {
                    let resDeclaracion = i.interpretar(ast, tabla)
                    if (resDeclaracion instanceof Errores) ast.addErrores(resDeclaracion)
                }
                //IF ASIGNACION....
            }

            // tercer recorrido del arbol (ejecutar funcion principal RUN o EJECUTAR en su proyecto)
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Run) {
                    let res = i.interpretar(ast, tabla)
                    if (res instanceof Errores) ast.addErrores(res)
                    break;
                }
            }

            console.log(tabla)
            res.status(200).send({ "consola": ast.getConsola() })
        } catch (err: any) {
            console.log(err)
            res.status(400).send({ "Error": "Ya no sale compi1" })
        }
    }*/
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
    getErrores(req, res) {
        console.log(exports.lista_errores);
        // return res.send({
        //     "lista_errores": lista_errores
        // })
        try {
            res.json({ "lista_errores": exports.lista_errores });
        }
        catch (error) {
            console.log(error);
            res.json({ message: "Ya no sale" });
        }
    }
    getAST(req, res) {
        try {
            res.json({ "ast": exports.dot });
        }
        catch (error) {
            console.log(error);
            res.json({ message: "Ya no sale" });
        }
    }
}
exports.indexController = new Controller();
