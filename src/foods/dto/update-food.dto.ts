import { CreateFoodSchema } from './create-food.dto';
import { z } from 'zod';

export const UpdateFoodSchema = CreateFoodSchema.partial();
export type UpdateFoodDto = z.infer<typeof UpdateFoodSchema>;
