import axios from "axios";

interface source {
  getCategory(): Promise<[category] | []>;
  getQuestions(
    quantity: string,
    idCategory: string,
    difficulty: string
  ): Promise<[question] | []>;
}
interface category {
  id: string;
  name: string;
}

interface question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
}

export const opentdb: source = {
  async getCategory(): Promise<[category] | []> {
    const url = "https://opentdb.com/api_category.php";
    var allCategories: [category] = [{ id: "0", name: "Default" }];
    await axios.get(url).then((data) => {
      const categories = data.data.trivia_categories;
      allCategories.pop();
      for (var i = 0; i < categories.length; i++) {
        let cat = {
          id: categories[i].id.toString(),
          name: categories[i].name,
        };
        allCategories.push(cat);
      }
    });
    return allCategories;
  },
  async getQuestions(
    quantity: string,
    idCategory: string,
    difficulty: string
  ): Promise<[question] | []> {
    var allQuestions: [question] = [
      {
        category: "category",
        type: "type",
        difficulty: "difficulty",
        question: "question",
        correct_answer: "correct",
        incorrect_answers: ["incorrect"],
      },
    ];

    const url = `https://opentdb.com/api.php?amount=${quantity}&category=${idCategory}&difficulty=${difficulty}`;

    await axios.get(url).then((data) => {
      const questions = data.data.results;
      allQuestions.pop();
      for (var i = 0; i < questions.length; i++) {
        let que = {
          category: questions[i].category,
          type: questions[i].type,
          difficulty: questions[i].difficulty,
          question: questions[i].question,
          correct_answer: questions[i].correct_answer,
          incorrect_answers: questions[i].incorrect_answers,
        };
        allQuestions.push(que);
      }
    });

    return allQuestions;
  },
};
