import { Request, Response } from "express";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { UserDto } from "../Dto/UserDto";
import { AuthDto } from "../Dto/AuthDto";
import { generateToken } from "../helpers/generateToken";
import dotenv from "dotenv";

dotenv.config();

export class UsuarioController {
  static async createUser(req: Request, res: Response) {
    try {
      const {
        nombre,
        apellido,
        email,
        fecha_nacimiento,
        red_social_login,
        password,
      } = req.body;

      const existingUser = await UsuarioRepository.findByEmail(email);
      if (existingUser) {
        res.status(400).json({
          message: "User already exists",
        });
        return;
      }

      const user = new UserDto(
        nombre,
        apellido,
        email,
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
          email: newUser.email,
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

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const authDto = new AuthDto(email, password);
      const user = await UsuarioRepository.findByEmail(authDto.email);

      if (!user) {
        res.status(401).json({
          message: "Invalid email or password",
        });
        return;
      }

      const validPassword = await UsuarioRepository.verifyPassword(
        authDto.email,
        authDto.password
      );

      if (!validPassword) {
        res.status(401).json({
          message: "Invalid password",
        });
        return;
      }

      const payload = {
        id_us: user.id_us,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        fecha_nacimiento: user.fecha_nacimiento,
        red_social_login: user.red_social_login,
      };

      const secret_key = process.env.JWT_SECRET_KEY || "your_secret_key";
      const token = generateToken(payload, secret_key, 60);
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id_us: user.id_us,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          fecha_nacimiento: user.fecha_nacimiento,
          red_social_login: user.red_social_login,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async findUser(req: Request, res: Response) {
    try {
      const users = await UsuarioRepository.findUser();

      if (!users) {
        res.status(404).json({
          message: "No users found",
        });
        return;
      }

      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async findUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UsuarioRepository.findUserById(Number(id));

      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const camposAct = req.body;

      const columns = [];
      const values = [];

      for (let [key, value] of Object.entries(camposAct)) {
        if (value !== undefined && value !== null && value !== "") {
          columns.push(`${key} = ?`);
          values.push(value);
        }

        if (columns.length === 0) {
          res.status(400).json({
            message: "No fields to update",
          });
          return;
        }
      }

      const sql = `UPDATE usuario SET ${columns.join(", ")} WHERE id_us = ?`;
      values.push(id);
      const resultDb = await UsuarioRepository.update(sql, values);

      res.status(200).json({
        message: "User updated successfully",
        user: {
          id: id,
          result: resultDb,
          ...camposAct,
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resultDb = await UsuarioRepository.delete(Number(id));

      if (resultDb.affectedRows === 0) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
