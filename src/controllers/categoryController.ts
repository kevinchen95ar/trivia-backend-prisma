import {
  getAllCategories,
  updateCategoriesService,
} from "../services/categoryService";
import { getSourceID } from "./../services/sourceService";

//Trae todas las categorias disponibles en la source solicitada y las coloca en nuestra db
export const updateAllCategories = async (req: any, res: any) => {
  try {
    const { source } = req.body;

    if (!source) {
      return res.json("Especifique un source");
    }

    //traemos el id del source solicitado
    const sourceID = await getSourceID(source);

    if (!sourceID) {
      return res.json("No existe el source especificado.");
    } else {
      await updateCategoriesService(sourceID.id, source);
      res.json("Actualizacion exitosa.");
    }
  } catch (error) {
    res.json(error);
  }
};

//Get de todas las categorias en la base de datos
export const getAllCategoriesInDB = async (req: any, res: any) => {
  try {
    const dbCategories = await getAllCategories();
    res.json(dbCategories);
  } catch (error) {
    res.json(error);
  }
};
