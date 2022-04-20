export interface Concierto {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  imagen: string;
  asientos: number;
  fecha_crt?: Date;
}
