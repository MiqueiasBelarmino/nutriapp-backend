-- DropForeignKey
ALTER TABLE "public"."meal_items" DROP CONSTRAINT "meal_items_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."meal_substitutes" DROP CONSTRAINT "meal_substitutes_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."meals" DROP CONSTRAINT "meals_meal_plan_id_fkey";

-- AlterTable
ALTER TABLE "public"."meal_substitutes" ADD COLUMN     "observation" TEXT;

-- AddForeignKey
ALTER TABLE "public"."meals" ADD CONSTRAINT "meals_meal_plan_id_fkey" FOREIGN KEY ("meal_plan_id") REFERENCES "public"."meal_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meal_items" ADD CONSTRAINT "meal_items_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "public"."meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meal_substitutes" ADD CONSTRAINT "meal_substitutes_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."meal_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
