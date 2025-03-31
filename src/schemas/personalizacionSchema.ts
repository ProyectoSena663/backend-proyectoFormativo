import { z } from "zod";

const PersonalizacionSchema = z.object({
  nombre_cliente: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  tipo: z.enum(["Texto", "Imagen", "Ambos"]), // Define el tipo de personalización
  tipoCamiseta: z.enum([
    "Camisa",
    "Camiseta",
    "Camiseta cuello en V",
    "Camiseta manga larga",
    "Camisa manga larga",
    "Camisa cuello tortuga",
    "Camiseta cuello tortuga",
    "Esqueleto",
  ]),
  texto: z
    .string()
    .max(50, "El texto no puede superar los 50 caracteres")
    .optional(),
  fuente: z
    .enum(["Arial", "Times New Roman", "Comic Sans", "Verdana", "Otro"])
    .optional(),
  color_texto: z
    .string()
    .regex(
      /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/,
      "Debe ser un código hexadecimal válido"
    )
    .optional(),
  imagen_personalizada: z.string().url().optional(), // URL de la imagen si elige personalizar con imagen
  tipoEstampado: z.enum(["Bordado", "Taches", "Perforaciones", "Estampado"]),
  ubicacion: z.enum(["Frente", "Espalda", "Manga Izquierda", "Manga Derecha"]), // Dónde se colocará la personalización
  precio_extra: z
    .number()
    .min(0, "El precio extra no puede ser negativo")
    .default(0),
  fecha_solicitud: z.date().optional().default(new Date()), // Fecha en que se pidió la personalización
});

export default PersonalizacionSchema;
