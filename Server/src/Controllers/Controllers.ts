import { Request, Response } from "express";

import Errores from "../Analyzer/Errors/Errors";
import Ejecutar from "../Analyzer/Instrucciones/Ejecutar";
import Funcion from "../Analyzer/Instrucciones/Funcion";
import Procedimiento from "../Analyzer/Instrucciones/Procedimiento";
import Arbol from "../Analyzer/Simbolo/Arbol";
import { Report } from "../Analyzer/Simbolo/Report";
import singleton from "../Analyzer/Simbolo/Singleton";
import tablaSimbolo from "../Analyzer/Simbolo/TablaSimbolo";

export let lista_errores: Array<Errores> = []
export let dot: string = ""
export let tablaS: Array<Report>
tablaS = new Array<Report>

class Controller {

    public prueba(req: Request, res: Response) {
        res.json({ "funciona": "la api" });
    }

    public pruebaPost(req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.parametro1)
        res.json({ "funciona": "la api" });
    }

    /*public interpretar(req: Request, res: Response) {
        lista_errores = new Array<Errores>

        try {
            const parser = require('../Analyzer/grammar');
            const instrucciones = parser.parse(req.body.entrada);
    
            // Validación básica de parseo
            if (!Array.isArray(instrucciones)) {
                throw new Error("El parser no devolvió un arreglo de instrucciones");
            }
    
            const ast = new Arbol(instrucciones);
            const tabla = new tablaSimbolo();
            tabla.setNombre("Global");
    
            ast.setTablaGlobal(tabla);
            ast.setConsola("");

            let contador = singleton.getInstancia()

            dot = "digraph ast{\n"
            dot += "nINICIO[label=\"INICIO\"];\n"
            dot += "nINSTRUCCIONES[label=\"INSTRUCCIONES\"];\n"
            dot += "nINICIO->nINSTRUCCIONES;\n"
    
            //registrar funciones y procedimientos
            for (const instruccion of instrucciones) {
                if (instruccion instanceof Funcion || instruccion instanceof Procedimiento) {
                    ast.addFuncion(instruccion);
                }
            }

            for (const instr of instrucciones) {
                if (instr instanceof Funcion || instr instanceof Procedimiento) {
                    continue; // Ya se almacenaron arriba, no ejecutar
                }
    
                if (!instr || typeof instr.interpretar !== "function") {
                    console.warn(`[WARN] Instrucción inválida`, instr);
                    continue;
                }
    
                const resultado = instr.interpretar(ast, tabla);
    
                if (resultado instanceof Errores) {
                    console.error(`[ERROR]`, resultado);
                    ast.actualizarConsola(resultado.obtenerError());
                }
            }
            
            console.log("[DEBUG] Tabla de símbolos:", tabla);
            // Limpia la tabla actual
            tablaS.length = 0;

            // Llena la tablaS con los símbolos almacenados en el árbol
            for (const simbolo of ast.getSimbolos()) {
                tablaS.push(simbolo);
            }

            res.status(200).send({
                consola: ast.getConsola(),
                lista_errores: lista_errores,
                ast: dot,
                simbolos: tablaS
            });
    
        } catch (err: any) {
            console.error("[ERROR AL INTERPRETAR]", err);
            res.status(400).send({
                Error: err.message ?? "Error desconocido",
                detalles: err
            });
        }
    }/*

    /*public interpretar(req: Request, res: Response) {
        lista_errores = [];
        dot = ""; // 👈 reiniciar el dot por cada interpretación

        try {
            const parser = require('../Analyzer/grammar');
            const instrucciones = parser.parse(req.body.entrada);

            if (!Array.isArray(instrucciones)) {
                throw new Error("El parser no devolvió un arreglo de instrucciones");
            }

            const ast = new Arbol(instrucciones);
            const tabla = new tablaSimbolo();
            tabla.setNombre("Global");

            ast.setTablaGlobal(tabla);
            ast.setConsola("");

            // Inicializar el encabezado del DOT
            dot += "digraph ast {\n";
            dot += "nINICIO[label=\"INICIO\"];\n";
            dot += "nINSTRUCCIONES[label=\"INSTRUCCIONES\"];\n";
            dot += "nINICIO -> nINSTRUCCIONES;\n";

            // Agregar funciones y procedimientos al árbol
            for (const instruccion of instrucciones) {
                if (instruccion instanceof Funcion || instruccion instanceof Procedimiento) {
                    ast.addFuncion(instruccion);
                }
            }

            // Ejecutar instrucciones normales
            for (const instr of instrucciones) {
                if (instr instanceof Funcion || instr instanceof Procedimiento) continue;
                if (!instr || typeof instr.interpretar !== "function") {
                    console.warn(`[WARN] Instrucción inválida`, instr);
                    continue;
                }

                const resultado = instr.interpretar(ast, tabla);
                if (resultado instanceof Errores) {
                    console.error(`[ERROR]`, resultado);
                    ast.actualizarConsola(resultado.obtenerError());
                }
            }

            // Construcción del AST
            const contador = singleton.getInstancia();
            for (const instr of instrucciones) {
                const nodoId = `n${contador.getContador()}`;
                dot += `${nodoId}[label="INSTRUCCION"];\n`;
                dot += `nINSTRUCCIONES -> ${nodoId};\n`;

                if (typeof instr.nodo === "function") {
                    dot += instr.nodo(nodoId);
                } else {
                    dot += `${nodoId}_noNodo[label="nodo no definido"];\n`;
                    dot += `${nodoId} -> ${nodoId}_noNodo;\n`;
                }
            }

            dot += "\n}";

            // Preparar tabla de símbolos
            tablaS.length = 0;
            for (const simbolo of ast.getSimbolos()) {
                tablaS.push(simbolo);
            }

            res.status(200).send({
                consola: ast.getConsola(),
                lista_errores: lista_errores,
                ast: dot,
                simbolos: tablaS
            });

        } catch (err: any) {
            console.error("[ERROR AL INTERPRETAR]", err.message);
            res.status(400).json({
                Error: "Error desconocido",
                detalles: err.message
            });
        }
    }*/

    public interpretar(req: Request, res: Response) {
        lista_errores = new Array<Errores>
        try {
            let parser = require('../Analyzer/grammar')
            const instrucciones = parser.parse(req.body.entrada);
            const ast = new Arbol(instrucciones);
            let tabla = new tablaSimbolo()
            tabla.setNombre("Global")
            ast.setTablaGlobal(tabla)
            ast.setConsola("")
            let execute = null

            let Singleton = singleton.getInstancia()

            dot = "digraph ast{\n"
            dot += "nINICIO[label=\"INICIO\"];\n"
            dot += "nINSTRUCCIONES[label=\"INSTRUCCIONES\"];\n"
            dot += "nINICIO->nINSTRUCCIONES;\n"

            for (let error of lista_errores) {
                ast.actualizarConsola((<Errores>error).obtenerError())
            }

            for (let i of ast.getInstrucciones()) {
                if (i instanceof Procedimiento || i instanceof Funcion) {
                    i.id = i.id
                    ast.addFuncion(i)
                }
            }

            for (let i of ast.getInstrucciones()) {

                if (i instanceof Errores) {
                    lista_errores.push(i)
                    ast.actualizarConsola((<Errores>i).obtenerError())
                }
                if (i instanceof Procedimiento || i instanceof Funcion || i instanceof Ejecutar) continue

                if (typeof i.interpretar === "function") {
                    const resultado = i.interpretar(ast, tabla);
                    if (resultado instanceof Errores) {
                        lista_errores.push(resultado);
                        ast.actualizarConsola(resultado.obtenerError());
                    }
                } else {
                    const error = new Errores("Semantico", "Sentencia fuera de un Procedimiento", i.linea, i.columna);
                    lista_errores.push(error);
                    ast.actualizarConsola(error.obtenerError());
                }
                
            }

            for (let i of ast.getInstrucciones()) {
                if (i instanceof Ejecutar) {
                    let resultado = i.interpretar(ast, tabla)
                    if (resultado instanceof Errores) {
                        lista_errores.push(resultado)
                        ast.actualizarConsola((<Errores>resultado).obtenerError())
                    }
                }

                const nodoId = `n${Singleton.getContador()}`;
                dot += `${nodoId}[label="INSTRUCCION"];\n`;
                dot += `nINSTRUCCIONES -> ${nodoId};\n`;

                if (typeof i.nodo === "function") {
                    dot += i.nodo(nodoId);
                } else {
                    dot += `${nodoId}_noNodo[label="nodo no implementado"];\n`;
                    dot += `${nodoId} -> ${nodoId}_noNodo;\n`;
                }
            }

            dot += "\n}"

            tablaS.length = 0

            for (let i = 0; i < ast.getSimbolos().length; i++) {
                tablaS.push(ast.getSimbolos()[i])

            }

            console.log(tabla)

            res.json({ "consola": ast.getConsola(), "lista_errores": lista_errores, "ast": dot, "simbolos": tablaS })
            console.log(lista_errores)
            console.log(ast.getFunciones())

            /*res.status(200).send({
                consola: ast.getConsola(),
                lista_errores: lista_errores,
                ast: dot,
                simbolos: tablaS
            })*/;
        } catch (error: any) {
            console.log(error)
            res.json({ message: "Ya no sale" })
        }
    }

    public getErrores(req: Request, res: Response) {
        console.log(lista_errores)

        try {
            res.json({ "lista_errores": lista_errores })
        } catch (error) {
            console.log(error)
            res.json({ message: "Ya no sale" })
        }
    }

    public getTablaSimbolos(req: Request, res: Response) {
        try {
            res.json({ tabla_simbolos: tablaS });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener tabla de símbolos" });
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