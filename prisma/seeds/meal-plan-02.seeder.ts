import { PrismaClient } from '@prisma/client';

export async function seedMealPlans02(prisma: PrismaClient, professionalId: string, patientId: string) {
  console.log('Iniciando seed: Plano Agosto 2025 (Jantar Prioridade Opção 1)...');

  const getFood = async (searchTerm: string) => {
    const food = await prisma.food.findFirst({
      where: { name: { contains: searchTerm, mode: 'insensitive' } }
    });
    if (!food) {
      return await prisma.food.create({
        data: {
          name: searchTerm,
          calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sodium: 0,
          servingQuantity: 100, servingUnit: 'g'
        }
      });
    }
    return food;
  };

  const mealPlan = await prisma.mealPlan.create({
    data: {
      patientId: patientId,
      createdBy: professionalId,
      date: new Date('2025-08-16'),
      content: 'AGERTO 2025 - FOCO TOTAL. Beber 4L de água. Sem refeições de luxo.',
    },
  });

  // --- REFEIÇÃO 1 (Café) ---
  const meal1 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 1', order: 1 } });
  await prisma.mealItem.createMany({
    data: [
      { mealId: meal1.id, foodId: (await getFood('Pão Francês')).id, quantity: '1 unidade (50g)' },
      { mealId: meal1.id, foodId: (await getFood('Ovo mexido')).id, quantity: '2 unidades' },
      { mealId: meal1.id, foodId: (await getFood('Iogurte natural')).id, quantity: '150ml', notes: 'Leite desnatado com café' }
    ]
  });

  // --- REFEIÇÃO 2 (Frutas) ---
  const meal2 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 2', order: 2 } });
  await prisma.mealItem.create({
    data: {
      mealId: meal2.id,
      foodId: (await getFood('Banana prata')).id,
      quantity: '2 PORÇÕES',
      observation: 'Consumir 2 porções de frutas variadas conforme lista.'
    }
  });

  // --- REFEIÇÃO 3 (Almoço) ---
  const meal3 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 3', order: 3 } });
  await prisma.mealItem.createMany({
    data: [
      { mealId: meal3.id, foodId: (await getFood('Arroz')).id, quantity: '3 colheres sopa (80g)' },
      { mealId: meal3.id, foodId: (await getFood('Feijão')).id, quantity: '1 concha pequena (110g)' },
      { mealId: meal3.id, foodId: (await getFood('Frango grelhado')).id, quantity: '100g' },
      { mealId: meal3.id, foodId: (await getFood('Salada de folhas')).id, quantity: 'À vontade' },
      { mealId: meal3.id, foodId: (await getFood('Brócolis')).id, quantity: '150g', notes: 'Sem azeite.' }
    ]
  });

  // --- REFEIÇÃO 4 (Lanche) ---
  const meal4 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 4', order: 4 } });
  await prisma.mealItem.createMany({
    data: [
      { mealId: meal4.id, foodId: (await getFood('Banana')).id, quantity: '1 unidade', observation: 'Pode ser panqueca com ovo e aveia.' },
      { mealId: meal4.id, foodId: (await getFood('Uva')).id, quantity: '100g' }
    ]
  });

  // --- REFEIÇÃO 5 (Jantar - PRIORIDADE OPÇÃO 1) ---
  const meal5 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 5 (Jantar)', order: 5 } });
  
  // No plano de Agosto, a Opção 1 do jantar é a repetição do Almoço
  await prisma.mealItem.createMany({
    data: [
      { mealId: meal5.id, foodId: (await getFood('Arroz')).id, quantity: '3 colheres sopa (80g)', observation: 'Prioridade: Opção 01 (Igual almoço)' },
      { mealId: meal5.id, foodId: (await getFood('Feijão')).id, quantity: '1 concha pequena (110g)' },
      { mealId: meal5.id, foodId: (await getFood('Carne bovina grelhada')).id, quantity: '100g' },
      { mealId: meal5.id, foodId: (await getFood('Salada de folhas')).id, quantity: 'À vontade' },
      { mealId: meal5.id, foodId: (await getFood('Legumes')).id, quantity: '150g', notes: 'Sem azeite.' }
    ]
  });

  console.log("Seeder finalizado com sucesso!");
}