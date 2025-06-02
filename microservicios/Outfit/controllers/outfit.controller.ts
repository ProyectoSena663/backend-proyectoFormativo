import { Request, Response } from "express";
import { OutfitDTO } from "../DTO/outfitDto";
import { OutfitRepository } from "../repositories/outfitRepository";

export class OutfitController {
    static async obtenerOutfits(req: Request, res: Response): Promise<void> {
        try{
            const [outfits] = await OutfitRepository.getOutfits();
            res.status(200).json(outfits[0]);
        }catch(error:any){
            console.error(`error al obtener todos los outfits: ${error.message}`);
            res.status(500).json({message: "error del servidor"});
        }
    }

    static async obtenerOutfitPorId(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            const [outfit] = await OutfitRepository.getOutfitsById(Number(id));

            if (outfit.length <= 0){
                res.status(404).send({ message: "el outfit no existe" });
            }

            res.status(200).json(outfit[0]);
        }catch(error:any){
            console.error(`error al obtener el outfit por id: ${error.message}`);
            res.status(500).json({message: "error del servidor"});
        }
    }

    static async crearOutfit(req: Request, res: Response): Promise<void> {
        try{
            const outfitDto: OutfitDTO = req.body;
            const [outfit]: any = await OutfitRepository.createOutfit(outfitDto);
            res.status(200).json(outfit);
        }catch(error:any){
            console.error(`error al crear el outfit: ${error.message}`);
            res.status(500).json({message: "error del servidor"});
        }
    }
}
