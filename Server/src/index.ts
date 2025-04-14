import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
//import morgan from 'morgan';
import indexRouter from './Routes/Routes';

class Servidor {
    public aplicacion: Application;

    constructor() {
        this.aplicacion = express();
        this.configuracion();
        this.rutas();
    }

    configuracion(): any {
        this.aplicacion.set('port', process.env.PORT || 4000);
        //this.aplicacion.use(morgan('dev'));
        this.aplicacion.use(express.urlencoded({ extended: true }));
        this.aplicacion.use(express.json());
        this.aplicacion.use(express.json({ limit: '50mb' }));
        this.aplicacion.use(express.urlencoded({ limit: '50mb' }));
        this.aplicacion.use(cors());
        this.aplicacion.use(bodyParser.urlencoded({ extended: true }));
        this.aplicacion.use(bodyParser.json());
    }

    rutas(): void {
        this.aplicacion.use('/', indexRouter);
    }

    start(): void {
        this.aplicacion.listen(this.aplicacion.get('port'), () => {
            console.log('Server on port:', this.aplicacion.get('port'));
        }
        )
    }

}

export const server = new Servidor();
server.start();