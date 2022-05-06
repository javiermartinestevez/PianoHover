import { Router } from "express";
import { usuariosController } from "../controllers/usuariosController";

class ConciertosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', usuariosController.listaUsuarios);

        this.router.post('/login', usuariosController.loginUsuario);
        this.router.post('/', usuariosController.crearUsuario);

        this.router.get('/:id', usuariosController.usuario);
        this.router.delete('/:id', usuariosController.eliminarUsuario);
        this.router.put('/:id', usuariosController.modificarUsuario);
    }
}

const conciertosRoutes = new ConciertosRoutes();
export default conciertosRoutes.router;