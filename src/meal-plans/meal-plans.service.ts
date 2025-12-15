import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';

@Injectable()
export class MealPlansService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateMealPlanDto) {
        return this.prisma.mealPlan.create({
            data: {
                patientId: data.patientId,
                date: data.date,
                Meal: {
                    create: data.content.map((meal, index) => ({
                        name: meal.name,
                        order: index + 1,
                        items: {
                            create: meal.items.map((item) => ({
                                foodId: item.id,
                                quantity: item.quantity,
                                observation: item.observation,
                                substitutes: {
                                    create: item.substitutes?.map((sub) => ({
                                        foodId: sub.id,
                                        quantity: sub.quantity,
                                    })) ?? [],
                                },
                            })),
                        },
                    })),
                },
            },
            include: {
                Meal: {
                    include: {
                        items: {
                            include: {
                                substitutes: true,
                            },
                        },
                    },
                },
            },
        });
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
        return this.prisma.mealPlan.findUnique({
            where: { id },
            include: {
                patient: true, // retorna os dados do paciente
                UserCreator: true, // exemplo: nutricionista responsável
                Meal: {
                    include: {
                        items: {
                            include: {
                                substitutes: true
                            }
                        }

                    },

                },
            },
        });
    }

    async update(id: string, data: UpdateMealPlanDto) {
        const { patientId, date, content } = data;

        // Monta apenas os campos realmente existentes no model
        const updateData: any = {};

        if (patientId) updateData.patientId = patientId;
        if (date) updateData.date = date;

        // Atualização de refeições (caso tenha vindo no payload)
        if (content) {
            updateData.meals = {
                deleteMany: {}, // limpa todas as refeições atuais
                create: content.map((meal, index) => ({
                    name: meal.name,
                    order: index + 1,
                    items: {
                        create: meal.items.map((item) => ({
                            foodId: item.id,
                            quantity: item.quantity,
                            observation: item.observation,
                            substitutes: {
                                create:
                                    item.substitutes?.map((sub) => ({
                                        foodId: sub.id,
                                        quantity: sub.quantity,
                                    })) ?? [],
                            },
                        })),
                    },
                })),
            };
        }

        return this.prisma.mealPlan.update({
            where: { id },
            data: updateData,
            include: {
                Meal: {
                    include: {
                        items: {
                            include: { substitutes: true },
                        },
                    },
                },
            },
        });
    }

    remove(id: string) {
        return this.prisma.mealPlan.delete({ where: { id } });
    }
}
