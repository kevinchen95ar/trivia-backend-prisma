import prisma from "../utils/prisma";
import { opentdb } from "../interfaces/sourceInterface";

export const getIDCategoryFromCategoriesSourceByCategory = async (
  categories: any,
  category: string
) => {
  var idCategory = "";
  const sourceLength = categories.length;
  for (var i = 0; i < sourceLength; i++) {
    if (categories[i].name === category) {
      idCategory = categories[i].id;
    }
  }
  return idCategory;
};

export const updateCategoriesService = async (id: string, source: string) => {
  //Traemos todas las categorias de la base de datos donde la source sea la misma
  const db = await getCategoriesBySourceID(id);

  // Colocamos todas las categorias en un array simple sin los id para poder comparar con include
  const dbLength = db.length;
  var dbCategories = [];
  for (var i = 0; i < dbLength; i++) {
    dbCategories.push(db[i].category);
  }

  //Traemos las categories de la source solicitada
  const sourceCategories = await getCategoriesFromSource(source);

  //Comparamos las categories de la db y la source
  var newCategories = [];
  const sourceLength = sourceCategories.length;
  for (var i = 0; i < sourceLength; i++) {
    //Chequeamos que si ya existe esa categoria, si no existe la insertamos en el array
    if (!dbCategories.includes(sourceCategories[i].name)) {
      newCategories.push(sourceCategories[i].name);
    }
  }

  //Guardamos solo las que no se repiten
  const newLength = newCategories.length;
  if (newLength !== 0) {
    for (var i = 0; i < newLength; i++) {
      await createCategory(newCategories[i], id);
    }
  }
};

export const getCategoriesFromSource = async (source: string) => {
  if (source === "opentdb") {
    const categories = opentdb.getCategory();
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

export const getCategoryIdByCategory = async (category: string) => {
  const categoryId = await prisma.category.findUnique({
    where: { category: category },
    select: { id: true },
  });
  if (categoryId) {
    return categoryId.id;
  }
  return;
};
