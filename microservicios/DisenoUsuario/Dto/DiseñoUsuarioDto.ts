export class DiseñoUsuarioDto {
  id_du?: string;
  color_prenda: string;
  dibujo: boolean;
  tipo: "Camiseta" | "Camisa" | "Camibuso" | "Buso" | "Saco" | "Esqueleto";
  visibilidad: "Publico" | "Privado";
  fk_id_usuario?: number;
  fecha_creacion?: Date;

  constructor(
    color_prenda: string,
    dibujo: boolean,
    tipo: "Camiseta" | "Camisa" | "Camibuso" | "Buso" | "Saco" | "Esqueleto",
    visibilidad: "Publico" | "Privado",
    fk_id_usuario?: number,
    fecha_creacion?: Date,
  ) {
    this.color_prenda = color_prenda;
    this.dibujo = dibujo;
    this.tipo = tipo;
    this.visibilidad = visibilidad;
    this.fk_id_usuario = fk_id_usuario;
    this.fecha_creacion = fecha_creacion;
  }
}
