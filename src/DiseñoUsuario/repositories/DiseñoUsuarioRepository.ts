import { DiseñoUsuarioDto } from "../Dto/DiseñoUsuarioDto";
import pool from "../config/db-config";

export class DiseñoUsuarioRepository {
  static async register(diseño: DiseñoUsuarioDto) {
    const sql = `INSERT INTO diseñoUsuario (color_prenda, dibujo, tipo, visibilidad) VALUES (?, ?, ?, ?)`;
    const values = [
      diseño.color_prenda,
      diseño.dibujo,
      diseño.tipo,
      diseño.visibilidad,
    ];
    const [resultDb]: any = await pool.query(sql, values);

    return {
      ...diseño,
      id_du: resultDb.insertId,
    };
  }
}
