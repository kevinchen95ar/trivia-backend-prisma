import prisma from "../utils/prisma";
import { createAnswer } from "./answerService";
import { Answer } from "@prisma/client";
import { newSourceBySourceName } from "./sourceService";

export const connectAllQuestionsWithTrivia = async (
  Questions: any,
  createdTrivia: any
) => {
  const length = Questions.length;
  for (var i = 0; i < length; i++) {
    await connectQuestionWithTrivia(Questions[i].id, createdTrivia.id);
  }
};

const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const selectRandomQuestions = async (
  allQuestions: any,
  quantity: any
) => {
  var questions: {
    id: string;
    questionType: string;
    question: string;
    Answer: Answer[];
  }[] = [];
  var i = 0;
  do {
    const index = randomIntFromInterval(0, allQuestions.length - 1);
    if (!questions.includes(allQuestions[index])) {
      questions.push(allQuestions[index]);
      i++;
    }
  } while (i < quantity);
  //devolvemos el array.
  return questions;
};

export const saveQuestionsToDB = async (
  questions: any,
  categoryId: string,
  difficultyId: string
) => {
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
  return repetidas;
};

export const getAvailableQuestionService = async () => {
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

  return questionsAvailable;
};

export const getAllQuestions = async () => {
  const allQuestions = await prisma.question.findMany({
    select: {
      id: true,
      questionType: true,
      question: true,
      Difficulty: true,
      Category: true,
      Answer: true,
    },
  });

  return allQuestions;
};

export const getQuestionsByDifCat = async (
  difficulty: string,
  category: string
) => {
  const allQuestions = await prisma.question.findMany({
    select: {
      id: true,
      questionType: true,
      question: true,
      Answer: true,
    },
    where: {
      Difficulty: {
        difficulty: difficulty,
      },
      Category: {
        category: category,
      },
    },
  });

  return allQuestions;
};

export const getQuestionFromSource = async (
  quantity: string,
  idCategory: string,
  difficulty: string,
  source: string
) => {
  const newSource = newSourceBySourceName(source);
  const questions = await newSource.getQuestions(
    quantity,
    idCategory,
    difficulty
  );
  return questions;
};

export const createQuestion = async (
  categoryId: string,
  difficultyId: string,
  questionType: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
) => {
  const exist = await prisma.question.findUnique({
    where: { question: question },
  });

  //Si ya existe la pregunta salimos
  if (exist) {
    console.log("una pregunta ya existente.");
    return;
  }

  const questionId = await prisma.question.create({
    data: {
      question: question,
      questionType: questionType,
      categoryId: categoryId,
      difficultyId: difficultyId,
    },
    select: { id: true },
  });

  // Creamos y vinculamos la respuesta correcta
  await createAnswer(correct_answer, true, questionId.id);

  // Creamos y vinculamos las respuestas incorrectas
  const incorrectAnswersLength = incorrect_answers.length;
  for (var i = 0; i < incorrectAnswersLength; i++) {
    await createAnswer(incorrect_answers[i], false, questionId.id);
  }

  return questionId;
};

export const connectQuestionWithTrivia = async (
  questionId: string,
  triviaId: string
) => {
  const connected = await prisma.question.update({
    where: {
      id: questionId,
    },
    data: {
      Trivia: {
        connect: { id: triviaId },
      },
    },
  });

  return connected;
};
