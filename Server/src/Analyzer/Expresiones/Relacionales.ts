import { Instruccion } from "../Abstracto/Instruccion";
import Errores from "../Errors/Errors";
import Arbol from "../Simbolo/Arbol";
import singleton from "../Simbolo/Singleton";
//import Simbolo from "../Simbolo/Simbolo";
import TablaSimbolos from "../Simbolo/TablaSimbolo";
import Tipo, { tipo_dato } from "../Simbolo/Tipo";

export default class Relacionales extends Instruccion {
    private condicion1: Instruccion
    private condicion2: Instruccion
    private relacional: Relacional

    constructor(relacional: Relacional, condicion1: Instruccion, condicion2: Instruccion, linea: number, columna: number){
        super(new Tipo(tipo_dato.BOOLEANO), linea, columna)
        this.condicion1 = condicion1
        this.condicion2 = condicion2
        this.relacional = relacional
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let condIzq = this.condicion1.interpretar(arbol, tabla)
        if(condIzq instanceof Errores) return condIzq

        let condDer = this.condicion2.interpretar(arbol, tabla)
        if(condDer instanceof Errores) return condDer

        switch (this.relacional) {
            case Relacional.MAYOR:
                
                return this.mayor(condIzq, condDer)
            case Relacional.MENOR:
                
                return this.menor(condIzq, condDer)
            case Relacional.IGUAL:
            
                return this.igual(condIzq, condDer)
            case Relacional.DIF:
            
                return this.dif(condIzq, condDer)
            case Relacional.MENORI:
            
                return this.menorI(condIzq, condDer)
            case Relacional.MAYORI:
            
                return this.mayorI(condIzq, condDer)
            default:
                return new Errores("Semantico", "Operador relacional invalido", this.linea, this.columna)
        }
    }

    menor(cond1:any, cond2: any) {
        let comp1 = this.condicion1.tipo_dato.getTipo()
        let comp2 = this.condicion2.tipo_dato.getTipo()

        switch (comp1) {
            case tipo_dato.ENTERO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) < parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) < parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) < parseInt(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) < cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida1", this.linea, this.columna)
                }
            case tipo_dato.DECIMAL:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) < parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) < parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) < parseFloat(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) < cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida2", this.linea, this.columna)
                }
            case tipo_dato.CARACTER:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) < parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1.charCodeAt(0)) < parseFloat(cond2)
                    
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return (cond1.charCodeAt(0)) < (cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) < cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida3", this.linea, this.columna)
                }
            case tipo_dato.CADENA:
                switch (comp2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 < cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida4", this.linea, this.columna)
                }
            case tipo_dato.BOOLEANO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 < parseInt(cond2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 < parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 < parseInt(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 < cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida5", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Relacional invalida6", this.linea, this.columna)
        }
    }

    mayor(cond1:any, cond2: any) {
        let comp1 = this.condicion1.tipo_dato.getTipo()
        let comp2 = this.condicion2.tipo_dato.getTipo()

        switch (comp1) {
            case tipo_dato.ENTERO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) > parseInt(cond2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) > parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) > parseInt(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) > cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida1", this.linea, this.columna)
                }
            case tipo_dato.DECIMAL:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) > parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) > parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) > parseFloat(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) > cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida2", this.linea, this.columna)
                }
            case tipo_dato.CARACTER:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) > parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1.charCodeAt(0)) > parseFloat(cond2)
                    
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return (cond1.charCodeAt(0)) > (cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) > cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida3", this.linea, this.columna)
                }
            case tipo_dato.CADENA:
                switch (comp2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 > cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida4", this.linea, this.columna)
                }
            case tipo_dato.BOOLEANO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 > parseInt(cond2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 > parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 > parseInt(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 > cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida5", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Relacional invalida6", this.linea, this.columna)
        }
    }

    igual(cond1:any, cond2: any) {
        let comp1 = this.condicion1.tipo_dato.getTipo()
        let comp2 = this.condicion2.tipo_dato.getTipo()

        switch (comp1) {
            case tipo_dato.ENTERO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) == parseInt(cond2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) == parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) == parseInt(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) == cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida1", this.linea, this.columna)
                }
            case tipo_dato.DECIMAL:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) == parseInt(cond2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) == parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) == parseFloat(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) == cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida2", this.linea, this.columna)
                }
            case tipo_dato.CARACTER:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) == parseInt(cond2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1.charCodeAt(0)) == parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return (cond1.charCodeAt(0)) == (cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) == cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida3", this.linea, this.columna)
                }
            case tipo_dato.CADENA:
                switch (comp2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 == cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida4", this.linea, this.columna)
                }
            case tipo_dato.BOOLEANO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 == parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 == parseFloat(cond2)
                    
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 == parseInt(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 == cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida5", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Relacional invalida6", this.linea, this.columna)
        }
    }

    dif(cond1:any, cond2: any) {
        let comp1 = this.condicion1.tipo_dato.getTipo()
        let comp2 = this.condicion2.tipo_dato.getTipo()

        switch (comp1) {
            case tipo_dato.ENTERO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) != parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) != parseFloat(cond2)
                    
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) != parseInt(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) != cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida1", this.linea, this.columna)
                }
            case tipo_dato.DECIMAL:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) != parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) != parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) != parseFloat(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) != cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida2", this.linea, this.columna)
                }
            case tipo_dato.CARACTER:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) != parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1.charCodeAt(0)) != parseFloat(cond2)
                    
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return (cond1.charCodeAt(0)) != (cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) != cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida3", this.linea, this.columna)
                }
            case tipo_dato.CADENA:
                switch (comp2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 != cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida4", this.linea, this.columna)
                }
            case tipo_dato.BOOLEANO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 != parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 != parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 != parseInt(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 != cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida5", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Relacional invalida6", this.linea, this.columna)
        }
    }

    menorI(cond1:any, cond2: any) {
        let comp1 = this.condicion1.tipo_dato.getTipo()
        let comp2 = this.condicion2.tipo_dato.getTipo()

        switch (comp1) {
            case tipo_dato.ENTERO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) <= parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) <= parseFloat(cond2)
                    
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) <= parseInt(cond2.charCodeAt(0))

                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) <= cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida1", this.linea, this.columna)
                }
            case tipo_dato.DECIMAL:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) <= parseInt(cond2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) <= parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) <= parseFloat(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) <= cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida2", this.linea, this.columna)
                }
            case tipo_dato.CARACTER:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) <= parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1.charCodeAt(0)) <= parseFloat(cond2)
                    
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return (cond1.charCodeAt(0)) <= (cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) <= cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida3", this.linea, this.columna)
                }
            case tipo_dato.CADENA:
                switch (comp2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 <= cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida4", this.linea, this.columna)
                }
            case tipo_dato.BOOLEANO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 <= parseInt(cond2)
                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 <= parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 <= parseInt(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 <= cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida5", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Relacional invalida6", this.linea, this.columna)
        }
    }

    mayorI(cond1:any, cond2: any) {
        let comp1 = this.condicion1.tipo_dato.getTipo()
        let comp2 = this.condicion2.tipo_dato.getTipo()

        switch (comp1) {
            case tipo_dato.ENTERO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) >= parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) >= parseFloat(cond2)
                    
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) >= parseInt(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1) >= cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida1", this.linea, this.columna)
                }
            case tipo_dato.DECIMAL:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) >= parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) >= parseFloat(cond2)
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) >= parseFloat(cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1) >= cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida2", this.linea, this.columna)
                }
            case tipo_dato.CARACTER:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) >= parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseFloat(cond1.charCodeAt(0)) >= parseFloat(cond2)
                    
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return (cond1.charCodeAt(0)) >= (cond2.charCodeAt(0))
                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return parseInt(cond1.charCodeAt(0)) >= cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida3", this.linea, this.columna)
                }
            case tipo_dato.CADENA:
                switch (comp2) {
                    case tipo_dato.CADENA:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 >= cond2
                    default:
                        return new Errores("Semantico", "Relacional invalida4", this.linea, this.columna)
                }
            case tipo_dato.BOOLEANO:
                switch (comp2) {
                    case tipo_dato.ENTERO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 >= parseInt(cond2)

                    case tipo_dato.DECIMAL:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 >= parseFloat(cond2)
                    
                    case tipo_dato.CARACTER:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 >= parseInt(cond2.charCodeAt(0))

                    case tipo_dato.BOOLEANO:
                        this.tipo_dato = new Tipo(tipo_dato.BOOLEANO)
                        return cond1 >= cond2

                    default:
                        return new Errores("Semantico", "Relacional invalida5", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Relacional invalida6", this.linea, this.columna)
        }
    }

    nodo(anterior: string): string {
        let Singleton = singleton.getInstancia()
        let nodoE1 = `n${Singleton.getContador()}`
        let nodoE2 = `n${Singleton.getContador()}`
        let nodooP = `n${Singleton.getContador()}`

        let resultado = ""
        resultado += `${nodoE1}[label="EXPRESION"]\n`
        resultado += `${nodooP}[label="${this.getRelacional(this.relacional)}"]\n`
        resultado += `${nodoE2}[label="EXPRESION"]\n`
        resultado += `${anterior}->${nodoE1}\n`
        resultado += `${anterior}->${nodooP}\n`
        resultado += `${anterior}->${nodoE2}\n`
        resultado += this.condicion1.nodo(nodoE1)
        resultado += this.condicion2.nodo(nodoE2)

        return resultado
    }

    getRelacional(op:any){
        switch (op) {
            case 0:
                return '<'
            case 1:
                return '>'
            case 2:
                return '=='
            case 3:
                return '!='
            case 4:
                return '<='
            case 5:
                return '>='
        }
    }
}

export enum Relacional {
    MENOR,
    MAYOR,
    IGUAL,
    DIF,
    MENORI,
    MAYORI
}