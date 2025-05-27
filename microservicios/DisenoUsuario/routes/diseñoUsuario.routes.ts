import { DiseñoUsuaropController } from "../controllers/DiseñoUsuario.controller";
import { Router } from "express";

const router = Router();
router.post("/register", DiseñoUsuaropController.registerProduct);

export default router;
