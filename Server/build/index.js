"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
//import morgan from 'morgan';
const Errors_1 = __importDefault(require("./Analyzer/Errors/Errors"));
const Arbol_1 = __importDefault(require("./Analyzer/Simbolo/Arbol"));
const TablaSimbolo_1 = __importDefault(require("./Analyzer/Simbolo/TablaSimbolo"));
class Servidor {
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
    start() {
        try {
            let parser = require('./Analyzer/grammar.js');
            let ast = new Arbol_1.default(parser.parse('ingresar jola como Entero con valor 6'));
            let tabla = new TablaSimbolo_1.default();
            ast.setTablaGlobal(tabla);
            ast.setConsola("");
            for (let i of ast.getInstrucciones()) {
                console.log(i);
                var resultado = i.interpretar(ast, tabla);
                if (resultado instanceof Errors_1.default)
                    console.log(resultado);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}
//}
exports.server = new Servidor();
exports.server.start();
