/*
  Warnings:

  - You are about to drop the column `descriptiont` on the `Chapter` table. All the data in the column will be lost.
  - Added the required column `description` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "descriptiont",
ADD COLUMN     "description" TEXT NOT NULL;
