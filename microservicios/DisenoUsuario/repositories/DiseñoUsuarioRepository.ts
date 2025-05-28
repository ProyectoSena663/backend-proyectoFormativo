import { DiseñoUsuarioDto } from "../Dto/DiseñoUsuarioDto";
import pool from "../config/db-config";

export class DiseñoUsuarioRepository {
  static async register(diseño: DiseñoUsuarioDto) {
    const sql = `INSERT INTO disenoUsuario (color_prenda, dibujo, tipo, visibilidad, fk_id_usuario) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      diseño.color_prenda,
      diseño.dibujo,
      diseño.tipo,
      diseño.visibilidad,
      diseño.fk_id_usuario
    ];
    const [resultDb]: any = await pool.query(sql, values);

    return {
      ...diseño,
      id_du: resultDb.insertId,
    };
  }

  static async getDesigns() {
    const sql = "SELECT * FROM disenoUsuario";

    const [resultDb]: any = await pool.query(sql, []);

    if (resultDb.length === 0) {
      return null;
    }

    return resultDb;
  }

  static async getDesignsById(id: number) {
    const sql = "SELECT * FROM disenoUsuario WHERE id_du = ?";
    const value = [id];

    const [resultDb]: any = await pool.query(sql, value);

    if (resultDb.length === 0) {
      return null;
    }

    return resultDb[0];
  }

  static async update(sql: string, values: any[]) {
    const [resultDb]: any = await pool.query(sql, values);

    if (resultDb.affectedRows === 0) {
      return null;
    }

    return resultDb;
  }

  static async delete(id:number){
    const sql = "DELETE FROM disenoUsuario WHERE id_du = ?"
    const values = [id]

    const [resultDb]:any = await pool.query(sql, values)
    
    if(resultDb.affectedRows === 0){
      return null
    }

    return resultDb
  }
}
