export interface Concierto {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  imagen: string;
  precioNormal: number;
  precioVIP: number;
  asientos: number;
  fecha_crt?: Date;
  eliminado: number;
}
