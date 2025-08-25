import { PersonalizacionController } from "../controller/PersonalizacionController";
import { Router } from "express";

const router = Router();

const personalizacionController = new PersonalizacionController();

router.post("/createPersonalizacion", PersonalizacionController.createPersonalizacion.bind(personalizacionController));

export default router;