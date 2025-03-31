import { number, optional, z } from "zod";

const camisetaSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre de la camiseta debe tener al menos 3 caracteres"),
  descripcion: z.string().optional(),
  talla: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  color: z.string().min(3, "El color tiene que tener al menos 3 caracteres"),
  material: z.string().optional(),
  precio: z.string().min(0, "El precio no puede ser negativo"),
  stock: z.number().int().min(0, "El stock debe ser un numero positivo"),
  categoria: z.string().optional(),
  marca: z.string().optional(),
  genero: z.enum(["Hombre", "Mujer", "Unisex"]).optional(),
  imagenes: z.array(z.string().url()).optional(),
  fecha_creacion: z.date().optional().default(new Date()),
});

export default camisetaSchema;
