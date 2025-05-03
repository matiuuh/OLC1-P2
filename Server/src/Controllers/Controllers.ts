import { Request, Response } from "express";

import Errores from "../Analyzer/Errors/Errors";
import Funcion from "../Analyzer/Instrucciones/Funcion";
import Procedimiento from "../Analyzer/Instrucciones/Procedimiento";
import Arbol from "../Analyzer/Simbolo/Arbol";
import { Report } from "../Analyzer/Simbolo/Report";
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

    public interpretar(req: Request, res: Response) {
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
    }

    public getErrores(req: Request, res:Response) {
        console.log(lista_errores)

        try {
            res.json({ "lista_errores": lista_errores })
        } catch (error) {
            console.log(error)
            res.json({message: "Ya no sale"})
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
    

}
export const indexController = new Controller()