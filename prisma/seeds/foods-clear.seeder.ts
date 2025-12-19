import { PrismaClient } from '@prisma/client';

export async function clearFoodsTable(prisma: PrismaClient) {
  console.log('Cleaning food table...');
  await prisma.food.deleteMany();
  console.log('Finished cleaning foods table');
}