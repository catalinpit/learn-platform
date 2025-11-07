/*
  Warnings:

  - You are about to drop the column `videoUrls` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "videoUrls",
ALTER COLUMN "isPublished" SET DEFAULT false,
ALTER COLUMN "price" SET DEFAULT 10;
