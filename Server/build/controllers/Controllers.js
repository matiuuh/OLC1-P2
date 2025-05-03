"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.tablaS = exports.dot = exports.lista_errores = void 0;
const Errors_1 = __importDefault(require("../Analyzer/Errors/Errors"));
const Funcion_1 = __importDefault(require("../Analyzer/Instrucciones/Funcion"));
const Procedimiento_1 = __importDefault(require("../Analyzer/Instrucciones/Procedimiento"));
const Arbol_1 = __importDefault(require("../Analyzer/Simbolo/Arbol"));
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
    interpretar(req, res) {
        var _a;
        exports.lista_errores = new Array;
        try {
            const parser = require('../Analyzer/grammar');
            const instrucciones = parser.parse(req.body.entrada);
            // Validación básica de parseo
            if (!Array.isArray(instrucciones)) {
                throw new Error("El parser no devolvió un arreglo de instrucciones");
            }
            const ast = new Arbol_1.default(instrucciones);
            const tabla = new TablaSimbolo_1.default();
            tabla.setNombre("Global");
            ast.setTablaGlobal(tabla);
            ast.setConsola("");
            //registrar funciones y procedimientos
            for (const instruccion of instrucciones) {
                if (instruccion instanceof Funcion_1.default || instruccion instanceof Procedimiento_1.default) {
                    ast.addFuncion(instruccion);
                }
            }
            for (const instr of instrucciones) {
                if (instr instanceof Funcion_1.default || instr instanceof Procedimiento_1.default) {
                    continue; // Ya se almacenaron arriba, no ejecutar
                }
                if (!instr || typeof instr.interpretar !== "function") {
                    console.warn(`[WARN] Instrucción inválida`, instr);
                    continue;
                }
                const resultado = instr.interpretar(ast, tabla);
                if (resultado instanceof Errors_1.default) {
                    console.error(`[ERROR]`, resultado);
                    ast.actualizarConsola(resultado.obtenerError());
                }
            }
            console.log("[DEBUG] Tabla de símbolos:", tabla);
            // Limpia la tabla actual
            exports.tablaS.length = 0;
            // Llena la tablaS con los símbolos almacenados en el árbol
            for (const simbolo of ast.getSimbolos()) {
                exports.tablaS.push(simbolo);
            }
            res.status(200).send({
                consola: ast.getConsola(),
                lista_errores: exports.lista_errores,
                ast: exports.dot,
                simbolos: exports.tablaS
            });
        }
        catch (err) {
            console.error("[ERROR AL INTERPRETAR]", err);
            res.status(400).send({
                Error: (_a = err.message) !== null && _a !== void 0 ? _a : "Error desconocido",
                detalles: err
            });
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
}
exports.indexController = new Controller();
