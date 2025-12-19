import { z } from "zod";

export const CreateFoodSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),

  servingQuantity: z.coerce.number(),
  servingUnit: z.string(),
  equivalentQuantity: z.coerce.number().optional(),
  equivalentUnit: z.string().optional(),
  calories: z.coerce.number().optional(),
  protein: z.coerce.number().optional(),
  carbs: z.coerce.number().optional(),
  fats: z.coerce.number().optional(),
  fiber: z.coerce.number().optional(),
  sodium: z.coerce.number().optional(),

  category: z.string().optional(),
});

export type CreateFoodDto = z.infer<typeof CreateFoodSchema>;
