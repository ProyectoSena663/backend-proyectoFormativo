import { Router } from "express";
import {
  obtenerUsuarios,
  obtenerUsuariosId,
  eliminarUsuariosId,
  actualizarUsuariosId,
} from "../controllers/user.controller";
import { diseñoSchema } from "../schemas/diseñoSchema";
import { schemaValidator } from "../middlewares/schemaValidator-middleware";

const router = Router();

router.get("/", schemaValidator(diseñoSchema), obtenerUsuarios);
router.get("/:id", schemaValidator(diseñoSchema), obtenerUsuariosId);
router.delete("/:id", schemaValidator(diseñoSchema), eliminarUsuariosId);
router.put("/:id", schemaValidator(diseñoSchema), actualizarUsuariosId);

export default router;
