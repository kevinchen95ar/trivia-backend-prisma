import { opentdb } from "../interfaces/sourceInterface";
import prisma from "../utils/prisma";

export const getSourceID = async (source: string) => {
  const sourceID = await prisma.source.findUnique({
    where: { source: source },
    select: { id: true },
  });
  return sourceID;
};

export const newSourceBySourceName = (source: string) => {
  switch (source) {
    case "opentdb":
      return opentdb;

    default:
      return opentdb;
  }
};
