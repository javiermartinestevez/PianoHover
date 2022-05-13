import { Request, Response, Router } from 'express';
import db from '../database';

class AsientosController {

    public router: Router = Router();

    public async listaAsientos (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const asientos = await db.query("SELECT * FROM asientos WHERE idConcierto = ?", [id]);
        res.json(asientos);
    }
    public async listaTodosAsientos (req: Request, res: Response): Promise<void> {
        const asientos = await db.query("SELECT * FROM asientos");
        res.json(asientos);
    }
    public async ultimoAsientos (req: Request, res: Response): Promise<void> {
        const asientos = await db.query("SELECT * FROM asientos ORDER BY id DESC LIMIT 1");
        res.json(asientos);
    }

    public async crearAsiento(req: Request, res: Response): Promise<void> {
        await db.query('INSERT INTO asientos set ?', [req.body]); 
        res.json({text: "Creando asientos"})
    }


}

export const asientosController = new AsientosController();