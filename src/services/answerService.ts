import prisma from "../utils/prisma";

export const createAnswer = async (
  answer: string,
  correct: boolean,
  questionId: string
) => {
  const answerId = await prisma.answer.create({
    data: {
      answer: answer,
      correct: correct,
      questionId: questionId,
    },
    select: { id: true },
  });
  return answerId;
};
