import { Router } from 'express';

class router {
    public router: Router = Router();;
    constructor() {
        this.config();
    }

    //se definen las rutas(metodos) que se van a utilizar
    config(): void {
        //this.router.post('/analizarPrueba', indexController.analizarPrueba.bind(indexController));
        /*this.router.post('/analizar', indexController.analizar)
        this.router.get('/obtenerErrores', indexController.getErrores)
        this.router.get('/getAST', indexController.getAST)*/
    }
}

const indexRouter = new router();
export default indexRouter.router;