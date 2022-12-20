const { Router } = require("express");
import {
  getAllCategoriesInDB,
  updateAllCategories,
} from "../controllers/categoryController";
import { getAllDifficultyInDB } from "../controllers/difficultyController";
import {
  getAvailableQuestionQuantity,
  getRandomQuestions,
  updateQuestionsAvailable,
} from "../controllers/questionController";
import { getAllTrivia, registerTrivia } from "../controllers/triviaController";
import {
  registerUser,
  loginUser,
  updateUserRol,
  getAllUsersInDB,
} from "../controllers/userController";

const router = Router();

//User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/users", updateUserRol);
router.get("/users", getAllUsersInDB);

//Category routes
router.get("/category", getAllCategoriesInDB);
router.put("/category/update", updateAllCategories);

//Difficulty routes
router.get("/difficulty/all", getAllDifficultyInDB);

//Question routes
router.get("/question/quantity/all", getAvailableQuestionQuantity);
router.put("/question", updateQuestionsAvailable);
router.put("/question/get", getRandomQuestions);

//Trivia routes
router.get("/trivia/get/all", getAllTrivia);
router.post("/trivia/create", registerTrivia);

export default router;
