import { DisenoController } from "../controllers/Diseno.controller";
import { Router } from "express";

const router = Router()
const disenoController = new DisenoController()

router.get("/getUserDesigns", DisenoController.getAllUserDesigns.bind(disenoController));

export default router;