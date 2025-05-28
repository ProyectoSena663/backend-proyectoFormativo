import pool from "../config/config-db";

export class DisenoRepository {
  static async getUsersAndDesign() {
    const sql = `
    SELECT 
    u.nombre AS nombre_usuario,
    du.id_du AS id_disenousuario,
    du.color_prenda,
    du.tipo,
    du.visibilidad,
    du.fecha_creacion
    FROM DisenoUsuario du
    JOIN Usuario u ON du.fk_id_usuario = u.id_us
    WHERE u.id_us = 1;
    `;
    const [resultDb]: any = await pool.query(sql);
    return resultDb;
  }
}
