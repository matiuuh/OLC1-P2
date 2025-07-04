import Simbolo from "./Simbolo";

/*
el map funciona como un json, esta es su estructura basica:

{
    "variable1": Simbolo1,
    "variable2": Simbolo2,
}
*/

export default class TablaSimbolo {
<<<<<<< HEAD
    private tabla_anterior: TablaSimbolo
=======
    private tabla_anterior: TablaSimbolo | any
>>>>>>> origin/main
    private tabla_actual: Map<string, Simbolo>
    private nombre: string

    constructor(anterior?: TablaSimbolo) {
        this.tabla_anterior = anterior
        this.tabla_actual = new Map<string, Simbolo>()
        this.nombre = ""
    }

    public getAnterior(): TablaSimbolo {
        return this.tabla_anterior
    }

    public setAnterior(anterior: TablaSimbolo): void {
        this.tabla_anterior = anterior
    }

    public getTabla(): Map<String, Simbolo> {
        return this.tabla_actual;
    }

    public setTabla(tabla: Map<string, Simbolo>) {
        this.tabla_actual = tabla
    }
    
    //--------------------------------------------------------------------------------------------------------------
    public getVariable(id: string) {
        for (let i: TablaSimbolo = this; i != null; i = i.getAnterior()) {
<<<<<<< HEAD
            let busqueda: Simbolo = <Simbolo>i.getTabla().get(id)
=======
            let busqueda: Simbolo = <Simbolo>i.getTabla().get(id.toLocaleLowerCase())
>>>>>>> origin/main
            if (busqueda != null) return busqueda
        }
        return null
    }
    /*
    Si dentro de nuestra tabla actual existe el simbolo nos lo devolvera, de lo contrario devolvera null
    */

    public setVariable(simbolo: Simbolo) {
<<<<<<< HEAD
        let busqueda: Simbolo = <Simbolo>this.getTabla().get(simbolo.getId())
        if (busqueda == null) {
            this.tabla_actual.set(simbolo.getId(), simbolo)
=======
        let busqueda: Simbolo = <Simbolo>this.getTabla().get(simbolo.getId().toLocaleLowerCase())
        if (busqueda == null) {
            this.tabla_actual.set(simbolo.getId().toLocaleLowerCase(), simbolo)
>>>>>>> origin/main
            return true
        }
        return false
    }
    /*
    Si la busqueda es null quiere decir que la busqueda no existe, por lo tanto se puede agregar
    */

    //--------------------------------------------------------------------------------------------------------------
<<<<<<< HEAD
=======


>>>>>>> origin/main
    public getNombre(): string {
        return this.nombre
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre
    }
    
}