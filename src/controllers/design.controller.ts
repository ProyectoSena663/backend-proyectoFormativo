import { Request, Response } from "express";
import pool from "../db/pool";
import { diseñoSchema, diseñoType } from "../schemas/diseñoSchema";
import { z } from "zod";

const idSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "El ID debe ser un número positivo" }),
});

//obtener todos los diseños
export const obtenerDiseños = async (req: Request, res: Response) => {
  try {
    const [resultdb] = await pool.query("select * from Diseño");
    res.send(resultdb);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al obtener los diseños",
    });
  }
};

//obtener un diseño por id
export const obtenerDiseñosId = async (req: Request, res: Response) => {
  try {
    const { id_dis } = req.body;

    const result = diseñoSchema.safeParse({ id_dis });

    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }

    const obtenerDiseño: diseñoType = result.data;

    const id = await pool.query("select * from Diseño where id = ?", [
      obtenerDiseño.id_dis,
    ]);
    res.json(id);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al obtener el diseño por id",
    });
  }
};

//eliminar un diseño por id
export const eliminarDiseñosId = async (req: Request, res: Response) => {
  const parseResult = idSchema.safeParse(req.params);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.format() });
  }
  try {
    const eliminar = await pool.query("delete from Diseño where id = ? ", [
      req.params.id,
    ]);
    res.send(eliminar);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al eliminar el diseño por id",
    });
  }
};

//actualizar un diseño por id
export const actualizarDiseñosId = async (req: Request, res: Response) => {
  const idValidation = idSchema.safeParse(req.params);
  const bodyValidation = diseñoSchema.safeParse(req.body);

  if (!idValidation.success) {
    res.status(400).json({ error: idValidation.error.format() });
  }
  if (!bodyValidation.success) {
    res.status(400).json({ error: bodyValidation.error.format() });
  }
  try {
    const { id } = req.params;
    const actualizar = await pool.query("update Diseño set ? where id = ?", [
      id,
      req.body,
    ]);
    res.send(actualizar);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "error al actualizar el diseño por id",
    });
  }
};
