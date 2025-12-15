/*
  Warnings:

  - You are about to drop the column `kcal_per_100g` on the `foods` table. All the data in the column will be lost.
  - Added the required column `serving_size` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serving_unit` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."foods" DROP COLUMN "kcal_per_100g",
ADD COLUMN     "calories" DOUBLE PRECISION,
ADD COLUMN     "serving_size" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "serving_unit" TEXT NOT NULL;
