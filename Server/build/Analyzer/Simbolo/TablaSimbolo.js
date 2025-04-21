"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
el map funciona como un json, esta es su estructura basica:

{
    "variable1": Simbolo1,
    "variable2": Simbolo2,
}
*/
class TablaSimbolo {
    constructor(anterior) {
        this.tabla_anterior = anterior;
        this.tabla_actual = new Map();
        this.nombre = "";
    }
    getAnterior() {
        return this.tabla_anterior;
    }
    setAnterior(anterior) {
        this.tabla_anterior = anterior;
    }
    getTabla() {
        return this.tabla_actual;
    }
    setTabla(tabla) {
        this.tabla_actual = tabla;
    }
    //--------------------------------------------------------------------------------------------------------------
    getVariable(id) {
        for (let i = this; i != null; i = i.getAnterior()) {
            let busqueda = i.getTabla().get(id);
            if (busqueda != null)
                return busqueda;
        }
        return null;
    }
    /*
    Si dentro de nuestra tabla actual existe el simbolo nos lo devolvera, de lo contrario devolvera null
    */
    setVariable(simbolo) {
        let busqueda = this.getTabla().get(simbolo.getId());
        if (busqueda == null) {
            this.tabla_actual.set(simbolo.getId(), simbolo);
            return true;
        }
        return false;
    }
    /*
    Si la busqueda es null quiere decir que la busqueda no existe, por lo tanto se puede agregar
    */
    //--------------------------------------------------------------------------------------------------------------
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
}
exports.default = TablaSimbolo;
