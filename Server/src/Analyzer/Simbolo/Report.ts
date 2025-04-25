<<<<<<< HEAD
export class Report {
=======
export class Reporte {
>>>>>>> origin/main
    private id: string
    private valor: string
    private tipo: string
    private entorno: string
    private linea: string
    private columna: string
<<<<<<< HEAD
    private tipoS: string

    constructor(id: string, valor: string, tipo: string, entorno: string, linea: string, columna: string, tipoS: string) {
        this.id = id
=======

    constructor(id: string, valor: string, tipo: string, entorno: string, linea: string, columna: string) {
        this.id = id.toLocaleLowerCase()
>>>>>>> origin/main
        this.valor = valor
        this.tipo = tipo
        this.entorno = entorno
        this.linea = linea
        this.columna = columna
<<<<<<< HEAD
        this.tipo = tipoS
=======
>>>>>>> origin/main
    }

    public getId():string{
        return this.id
    }

<<<<<<< HEAD
    public getTipoS():string{
        return this.tipoS
    }

=======
>>>>>>> origin/main
    public getEntorno():string{
        return this.entorno
    }

    public getTipo():string{
        return this.tipo
    }

    public getValor():string{
        return this.valor
    }

    public getLinea():string{
        return this.linea
    }

    public getColumna():string{
        return this.columna
    }

    public setLinea(linea: string){
        this.linea = linea
    }
    
    public setColumna(columna: string){
        this.columna = columna
    }

    public setEntorno(entorno: string){
        this.entorno = entorno
    }

    public setValor(valor: string){
        this.valor = valor
    }
    
}