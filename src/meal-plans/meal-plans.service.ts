import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import OpenAI from 'openai';

@Injectable()
export class MealPlansService {
    private openai: OpenAI;
    constructor(private prisma: PrismaService) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    // Helper function to find or create food by name
    private async findOrCreateFood(name: string, foodId?: string): Promise<string> {
        // If foodId is provided, use it
        if (foodId) {
            return foodId;
        }

        // If no foodId, try to find food by name
        const existingFood = await this.prisma.food.findFirst({
            where: { name: { equals: name, mode: 'insensitive' } }
        });

        if (existingFood) {
            return existingFood.id;
        }

        // If food doesn't exist, create it
        const newFood = await this.prisma.food.create({
            data: {
                name: name,
                servingQuantity: 100,
                servingUnit: 'g',
                calories: 0,
                protein: 0,
                carbs: 0,
                fats: 0,
                fiber: 0,
                sodium: 0,
            }
        });

        return newFood.id;
    }

    async create(data: CreateMealPlanDto) {
        // Process all meals and items to ensure foodIds exist
        const processedMeals = await Promise.all(
            data.content.map(async (meal, index) => {
                const processedItems = await Promise.all(
                    meal.items.map(async (item) => {
                        const foodId = await this.findOrCreateFood(item.name, item.id);
                        
                        const processedSubstitutes = await Promise.all(
                            (item.substitutes || []).map(async (sub) => ({
                                foodId: await this.findOrCreateFood(sub.name, sub.id),
                                quantity: sub.quantity,
                            }))
                        );

                        return {
                            foodId,
                            quantity: item.quantity,
                            observation: item.observation,
                            substitutes: {
                                create: processedSubstitutes,
                            },
                        };
                    })
                );

                return {
                    name: meal.name,
                    order: index + 1,
                    items: {
                        create: processedItems,
                    },
                };
            })
        );

        return this.prisma.mealPlan.create({
            data: {
                patientId: data.patientId,
                date: data.date,
                Meal: {
                    create: processedMeals,
                },
            },
            include: {
                Meal: {
                    include: {
                        items: {
                            include: {
                                food: true,
                                substitutes: {
                                    include: {
                                        food: true
                                    }
                                },
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
            include: {
                patient: true,
                Meal: {
                    include: {
                        items: {
                            include: {
                                food: true,
                                substitutes: {
                                    include: {
                                        food: true
                                    }
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    findByPatient(patientId: string) {
        return this.prisma.mealPlan.findMany({
            where: { patientId },
            orderBy: { date: 'desc' },
            include: {
                patient: true,
                Meal: {
                    include: {
                        items: {
                            include: {
                                food: true,
                                substitutes: {
                                    include: {
                                        food: true
                                    }
                                },
                            },
                        },
                    },
                },
            },
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
                                food: true, // incluir dados do alimento
                                substitutes: {
                                    include: {
                                        food: true // incluir dados do alimento substituto
                                    }
                                }
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
            // First, we need to delete existing meals and their items in the correct order
            // to avoid foreign key constraint violations
            
            // Get all meals for this meal plan
            const existingMeals = await this.prisma.meal.findMany({
                where: { mealPlanId: id },
                include: {
                    items: {
                        include: {
                            substitutes: true
                        }
                    }
                }
            });

            // Delete in correct order: substitutes -> items -> meals
            for (const meal of existingMeals) {
                for (const item of meal.items) {
                    // Delete substitutes first
                    await this.prisma.mealSubstitute.deleteMany({
                        where: { itemId: item.id }
                    });
                }
                // Delete items
                await this.prisma.mealItem.deleteMany({
                    where: { mealId: meal.id }
                });
            }
            // Delete meals
            await this.prisma.meal.deleteMany({
                where: { mealPlanId: id }
            });

            // Process all meals and items to ensure foodIds exist
            const processedMeals = await Promise.all(
                content.map(async (meal, index) => {
                    const processedItems = await Promise.all(
                        meal.items.map(async (item) => {
                            const foodId = await this.findOrCreateFood(item.name, item.id);
                            
                            const processedSubstitutes = await Promise.all(
                                (item.substitutes || []).map(async (sub) => ({
                                    foodId: await this.findOrCreateFood(sub.name, sub.id),
                                    quantity: sub.quantity,
                                    observation: sub.observation,
                                }))
                            );

                            return {
                                foodId,
                                quantity: item.quantity,
                                observation: item.observation,
                                substitutes: {
                                    create: processedSubstitutes,
                                },
                            };
                        })
                    );

                    return {
                        name: meal.name,
                        order: index + 1,
                        items: {
                            create: processedItems,
                        },
                    };
                })
            );

            // Now create new meals
            updateData.Meal = {
                create: processedMeals,
            };
        }

        return this.prisma.mealPlan.update({
            where: { id },
            data: updateData,
            include: {
                Meal: {
                    include: {
                        items: {
                            include: {
                                food: true,
                                substitutes: {
                                    include: {
                                        food: true
                                    }
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    remove(id: string) {
        return this.prisma.mealPlan.delete({ where: { id } });
    }

    async generateSuggestion(patientId: string) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
        });

        if (!patient) {
            throw new Error('Patient not found');
        }

        const lastMealPlans = await this.prisma.mealPlan.findMany({
            where: { patientId },
            orderBy: { date: 'desc' },
            take: 2,
            select: {
                date: true,
                Meal: {
                    select: {
                        name: true,
                        order: true,
                        items: {
                            select: {
                                quantity: true,
                                notes: true,
                                observation: true,
                                food: {
                                    select: {
                                        name: true,
                                        servingQuantity: true,
                                        servingUnit: true,
                                        calories: true,
                                        protein: true,
                                        carbs: true,
                                        fats: true,
                                        fiber: true,
                                        sodium: true,
                                    },
                                },
                                substitutes:{
                                    select: {
                                        food: {
                                            select: {
                                                name: true,
                                                servingQuantity: true,
                                                servingUnit: true,
                                                calories: true,
                                                protein: true,
                                                carbs: true,
                                                fats: true,
                                                fiber: true,
                                                sodium: true,
                                            },
                                        },
                                    },
                                }
                            },
                        },
                    },
                },
            },
        })


        const prompt = `
      Você é um nutricionista experiente. Crie um novo plano alimentar para o paciente abaixo com base em seus dados e nos seus 2 últimos planos alimentares.
      Mantenha o estilo e preferências, mas varie um pouco as opções para não ficar monótono.
      
      Dados do Paciente:
      Nome: ${patient.name}
      Gênero: ${patient.gender}
      Idade: ${new Date().getFullYear() - patient.birthDate.getFullYear()} anos
      Peso: ${patient.weight}kg
      Altura: ${patient.height}cm
      
      Últimos 2 Planos Alimentares:
      ${JSON.stringify(lastMealPlans, null, 2)}
      
      Retorne APENAS um JSON com a estrutura sugerida para o novo plano, contendo uma lista de refeições (meals), onde cada refeição tem um nome (name) e uma lista de itens (items).
      Cada item deve ter "name" (nome do alimento e APENAS O NOME, ex: "Arroz Branco"), "quantity" (quantidade textual, ex: "2 colheres"), "servingQuantity" (somente numero, utilizar sempre 100), "servingUnit" (apenas a unidade ex: g, ml, und), "observation" (opcional), as informações nutricionais devem ser baseadas na porção de 100g do alimento.
      Lembre-se que as refeições principais (almoço e janta) devem ter pelo menos 3~4 itens para distribuir bem carboidratos, proteínas, fibras e gorduras.
      Estrutura esperada:
      {
        "meals": [
          {
            "name": "Café da Manhã",
            "items": [
               { "name": "Arroz Integral cozido", "quantity": "2 fatias", "servingQuantity": 100, "servingUnit": "g", "observation": "Tostado", "calories": 124, "protein": 2.6, "carbs": 25.8, "fats": 1, "fiber": 2.7, "sodium": 1}
            ]
          }
        ]
      }
    `;

        const completion = await this.openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4o-mini',
            response_format: { type: 'json_object' },
        });

        const content = completion.choices[0].message.content;
        if (!content) {
            throw new Error('Failed to generate suggestion: Empty response from AI');
        }

        const suggestion = JSON.parse(content);

        // Processar os itens para tentar encontrar o foodId no banco
        for (const meal of (suggestion.meals || [])) {
            if (meal.items) {
                for (const item of meal.items) {
                    // Normalizar nomes para ajudar no match (opcional, mas recomendado)
                    // Tentar match exato ou "contains"
                    
                    // O prompt agora pede "name", mas vamos garantir caso a IA mande "foodName"
                    const foodName = item.name || item.foodName;
                    item.name = foodName; // Garantir que a propriedade "name" exista pro frontend

                    if (foodName) {
                        // Tentar encontrar no banco
                        // 1. Match Exato
                        let food = await this.prisma.food.findFirst({
                            where: { name: { equals: foodName, mode: 'insensitive' } }
                        });

                        // 2. Se não achou, tenta "contains" (pega o primeiro que conter o nome, ou o nome conter o termo)
                        // CUIDADO: "Arroz" pode dar match em muita coisa. Vamos tentar ser conservadores.
                        // Se o nome sugerido for muito curto, melhor não arriscar contains genérico.
                        if (!food && foodName.length > 3) {
                            food = await this.prisma.food.findFirst({
                                where: { name: { contains: foodName, mode: 'insensitive' } }
                            });
                        }

                        if (food) {
                            item.foodId = food.id;
                            // Se achou no banco, PREFERIMOS os dados do banco para consistência
                            item.name = food.name; // Usa o nome oficial do banco
                            // item.calories = food.calories; // Opccional: sobrescrever macros da IA com o do banco
                            // item.protein = food.protein;
                            // ...
                        }
                    }
                }
            }
        }

        return suggestion;
    }
}
