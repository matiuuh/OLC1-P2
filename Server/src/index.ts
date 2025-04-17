import { Application } from 'express';
//import morgan from 'morgan';
import Errores from './Analyzer/Errors/Errors';
import Arbol from './Analyzer/Simbolo/Arbol';
import tablaSimbolo from './Analyzer/Simbolo/TablaSimbolo';

class Servidor {
    public aplicacion: Application;

    /*constructor() {
        this.aplicacion = express();
        this.configuracion();
        this.rutas();
    }/*


    
    /*configuracion(): any {
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
    }*/

        start():any{
            try{
                let parser = require('./Analyzer/grammar.js')
                let ast = new Arbol(parser.parse('ingresar jola como Entero con valor 6'))
                let tabla = new tablaSimbolo()
                ast.setTablaGlobal(tabla)
                ast.setConsola("")
                for(let i of ast.getInstrucciones()){
                    console.log(i)
                    var resultado = i.interpretar(ast, tabla)
                    if(resultado instanceof Errores) console.log(resultado)
                }
            }catch(e:any){
                console.log(e)
            }
        }
    }

//}

export const server = new Servidor();
server.start();