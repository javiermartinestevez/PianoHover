"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const conciertosRoutes_1 = __importDefault(require("./routes/conciertosRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const asientosRoutes_1 = __importDefault(require("./routes/asientosRoutes"));
const entradasRoutes_1 = __importDefault(require("./routes/entradasRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/conciertos', conciertosRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/asientos', asientosRoutes_1.default);
        this.app.use('/api/entradas', entradasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("puerto", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
