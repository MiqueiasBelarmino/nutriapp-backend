import { PrismaClient } from '@prisma/client';

export async function seedMealPlans03(prisma: PrismaClient, professionalId: string, patientId: string) {
  console.log('Iniciando seed: Plano Setembro 2025 (Prioridade Opção 1)...');

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

  // 2. Plano Alimentar de Setembro
  const mealPlan = await prisma.mealPlan.create({
    data: {
      patientId: patientId,
      createdBy: professionalId,
      date: new Date('2025-09-25'),
      content: 'PLANO SETEMBRO 2025 - FOCO EM MANUTENÇÃO E QUEDA. Meta Água: 4L/dia.',
    },
  });

  // --- REFEIÇÃO 1 (Café da Manhã) ---
  const meal1 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 1', order: 1 } });
  await prisma.mealItem.createMany({
    data: [
      { mealId: meal1.id, foodId: (await getFood('Pão Francês')).id, quantity: '1 unidade (50g)', notes: 'Opção: Pão de forma ou pão de queijo.' },
      { mealId: meal1.id, foodId: (await getFood('Ovo mexido')).id, quantity: '2 unidades' },
      { mealId: meal1.id, foodId: (await getFood('Iogurte natural')).id, quantity: '150ml', notes: 'Leite desnatado + café.' }
    ]
  });

  // --- REFEIÇÃO 2 (Lanche da Manhã) ---
  const meal2 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 2', order: 2 } });
  await prisma.mealItem.create({
    data: {
      mealId: meal2.id,
      foodId: (await getFood('Frutas variadas')).id,
      quantity: '2 PORÇÕES',
      observation: 'Ex: 1 Banana + 100g de Uva ou Melancia.'
    }
  });

  // --- REFEIÇÃO 3 (Almoço) ---
  const meal3 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 3', order: 3 } });
  await prisma.mealItem.createMany({
    data: [
      { mealId: meal3.id, foodId: (await getFood('Arroz')).id, quantity: '3 colheres sopa (80g)' },
      { mealId: meal3.id, foodId: (await getFood('Feijão')).id, quantity: '1 concha pequena (110g)' },
      { mealId: meal3.id, foodId: (await getFood('Frango grelhado')).id, quantity: '100g' },
      { mealId: meal3.id, foodId: (await getFood('Salada de folhas')).id, quantity: 'À vontade', observation: 'Mínimo 30g.' },
      { mealId: meal3.id, foodId: (await getFood('Brócolis')).id, quantity: '150g', notes: 'Utilizar limão/vinagre, sem azeite.' }
    ]
  });

  // --- REFEIÇÃO 4 (Lanche da Tarde) ---
  const meal4 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 4', order: 4 } });
  await prisma.mealItem.createMany({
    data: [
      { mealId: meal4.id, foodId: (await getFood('Banana')).id, quantity: '1 unidade', observation: 'Pode ser consumida como panqueca (1 ovo + 10g aveia).' },
      { mealId: meal4.id, foodId: (await getFood('Uva')).id, quantity: '100g', notes: 'Segunda porção de fruta da tarde.' }
    ]
  });

  // --- REFEIÇÃO 5 (Jantar - PRIORIDADE OPÇÃO 1) ---
  const meal5 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 5', order: 5 } });
  await prisma.mealItem.createMany({
    data: [
      { mealId: meal5.id, foodId: (await getFood('Arroz')).id, quantity: '3 colheres sopa (80g)', observation: 'Prioridade Opção 01: Igual Almoço.' },
      { mealId: meal5.id, foodId: (await getFood('Feijão')).id, quantity: '1 concha pequena (110g)' },
      { mealId: meal5.id, foodId: (await getFood('Carne bovina grelhada')).id, quantity: '100g' },
      { mealId: meal5.id, foodId: (await getFood('Salada de folhas')).id, quantity: 'À vontade' },
      { mealId: meal5.id, foodId: (await getFood('Legumes')).id, quantity: '150g', notes: 'Sem azeite.' }
    ]
  });

  // --- EXTRA: OPCIONAL MADRUGADA (Novidade do Plano de Setembro) ---
  await prisma.mealItem.create({
    data: {
      mealId: meal5.id, // Vinculado ao final do dia
      foodId: (await getFood('Gelatina Diet')).id,
      quantity: '300g',
      notes: 'Opcional após o jantar ou se sentir fome de madrugada.'
    }
  });

  console.log("Seeder Setembro 2025 finalizado com sucesso!");
}