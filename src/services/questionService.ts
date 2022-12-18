import axios from "axios";
import prisma from "../utils/prisma";
import { createAnswer } from "./answerService";

export const getAllQuestions = async () => {
  const allQuestions = await prisma.question.findMany({
    select: {
      id: true,
      questionType: true,
      question: true,
      Difficulty: true,
      Category: true,
      Answer: true,
      Trivia: true,
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
  if (source === "opentdb") {
    const url = `https://opentdb.com/api.php?amount=${quantity}&category=${idCategory}&difficulty=${difficulty}`;
    const data = await axios.get(url);
    return data.data.results;
  } else {
    // otra source y su logica
    return;
  }
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
