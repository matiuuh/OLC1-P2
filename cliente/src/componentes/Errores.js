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
