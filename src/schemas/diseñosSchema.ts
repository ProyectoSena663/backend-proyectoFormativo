import { z } from "zod";

export const DiseñoSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre del diseño debe tener al menos 3 caracteres"),
  descripcion: z.string().optional(),
  tipo: z.enum([
    "Estampado",
    "Bordado",
    "Serigrafía",
    "Sublimado",
    "Vinilo",
    "Otro",
  ]),
  imagenes: z
    .array(z.string().url())
    .min(1, "Debe haber al menos una imagen del diseño"),
  colores_disponibles: z
    .array(z.string())
    .min(1, "Debe haber al menos un color disponible"),
  precio_extra: z
    .number()
    .min(0, "El precio extra no puede ser negativo")
    .default(0),
  fecha_creacion: z.date().optional().default(new Date()), // Fecha de registro del diseño
});

export type diseñosType = z.infer<typeof DiseñoSchema>;
