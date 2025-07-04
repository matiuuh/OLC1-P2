import { Router } from 'express';
import { indexController } from '../controllers/Controllers';

class router {
    public router: Router = Router();;
    constructor() {
        this.config();
    }

    //se definen las rutas(metodos) que se van a utilizar
    config(): void {
        this.router.get("/", indexController.prueba)
        this.router.post("/posteando", indexController.pruebaPost)
        this.router.post("/interpretar", indexController.interpretar)
    }
}

const indexRouter = new router();
export default indexRouter.router;