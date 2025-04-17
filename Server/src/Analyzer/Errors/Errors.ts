export default class Errors {
    private tipo_error: string
    private descripcion: string
    private fila: number
    private columna: number

    constructor(tipo: string, descripcion: string, fila: number, columna: number) {
        this.tipo_error = tipo
        this.descripcion = descripcion
        this.fila = fila
        this.columna = columna
    }

    public obtenerError(): string {
        return (
            '-> Error ' + this.tipo_error + ': ' + this.descripcion + " en linea: "+ this.fila + " en columna: " + this.columna
        )
    }
}