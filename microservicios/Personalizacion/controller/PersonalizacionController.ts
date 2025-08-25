import { PersonalizacionRepository } from "../repositories/PersonalizacionRepository";
import { PersonalizacionDto } from "../Dto/PersonalizacionDto";
import { Request, Response } from "express";

export class PersonalizacionController {
  static async createPersonalizacion(req: Request, res: Response) {
    try {
      const {
        color,
        fk_id_du,
        parte_prenda_camisa,
        parte_prenda_pantalon,
        parte_prenda_gorra,
      } = req.body;

      const newPersonalizacion = new PersonalizacionDto(
        color,
        fk_id_du,
        parte_prenda_camisa,
        parte_prenda_pantalon,
        parte_prenda_gorra,
      );

      const createPersonalizacion = await PersonalizacionRepository.createPersonalizacion(newPersonalizacion);

      return res.status(200).json({
        message: "Personalización creada exitosamente",
        personalizacion: createPersonalizacion,
      })
    } catch (error: any) {
      console.error("Error al crear la personalización:", error);
      
      // Manejar errores específicos
      if (error.message.includes("no existe")) {
        return res.status(400).json({ 
          message: "Error de validación", 
          error: error.message 
        });
      }
      
      if (error.message.includes("requerido")) {
        return res.status(400).json({ 
          message: "Datos faltantes", 
          error: error.message 
        });
      }
      
      // Error de clave foránea de MySQL
      if (error.message.includes("foreign key constraint fails")) {
        return res.status(400).json({ 
          message: "Error de referencia: El diseño de usuario especificado no existe", 
          error: "Verifique que el ID del diseño de usuario sea válido" 
        });
      }
      
      return res.status(500).json({ 
        message: "Error interno del servidor", 
        error: "Error al crear la personalización" 
      });
    }
  }
}
