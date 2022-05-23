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
exports.asientosController = void 0;
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
class AsientosController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    listaAsientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const asientos = yield database_1.default.query("SELECT * FROM asientos WHERE idConcierto = ?", [id]);
            res.json(asientos);
        });
    }
    listaAsientosUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const asientos = yield database_1.default.query("SELECT * FROM asientos WHERE idUsuario = ?", [id]);
            res.json(asientos);
        });
    }
    listaTodosAsientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const asientos = yield database_1.default.query("SELECT * FROM asientos");
            res.json(asientos);
        });
    }
    ultimoAsientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const asientos = yield database_1.default.query("SELECT * FROM asientos ORDER BY id DESC LIMIT 1");
            res.json(asientos);
        });
    }
    crearAsiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO asientos set ?', [req.body]);
            res.json({ text: "Creando asientos" });
        });
    }
    conciertoMasVendido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const asientos = yield database_1.default.query("SELECT idConcierto, COUNT(*) as cantidad FROM asientos GROUP BY idConcierto ORDER BY idConcierto DESC LIMIT 1");
            res.json(asientos);
        });
    }
    usuarioMasCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const asientos = yield database_1.default.query("SELECT idUsuario, COUNT(*) as cantidad FROM asientos GROUP BY idUsuario ORDER BY idUsuario ASC LIMIT 1");
            res.json(asientos);
        });
    }
}
exports.asientosController = new AsientosController();
