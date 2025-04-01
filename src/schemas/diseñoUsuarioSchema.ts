import { z } from "zod";

export const diseñoUsuarioSchema = z.object({
  id_du: z.number().int().optional(),
  color_prenda: z
    .string()
    .min(1, { message: "El nombre del color es requerido" }),
  dibujo: z.array(z.string().url()).optional(),
  fecha_creacion: z.date().optional().default(new Date()),
  tipo: z.enum(["camiseta", "camisa", "camibuso", "buso", "saco", "esqueleto"]),
  visibilidad: z.enum(["publico", "privado"]).default("privado"),

  posicionX: z.number(),
  posicionY: z.number(),
  posicionZ: z.number(),
  rotacionX: z.number().optional().default(0),
  rotacionY: z.number().optional().default(0),
  rotacionZ: z.number().optional().default(0),
  escalaX: z.number().optional().default(1),
  escalaY: z.number().optional().default(1),
  escalaZ: z.number().optional().default(1),

  fk_id_usuario: z.number().int().positive(),
});

export type diseñoUsuarioType = z.infer<typeof diseñoUsuarioSchema>;
