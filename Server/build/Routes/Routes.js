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
        this.router.post("/interpretar", Controllers_1.indexController.interpretar);
    }
}
const indexRouter = new router();
exports.default = indexRouter.router;
