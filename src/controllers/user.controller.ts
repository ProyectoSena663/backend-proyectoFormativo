import { Request, Response } from "express";
import pool from "../db/pool";
import { usuarioSchema, usuarioType } from "../schemas/usuarioSchema";
import { z } from "zod";

//Validacion de ID
const idSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "El ID debe ser un número positivo" }),
});

//crear un usuario
export const crearUsuario = async (
  req: Request,
  res: Response
) => {
  const { nombre, apellido, redSocialLogin } = req.body;
  try {
    const result = usuarioSchema.safeParse({
      nombre,
      apellido,
      redSocialLogin,
    });

    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }

    const nuevoUsuario: usuarioType = result.data;

    const [dbresult] = await pool.query(
      "insert into Usuario (nombre, apellido, redSocialLogin) values (?,?,?)",
      [
        nuevoUsuario.nombre,
        nuevoUsuario.apellido,
        nuevoUsuario.red_social_login,
      ]
    );
    res.send({
      id: dbresult,
      nombre,
      apellido,
      redSocialLogin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al crear el usuario",
    });
  }
};

//obtener todos los usuarios
export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query("select * from Usuario");
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al obtener los usuarios",
    });
  }
};

//obtener un usuario por id
export const obtenerUsuariosId = async (req: Request, res: Response) => {
  try {
    const id = await pool.query("select * from Usuario where id = ?", [
      req.params.id,
    ]);
    res.json(id);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al obtener el usuario por id",
    });
  }
};

//eliminar un usuario por id
export const eliminarUsuariosId = async (req: Request, res: Response) => {
  try {
    const eliminar = await pool.query("delete from Usuario where id = ? ", [
      req.params.id,
    ]);
    res.send(eliminar);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al eliminar el usuario por id",
    });
  }
};

//actualizar un usuario por id
export const actualizarUsuariosId = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, redSocialLogin } = req.body;
    const actualizar = await pool.query(
      "update Usuario set nombre = ?, apellido = ?, redSocialLogin = ? where id = ?",
      [nombre, apellido, redSocialLogin, req.params.id]
    );
    res.send(actualizar);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al actualizar el usuario por id",
    });
  }
};
