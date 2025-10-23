-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CREATOR', 'STUDENT');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['STUDENT']::"Role"[];
