/*
  Warnings:

  - You are about to drop the column `content` on the `meal_plans` table. All the data in the column will be lost.

*/

-- CreateTable
CREATE TABLE "public"."meals" (
    "id" TEXT NOT NULL,
    "meal_plan_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meal_items" (
    "id" TEXT NOT NULL,
    "meal_id" TEXT NOT NULL,
    "food_name" TEXT NOT NULL,
    "quantity" TEXT,
    "notes" TEXT,

    CONSTRAINT "meal_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meal_substitutes" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "food_name" TEXT NOT NULL,
    "quantity" TEXT,
    "notes" TEXT,

    CONSTRAINT "meal_substitutes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."meals" ADD CONSTRAINT "meals_meal_plan_id_fkey" FOREIGN KEY ("meal_plan_id") REFERENCES "public"."meal_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meal_items" ADD CONSTRAINT "meal_items_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "public"."meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meal_substitutes" ADD CONSTRAINT "meal_substitutes_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
