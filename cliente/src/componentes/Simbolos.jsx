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
                <div className="container">
                    <h1>Reporte de Tabla de Símbolos</h1>
                    {this.state.simbolos.length === 0 ? (
                        <p>No hay símbolos registrados.</p>
                    ) : (
                        <table className="table table-bordered table-striped">
                            <thead className='table table-bordered table-striped'>
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
                    )}
                </div>
            </>
        );
    }
}
