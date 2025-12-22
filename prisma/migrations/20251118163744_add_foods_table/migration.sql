/*
  Warnings:

  - You are about to drop the column `food_name` on the `meal_items` table. All the data in the column will be lost.
  - You are about to drop the column `food_name` on the `meal_substitutes` table. All the data in the column will be lost.
  - Added the required column `foodId` to the `meal_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodId` to the `meal_substitutes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."meal_items" DROP COLUMN "food_name",
ADD COLUMN     "foodId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."meal_substitutes" DROP COLUMN "food_name",
ADD COLUMN     "foodId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."foods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kcal_per_100g" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION,
    "carbs" DOUBLE PRECISION,
    "fats" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "category" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."meal_items" ADD CONSTRAINT "meal_items_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meal_substitutes" ADD CONSTRAINT "meal_substitutes_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
