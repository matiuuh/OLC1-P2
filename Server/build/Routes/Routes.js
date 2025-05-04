"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../controllers/Controllers");
class router {
    ;
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    //se definen las rutas(metodos) que se van a utilizar
    config() {
        this.router.get("/", Controllers_1.indexController.prueba);
        this.router.post("/posteando", Controllers_1.indexController.pruebaPost);
        this.router.get('/obtenerErrores', Controllers_1.indexController.getErrores);
        this.router.get('/obtenerAST', Controllers_1.indexController.getAST);
        this.router.get('/obtenerSimbolos', Controllers_1.indexController.getTablaSimbolos);
        this.router.post("/interpretar", Controllers_1.indexController.interpretar);
    }
}
const indexRouter = new router();
exports.default = indexRouter.router;
