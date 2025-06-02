import { OutfitController } from "../controllers/outfit.controller";
import { Router } from "express";

const outfitController = new OutfitController();
const router = Router();

router.get("/obtenerOutfits", OutfitController.obtenerOutfits.bind(outfitController));
router.get("/obtenerOutfit/:id", OutfitController.obtenerOutfitPorId.bind(outfitController));
router.post("/crearOutfit", OutfitController.crearOutfit.bind(outfitController));

export default router;