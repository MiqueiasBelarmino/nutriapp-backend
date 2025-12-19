/*
  Warnings:

  - You are about to drop the column `serving_size` on the `foods` table. All the data in the column will be lost.
  - Added the required column `serving_quantity` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."foods" DROP COLUMN "serving_size",
ADD COLUMN     "equivalent_quantity" DOUBLE PRECISION,
ADD COLUMN     "equivalent_unit" TEXT,
ADD COLUMN     "serving_quantity" DOUBLE PRECISION NOT NULL;
