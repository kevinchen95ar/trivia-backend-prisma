import { getAllDifficulty } from "./../services/difficultyService";

export const getAllDifficultyInDB = async (req: any, res: any) => {
  try {
    const dbDifficulty = await getAllDifficulty();
    res.json(dbDifficulty);
  } catch (error) {
    res.json(error);
  }
};
