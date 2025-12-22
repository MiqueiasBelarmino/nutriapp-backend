import { PrismaClient } from '@prisma/client';

const foods = [
  // --- PROTEÍNAS (Carnes e Aves) ---
  { name: "Frango grelhado (Peito)", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "filé médio", calories: 159, protein: 32, carbs: 0, fats: 2.5, fiber: 0, sodium: 50 },
  { name: "Frango desfiado", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 3, equivalentUnit: "colheres de sopa", calories: 140, protein: 28, carbs: 0, fats: 3, fiber: 0, sodium: 60 },
  { name: "Carne bovina grelhada (Magra)", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "bife médio", calories: 190, protein: 28, carbs: 0, fats: 8, fiber: 0, sodium: 65 },
  { name: "Carne moída refogada", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 4, equivalentUnit: "colheres de sopa", calories: 210, protein: 25, carbs: 0, fats: 12, fiber: 0, sodium: 70 },
  { name: "Peixe branco grelhado", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "filé médio", calories: 110, protein: 22, carbs: 0, fats: 2, fiber: 0, sodium: 60 },
  { name: "Peixe branco assado", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "posta média", calories: 130, protein: 20, carbs: 0, fats: 4, fiber: 0, sodium: 55 },
  { name: "Salmão grelhado", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "filé médio", calories: 210, protein: 23, carbs: 0, fats: 13, fiber: 0, sodium: 50 },

  // --- PROTEÍNAS (Ovos e Laticínios) ---
  { name: "Ovo cozido", servingQuantity: 50, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "unidade", calories: 78, protein: 6.3, carbs: 0.6, fats: 5.3, fiber: 0, sodium: 62 },
  { name: "Ovo frito", servingQuantity: 50, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "unidade", calories: 110, protein: 6.3, carbs: 0.6, fats: 9, fiber: 0, sodium: 70 },
  { name: "Ovo mexido", servingQuantity: 100, servingUnit: "g", equivalentQuantity: null, equivalentUnit: null, calories: 148, protein: 12, carbs: 1, fats: 10, fiber: 0, sodium: 200 },
  { name: "Iogurte natural", servingQuantity: 170, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "pote", calories: 110, protein: 6, carbs: 9, fats: 6, fiber: 0, sodium: 80 },

  // --- CARBOIDRATOS (Acompanhamentos) ---
  { name: "Arroz branco cozido", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 4, equivalentUnit: "colheres de sopa", calories: 130, protein: 2.5, carbs: 28, fats: 0.2, fiber: 1.6, sodium: 1 },
  { name: "Arroz integral cozido", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 4, equivalentUnit: "colheres de sopa", calories: 124, protein: 2.6, carbs: 25.8, fats: 1, fiber: 2.7, sodium: 1 },
  { name: "Feijão carioca cozido", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "concha média", calories: 76, protein: 4.8, carbs: 13.6, fats: 0.5, fiber: 8.5, sodium: 2 },
  { name: "Batata doce cozida", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "unidade pequena", calories: 86, protein: 1.6, carbs: 20, fats: 0.1, fiber: 3, sodium: 55 },
  { name: "Macarrão cozido", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "pegador", calories: 158, protein: 5.8, carbs: 31, fats: 0.9, fiber: 1.8, sodium: 1 },

  // --- FRUTAS E VEGETAIS ---
  { name: "Banana prata", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "unidade média", calories: 98, protein: 1.3, carbs: 26, fats: 0.3, fiber: 2, sodium: 0 },
  { name: "Maçã com casca", servingQuantity: 100, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "unidade média", calories: 52, protein: 0.3, carbs: 14, fats: 0.2, fiber: 2.4, sodium: 0 },
  { name: "Uva", servingQuantity: 100, servingUnit: "g", equivalentQuantity: null, equivalentUnit: null, calories: 69, protein: 0.7, carbs: 18, fats: 0.2, fiber: 0.9, sodium: 2 },
  { name: "Salada de folhas verdes", servingQuantity: 50, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "prato de sobremesa", calories: 10, protein: 0.8, carbs: 1.5, fats: 0.1, fiber: 1.2, sodium: 5 },

  // --- GORDURAS E EXTRAS ---
  { name: "Azeite de oliva", servingQuantity: 13, servingUnit: "ml", equivalentQuantity: 1, equivalentUnit: "colher de sopa", calories: 119, protein: 0, carbs: 0, fats: 13.5, fiber: 0, sodium: 0 },
  { name: "Manteiga com sal", servingQuantity: 10, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "ponta de faca", calories: 72, protein: 0.1, carbs: 0, fats: 8.1, fiber: 0, sodium: 60 },
  { name: "Pasta de amendoim", servingQuantity: 15, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "colher de sopa", calories: 90, protein: 4, carbs: 3, fats: 8, fiber: 1, sodium: 0 },

  { name: "Farinha de tapioca", servingQuantity: 20, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "colher cheia", calories: 70, protein: 0, carbs: 17, fats: 0, fiber: 0, sodium: 0 },
  { name: "Queijo ralado", servingQuantity: 10, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "colher", calories: 40, protein: 3, carbs: 0, fats: 3, fiber: 0, sodium: 120 },
  { name: "Orégano", servingQuantity: 1, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "Pitada", calories: 3, protein: 0.1, carbs: 0.6, fats: 0, fiber: 0.4, sodium: 0 },
  { name: "Pão de hambúrguer", servingQuantity: 80, servingUnit: "g", equivalentQuantity: 1, equivalentUnit: "unidade", calories: 230, protein: 7, carbs: 42, fats: 3.5, fiber: 2, sodium: 350 },
  { name: "Refrigerante Zero", servingQuantity: 350, servingUnit: "ml", equivalentQuantity: 1, equivalentUnit: "lata", calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sodium: 40 },
];

// Helper to capitalize first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export async function seedFoods(prisma: PrismaClient) {
  console.log('Start seeding foods with nutritional info...');

  for (const food of foods) {
    const formattedName = capitalize(food.name);

    // Check if exists
    const exists = await prisma.food.findFirst({
      where: { name: { equals: formattedName, mode: 'insensitive' } }
    });

    const data = {
      name: formattedName,
      servingQuantity: food.servingQuantity,
      servingUnit: food.servingUnit,
      equivalentQuantity: food.equivalentQuantity,
      equivalentUnit: food.equivalentUnit,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fats: food.fats,
      fiber: food.fiber,
      sodium: food.sodium,
    };

    if (!exists) {
      await prisma.food.create({ data });
    } else {
      await prisma.food.update({
        where: { id: exists.id },
        data
      });
    }
  }

  console.log('Food seeding finished.');
}
