import { Router } from "express";
import { crearDesignUser, obtenerDesignUser, obtenerDesignUserId,eliminarDesignUserId, actualizarDesignUserId} from "../controllers/designUser.controller";

const router = Router();

router.post('/', crearDesignUser);
router.get('/', obtenerDesignUser);
router.get('/:id', obtenerDesignUserId);
router.delete('/:id', eliminarDesignUserId);
router.put('/:id', actualizarDesignUserId);

export default router