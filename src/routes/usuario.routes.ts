import { Router } from "express";
import { UsuarioController } from "../controllers/Usuario.controller";

const router = Router();
const usuarioController = new UsuarioController();

router.post("/register", UsuarioController.createUser.bind(usuarioController));
router.post("/login", UsuarioController.login.bind(usuarioController));
router.get("/getUser", UsuarioController.findUser.bind(usuarioController));
router.get("/getUser/:id", UsuarioController.findUserById.bind(usuarioController));
router.put("/updateUser/:id", UsuarioController.updateUser.bind(usuarioController));
router.delete("/deleteUser/:id", UsuarioController.deleteUser.bind(usuarioController));

export default router;