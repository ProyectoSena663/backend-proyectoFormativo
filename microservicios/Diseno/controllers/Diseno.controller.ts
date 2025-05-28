import { Request, Response } from "express";
import { DisenoRepository } from "../repositories/disenoRepository";

export class DisenoController {
  static async getAllUserDesigns(req: Request, res: Response) {
    try {
      const designs = await DisenoRepository.getUsersAndDesign();

      if (!designs || designs.length === 0) {
        res.status(404).json({ message: "No se encontraron diseños" });
        return;
      }

      res.status(200).json(designs);
    } catch (error) {
      console.error("Error al obtener diseños:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
