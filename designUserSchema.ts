export interface DiseñoUsuario{
    id_du : number,
    color_prenda: string,
    dibujo_diseño_prenda : string,
    fecha_creacion: Date,
    tipo: string,
    visibilidad: string,
    fk_id_usuario: number,
}