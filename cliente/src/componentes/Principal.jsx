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