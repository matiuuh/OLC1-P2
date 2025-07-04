export default class Tipo {

    private tipo: tipo_dato

    constructor(tipo: tipo_dato) {
        this.tipo = tipo
    }

    public setTipo(tipo: tipo_dato) {
        this.tipo = tipo
    }

    public getTipo() {
        return this.tipo
    }
    
    public getNombreTipo(tipo: any): any {
        switch (this.tipo) {
            case tipo_dato.ENTERO:
                return "ENTERO"
            case tipo_dato.DECIMAL:
                return "DECIMAL"
            case tipo_dato.BOOLEANO:
                return "BOOLEANO"
            case tipo_dato.CARACTER:
                return "CARACTER"
            case tipo_dato.CADENA:
                return "CADENA"
            default:
                return "Tipo No Valido"
        }
    }
}

/*
Usamos una clase enum para definir un conjunto de valores constantes con nombre,
que están relacionados entre sí y permiten trabajar con opciones predefinidas
de manera clara y segura.
*/
export enum tipo_dato {
    ENTERO,
    DECIMAL,
    BOOLEANO,
    CARACTER,
    CADENA,
    VOID
}