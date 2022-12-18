import axios from "axios";
import prisma from "../utils/prisma";

export const getCategoriesFromSource = async (source: string) => {
  if (source === "opentdb") {
    const url = "https://opentdb.com/api_category.php";
    const data = await axios.get(url);
    const categories = data.data.trivia_categories;
    return categories;
  } else {
    //Otra source y su logica
    return;
  }
};

export const getCategoriesBySourceID = async (id: string) => {
  const categories = await prisma.category.findMany({
    where: { sourceId: id },
    select: {
      category: true,
    },
  });

  return categories;
};

export const createCategory = async (category: string, sourceID: string) => {
  const createdCategory = await prisma.category.create({
    data: { category: category, sourceId: sourceID },
  });
  return createdCategory;
};

export const getAllCategories = async () => {
  const dbCategories = await prisma.category.findMany({
    select: {
      id: true,
      category: true,
    },
  });
  return dbCategories;
};
