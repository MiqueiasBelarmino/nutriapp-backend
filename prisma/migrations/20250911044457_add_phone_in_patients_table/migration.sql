/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Patient" ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "public"."Usuario";
