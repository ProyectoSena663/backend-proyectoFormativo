import { Request, Response } from "express";
import { DiseñoUsuarioDto } from "../Dto/DiseñoUsuarioDto";
import { DiseñoUsuarioRepository } from "../repositories/DiseñoUsuarioRepository";

export class DiseñoUsuaropController {
  static async registerProduct(req: Request, res: Response) {
    try {
      const { color_prenda, dibujo, tipo, visibilidad } = req.body;

      const diseño = new DiseñoUsuarioDto(
        color_prenda,
        dibujo,
        tipo,
        visibilidad
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
        },
      });
    } catch (error) {
      console.error("Error registering diseño:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
