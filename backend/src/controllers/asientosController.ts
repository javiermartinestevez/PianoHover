import { Request, Response, Router } from 'express';
import db from '../database';

class AsientosController {

    public router: Router = Router();

    public async listaAsientos (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const asientos = await db.query("SELECT * FROM asientos WHERE idConcierto = ?", [id]);
        res.json(asientos);
    }
    public async listaAsientosUsuario (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const asientos = await db.query("SELECT * FROM asientos WHERE idUsuario = ?", [id]);
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

    public async conciertoMasVendido (req: Request, res: Response): Promise<void> {
        const asientos = await db.query("SELECT idConcierto, COUNT(*) as cantidad FROM asientos GROUP BY idConcierto ORDER BY idConcierto DESC LIMIT 1");
        res.json(asientos);
    }

    public async usuarioMasCompras (req: Request, res: Response): Promise<void> {
        const asientos = await db.query("SELECT idUsuario, COUNT(*) as cantidad FROM asientos GROUP BY idUsuario ORDER BY idUsuario ASC LIMIT 1");
        res.json(asientos);
    }
    public async vendidoMes (req: Request, res: Response): Promise<void> {
        let fechaActual = new Date();
        let mes = fechaActual.getMonth();
        let year = fechaActual.getFullYear();
        const asientos = await db.query("SELECT COUNT(*) as cantidad FROM asientos WHERE MONTH(fecha_crt) = ? AND YEAR(fecha_crt) = ?", [mes+1, year]);
        res.json(asientos);
    }
    public async vendidoMesPasado (req: Request, res: Response): Promise<void> {
        let fechaActual = new Date();
        let mes = fechaActual.getMonth();
        let year = fechaActual.getFullYear();
        const asientos = await db.query("SELECT COUNT(*) as cantidad FROM asientos WHERE MONTH(fecha_crt) = ? AND YEAR(fecha_crt) = ?", [mes, year]);
        res.json(asientos);
    }


}

export const asientosController = new AsientosController();