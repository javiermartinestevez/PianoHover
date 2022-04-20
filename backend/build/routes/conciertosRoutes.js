"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conciertosController_1 = require("../controllers/conciertosController");
class ConciertosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', conciertosController_1.conciertosController.lista);
        this.router.get('/:id', conciertosController_1.conciertosController.concierto);
        this.router.post('/', conciertosController_1.conciertosController.crearConcierto);
        this.router.delete('/:id', conciertosController_1.conciertosController.eliminarConcierto);
        this.router.put('/:id', conciertosController_1.conciertosController.modificarConcierto);
    }
}
const conciertosRoutes = new ConciertosRoutes();
exports.default = conciertosRoutes.router;
