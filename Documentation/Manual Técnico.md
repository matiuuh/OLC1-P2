# Manual Tecnico
# SimpliCode



<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Índice</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .index {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      max-width: 600px;
      margin: auto;
    }
    .index h1 {
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }
    .index ul {
      list-style: none;
      padding: 0;
    }
    .index li {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      transition: background-color 0.3s;
    }
    .index li:last-child {
      border-bottom: none;
    }
    .index li:hover {
      background-color: #f9f9f9;
    }
    .index li a {
      text-decoration: none;
      color: #333;
      flex-grow: 1;
      font-size: 1.1em;
    }
    .index li i {
      margin-right: 12px;
      color: #007BFF;
    }
  </style>
</head>
<body>
  <div class="index">
    <h1>Índice</h1>
    <ul>
      <li><i class="fas fa-book-open"></i><a href="#introducción">Introducción</a></li>
      <li><i class="fas fa-cogs"></i><a href="#requisitos-del-sistema">Requisitos del Sistema</a></li>
      <li><i class="fas fa-download"></i><a href="#instalacion">Instalación</a></li>
      <li><i class="fas fa-folder-open"></i><a href="#estructura-del-proyecto">Estructura del Proyecto</a></li>
      <li><i class="fas fa-tasks"></i><a href="#funciones-principales">Funciones Principales</a></li>
      <li><i class="fas fa-life-ring"></i><a href="#resolucion-de-problemas">Resolución de Problemas</a></li>
      <li><i class="fas fa-check-circle"></i><a href="#consideraciones-finales">Consideraciones Finales</a></li>
    </ul>
  </div>
  <!-- Recuerda incluir FontAwesome para los iconos -->
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</body>
</html>

## Introducción

Este proyecto consiste en un lenguaje que permite la creacion de ciclos, declaracion de variables, funciones, metodos, entre otras cosas.

## Instalación

1. **Clona el repositorio o descarga el proyecto:**
   ```bash
   git clone https://gitlab.com/ppersonales/olc1_proyecto2_202203009.git
    ```

## Funciones Principales

### 1. Backend

En esta parte se maneja la logica principal del proyecto. Se cuenta con tres carpetas principales, Routes, controllers y Analyzer y adicionalmente un archivo index.ts el cual se encarga de comunicar todo el backend con el frontend.

#### Routes
Dentro de este archivo se contienen las rutas que fueron definidas en controllers, utilizadas y consumidas por el frontend.

``` ts
import { Router } from 'express';
import { indexController } from '../controllers/Controllers';

class router {
    public router: Router = Router();;
    constructor() {
        this.config();
    }

    //se definen las rutas(metodos) que se van a utilizar
    config(): void {
        this.router.get("/", indexController.prueba)
        this.router.post("/posteando", indexController.pruebaPost)
        this.router.get('/obtenerErrores', indexController.getErrores)
        this.router.get('/obtenerAST', indexController.getAST)
        this.router.get('/obtenerSimbolos', indexController.getTablaSimbolos)
        this.router.post("/interpretar", indexController.interpretar)
    }
}

const indexRouter = new router();
export default indexRouter.router;
```

#### Controllers
Dicho archivo contiene diferentes metodos que fueron usados para analizar e interpretar correctamente las entradas que le fueron dadas al compilador.

```` ts
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
````
#### Analyzer
Dicha carpeta contiene todas las clases sobre las expresiones, instrucciones, simbolos usadas en el proyecto. Para la realizacion de este proyecto se utilizo el patron interprete, el cual se puede observar en la grmatica, en cada clase se aprecia dicha utilizacion.

Dicho carpeta contiene sub-carpetas, las cuales son:
 - Abstracto
 - Errors
 - Expresiones
 - Instrucciones
 - Simbolo

### 1. Frontend
En esta parte se agregó la logica para manejar los datos obtenidos del backend y mostrarselos al usuario.

Este esta compuesto principalmente por un archivo llamado App.js, una carpeta llamada componentes la cual contiene dentro mas clases que fueron implementadas para mostrar correctamente las salidas al usuario.

Todo lo importante esta en src, dicha carpeta contiene App.js.

````ts
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AST } from './componentes/AST';
import { Errores } from './componentes/Errores';
import { Principal } from './componentes/Principal';
import { Simbolos } from './componentes/Simbolos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Principal /><br></br></>} />
        <Route path="/reporteErrores"
          element={<Errores />} />
        <Route path="/reporteSimbolos"
          element={<Simbolos />} />
        <Route path="/reporteAST"
          element={<AST />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

````

Sin embargo lo importante esta dentro de componentes, un archivo llamado principal, el cual contiene la parte principal del frontend, la consola y la entrada.

```ts
import Editor from "@monaco-editor/react";
import React from "react";
import { Menu } from "./Menu";

export class Principal extends React.Component {
    state = {
        editor: '',
        consola: ''
    }

    interpretar = () => {
        fetch('http://localhost:4000/interpretar', {
            method: 'POST',
            body: JSON.stringify({ entrada: this.state.editor }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    consola: data.consola
                });
            
                // Almacena en localStorage para que otros componentes lo lean
                localStorage.setItem("tabla_simbolos", JSON.stringify(data.simbolos));
                localStorage.setItem("lista_errores", JSON.stringify(data.lista_errores));
                localStorage.setItem("ast", data.ast);
            }).catch((err) => {
                alert("Algo salió mal")
                console.log(err)
            })
    }

    cargarArchivo = (event) => {
        const archivo = event.target.files[0];
        if (!archivo) return;

        const lector = new FileReader();
        lector.onload = (e) => {
            const contenido = e.target.result;
            this.setState({ editor: contenido });
        };
        lector.readAsText(archivo);
    }

    render() {
        return (
            <>
                <Menu />
                <div className="bg-dark text-light py-4">
                    <div className="container text-center">
                        <h1 className="mb-4">SimpliCode</h1>

                        {/* Controles */}
                        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
                            <input type="file"
                                accept=".ci"
                                className="form-control w-auto bg-secondary text-light border-0"
                                onChange={this.cargarArchivo}
                            />
                            <button
                                onClick={this.interpretar}
                                className="btn btn-outline-light px-4"
                            >
                                Interpretar
                            </button>
                        </div>

                        {/* Editores */}
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="bg-black border border-secondary rounded">
                                    <div className="px-3 py-2 border-bottom border-secondary">
                                        <strong>Entrada</strong>
                                    </div>
                                    <Editor height="70vh"
                                        defaultLanguage="java"
                                        theme="vs-dark"
                                        value={this.state.editor}
                                        onChange={(value) =>
                                            this.setState({ editor: value || "" })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="bg-black border border-secondary rounded">
                                    <div className="px-3 py-2 border-bottom border-secondary">
                                        <strong>Consola</strong>
                                    </div>
                                    <Editor height="70vh"
                                        defaultLanguage="text"
                                        theme="vs-dark"
                                        value={this.state.consola}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
```
### Simbolos
En esta clase manejamos el apartado de la tabla de simbolos
```ts
import React from 'react';
import { Menu } from './Menu';

export class Simbolos extends React.Component {
    state = {
        simbolos: []
    }

    componentDidMount() {
        const simbolos = JSON.parse(localStorage.getItem("tabla_simbolos") || "[]");
        this.setState({ simbolos });
    }

    render() {
        return (
            <>
                <Menu />
                <div className="bg-dark text-light py-4">
                    <div className="container text-center">
                        <h1 className="mb-4">Tabla de Símbolos</h1>

                        {this.state.simbolos.length === 0 ? (
                            <div className="alert alert-warning bg-secondary border-0 text-light">
                                No hay símbolos registrados.
                            </div>
                        ) : (
                            <div className="table-responsive bg-black p-3 border border-secondary rounded">
                                <table className="table table-dark table-striped table-bordered">
                                    <thead className="table-secondary text-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>ID</th>
                                            <th>Tipo</th>
                                            <th>Tipo dato</th>
                                            <th>Entorno</th>
                                            <th>Valor</th>
                                            <th>Línea</th>
                                            <th>Columna</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.simbolos.map((s, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{s.id}</td>
                                                <td>{s.tipo}</td>
                                                <td>{s.tipoS || "-"}</td>
                                                <td>{s.ambito || s.entorno}</td>
                                                <td>{String(s.valor)}</td>
                                                <td>{s.linea}</td>
                                                <td>{s.columna}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

```
### Errores
En este apartado se muestran los errores encontrados en la entrada.

````ts
import React from 'react';
import { Menu } from './Menu';

export class Errores extends React.Component {
    state = {
        errores: []
    }

    componentDidMount() {
        fetch('http://localhost:4000/obtenerErrores')
            .then((res) => res.json())
            .then((data) => this.setState({ errores: data.lista_errores }))
            .catch((err) => {
                console.error("Error al cargar errores:", err);
            });
    }

    render() {
        return (
            <>
                <Menu />
                <div className="container">
                    <h1>Reporte de Errores</h1>
                    {this.state.errores.length === 0 ? (
                        <p>No hay errores registrados.</p>
                    ) : (
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Descripción</th>
                                    <th>Fila</th>
                                    <th>Columna</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.errores.map((err, i) => (
                                    <tr key={i}>
                                        <td>{err.tipo_error}</td>
                                        <td>{err.descripcion}</td>
                                        <td>{err.fila}</td>
                                        <td>{err.columna}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </>
        );
    }
}
````


## Resolución de Problemas

- **Error al abrir el archivo de solicitudes:** Asegúrate de que el archivo existe y está en la ubicación correcta.
- **Problemas de compatibilidad al compilar:** Verifica que estás usando el compilador recomendado y que las opciones de java están habilitadas.

## Consideraciones Finales

Este sistema fue diseñado para gestionar eficientemente la información utilizando estructuras de datos dinámicas. A medida que el sistema crezca, considera optimizar las operaciones de búsqueda y gestión de datos. Además, asegúrate de realizar pruebas regulares para mantener la estabilidad del sistema.

## Estructura del Proyecto

### Backend
```
└── 📁Server
    └── 📁build
        └── 📁Analyzer
            └── 📁Abstracto
                └── Instruccion.js
            └── 📁Errors
                └── Errors.js
            └── 📁Expresiones
                └── AccesoLista.js
                └── AccesoVariable.js
                └── Aritmeticas.js
                └── Logicas.js
                └── ModificarLista.js
                └── Nativo.js
                └── Relacionales.js
            └── grammar.js
            └── 📁Instrucciones
                └── AsignacionAumento.js
                └── AsignacionVariable.js
                └── Casteo.js
                └── Continuar.js
                └── CreacionVariable.js
                └── Declaracion.js
                └── Detener.js
                └── Ejecutar.js
                └── Funcion.js
                └── FuncionesNativas.js
                └── Imprimir.js
                └── IncrementoDecremento.js
                └── ListaBidimensional.js
                └── ListaTridimensional.js
                └── ListaUnidimensional.js
                └── LlamadaFuncion.js
                └── Mayuscula.js
                └── Mientras.js
                └── Minuscula.js
                └── Para.js
                └── Procedimiento.js
                └── RepetirHasta.js
                └── Retornar.js
                └── Seleccion_caso.js
                └── SeleccionDefault.js
                └── SeleccionMultiple.js
                └── Si.js
                └── SiTernario.js
            └── 📁Simbolo
                └── Arbol.js
                └── Report.js
                └── Simbolo.js
                └── Singleton.js
                └── TablaSimbolo.js
                └── Tipo.js
        └── 📁controllers
            └── Controllers.js
        └── index.js
        └── prueba.js
        └── 📁Routes
            └── Routes.js
    └── 📁src
        └── 📁Analyzer
            └── 📁Abstracto
                └── Instruccion.ts
            └── 📁Errors
                └── Errors.ts
            └── 📁Expresiones
                └── AccesoLista.ts
                └── AccesoVariable.ts
                └── Aritmeticas.ts
                └── Logicas.ts
                └── ModificarLista.ts
                └── Nativo.ts
                └── Relacionales.ts
            └── grammar.jison
            └── 📁Instrucciones
                └── AsignacionAumento.ts
                └── AsignacionVariable.ts
                └── Casteo.ts
                └── Continuar.ts
                └── CreacionVariable.ts
                └── Declaracion.ts
                └── Detener.ts
                └── Ejecutar.ts
                └── Funcion.ts
                └── FuncionesNativas.ts
                └── Imprimir.ts
                └── IncrementoDecremento.ts
                └── ListaBidimensional.ts
                └── ListaTridimensional.ts
                └── ListaUnidimensional.ts
                └── LlamadaFuncion.ts
                └── Mayuscula.ts
                └── Mientras.ts
                └── Minuscula.ts
                └── Para.ts
                └── Procedimiento.ts
                └── RepetirHasta.ts
                └── Retornar.ts
                └── Seleccion_caso.ts
                └── SeleccionDefault.ts
                └── SeleccionMultiple.ts
                └── Si.ts
                └── SiTernario.ts
            └── 📁Simbolo
                └── Arbol.ts
                └── Report.ts
                └── Simbolo.ts
                └── Singleton.ts
                └── TablaSimbolo.ts
                └── Tipo.ts
        └── 📁controllers
            └── Controllers.ts
        └── index.ts
        └── prueba.ts
        └── 📁Routes
            └── Routes.ts
    └── .gitignore
    └── guia.txt
    └── package-lock.json
    └── package.json
    └── tsconfig.json
```

### Frontend
```
└── 📁cliente
    └── 📁public
        └── favicon.ico
        └── index.html
        └── logo192.png
        └── logo512.png
        └── manifest.json
        └── robots.txt
    └── 📁src
        └── App.css
        └── App.js
        └── App.test.js
        └── 📁componentes
            └── AST.jsx
            └── Errores.js
            └── Menu.js
            └── Principal.jsx
            └── Simbolos.jsx
        └── index.css
        └── index.js
        └── logo.svg
        └── reportWebVitals.js
        └── setupTests.js
    └── .gitignore
    └── package-lock.json
    └── package.json
    └── README.md
```