import {Router} from 'express';
import {obtenerUsuarios,obtenerUsuariosId, eliminarUsuariosId, actualizarUsuariosId} from '../controllers/user.controller';

const router = Router();

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuariosId);
router.delete('/:id', eliminarUsuariosId);
router.put('/:id', actualizarUsuariosId);

export default router