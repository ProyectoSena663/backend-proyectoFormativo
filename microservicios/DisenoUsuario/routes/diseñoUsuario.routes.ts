import { DiseñoUsuarioController } from "../controllers/DiseñoUsuario.controller";
import { Router } from "express";

const diseñoUsuarioController = new DiseñoUsuarioController();

const router = Router();
router.post(
  "/register",
  DiseñoUsuarioController.registerProduct.bind(diseñoUsuarioController)
);
router.get(
  "/getDesigns",
  DiseñoUsuarioController.getUsers.bind(diseñoUsuarioController)
);
router.get(
  "/getDesigns/:id",
  DiseñoUsuarioController.getUsersById.bind(diseñoUsuarioController)
);
router.put(
  "/updateDesign/:id",
  DiseñoUsuarioController.updateDesign.bind(diseñoUsuarioController)
);
router.delete(
  "/deleteDesign/:id",
  DiseñoUsuarioController.deleteDesign.bind(diseñoUsuarioController)
);

export default router;
