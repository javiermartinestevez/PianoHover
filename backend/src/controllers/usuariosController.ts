import { Request, Response, Router } from 'express';
import db from '../database';
import keys from '../keys';

class UsuariosController {

    public router: Router = Router();

    public async listaUsuarios(req: Request, res: Response) {
        const usuarios = await db.query("SELECT * FROM usuarios");
        res.json(usuarios);
    }

    public async loginUsuario(req: Request, res: Response): Promise<any> {
        let dateStamp = Math.floor((new Date).getTime() / 1000);
        const { username, password } = req.body;
        const usuario = await db.query("SELECT * FROM usuarios WHERE usuario = ? AND password = ?", [username, password]);
        if (usuario.length > 0) {
            const sign = require('jwt-encode');
            const secret = keys.secret;
            const data = {
                id: usuario[0].id,
                iat: dateStamp,
                exp: dateStamp+1
            };
            const jwt = sign(data, secret);
            res.status(200).json(jwt);
            return jwt;

        }
        res.status(404).json(usuario[0]);
    }

    public async usuario(req: Request, res: Response): Promise<any> {
        const { id } = req.body;
        const usuario = await db.query("SELECT * FROM usuarios WHERE usuario = ?", [id]);
        if (usuario.length > 0) {
            return res.json(usuario[0]);
        }
        res.status(404).json(usuario[0]);
    }

    public async crearUsuario(req: Request, res: Response): Promise<void> {
        await db.query('INSERT INTO usuarios set ?', [req.body]);
        res.json({ text: "Creando usuario" })
    }

    public async eliminarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM usuarios WHERE usuario = ?', [id]);
        res.json({ text: "ELiminado" + req.params.id })
    }

    public async modificarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE usuarios SET ? WHERE usuario = ?', [req.body, id]);
        res.json({ text: "Modificar" + req.params.id })
    }

}

export const usuariosController = new UsuariosController();