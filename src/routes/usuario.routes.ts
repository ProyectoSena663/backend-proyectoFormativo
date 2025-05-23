import { Router } from "express";
import { UsuarioController } from "../controllers/Usuario.controller";

const router = Router();
const usuarioController = new UsuarioController();

router.post("/register", UsuarioController.createUser.bind(usuarioController));

export default router;