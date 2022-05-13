import { Router } from "express";
import { entradasController } from "../controllers/entradasController";

class EntradasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:id', entradasController.listaEntradas);
        this.router.post('/', entradasController.crearEntrada);
    }
}

const entradasRoutes = new EntradasRoutes();
export default entradasRoutes.router;