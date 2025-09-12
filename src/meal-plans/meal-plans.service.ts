import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';

@Injectable()
export class MealPlansService {
    constructor(private prisma: PrismaService) { }

    create(data: CreateMealPlanDto) {
        return this.prisma.mealPlan.create({ data });
    }

    findAll() {
        return this.prisma.mealPlan.findMany({
            orderBy: { date: 'desc' },
        });
    }

    findByPatient(patientId: string) {
        return this.prisma.mealPlan.findMany({
            where: { patientId },
            orderBy: { date: 'desc' },
        });
    }

    findOne(id: string) {
        return this.prisma.mealPlan.findUnique({ where: { id } });
    }

    update(id: string, data: UpdateMealPlanDto) {
        return this.prisma.mealPlan.update({
            where: { id },
            data,
        });
    }

    remove(id: string) {
        return this.prisma.mealPlan.delete({ where: { id } });
    }
}
