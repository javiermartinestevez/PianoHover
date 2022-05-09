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
exports.usuariosController = void 0;
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
const keys_1 = __importDefault(require("../keys"));
class UsuariosController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    listaUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query("SELECT * FROM usuarios");
            res.json(usuarios);
        });
    }
    loginUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dateStamp = Math.floor((new Date).getTime() / 1000);
            const { username, password } = req.body;
            const usuario = yield database_1.default.query("SELECT * FROM usuarios WHERE usuario = ? AND password = ?", [username, password]);
            if (usuario.length > 0) {
                const sign = require('jwt-encode');
                const secret = keys_1.default.secret;
                const data = {
                    id: usuario[0].id,
                    iat: dateStamp,
                    exp: dateStamp + 1
                };
                const jwt = sign(data, secret);
                res.status(200).json(jwt);
                return jwt;
            }
            res.status(404).json(usuario[0]);
        });
    }
    usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const usuario = yield database_1.default.query("SELECT * FROM usuarios WHERE usuario = ?", [id]);
            if (usuario.length > 0) {
                return res.json(usuario[0]);
            }
            res.status(404).json(usuario[0]);
        });
    }
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO usuarios set ?', [req.body]);
            res.json({ text: "Creando usuario" });
        });
    }
    eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM usuarios WHERE usuario = ?', [id]);
            res.json({ text: "ELiminado" + req.params.id });
        });
    }
    modificarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE usuarios SET ? WHERE usuario = ?', [req.body, id]);
            res.json({ text: "Modificar" + req.params.id });
        });
    }
}
exports.usuariosController = new UsuariosController();
