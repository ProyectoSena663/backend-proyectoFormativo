import pool from "../config/config-db";

export class DisenoRepository {
  static async getUsersAndDesign() {
    const sql = `
        SELECT 
            u.nombre AS nombre_usuario,
            d.id_dis AS id_diseño,
            du.color_prenda AS color_prenda
        FROM Usuario u
        JOIN DisenoUsuario du ON u.id_us = du.fk_id_usuario
        JOIN Diseño d ON du.id_du = d.fk_id_du
    `;
    const [resultDb]: any = await pool.query(sql);
    return resultDb;
  }
}
