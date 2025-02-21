/*
  Warnings:

  - You are about to drop the column `chapterId` on the `Progress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,lessonId]` on the table `Progress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lessonId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_chapterId_fkey";

-- DropIndex
DROP INDEX "Progress_userId_chapterId_key";

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "chapterId",
ADD COLUMN     "lessonId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Progress_userId_lessonId_key" ON "Progress"("userId", "lessonId");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
