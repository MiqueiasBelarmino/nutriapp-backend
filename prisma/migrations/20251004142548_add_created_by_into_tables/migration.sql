-- AlterTable
ALTER TABLE "public"."consultations" ADD COLUMN     "created_by" TEXT;

-- AlterTable
ALTER TABLE "public"."meal_plans" ADD COLUMN     "created_by" TEXT;

-- AlterTable
ALTER TABLE "public"."patients" ADD COLUMN     "created_by" TEXT;

-- AddForeignKey
ALTER TABLE "public"."patients" ADD CONSTRAINT "patients_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."consultations" ADD CONSTRAINT "consultations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meal_plans" ADD CONSTRAINT "meal_plans_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
