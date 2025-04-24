"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.tablaS = exports.dot = exports.lista_errores = void 0;
const Errors_1 = __importDefault(require("../Analyzer/Errors/Errors"));
const Arbol_1 = __importDefault(require("../Analyzer/Simbolo/Arbol"));
const TablaSimbolo_1 = __importDefault(require("../Analyzer/Simbolo/TablaSimbolo"));
//import { parser } from '../Analyzer/grammar'
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
        try {
            let parser = require('../Analyzer/grammar');
            let ast = new Arbol_1.default(parser.parse(req.body.entrada));
            let tabla = new TablaSimbolo_1.default();
            tabla.setNombre("Global");
            ast.setTablaGlobal(tabla);
            ast.setConsola("");
            for (let i of ast.getInstrucciones()) {
                var resultado = i.interpretar(ast, tabla);
                if (resultado instanceof Errors_1.default)
                    console.log(resultado);
            }
            console.log(tabla);
            //res.status(200).send({ "consola": "" })
            res.status(200).send({ consola: ast.getConsola() });
        }
        catch (err) {
            //console.log(err)
            //res.status(400).send({ "Error": "Ya no sale compi1" })
            console.error("[ERROR AL INTERPRETAR]", err);
            res.status(400).send({ "Error": (_a = err.message) !== null && _a !== void 0 ? _a : "Error desconocido", "detalles": err });
        }
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
/*public getErrores(req: Request, res: Response) {
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
}*/
exports.indexController = new Controller();
