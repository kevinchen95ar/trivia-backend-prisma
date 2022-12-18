import prisma from "../utils/prisma";

export const getAllDifficulty = async () => {
  const difficulty = await prisma.difficulty.findMany({});
  return difficulty;
};

export const getDifficultyIdByDifficulty = async (difficulty: string) => {
  const difficultyId = await prisma.difficulty.findUnique({
    where: { difficulty: difficulty },
    select: { id: true },
  });
  if (difficultyId) {
    return difficultyId.id;
  }
  return;
};
