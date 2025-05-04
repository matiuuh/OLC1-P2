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
