"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asientosController_1 = require("../controllers/asientosController");
class AsientosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', asientosController_1.asientosController.listaAsientos);
        this.router.post('/', asientosController_1.asientosController.crearAsiento);
        /*       this.router.post('/login/:user', usuariosController.loginUsuario);
      
              this.router.get('/:id', usuariosController.usuario);
              this.router.delete('/:id', usuariosController.eliminarUsuario);
              this.router.put('/:id', usuariosController.modificarUsuario); */
    }
}
const asientosRoutes = new AsientosRoutes();
exports.default = asientosRoutes.router;
