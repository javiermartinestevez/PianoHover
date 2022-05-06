"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class ConciertosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuariosController_1.usuariosController.listaUsuarios);
        this.router.post('/login', usuariosController_1.usuariosController.loginUsuario);
        this.router.post('/', usuariosController_1.usuariosController.crearUsuario);
        this.router.get('/:id', usuariosController_1.usuariosController.usuario);
        this.router.delete('/:id', usuariosController_1.usuariosController.eliminarUsuario);
        this.router.put('/:id', usuariosController_1.usuariosController.modificarUsuario);
    }
}
const conciertosRoutes = new ConciertosRoutes();
exports.default = conciertosRoutes.router;
