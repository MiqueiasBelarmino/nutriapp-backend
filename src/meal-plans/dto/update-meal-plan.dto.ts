// update-meal-plan.dto.ts
import { CreateMealPlanSchema } from './create-meal-plan.dto';
import { z } from 'zod';

export const UpdateMealPlanSchema = CreateMealPlanSchema.partial();
export type UpdateMealPlanDto = z.infer<typeof UpdateMealPlanSchema>;
