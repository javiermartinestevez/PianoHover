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
        const bcryptjs = require('bcryptjs');
        let dateStamp = Math.floor((new Date).getTime() / 1000);
        const { username, password } = req.body;
        const usuario = await db.query("SELECT * FROM usuarios WHERE usuario = ?", [username]);
        if (usuario.length > 0) {
            let comparar = bcryptjs.compare(password, usuario[0].password)
            if(comparar){
                const sign = require('jwt-encode');
                const secret = keys.secret;
                const data = {
                    id: usuario[0].id,
                    rol: usuario[0].rol,
                    iat: dateStamp,
                    exp: dateStamp+1800
                };
                const jwt = sign(data, secret);
                res.status(200).json(jwt);
                return jwt;
            }
        }
        res.status(404).json(usuario[0]);
    }

    public async usuario(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const usuario = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        if (usuario.length > 0) {
            return res.json(usuario[0]);
        }
        res.status(404).json(usuario[0]);
    }

    public async crearUsuario(req: Request, res: Response): Promise<void> {
        const bcryptjs = require('bcryptjs');
        req.body.password = await bcryptjs.hash(req.body.password, 8);
        await db.query('INSERT INTO usuarios set ?', [req.body]);
        res.json({ text: "Creando usuario",hash: req.body.password })
    }

    public async eliminarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json({ text: "ELiminado" + req.params.id })
    }

    public async modificarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE usuarios SET ? WHERE id = ?', [req.body, id]);
        res.json({ text: "Modificar" + req.params.id })
    }

}

export const usuariosController = new UsuariosController();