/*
  Warnings:

  - The `tags` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CourseTag" AS ENUM ('JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'NEXTJS', 'NODE', 'PYTHON', 'JAVA', 'GOLANG', 'CSS', 'HTML', 'DESIGN', 'DEVOPS', 'DATABASE', 'MOBILE', 'TESTING', 'SECURITY', 'TECHNICAL_WRITING', 'MARKETING');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "tags",
ADD COLUMN     "tags" "CourseTag"[];
