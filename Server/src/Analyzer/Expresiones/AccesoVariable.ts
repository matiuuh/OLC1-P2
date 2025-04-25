import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import Simbolo from "../Simbolo/Simbolo";
<<<<<<< HEAD
//import Cont from "../Simbolo/Singleton";
=======
import Cont from "../Simbolo/Singleton";
>>>>>>> origin/main
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class AccesoVariable extends Instruccion {
    private id: string
    private valor: any

    constructor(id:string, linea: number, columna: number) {
        super(new Tipo(tipo_dato.VOID), linea, columna)
        this.id = id
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let valorV: Simbolo = <Simbolo> tabla.getVariable(this.id)
        if(valorV == null) return new Errores("Semantico", "Acceso invalido para ID: "+this.id, this.linea, this.columna)
        this.tipo_dato = valorV.getTipo()
        this.valor = valorV.getValor()
        return valorV.getValor()
    }

<<<<<<< HEAD
    //este get id es usado en incremento y decremento para poder modificar las variables
    /*public getId(): string {
        return this.id;
    }*/
    
    /*nodo(anterior: string): string {
=======
    nodo(anterior: string): string {
>>>>>>> origin/main
        let cont = Cont.getInstancia()
        let resultado = ""

        let nodoD = `n${cont.getContador()}`
        let nodoID = `n${cont.getContador()}`
        resultado += `${nodoID}[label="${this.id}"]\n`
        resultado += `${nodoD}[label="${this.valor}"]\n`

        resultado += `${anterior}->${nodoID}\n`
        resultado += `${nodoID}->${nodoD}\n`

        return resultado
<<<<<<< HEAD
    }*/
=======
    }
>>>>>>> origin/main
}