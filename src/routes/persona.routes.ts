import { Router } from "express";
import {
  crearPersonalizacion,
  obtenerPersonalizaciones,
  obtenerPersonalizacionesId,
  eliminarPersonalizacionesId,
  actualizarPersonalizacionesId,
} from "../controllers/persona.controller";
import { schemaValidator } from "../middlewares/schemaValidator-middleware";
import { personalizacionSchema } from "../schemas/personalizacionSchema";

const router = Router();

router.post("/", schemaValidator(personalizacionSchema), crearPersonalizacion);
router.get(
  "/",
  schemaValidator(personalizacionSchema),
  obtenerPersonalizaciones
);
router.get(
  "/:id",
  schemaValidator(personalizacionSchema),
  obtenerPersonalizacionesId
);
router.delete(
  "/:id",
  schemaValidator(personalizacionSchema),
  eliminarPersonalizacionesId
);
router.put(
  "/:id",
  schemaValidator(personalizacionSchema),
  actualizarPersonalizacionesId
);

export default router;
