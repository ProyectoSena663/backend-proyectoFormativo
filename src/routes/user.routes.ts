import { Router } from "express";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuariosId,
  eliminarUsuariosId,
  actualizarUsuariosId,
} from "../controllers/user.controller";
import { schemaValidator } from "../middlewares/schemaValidator-middleware";
import { usuarioSchema } from "../schemas/usuarioSchema";
const router = Router();

router.post("/", schemaValidator(usuarioSchema), crearUsuario);
router.get("/obtenerUsuarios/", obtenerUsuarios);
router.get("/obtenerUsuario/:id", obtenerUsuariosId);
router.delete("/:id", eliminarUsuariosId);
router.put("/:id", actualizarUsuariosId);

export default router;
