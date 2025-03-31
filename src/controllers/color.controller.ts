import { Request, Response } from "express";
import pool from "../db/pool";
import { colorSchema, colorType } from "../schemas/colorSchema";

export const colorController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = colorSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }

    const nuevoColor: colorType = result.data;

    const [dbresult] = await pool.query(
      `INSERT INTO camisetas (nombre, codigo_hex, rgb, disponible) VALUES (?, ?, ?, ?)`,
      [
        nuevoColor.nombre,
        nuevoColor.codigo_hex,
        nuevoColor.rgb,
        nuevoColor.disponible,
      ]
    );

    res.send({ id: (dbresult as any).insertId, ...nuevoColor });

    console.log(req.body);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};
