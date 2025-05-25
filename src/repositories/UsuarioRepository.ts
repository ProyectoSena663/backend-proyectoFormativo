import { UserDto } from "../Dto/UserDto";
import pool from "../config/db-config";
import bycrpt from "bcryptjs";

export class UsuarioRepository {
  static async createUser(user: UserDto) {
    const hashedPassword = await bycrpt.hash(user.password!, 10);
    const sql = `INSERT INTO usuario (nombre, apellido, email, fecha_nacimiento, red_social_login, password) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      user.nombre,
      user.apellido,
      user.email,
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

  static async findUser() {
    const sql = `SELECT * FROM usuario`;

    const [resultDb]: any = await pool.query(sql, []);

    if (resultDb.length === 0) {
      return null;
    }

    return resultDb;
  }

  static async findUserById(id: number) {
    const sql = `SELECT * FROM usuario WHERE id_us = ?`;
    const values = [id];

    const [resultDb]: any = await pool.query(sql, values);

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

  static async delete(id: number) {
    const query = `DELETE FROM usuario WHERE id_us = ?`;
    const values = [id];

    const [resultDb]: any = await pool.query(query, values);
    return resultDb;

  }

  static async findByEmail(email: string) {
    const sql = `SELECT * FROM usuario WHERE email = ?`;
    const values = [email];

    const [resultDb]: any = await pool.query(sql, values);

    if (resultDb.length === 0) {
      return null;
    }

    return resultDb[0];
  }

  static async verifyPassword(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      return false;
    }

    return bycrpt.compare(password, user.password);
  }
}
