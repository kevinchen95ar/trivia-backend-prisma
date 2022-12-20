import { connect } from "http2";
import prisma from "../utils/prisma";
import { Difficulty } from "@prisma/client";

export const getAllTriviaFromDb = async () => {
  const allTrivia = await prisma.trivia.findMany({
    select: {
      id: true,
      score: true,
      triviaDate: true,
      User: {
        select: {
          username: true,
        },
      },
      Question: {
        select: {
          Category: {
            select: {
              category: true,
            },
          },
          Difficulty: {
            select: {
              difficulty: true,
            },
          },
        },
      },
    },
  });

  return allTrivia;
};

export const createTrivia = async (
  score: number,
  triviaTime: number,
  timeAvailable: number,
  userAnswers: string[],
  userId: string
) => {
  const createdTrivia = await prisma.trivia.create({
    data: {
      score: score,
      triviaTime: triviaTime,
      timeAvailable: timeAvailable,
      userAnswers: userAnswers,
      User: {
        connect: { id: userId },
      },
    },
  });
  return createdTrivia;
};
