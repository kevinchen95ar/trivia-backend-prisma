import { connectQuestionWithTrivia } from "../services/questionService";
import { createTrivia, getAllTriviaFromDb } from "../services/triviaService";

export const getAllTrivia = async (req: any, res: any) => {
  try {
    const allTrivia = await getAllTriviaFromDb();
    res.json(allTrivia);
  } catch (error) {
    res.json(error);
  }
};
export const registerTrivia = async (req: any, res: any) => {
  try {
    const { score, triviaTime, timeAvailable, userAnswers, userId, Questions } =
      req.body;

    const createdTrivia = await createTrivia(
      score,
      triviaTime,
      timeAvailable,
      userAnswers,
      userId
    );

    //vinculamos la trivia creada con las preguntas utilizadas
    const length = Questions.length;
    for (var i = 0; i < length; i++) {
      await connectQuestionWithTrivia(Questions[i].id, createdTrivia.id);
    }

    res.json(createdTrivia);
  } catch (error) {
    res.json(error);
  }
};
