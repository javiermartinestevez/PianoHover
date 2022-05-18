import { Router } from "express";
import { asientosController } from "../controllers/asientosController";

class AsientosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:id', asientosController.listaAsientos);
        this.router.post('/todos', asientosController.listaTodosAsientos);
        this.router.get('/', asientosController.ultimoAsientos);
        this.router.post('/', asientosController.crearAsiento);
        this.router.get('/usuario/:id', asientosController.listaAsientosUsuario);
    }
}

const asientosRoutes = new AsientosRoutes();
export default asientosRoutes.router;