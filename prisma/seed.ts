import { PrismaClient } from '@prisma/client';
import { seedFoods } from './seeds/foods.seeder';
import { seedMealPlans01 } from './seeds/meal-plan-01.seeder';
import { seedMealPlans02 } from './seeds/meal-plan-02.seeder';
import { seedMealPlans03 } from './seeds/meal-plan-03.seeder';
import { seedFoodsTaco } from './seeds/foods-taco.seeder';
import { clearFoodsTable } from './seeds/foods-clear.seeder';
import { seedNutriAndPatient } from './seeds/nutri-patient.seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const { nutritionistId, patientId } = await seedNutriAndPatient();
  await clearFoodsTable(prisma);
  await seedFoods(prisma);
  await seedFoodsTaco(prisma);


  await seedMealPlans01(prisma, nutritionistId, patientId);
  await seedMealPlans02(prisma, nutritionistId, patientId);
  await seedMealPlans03(prisma, nutritionistId, patientId);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
