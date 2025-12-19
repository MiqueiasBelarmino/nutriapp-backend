import { PrismaClient } from '@prisma/client';

export async function seedMealPlans01(prisma: PrismaClient, professionalId: string, patientId: string) {
  console.log('Iniciando seed completo de planos alimentares...');

  const getFood = async (searchTerm: string) => {
    const food = await prisma.food.findFirst({
      where: { name: { contains: searchTerm, mode: 'insensitive' } }
    });
    if (!food) {
      console.warn(`⚠️ Alimento "${searchTerm}" não encontrado. Criando entrada temporária.`);
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
      date: new Date('2025-07-12'),
      content: 'Plano Alimentar - Julho 2025. Beber no mínimo 4L de água.',
    },
  });

  // --- REFEIÇÃO 1 (08h00-09h30) ---
  const meal1 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 1', order: 1 } });
  const foodPao = await getFood('Pão de forma');
  await prisma.mealItem.create({
    data: {
      mealId: meal1.id,
      foodId: foodPao.id,
      quantity: '2 fatias (50g)',
      notes: 'Opções: Pão Francês (50g), Pão de Queijo (40g) ou Bolo Simples (50g)'   
    }
  });
  const foodOvo = await getFood('Ovo mexido');
  await prisma.mealItem.create({
    data: {
      mealId: meal1.id,
      foodId: foodOvo.id,
      quantity: '2 unidades',
      observation: 'Recheio: 2 Ovos ou 2 Fatias de Queijo (40g)'  
    }
  });

  // --- REFEIÇÃO 2 (10h00-11h30) ---
  const meal2 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 2', order: 2 } });
  const foodUva = await getFood('Uva');
  const uvaItem = await prisma.mealItem.create({
    data: {
      mealId: meal2.id,
      foodId: foodUva.id,
      quantity: '2 porções',
      observation: 'Escolher 2 frutas da lista de substitutos'  
    }
  });

  const frutas = ['Melancia', 'Banana', 'Melão', 'Maçã', 'Pêra', 'Morango', 'Abacaxi'];
  for (const f of frutas) {
    const foodF = await getFood(f);
    await prisma.mealSubstitute.create({
      data: { itemId: uvaItem.id, foodId: foodF.id, quantity: '1 porção' }
    });
  }

  // --- REFEIÇÃO 3 (ALMOÇO - 11h30-12h30) ---
  const meal3 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 3', order: 3 } });
  const arrozFood = await getFood('Arroz');
  const arrozItem = await prisma.mealItem.create({
    data: {
      mealId: meal3.id,
      foodId: arrozFood.id,
      quantity: '4 colheres sopa (100g)',
      observation: 'NÃO UTILIZAR AZEITE; UTILIZE LIMÃO/VINAGRE' 
    }
  });

  // Substitutos do Carboidrato do Almoço
  const carbAlmoco = [{ name: 'Macarrão cozido', qty: '120g' }, { name: 'Batata doce cozida', qty: '140g' }];
  for (const c of carbAlmoco) {
    const foodC = await getFood(c.name);
    await prisma.mealSubstitute.create({ data: { itemId: arrozItem.id, foodId: foodC.id, quantity: c.qty }});
  }

  await prisma.mealItem.createMany({
    data: [
      { mealId: meal3.id, foodId: (await getFood('Feijão')).id, quantity: '1 concha pequena (110g)', notes: 'Deixar de molho 12h' },
      { mealId: meal3.id, foodId: (await getFood('Frango grelhado')).id, quantity: '100g', observation: 'Pode ser Peixe ou Carne Bovina' },
      { mealId: meal3.id, foodId: (await getFood('Salada de folhas')).id, quantity: '30g', observation: 'CRUA À VONTADE' },
      { mealId: meal3.id, foodId: (await getFood('Brócolis')).id, quantity: '150g' } 
    ]
  });

  // --- REFEIÇÃO 4 (15h30-17h30) ---
  const meal4 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 4', order: 4 } });
  await prisma.mealItem.create({
    data: {
      mealId: meal4.id,
      foodId: (await getFood('Banana')).id,
      quantity: '1 porção',
      observation: 'OPÇÃO 01: Panqueca de Banana (1 Banana + 1 Ovo + 10g Aveia)' 
    }
  });
  await prisma.mealItem.create({
    data: {
      mealId: meal4.id,
      foodId: (await getFood('Pão de forma')).id,
      quantity: '50g',
      observation: 'OPÇÃO 02: Pão com 50g de Carne/Frango/Peixe' 
    }
  });
  // Fruta adicional da tarde
  await prisma.mealItem.create({
    data: {
      mealId: meal4.id,
      foodId: (await getFood('Uva')).id,
      quantity: '1 porção (100g)' 
    }
  });

  // --- REFEIÇÃO 5 (20h00-21h00) ---
  const meal5 = await prisma.meal.create({ data: { mealPlanId: mealPlan.id, name: 'Refeição 5', order: 5 } });
  
  // Opção 1: Jantar igual ao almoço
  const jantarArroz = await prisma.mealItem.create({
    data: {
      mealId: meal5.id,
      foodId: arrozFood.id,
      quantity: '100g',
      observation: 'OPÇÃO 01: Igual ao Almoço' 
    }
  });

  // Opção 2: Hambúrguer Caseiro
  await prisma.mealItem.create({
    data: {
      mealId: meal5.id,
      foodId: (await getFood('Pão de hambúrguer')).id,
      quantity: '1 unidade (70g)',
      observation: 'OPÇÃO 02: Hambúrguer Caseiro (100g Carne + 20g Queijo + Alface/Tomate)'   
    }
  });

  console.log("Seeder finalizado com sucesso! Todas as 5 refeições foram populadas.");
}