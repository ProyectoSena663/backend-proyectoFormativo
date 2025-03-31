import { Router } from "express";
import {crearPersonalizacion, obtenerPersonalizaciones, obtenerPersonalizacionesId, eliminarPersonalizacionesId, actualizarPersonalizacionesId} from "../controllers/persona.controller";

const router = Router();

router.post('/', crearPersonalizacion);
router.get('/', obtenerPersonalizaciones);
router.get('/:id', obtenerPersonalizacionesId);
router.delete('/:id', eliminarPersonalizacionesId);
router.put('/:id', actualizarPersonalizacionesId);

export default router