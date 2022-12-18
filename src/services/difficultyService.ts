import prisma from "../utils/prisma";

export const getAllDifficulty = async () => {
  const difficulty = await prisma.difficulty.findMany({});
  return difficulty;
};
