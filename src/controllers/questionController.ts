import {
  createQuestion,
  getAllQuestions,
  getQuestionFromSource,
} from "./../services/questionService";
import {
  getCategoriesFromSource,
  getCategoryIdByCategory,
} from "./../services/categoryService";
import { getDifficultyIdByDifficulty } from "../services/difficultyService";

//GET - Trae la cantidad de preguntas por categoria y dificultad
export const getAvailableQuestionQuantity = async (req: any, res: any) => {
  //Traemos todas las preguntas de la db y la almacenamos en un array
  const dbQuestions = await getAllQuestions();

  //Creamos un array questionsAvailable que sus elementos tienen como atributos la categoria, dificultad y cantidad
  //Inicializamos con el primer elemento
  const questionsAvailable = [
    {
      id: 1,
      category: dbQuestions[0].Category.category,
      difficulty: dbQuestions[0].Difficulty.difficulty,
      quantity: 1,
    },
  ];

  var QAid = 2;
  const length = dbQuestions.length;
  //Recorremos las preguntas de la db una por una y comparamos con questionAvailable
  for (var i = 1; i < length; i++) {
    var availableLength = questionsAvailable.length;
    var nuevo = true;
    for (var j = 0; j < availableLength; j++) {
      //Si coincide con un elemento sumamos a la cantidad
      if (
        dbQuestions[i].Category.category === questionsAvailable[j].category &&
        dbQuestions[i].Difficulty.difficulty ===
          questionsAvailable[j].difficulty
      ) {
        questionsAvailable[j].quantity++;
        nuevo = false;
      }
    }
    //Si no coincide con un elemento creamos un nuevo elemento.
    if (nuevo) {
      var category = dbQuestions[i].Category.category;
      var difficulty = dbQuestions[i].Difficulty.difficulty;
      questionsAvailable.push({
        id: QAid,
        category: category,
        difficulty: difficulty,
        quantity: 1,
      });
      QAid++;
    }
  }
  // Devolvemos el array questionsAvailable
  res.json(questionsAvailable);
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
    var idCategory = "";
    const sourceLength = sourceCategories.length;
    for (var i = 0; i < sourceLength; i++) {
      if (sourceCategories[i].name === category) {
        idCategory = sourceCategories[i].id;
      }
    }

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
    const questionsLength = questions.length;
    var repetidas = 0;
    for (var i = 0; i < questionsLength; i++) {
      const createdQuestion = await createQuestion(
        categoryId,
        difficultyId,
        questions[i].type,
        questions[i].question,
        questions[i].correct_answer,
        questions[i].incorrect_answers
      );
      if (!createdQuestion) {
        repetidas++;
      }
    }

    res.json(
      `Creacion Exitosa. De las ${quantity} preguntas solicitadas se encontraron ${repetidas} repetidas. Se añadieron ${
        quantity - repetidas
      }`
    );
  } catch (error) {
    res.json(error);
  }
};

//GET getRandomQuestions - Nos devuelve un array de preguntas aleatorias
