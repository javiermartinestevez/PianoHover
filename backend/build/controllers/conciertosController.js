"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conciertosController = void 0;
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
class ConciertosController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conciertos = yield database_1.default.query("SELECT * FROM conciertos ORDER BY fecha DESC");
            res.json(conciertos);
        });
    }
    listaPublicos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conciertos = yield database_1.default.query("SELECT * FROM conciertos WHERE eliminado = 0 ORDER BY fecha DESC");
            res.json(conciertos);
        });
    }
    ultimoConcierto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conciertos = yield database_1.default.query("SELECT * FROM conciertos ORDER BY id DESC LIMIT 1");
            res.json(conciertos);
        });
    }
    concierto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const concierto = yield database_1.default.query("SELECT * FROM conciertos WHERE id = ?", [id]);
            if (concierto.length > 0) {
                return res.json(concierto[0]);
            }
            res.status(404).json(concierto[0]);
        });
    }
    crearConcierto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO conciertos SET ?', [req.body]);
            res.json({ text: "Creando concierto" });
        });
    }
    eliminarConcierto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE conciertos SET eliminado = 1 WHERE id = ?', [id]);
            res.json({ text: "ELiminado" + req.params.id });
        });
    }
    crearConciertoPublico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO conciertospublicos set ?', [req.body]);
            res.json({ text: "Creando conciertoPublico" });
        });
    }
    modificarConcierto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE conciertos SET ? WHERE id = ?', [req.body, id]);
            res.json({ text: "Modificar" + req.params.id });
        });
    }
    modificarConciertoPublico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE conciertospublicos SET ? WHERE id = ?', [req.body, id]);
            res.json({ text: "Modificar" + req.params.id });
        });
    }
}
exports.conciertosController = new ConciertosController();
