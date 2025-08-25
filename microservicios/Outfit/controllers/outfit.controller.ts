import { Request, Response } from "express";
import { OutfitDTO } from "../DTO/outfitDto";
import { OutfitRepository } from "../repositories/outfitRepository";

export class OutfitController {
    static async obtenerOutfits(req: Request, res: Response): Promise<void> {
        try{
            const outfits = await OutfitRepository.getOutfits();
            
            // Verificar si hay outfits disponibles
            if (!outfits || outfits.length === 0) {
                res.status(404).json({
                    message: "No se encontraron outfits para este usuario",
                    data: []
                });
                return;
            }
            
            res.status(200).json({
                message: "Outfits obtenidos exitosamente",
                data: outfits
            });
        }catch(error:any){
            console.error(`error al obtener todos los outfits: ${error.message}`);
            res.status(500).json({message: "error del servidor"});
        }
    }
}
