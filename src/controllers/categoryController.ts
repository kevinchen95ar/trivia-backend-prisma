import {
  getAllCategories,
  getCategoriesBySourceID,
  getCategoriesFromSource,
} from "../services/categoryService";
import { getSourceID } from "./../services/sourceService";
import { createCategory } from "./../services/categoryService";

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
      //Traemos todas las categorias de la base de datos donde la source sea la misma
      const db = await getCategoriesBySourceID(sourceID.id);

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
          await createCategory(newCategories[i], sourceID.id);
        }
      }

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
