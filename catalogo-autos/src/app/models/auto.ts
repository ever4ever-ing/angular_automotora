export interface Auto {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  imagen: string;
  imagenes?: string[];
  color: string;
  kilometraje: number;
  descripcion?: string;
}