import { z } from "zod";

export const usuarioSchema = z.object({
  id_us: z
    .string()
    .regex(/^\d+$/, { message: "El ID debe ser un número positivo" }),
  nombre: z
    .string()
    .nonempty("Ingrese su nombre")
    .max(100)
    .min(4, "Su nombre es muy corto"),
  apellido: z
    .string()
    .nonempty("Ingrese su apellido")
    .max(100)
    .min(4, "Su apellido es muy corto"),
  red_social_login: z.string().optional(),
});

export type usuarioType = z.infer<typeof usuarioSchema>;
