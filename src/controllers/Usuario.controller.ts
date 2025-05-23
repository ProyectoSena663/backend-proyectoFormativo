import { Request, Response } from "express";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { UserDto } from "../Dto/UserDto";

export class UsuarioController {
  static async createUser(req: Request, res: Response) {
    try {
      const { nombre, apellido, fecha_nacimiento, red_social_login, password } =
        req.body;

      const existingUser = await UsuarioRepository.findByNameandLastName(
        nombre,
        apellido
      );
      if (existingUser) {
        res.status(400).json({
          message: "User already exists",
        });
        return;
      }

      const user = new UserDto(
        nombre,
        apellido,
        fecha_nacimiento,
        red_social_login,
        password
      );

      const newUser = await UsuarioRepository.createUser(user);

      res.status(201).json({
        message: "User created successfully",
        user: {
          id_us: newUser.id_us,
          nombre: newUser.nombre,
          apellido: newUser.apellido,
          fecha_nacimiento: newUser.fecha_nacimiento,
          red_social_login: newUser.red_social_login,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
