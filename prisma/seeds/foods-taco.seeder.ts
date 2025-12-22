import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Helpers
const capitalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/(^|\s)\S/g, (l) => l.toUpperCase());

export async function seedFoodsTaco(prisma: PrismaClient) {
  // console.log('Cleaning food table...');

  // Optional: decide if we want to delete all or upsert. 
  // The original code deleted all, but then also had an upsert logic in the loop weirdly.
  // We'll stick to upserting or creating if missing, but since we have a defined list,
  // usually deleting all is cleaner for a seed if we want to mirror the file exactly.
  // However, `deleteMany` was there. Let's keep it to ensure a fresh start or remove it if we want to preserve other foods.
  // given the previous code had `await prisma.food.deleteMany();` let's keep it but maybe it's too aggressive if there are other foods?
  // The user asked to "populate", usually implies adding.
  // The previous code did `deleteMany`, so I will respect that behavior but maybe comment it out or keep it if it's "seed".
  // Actually, existing code:
  // await prisma.food.deleteMany();
  // ...
  // if (!exists) create else update
  // The deleteMany at the top makes the udpate part redundant unless run twice without cleaning.
  // I will remove deleteMany to be safe, or just use upsert. 
  // Let's stick to "upsert" logic (find first then update or create) effectively.

  // Actually, for a seeder called "taco", maybe it should only manage taco foods?
  // But we don't have a reliable way to distinguish them yet (maybe category?).
  // I'll stick to the loop behavior: check if exists by name, if not create, else update.
  // I will REMOVE the initial deleteMany to allow cumulative runs or other seeds.

  console.log('Start seeding foods from TACO JSON...');

  // tacoData is likely an array or has a default export depending on tsconfig. 
  // We'll assume it's an array based on the file view `[` ... `]`.
  // If `import * as tacoData` results in an object with keys, we might need `tacoData.default` or similar.
  // Safest is to use `require` or just handle the import. 
  // Let's use `require` to avoid TS issues with json module resolution if not enabled.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const foods = require('./taco_formatado.json');

  for (const food of foods) {
    const name = capitalize(food.name ?? '');

    if (!name) continue;

    const data = {
      name,
      servingQuantity: 100,
      servingUnit: 'g',
      equivalentQuantity: null,
      equivalentUnit: null,

      calories: Number(food.calories) || 0,
      protein: Number(food.protein) || 0,
      fats: Number(food.fats) || 0,
      carbs: Number(food.carbs) || 0,
      fiber: Number(food.fiber) || 0,
      sodium: Number(food.sodium) || 0,
      
      // We could add a category if meaningful, currently null in schema
      category: null, 
    };

    const exists = await prisma.food.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
      },
    });

    if (!exists) {
      await prisma.food.create({ data });
    } else {
      await prisma.food.update({
        where: { id: exists.id },
        data,
      });
    }
  }

  console.log(`Food seeding finished. Processed ${foods.length} items.`);
}
