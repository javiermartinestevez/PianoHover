import { Router } from "express";
import { asientosController } from "../controllers/asientosController";

class AsientosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:id', asientosController.listaAsientos);
        this.router.post('/', asientosController.crearAsiento);

  /*       this.router.post('/login/:user', usuariosController.loginUsuario);

        this.router.get('/:id', usuariosController.usuario);
        this.router.delete('/:id', usuariosController.eliminarUsuario);
        this.router.put('/:id', usuariosController.modificarUsuario); */
    }
}

const asientosRoutes = new AsientosRoutes();
export default asientosRoutes.router;