import { Request, Response, Router } from 'express';
import db from '../database';

import bd from '../database';

class ConciertosController {

    public router: Router = Router();

    public async lista (req: Request, res: Response) {
        const conciertos = await db.query("SELECT * FROM conciertos");
        res.json(conciertos);
    }

    public async concierto (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const concierto = await db.query("SELECT * FROM conciertos WHERE id = ?", [id]);
        if (concierto.length > 0) {
            return res.json(concierto[0]);
        }
        res.status(404).json(concierto[0]);
    }

    public async crearConcierto(req: Request, res: Response): Promise<void> {
        await db.query('INSERT INTO conciertos set ?', [req.body]);
        res.json({text: "Creanr concierto"})
    }

    public async eliminarConcierto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM conciertos WHERE id = ?', [id]);
        res.json({text: "ELiminado"+ req.params.id})
    }
    public async modificarConcierto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE conciertos SET ? WHERE id = ?', [req.body, id]);
        res.json({text: "Modificar"+ req.params.id})
    }

}

export const conciertosController = new ConciertosController();