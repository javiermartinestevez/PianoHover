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
const database_1 = __importDefault(require("../database")); /*
import { jwt } from 'jsonwebtoken';
import { bcrypt } from 'bcryptjs' */
class AsientosController {
    constructor() {
        this.router = (0, express_1.Router)();
        /*     public async asientos (req: Request, res: Response): Promise<any> {
                const { id } = req.body;
                const usuario = await db.query("SELECT * FROM usuarios WHERE usuario = ?", [id]);
                if (usuario.length > 0) {
                    return res.json(usuario[0]);
                }
                res.status(404).json(usuario[0]);
            } */
        /* public async eliminarAsiento(req: Request, res: Response): Promise<void> {
            const { id } = req.params;
            await db.query('DELETE FROM asientos WHERE fila = ?', [id]);
            res.json({text: "ELiminado"+ req.params.id})
        } */
        /* public async modificarUsuario(req: Request, res: Response): Promise<void> {
            const { id } = req.params;
            await db.query('UPDATE usuarios SET ? WHERE usuario = ?', [req.body, id]);
            res.json({text: "Modificar"+ req.params.id})
        } */
    }
    listaAsientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const asientos = yield database_1.default.query("SELECT * FROM asientos WHERE idConcierto = ?", [id]);
            res.json(asientos);
        });
    }
    crearAsiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO asientos set ?', [req.body]);
            res.json({ text: "Creando asientos" });
        });
    }
}
exports.asientosController = new AsientosController();
