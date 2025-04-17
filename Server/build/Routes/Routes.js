"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class router {
    ;
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //se definen las rutas(metodos) que se van a utilizar
    config() {
        //this.router.post('/analizarPrueba', indexController.analizarPrueba.bind(indexController));
        /*this.router.post('/analizar', indexController.analizar)
        this.router.get('/obtenerErrores', indexController.getErrores)
        this.router.get('/getAST', indexController.getAST)*/
    }
}
const indexRouter = new router();
exports.default = indexRouter.router;
