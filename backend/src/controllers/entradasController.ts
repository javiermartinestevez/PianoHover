import { Request, Response, Router } from 'express';
import db from '../database';

class EntradasController {

    public router: Router = Router();

    public async listaEntradas (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const entradas = await db.query("SELECT * FROM entrada WHERE idUsuario = ?", [id]);
        res.json(entradas);
    }

    public async crearEntrada(req: Request, res: Response): Promise<void> {
        await db.query('INSERT INTO entrada set ?', [req.body]);
        res.json({text: "Creando entradas"})
    }


}

export const entradasController = new EntradasController();