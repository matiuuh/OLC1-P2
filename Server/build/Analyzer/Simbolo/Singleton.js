"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Singleton {
    constructor() {
        this.contador = 0;
    }
    static getInstancia() {
        if (!Singleton.instancia) {
            Singleton.instancia = new Singleton();
        }
        return Singleton.instancia;
    }
    getContador() {
        this.contador++;
        return this.contador;
    }
}
exports.default = Singleton;
