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
        this.router.get('/vendido', asientosController_1.asientosController.conciertoMasVendido);
        this.router.get('/comprado', asientosController_1.asientosController.usuarioMasCompras);
        this.router.get('/mes', asientosController_1.asientosController.vendidoMes);
        this.router.get('/mespasado', asientosController_1.asientosController.vendidoMesPasado);
        this.router.get('/:id', asientosController_1.asientosController.listaAsientos);
        this.router.post('/todos', asientosController_1.asientosController.listaTodosAsientos);
        this.router.get('/', asientosController_1.asientosController.ultimoAsientos);
        this.router.post('/', asientosController_1.asientosController.crearAsiento);
        this.router.get('/usuario/:id', asientosController_1.asientosController.listaAsientosUsuario);
    }
}
const asientosRoutes = new AsientosRoutes();
exports.default = asientosRoutes.router;
