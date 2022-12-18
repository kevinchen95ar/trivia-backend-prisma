/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[difficulty]` on the table `Difficulty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_category_key" ON "Category"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Difficulty_difficulty_key" ON "Difficulty"("difficulty");
