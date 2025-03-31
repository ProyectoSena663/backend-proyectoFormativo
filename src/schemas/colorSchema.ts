import { z } from "zod";

export const colorSchema = z.object({
  id: z.number().int().optional(),
  nombre: z
    .string()
    .min(3, "El nombre del color debe tener al menos 3 caracteres"),
  codigo_hex: z
    .string()
    .regex(
      /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/,
      "Debe ingresar un código hexadecimal válido"
    ),
  rgb: z
    .tuple([
      z.number().min(0).max(255),
      z.number().min(0).max(255),
      z.number().min(0).max(255),
    ])
    .optional(),
  disponible: z.boolean().default(true),
});

export type colorType = z.infer<typeof colorSchema>