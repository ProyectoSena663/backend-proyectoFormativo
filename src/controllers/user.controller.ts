import { Request, Response } from "express";
import pool from "../db/pool";
import { usuarioSchema, usuarioType } from "../schemas/usuarioSchema";
import { z } from "zod";

//Validacion de ID
const idSchema = z.object({
  id_us: z.string().regex(/^\d+$/, "El ID debe ser un número entero"),
});

//crear un usuario
export const crearUsuario = async (req: Request, res: Response) => {
  const { nombre, apellido, red_social_login } = req.body;
  try {
    const result = usuarioSchema.safeParse({
      nombre,
      apellido,
      red_social_login,
    });

    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }

    const nuevoUsuario: usuarioType = result.data;

    const [dbresult] = await pool.query(
      "insert into Usuario (nombre, apellido, red_social_login) values (?,?,?)",
      [
        nuevoUsuario.nombre,
        nuevoUsuario.apellido,
        nuevoUsuario.red_social_login,
      ]
    );

    res.send({
      dbresult,
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
    const [result] = await pool.query(
      "select id_us, nombre, apellido, red_social_login, IFNULL(fk_id_du, 0) AS fk_id_du from Usuario"
    );

    console.log("Usuarios obtenidos:", result);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al obtener los usuarios",
    });
  }
};

//obtener un usuario por id
export const obtenerUsuariosId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const validation = idSchema.safeParse({ id_us: id });
    if (!validation.success) {
      res.status(400).json({ error: validation.error.format() });
    }

    const [result] = await pool.query("SELECT * FROM Usuario WHERE id_us = ?", [
      id,
    ]);

    if ((result as any).length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error al obtener el usuario por ID" });
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
