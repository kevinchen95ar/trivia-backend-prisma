/*
  Warnings:

  - You are about to drop the column `amountQuestions` on the `Trivia` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswers` on the `Trivia` table. All the data in the column will be lost.
  - You are about to drop the column `incorrectAnswers` on the `Trivia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trivia" DROP COLUMN "amountQuestions",
DROP COLUMN "correctAnswers",
DROP COLUMN "incorrectAnswers",
ADD COLUMN     "userAnswers" TEXT[];
