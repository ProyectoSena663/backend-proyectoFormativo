import { z } from "zod";

export const diseñoSchema = z.object({
  id_dis: z.number().int().positive().optional(),
  fk_id_du: z.number().int().positive(),
});

export type diseñoType = z.infer<typeof diseñoSchema>;
