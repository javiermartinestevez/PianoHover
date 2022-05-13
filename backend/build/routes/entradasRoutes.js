"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entradasController_1 = require("../controllers/entradasController");
class EntradasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', entradasController_1.entradasController.listaEntradas);
        this.router.post('/', entradasController_1.entradasController.crearEntrada);
    }
}
const entradasRoutes = new EntradasRoutes();
exports.default = entradasRoutes.router;
