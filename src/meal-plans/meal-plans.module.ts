import { Module } from '@nestjs/common';
import { MealPlansService } from './meal-plans.service';
import { MealPlansController } from './meal-plans.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MealPlansService, PrismaService],
  controllers: [MealPlansController]
})
export class MealPlansModule {}
