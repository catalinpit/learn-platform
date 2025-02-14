-- DropIndex
DROP INDEX "Progress_userId_courseId_key";

-- CreateIndex
CREATE INDEX "Progress_courseId_idx" ON "Progress"("courseId");
