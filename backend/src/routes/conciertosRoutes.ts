import { Router } from "express";
import { conciertosController } from "../controllers/conciertosController";

class ConciertosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', conciertosController.lista);
        this.router.get('/:id', conciertosController.concierto);
        this.router.post('/', conciertosController.crearConcierto);
        this.router.delete('/:id', conciertosController.eliminarConcierto);
        this.router.put('/:id', conciertosController.modificarConcierto);
    }
}

const conciertosRoutes = new ConciertosRoutes();
export default conciertosRoutes.router;