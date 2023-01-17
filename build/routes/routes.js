"use strict";
exports.__esModule = true;
var Router = require("express").Router;
var categoryController_1 = require("../controllers/categoryController");
var difficultyController_1 = require("../controllers/difficultyController");
var questionController_1 = require("../controllers/questionController");
var triviaController_1 = require("../controllers/triviaController");
var userController_1 = require("../controllers/userController");
var router = Router();
//User routes
router.post("/register", userController_1.registerUser);
router.post("/login", userController_1.loginUser);
router.put("/users", userController_1.updateUserRol);
router.get("/users", userController_1.getAllUsersInDB);
//Category routes
router.get("/category", categoryController_1.getAllCategoriesInDB);
router.put("/category/update", categoryController_1.updateAllCategories);
//Difficulty routes
router.get("/difficulty/all", difficultyController_1.getAllDifficultyInDB);
//Question routes
router.get("/question/quantity/all", questionController_1.getAvailableQuestionQuantity);
router.put("/question", questionController_1.updateQuestionsAvailable);
router.put("/question/get", questionController_1.getRandomQuestions);
//Trivia routes
router.get("/trivia/get/all", triviaController_1.getAllTrivia);
router.post("/trivia/create", triviaController_1.registerTrivia);
exports["default"] = router;
//# sourceMappingURL=routes.js.map