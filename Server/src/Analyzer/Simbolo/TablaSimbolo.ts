import Simbolo from "./Simbolo";

export default class TablaSimbolo {
    private tabla_anterior: TablaSimbolo | any
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
            let busqueda: Simbolo = <Simbolo>i.getTabla().get(id.toLocaleLowerCase())
            if (busqueda != null) return busqueda
        }
        return null
    }

    public setVariable(simbolo: Simbolo) {
        let busqueda: Simbolo = <Simbolo>this.getTabla().get(simbolo.getId().toLocaleLowerCase())
        if (busqueda == null) {
            this.tabla_actual.set(simbolo.getId().toLocaleLowerCase(), simbolo)
            return true
        }
        return false
    }
    //--------------------------------------------------------------------------------------------------------------


    public getNombre(): string {
        return this.nombre
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre
    }
}