import { Graphviz } from 'graphviz-react';
import React from 'react';
import { Menu } from './Menu';

export class AST extends React.Component {
    state = {
        dot: 'digraph ast { ASTvacio[label="Sin contenido"] }'
    };

    componentDidMount() {
        fetch('http://localhost:4000/obtenerAST')
            .then(res => res.json())
            .then(data => {
                if (data.ast && data.ast.includes("digraph")) {
                    this.setState({ dot: data.ast });
                }
            })
            .catch(err => {
                console.error("Error al cargar el AST:", err);
            });
    }

    render() {
        return (
            <>
                <Menu />
                <div className="container">
                    <h1>Árbol AST</h1>
                    <div className="border p-3 bg-light" style={{ overflow: "auto" }}>
                        <Graphviz dot={this.state.dot} options={{ width: "100%", height: 800 }} />
                    </div>
                </div>
            </>
        );
    }
}
