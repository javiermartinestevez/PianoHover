import { Request, Response, Router } from 'express';
import db from '../database';/* 
import { jwt } from 'jsonwebtoken';
import { bcrypt } from 'bcryptjs' */

class AsientosController {

    public router: Router = Router();

    public async listaAsientos (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const asientos = await db.query("SELECT * FROM asientos WHERE idConcierto = ?", [id]);
        res.json(asientos);
    }


/*     public async asientos (req: Request, res: Response): Promise<any> {
        const { id } = req.body;
        const usuario = await db.query("SELECT * FROM usuarios WHERE usuario = ?", [id]);
        if (usuario.length > 0) {
            return res.json(usuario[0]);
        }
        res.status(404).json(usuario[0]);
    } */

/*     public async crearAsiento(req: Request, res: Response): Promise<void> {
        await db.query('INSERT INTO asientos set ?', [req.body]);
        res.json({text: "Creando asientos"})
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

export const asientosController = new AsientosController();