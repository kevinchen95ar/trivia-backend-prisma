import prisma from "../utils/prisma";

export const getSourceID = async (source: string) => {
  const sourceID = await prisma.source.findUnique({
    where: { source: source },
    select: { id: true },
  });
  return sourceID;
};
