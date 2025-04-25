import Tipo from './Tipo'

export default class Simbolo {
    private tipo: Tipo
    private id: string
    private valor: any
    private fila: number
    private columna: number

    constructor(tipo: Tipo, id: string, valor?: any) {
        this.tipo = tipo
<<<<<<< HEAD
        this.id = id
=======
        this.id = id.toLocaleLowerCase()
>>>>>>> origin/main
        this.valor = valor
    }

    public getTipo(): Tipo {
        return this.tipo
    }

    public setTipo(tipo: Tipo) {
        this.tipo = tipo
    }

    public getId() {
        return this.id
    }

    public setId(id: string) {
        this.id = id
    }

    public getValor() {
        return this.valor
    }

    public setValor(valor: any) {
        this.valor = valor
    }
}