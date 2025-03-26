import { Request, Response } from "express";

export const crearUser = async (req: Request, res: Response) => {
  const { nombre, apellido, redSocialLogin } = req.body;

  if (!nombre || !apellido || !redSocialLogin) {
    return res.status(400).json({ msg: "Por favor llene todos los campos" });
  } else {
    try {
      const newUser = await pool.query(
        "INSERT INTO usuario (nombre, apellido, redSocialLogin) VALUES ($1, $2, $3) RETURNING *",
        [nombre, apellido, redSocialLogin]
      );
    } catch (err) {}
  }
};
