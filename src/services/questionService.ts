import prisma from "../utils/prisma";

export const getAllQuestions = async () => {
  const allQuestions = await prisma.question.findMany({
    select: {
      id: true,
      questionType: true,
      question: true,
      Difficulty: true,
      Category: true,
      Answer: true,
      Trivia: true,
    },
  });

  return allQuestions;
};
