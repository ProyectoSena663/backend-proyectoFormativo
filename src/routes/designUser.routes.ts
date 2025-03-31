import { Router } from "express";
import {
  crearDesignUser,
  obtenerDesignUser,
  obtenerDesignUserId,
  eliminarDesignUserId,
  actualizarDesignUserId,
} from "../controllers/designUser.controller";
import { schemaValidator } from "../middlewares/schemaValidator-middleware";
import { diseñoUsuarioSchema } from "../schemas/diseñoUsuarioSchema";

const router = Router();

router.post("/", schemaValidator(diseñoUsuarioSchema), crearDesignUser);
router.get("/", schemaValidator(diseñoUsuarioSchema), obtenerDesignUser);
router.get("/:id", schemaValidator(diseñoUsuarioSchema), obtenerDesignUserId);
router.delete(
  "/:id",
  schemaValidator(diseñoUsuarioSchema),
  eliminarDesignUserId
);
router.put(
  "/:id",
  schemaValidator(diseñoUsuarioSchema),
  actualizarDesignUserId
);

export default router;
