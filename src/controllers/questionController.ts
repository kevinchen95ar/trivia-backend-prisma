import { getAllQuestions } from "./../services/questionService";
const axios = require("axios").default;

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

//TODO:
//UPDATE - Traemos de la API de opentdb las preguntas con los parametros que le pasemos
export const updateQuestionsAvailable = async (req: any, res: any) => {
  //  try {
  //     const { category, difficulty, quantity } = req.body;
  //     const url = "https://opentdb.com/api_category.php";
  //     const idCategory = await axios
  //       //traemos de opentdb todas las categorias`
  //       .get(url)
  //       .then(
  //         // comparamos la categoria del body con todas las de opentdb para sacar el id
  //         (res) => {
  //           var id = 0;
  //           res.data.trivia_categories.forEach((e) => {
  //             if (e.name === category) {
  //               id = e.id;
  //             }
  //           });
  //           //Error al encontrar la categoria
  //           if (id === 0) {
  //             return res.status(409).send("No se encontro la categoria.");
  //           }
  //           return id;
  //         }
  //       );
  //     // El link de las preguntas con los parametros.
  //     const questionURL = `https://opentdb.com/api.php?amount=${quantity}&category=${idCategory}&difficulty=${difficulty}`;
  //     //guardamos las preguntas en la db -- FALTA HACER, parecido al UPDATEALLCATEGORIES
  //     //UPDATE ALL CATEGORIES ACA ARRANCA
  //     const dbQuestions = await pool.query("SELECT * FROM question");
  //     const allLength = dbQuestions.rows.length;
  //     // Colocamos todas las question en un array simple sin los id para poder comparar con include
  //     var allQuestions = [];
  //     for (var i = 0; i < allLength; i++) {
  //       allQuestions.push(dbQuestions.rows[i].question);
  //     }
  //     //Creamos un array que tendra solo las question no repetidas
  //     var newQuestions = [];
  //     await axios
  //       .get(questionURL)
  //       .then((res) => {
  //         const length = res.data.results.length;
  //         for (var i = 0; i < length; i++) {
  //           //Chequeamos que si ya existe esa pregunta, si no existe la insertamos en el array
  //           if (!allQuestions.includes(res.data.results[i].question)) {
  //             newQuestions.push(res.data.results[i]);
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     // Guardamos en la base de datos las nuevas preguntas
  //     const newLength = newQuestions.length;
  //     if (newLength !== 0) {
  //       for (var i = 0; i < newLength; i++) {
  //         // hay que buscar el idcategory y el iddifficulty en la db -- FALTA HACER
  //         await pool.query(
  //           "INSERT INTO question (questiontype, question, idcategory, iddifficulty) VALUES ($1, $2, $3, $4) RETURNING *",
  //           [newQuestions[i].questiontype, opentdbID] // ACA FALTA TMB
  //         );
  //         // TAMBIEN HAY QUE INSERTAR LAS ANSWER Y RELACIONARLA CON LA QUESTION
  //       }
  //     }
  //     //ACA TERMINA
  //   } catch (error) {
  //     res.json({ error: error.message });
  //   }
};

//GET getRandomQuestions - Nos devuelve un array de preguntas aleatorias no repetidas
