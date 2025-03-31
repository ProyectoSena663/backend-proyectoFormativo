import {Router} from 'express';
import {crearUsuario, obtenerUsuarios, obtenerUsuariosId, eliminarUsuariosId, actualizarUsuariosId} from '../controllers/user.controller'
const router = Router();

router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuariosId);
router.delete('/:id', eliminarUsuariosId);
router.put('/:id', actualizarUsuariosId);

export default router