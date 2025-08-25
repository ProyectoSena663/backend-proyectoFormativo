import { PersonalizacionDto } from "../Dto/PersonalizacionDto";
import pool from "../config/db-config";

export class PersonalizacionRepository {
  // Validar si existe el diseño de usuario
  static async validateDisenUsuarioExists(fk_id_du: number): Promise<boolean> {
    try {
      const [rows]: any = await pool.query(
        "SELECT id_du FROM disenousuario WHERE id_du = ?",
        [fk_id_du]
      );
      return rows.length > 0;
    } catch (error) {
      console.error("Error al validar diseño de usuario:", error);
      return false;
    }
  }

  static async createPersonalizacion(personalizacion: PersonalizacionDto) {
    // Validar que fk_id_du no sea null o undefined
    if (!personalizacion.fk_id_du) {
      throw new Error("El ID del diseño de usuario es requerido");
    }

    // Validar que el diseño de usuario exista
    const existeDiseno = await this.validateDisenUsuarioExists(personalizacion.fk_id_du);
    if (!existeDiseno) {
      throw new Error(`El diseño de usuario con ID ${personalizacion.fk_id_du} no existe`);
    }

    const [result]: any = await pool.query(
      "INSERT INTO Personalizacion (color, fk_id_du, parte_prenda_camisa, parte_prenda_pantalon, parte_prenda_gorra) VALUES (?, ?, ?, ?, ?)",
      [
        personalizacion.color,
        personalizacion.fk_id_du,
        personalizacion.parte_prenda_camisa || null,
        personalizacion.parte_prenda_pantalon || null,
        personalizacion.parte_prenda_gorra || null,
      ]
    );

    return {
      ...personalizacion,
      id_per: result.insertId,
    };
  }
}
