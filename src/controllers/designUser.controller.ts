import { Request, Response } from "express";
import pool from "../db/pool";
import {
  diseñoUsuarioSchema,
  diseñoUsuarioType,
} from "../schemas/diseñoUsuarioSchema";
import { z } from "zod";

const idSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "El ID debe ser un número positivo" }),
});

//crear diseño de usuario
export const crearDesignUser = async (req: Request, res: Response) => {
  try {
    const {
      colorPrenda,
      dibujo,
      fechaCreacion,
      tipo,
      visibilidad,
      posicionX,
      posicionY,
      posicionZ,
      rotacionX,
      rotacionY,
      rotacionZ,
      escalaX,
      escalaY,
      escalaZ,
    } = req.body;

    const result = diseñoUsuarioSchema.safeParse({
      colorPrenda,
      dibujo,
      fechaCreacion,
      tipo,
      visibilidad,
      posicionX,
      posicionY,
      posicionZ,
      rotacionX,
      rotacionY,
      rotacionZ,
      escalaX,
      escalaY,
      escalaZ,
    });

    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }

    const nuevodesignUser: diseñoUsuarioType = result.data;

    const [resultdb] = await pool.query(
      "insert into DiseñoUsuario (colorPrenda,dibujo,fechaCreacion,tipo,visibilidad,posicionX,posicionY,posicionZ,rotacionX,rotacionY,rotacionZ,escalaX,escalaY,escalaZ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        nuevodesignUser.color_prenda,
        nuevodesignUser.dibujo,
        nuevodesignUser.fecha_creacion,
        nuevodesignUser.tipo,
        nuevodesignUser.visibilidad,
        nuevodesignUser.posicionX,
        nuevodesignUser.posicionY,
        nuevodesignUser.posicionZ,
        nuevodesignUser.rotacionX,
        nuevodesignUser.rotacionY,
        nuevodesignUser.rotacionZ,
        nuevodesignUser.escalaX,
        nuevodesignUser.escalaY,
        nuevodesignUser.escalaZ,
      ]
    );
    res.send({
      id: resultdb,
      colorPrenda,
      dibujo,
      fechaCreacion,
      tipo,
      visibilidad,
      posicionX,
      posicionY,
      posicionZ,
      rotacionX,
      rotacionY,
      rotacionZ,
      escalaX,
      escalaY,
      escalaZ,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al crear el diseño de usuario",
    });
  }
};

//obtener todos los diseños de usuario
export const obtenerDesignUser = async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query("select * from DiseñoUsuario");
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al obtener los diseños de usuario",
    });
  }
};

//obtener un diseño de usuario por id
export const obtenerDesignUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parseResult = idSchema.safeParse(req.params);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.format() });
  }
  try {
    const id = await pool.query("select * from DiseñoUsuario where id = ?", [
      req.params.id,
    ]);
    res.json(id);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al obtener el diseño de usuario por id",
    });
  }
};

//eliminar un diseño de usuario por id
export const eliminarDesignUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parseResult = idSchema.safeParse(req.params);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.format() });
  }
  try {
    const eliminar = await pool.query(
      "delete from DiseñoUsuario where id = ? ",
      [req.params.id]
    );
    res.send(eliminar);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al eliminar el diseño de usuario por id",
    });
  }
};

//actualizar un diseño de usuario por id
export const actualizarDesignUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const idValidation = idSchema.safeParse(req.params);
  const bodyValidation = diseñoUsuarioSchema.safeParse(req.body);

  if (!idValidation.success) {
    res.status(400).json({ error: idValidation.error.format() });
  }
  if (!bodyValidation.success) {
    res.status(400).json({ error: bodyValidation.error.format() });
  }
  try {
    const {
      colorPrenda,
      dibujo,
      fechaCreacion,
      tipo,
      visibilidad,
      posicionX,
      posicionY,
      posicionZ,
      rotacionX,
      rotacionY,
      rotacionZ,
      escalaX,
      escalaY,
      escalaZ,
    } = req.body;
    const id = await pool.query(
      "update DiseñoUsuario set colorPrenda = ?, dibujo = ?, fechaCreacion = ?, tipo = ?, visibilidad = ?, posicionX = ?, posicionY = ?, posicionZ = ?, rotacionX = ?, rotacionY = ?, rotacionZ = ?, escalaX = ?, escalaY = ?, escalaZ = ? where id = ?",
      [
        colorPrenda,
        dibujo,
        fechaCreacion,
        tipo,
        visibilidad,
        posicionX,
        posicionY,
        posicionZ,
        rotacionX,
        rotacionY,
        rotacionZ,
        escalaX,
        escalaY,
        escalaZ,
        req.params.id,
      ]
    );
    res.send(id);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al actualizar el diseño de usuario por id",
    });
  }
};
