"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.tablaS = exports.dot = exports.lista_errores = void 0;
const Errors_1 = __importDefault(require("../Analyzer/Errors/Errors"));
const Ejecutar_1 = __importDefault(require("../Analyzer/Instrucciones/Ejecutar"));
const Funcion_1 = __importDefault(require("../Analyzer/Instrucciones/Funcion"));
const Procedimiento_1 = __importDefault(require("../Analyzer/Instrucciones/Procedimiento"));
const Arbol_1 = __importDefault(require("../Analyzer/Simbolo/Arbol"));
const Singleton_1 = __importDefault(require("../Analyzer/Simbolo/Singleton"));
const TablaSimbolo_1 = __importDefault(require("../Analyzer/Simbolo/TablaSimbolo"));
exports.lista_errores = [];
exports.dot = "";
exports.tablaS = new Array;
class Controller {
    prueba(req, res) {
        res.json({ "funciona": "la api" });
    }
    pruebaPost(req, res) {
        console.log(req.body);
        console.log(req.body.parametro1);
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
    interpretar(req, res) {
        exports.lista_errores = new Array;
        try {
            let parser = require('../Analyzer/grammar');
            const instrucciones = parser.parse(req.body.entrada);
            const ast = new Arbol_1.default(instrucciones);
            let tabla = new TablaSimbolo_1.default();
            tabla.setNombre("Global");
            ast.setTablaGlobal(tabla);
            ast.setConsola("");
            let execute = null;
            let Singleton = Singleton_1.default.getInstancia();
            exports.dot = "digraph ast{\n";
            exports.dot += "nINICIO[label=\"INICIO\"];\n";
            exports.dot += "nINSTRUCCIONES[label=\"INSTRUCCIONES\"];\n";
            exports.dot += "nINICIO->nINSTRUCCIONES;\n";
            for (let error of exports.lista_errores) {
                ast.actualizarConsola(error.obtenerError());
            }
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Procedimiento_1.default || i instanceof Funcion_1.default) {
                    i.id = i.id;
                    ast.addFuncion(i);
                }
            }
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errors_1.default) {
                    exports.lista_errores.push(i);
                    ast.actualizarConsola(i.obtenerError());
                }
                if (i instanceof Procedimiento_1.default || i instanceof Funcion_1.default || i instanceof Ejecutar_1.default)
                    continue;
                if (typeof i.interpretar === "function") {
                    const resultado = i.interpretar(ast, tabla);
                    if (resultado instanceof Errors_1.default) {
                        exports.lista_errores.push(resultado);
                        ast.actualizarConsola(resultado.obtenerError());
                    }
                }
                else {
                    const error = new Errors_1.default("Semantico", "Sentencia fuera de un Procedimiento", i.linea, i.columna);
                    exports.lista_errores.push(error);
                    ast.actualizarConsola(error.obtenerError());
                }
            }
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Ejecutar_1.default) {
                    let resultado = i.interpretar(ast, tabla);
                    if (resultado instanceof Errors_1.default) {
                        exports.lista_errores.push(resultado);
                        ast.actualizarConsola(resultado.obtenerError());
                    }
                }
                const nodoId = `n${Singleton.getContador()}`;
                exports.dot += `${nodoId}[label="INSTRUCCION"];\n`;
                exports.dot += `nINSTRUCCIONES -> ${nodoId};\n`;
                if (typeof i.nodo === "function") {
                    exports.dot += i.nodo(nodoId);
                }
                else {
                    exports.dot += `${nodoId}_noNodo[label="nodo no implementado"];\n`;
                    exports.dot += `${nodoId} -> ${nodoId}_noNodo;\n`;
                }
            }
            exports.dot += "\n}";
            exports.tablaS.length = 0;
            for (let i = 0; i < ast.getSimbolos().length; i++) {
                exports.tablaS.push(ast.getSimbolos()[i]);
            }
            console.log(tabla);
            res.json({ "consola": ast.getConsola(), "lista_errores": exports.lista_errores, "ast": exports.dot, "simbolos": exports.tablaS });
            console.log(exports.lista_errores);
            console.log(ast.getFunciones());
        }
        catch (error) {
            console.log(error);
            res.json({ message: "Ya no sale" });
        }
    }
    getErrores(req, res) {
        console.log(exports.lista_errores);
        try {
            res.json({ "lista_errores": exports.lista_errores });
        }
        catch (error) {
            console.log(error);
            res.json({ message: "Ya no sale" });
        }
    }
    getTablaSimbolos(req, res) {
        try {
            res.json({ tabla_simbolos: exports.tablaS });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener tabla de símbolos" });
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
