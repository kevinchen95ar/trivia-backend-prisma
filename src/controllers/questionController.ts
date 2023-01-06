import {
  getAvailableQuestionService,
  getQuestionFromSource,
  getQuestionsByDifCat,
  saveQuestionsToDB,
  selectRandomQuestions,
} from "./../services/questionService";
import {
  getCategoriesFromSource,
  getCategoryIdByCategory,
  getIDCategoryFromCategoriesSourceByCategory,
} from "./../services/categoryService";
import { getDifficultyIdByDifficulty } from "../services/difficultyService";

//GET - Trae la cantidad de preguntas por categoria y dificultad
export const getAvailableQuestionQuantity = async (req: any, res: any) => {
  try {
    const questionsAvailable = await getAvailableQuestionService();
    // Devolvemos el array questionsAvailable
    res.json(questionsAvailable);
  } catch (error) {
    res.json(error);
  }
};

//UPDATE - Traemos de la API de opentdb las preguntas con los parametros que le pasemos, no se guardan las repetidas
export const updateQuestionsAvailable = async (req: any, res: any) => {
  try {
    const { category, difficulty, quantity, source } = req.body;

    if (!(category && difficulty && quantity && source)) {
      return res.json("Faltan datos");
    }

    // traemos las categorias de la source
    const sourceCategories = await getCategoriesFromSource(source);

    // buscamos el id de la categoria en cuestion
    const idCategory = await getIDCategoryFromCategoriesSourceByCategory(
      sourceCategories,
      category
    );

    if (idCategory === "") {
      return res.json("No se encontro la categoria.");
    }

    // Traemos las preguntas de la source especificada
    const questions = await getQuestionFromSource(
      quantity,
      idCategory,
      difficulty,
      source
    );

    if (questions.length === 0) {
      return res.json(
        "No se encontraron preguntas con los parametros ingresados."
      );
    }

    //buscamos la categoryid y la dificulty id en nuestra bd
    const categoryId = await getCategoryIdByCategory(category);
    const difficultyId = await getDifficultyIdByDifficulty(difficulty);

    if (!(categoryId && difficultyId)) {
      return res.json("error");
    }

    //guardamos las preguntas y respuestas en la base de datos y contamos si hay repetidas
    const repetidas = await saveQuestionsToDB(
      questions,
      categoryId,
      difficultyId
    );

    res.json(
      `Creacion Exitosa. De las ${quantity} preguntas solicitadas se encontraron ${repetidas} repetidas. Se añadieron ${
        quantity - repetidas
      }`
    );
  } catch (error) {
    res.json(error);
  }
};

//GET - Nos devuelve un array de preguntas aleatorias con los parametros indicados
export const getRandomQuestions = async (req: any, res: any) => {
  try {
    const { quantity, difficulty, category } = req.body;

    console.log(req.body);

    //Traemos las preguntas con la dificultad y categoria seleccionadas
    const dbQuestions = await getQuestionsByDifCat(difficulty, category);

    if (dbQuestions.length < quantity) {
      return res.json(
        "No hay suficientes preguntas para la cantidad requerida."
      );
    }

    //Seleccionamos la cantidad de preguntas aleatoriamente
    const questions = await selectRandomQuestions(dbQuestions, quantity);

    res.json(questions);
  } catch (error) {
    res.json(error);
  }
};
