export class DiseñoUsuarioDto {
  id_du?: string;
  color_prenda: string;
  dibujo: boolean;
  tipo: "Camiseta" | "Camisa" | "Camibuso" | "Buso" | "Saco" | "Esqueleto";
  visibilidad: "Publico" | "Privado";
  fecha_creacion?: Date;
  fk_id_usuario?: number;

  constructor(
    color_prenda: string,
    dibujo: boolean,
    tipo: "Camiseta" | "Camisa" | "Camibuso" | "Buso" | "Saco" | "Esqueleto",
    visibilidad: "Publico" | "Privado",
    fecha_creacion?: Date,
    fk_id_usuario?: number
  ) {
    this.color_prenda = color_prenda;
    this.dibujo = dibujo;
    this.tipo = tipo;
    this.visibilidad = visibilidad;
    this.fecha_creacion = fecha_creacion;
    this.fk_id_usuario = fk_id_usuario;
  }
}
