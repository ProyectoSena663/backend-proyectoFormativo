import { z } from "zod";

export const personalizacionSchema = z.object({
  id_per: z.number().int().optional(),
  parte_prenda: z.enum([
    "Cuello",
    "Brazalete",
    "Dobladillo inferior",
    "Mangas",
    "Interior",
    "Fondo",
  ]),
  color: z.string().max(7, "Se pasó del rango").optional().default("#ffffff"),
  fk_id_du: z.number().int().positive(),
});

export type personalizacionType = z.infer<typeof personalizacionSchema>;
