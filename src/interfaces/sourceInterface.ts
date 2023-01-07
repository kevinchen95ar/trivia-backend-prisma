import axios from "axios";

interface source {
  getCategory(): any;
  getQuestions(quantity: string, idCategory: string, difficulty: string): any;
}

export const opentdb: source = {
  async getCategory(): Promise<any> {
    const url = "https://opentdb.com/api_category.php";
    const data = await axios.get(url);
    const categories = data.data.trivia_categories;
    return categories;
  },
  async getQuestions(
    quantity: string,
    idCategory: string,
    difficulty: string
  ): Promise<any> {
    const url = `https://opentdb.com/api.php?amount=${quantity}&category=${idCategory}&difficulty=${difficulty}`;
    const data = await axios.get(url);
    return data.data.results;
  },
};
