import { Request, Response } from "express";
import { DiseñoUsuarioDto } from "../Dto/DiseñoUsuarioDto";
import { DiseñoUsuarioRepository } from "../repositories/DiseñoUsuarioRepository";

export class DiseñoUsuarioController {
  static async registerProduct(req: Request, res: Response) {
    try {
      const { color_prenda, dibujo, tipo, visibilidad, fk_id_usuario } =
        req.body;

      const diseño = new DiseñoUsuarioDto(
        color_prenda,
        dibujo,
        tipo,
        visibilidad,
        fk_id_usuario
      );

      const newDiseño = await DiseñoUsuarioRepository.register(diseño);

      res.status(201).json({
        message: "Diseño registrado exitosamente",
        diseño: {
          id_du: newDiseño.id_du,
          color_prenda: newDiseño.color_prenda,
          dibujo: newDiseño.dibujo,
          tipo: newDiseño.tipo,
          visibilidad: newDiseño.visibilidad,
          fecha_creacion: newDiseño.fecha_creacion,
          fk_id_usuario: newDiseño.fk_id_usuario,
        },
      });
    } catch (error) {
      console.error("Error registering diseño:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const design = await DiseñoUsuarioRepository.getDesigns();

      if (!design) {
        res.status(404).json({
          message: "No designs found",
        });
        return;
      }

      res.status(200).json({
        design,
      });
    } catch (error) {
      console.error("Error getting designs:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async getUsersById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const designId = await DiseñoUsuarioRepository.getDesignsById(Number(id));

      if (!designId) {
        res.status(404).json({
          message: "No design found",
        });
      }

      res.status(200).json({
        designId,
      });
    } catch (error) {
      console.error("Error getting designs:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async updateDesign(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const camposAct = req.body;

      const columns = [];
      const values = [];

      for (let [key, value] of Object.entries(camposAct)) {
        if (value !== undefined && value !== null && value !== "") {
          columns.push(`${key} = ?`);
          values.push(value);
        }

        if (columns.length === 0) {
          res.status(400).json({
            message: "No fields to update",
          });
          return;
        }
      }

      const sql = `UPDATE disenoUsuario SET ${columns.join(
        ", "
      )} WHERE id_du = ?`;
      values.push(id);
      const resultDb = await DiseñoUsuarioRepository.update(sql, values);

      res.status(200).json({
        message: "Design updated successfully",
        user: {
          id: id,
          result: resultDb,
          ...camposAct,
        },
      });
    } catch (error) {
      console.error("Error updating design:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async deleteDesign(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resultDb = await DiseñoUsuarioRepository.delete(Number(id));

      if (resultDb.affectedRows === 0) {
        res.status(404).json({
          message: "Design not found",
        });
        return;
      }

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
