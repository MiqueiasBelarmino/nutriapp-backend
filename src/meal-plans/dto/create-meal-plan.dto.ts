// dto/create-meal-plan.dto.ts
import { z } from 'zod';

const MealSubstituteSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.string().optional(),
});

const MealItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.string().optional(),
  observation: z.string().optional(),
  substitutes: z.array(MealSubstituteSchema).optional(),
});

const MealSchema = z.object({
  id: z.string(),
  name: z.string(),
  items: z.array(MealItemSchema),
});

export const CreateMealPlanSchema = z.object({
  patientId: z.string(),
  date: z.coerce.date(),
  content: z.array(MealSchema), // esse será o conteúdo "estruturado"
});

export type CreateMealPlanDto = z.infer<typeof CreateMealPlanSchema>;
