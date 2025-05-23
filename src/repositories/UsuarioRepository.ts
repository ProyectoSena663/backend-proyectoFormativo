import { UserDto } from "../Dto/UserDto";
import pool from "../config/db-config";
import bycrpt from "bcryptjs";

export class UsuarioRepository {
  static async createUser(user: UserDto) {
    const hashedPassword = await bycrpt.hash(user.password!, 10);
    const sql = `INSERT INTO usuario (nombre, apellido, fecha_nacimiento, red_social_login, password) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      user.nombre,
      user.apellido,
      user.fecha_nacimiento,
      user.red_social_login,
      hashedPassword,
    ];

    const [resultDb]: any = await pool.query(sql, values);

    return {
      ...user,
      id_us: resultDb.insertId,
    };
  }

  static async findByNameandLastName(nombre: string, apellido: string) {
    const sql = `SELECT * FROM usuario WHERE nombre = ? AND apellido = ?`;
    const values = [nombre, apellido];

    const [resultDb]: any = await pool.query(sql, values);

    if (resultDb.length === 0) {
      return null;
    }

    return resultDb[0];
  }
}
