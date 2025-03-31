import { Request, Response } from "express";
import pool from "../db/pool";
import {
  personalizacionSchema,
  personalizacionType,
} from "../schemas/personalizacionSchema";
import { z } from "zod";

const idSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "El ID debe ser un número positivo" }),
});

//crear personalizacion
export const crearPersonalizacion = async (req: Request, res: Response) => {
  try {
    const { partePrenda, color } = req.body;

    const result = personalizacionSchema.safeParse({ partePrenda, color });

    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }

    const nuevaPersonalizacion: personalizacionType = result.data;

    const [resultdb] = await pool.query(
      "insert into Personalizacion (partePrenda,color) values (?,?)",
      [nuevaPersonalizacion.parte_prenda, nuevaPersonalizacion.color]
    );
    res.send({
      id: resultdb,
      partePrenda,
      color,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al crear la personalizacion",
    });
  }
};

//obtener todas las personalizaciones
export const obtenerPersonalizaciones = async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query("select * from Personalizacion");
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al obtener las personalizaciones",
    });
  }
};

//obtener una personalizacion por id
export const obtenerPersonalizacionesId = async (
  req: Request,
  res: Response
) => {
  const parseResult = idSchema.safeParse(req.params);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.format() });
  }
  try {
    const id = await pool.query("select * from Personalizacion where id = ?", [
      req.params.id,
    ]);
    res.json(id);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al obtener la personalizacion por id",
    });
  }
};

//eliminar una personalizacion por id
export const eliminarPersonalizacionesId = async (
  req: Request,
  res: Response
) => {
  const parseResult = idSchema.safeParse(req.params);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.format() });
  }
  try {
    const eliminar = await pool.query(
      "delete from Personalizacion where id = ? ",
      [req.params.id]
    );
    res.send(eliminar);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al eliminar la personalizacion por id",
    });
  }
};

//actualizar una personalizacion por id
export const actualizarPersonalizacionesId = async (
  req: Request,
  res: Response
) => {
  const idValidation = idSchema.safeParse(req.params);
  const bodyValidation = personalizacionSchema.safeParse(req.body);

  if (!idValidation.success) {
    res.status(400).json({ error: idValidation.error.format() });
  }
  if (!bodyValidation.success) {
    res.status(400).json({ error: bodyValidation.error.format() });
  }
  try {
    const { partePrenda, color } = req.body;
    const [result] = await pool.query(
      "update Personalizacion set partePrenda = ?, color = ? where id = ?",
      [partePrenda, color, req.params.id]
    );
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al actualizar la personalizacion",
    });
  }
};
