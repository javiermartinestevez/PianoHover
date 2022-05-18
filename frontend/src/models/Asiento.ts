export interface Asiento {
  id?: number;
  letra: string;
  fila: number;
  idConcierto: number;
  idUsuario: number;
  fecha_crt?: Date;
  idTransaccion: string;
}
