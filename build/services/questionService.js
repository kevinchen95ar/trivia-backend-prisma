"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.connectQuestionWithTrivia = exports.createQuestion = exports.getQuestionFromSource = exports.getQuestionsByDifCat = exports.getAllQuestions = exports.getAvailableQuestionService = exports.saveQuestionsToDB = exports.selectRandomQuestions = exports.connectAllQuestionsWithTrivia = void 0;
var prisma_1 = __importDefault(require("../utils/prisma"));
var sourceInterface_1 = require("../interfaces/sourceInterface");
var answerService_1 = require("./answerService");
var connectAllQuestionsWithTrivia = function (Questions, createdTrivia) { return __awaiter(void 0, void 0, void 0, function () {
    var length, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = Questions.length;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < length)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, exports.connectQuestionWithTrivia)(Questions[i].id, createdTrivia.id)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.connectAllQuestionsWithTrivia = connectAllQuestionsWithTrivia;
var randomIntFromInterval = function (min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var selectRandomQuestions = function (allQuestions, quantity) { return __awaiter(void 0, void 0, void 0, function () {
    var questions, i, index;
    return __generator(this, function (_a) {
        questions = [];
        i = 0;
        do {
            index = randomIntFromInterval(0, allQuestions.length - 1);
            if (!questions.includes(allQuestions[index])) {
                questions.push(allQuestions[index]);
                i++;
            }
        } while (i < quantity);
        //devolvemos el array.
        return [2 /*return*/, questions];
    });
}); };
exports.selectRandomQuestions = selectRandomQuestions;
var saveQuestionsToDB = function (questions, categoryId, difficultyId) { return __awaiter(void 0, void 0, void 0, function () {
    var questionsLength, repetidas, i, createdQuestion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                questionsLength = questions.length;
                repetidas = 0;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < questionsLength)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, exports.createQuestion)(categoryId, difficultyId, questions[i].type, questions[i].question, questions[i].correct_answer, questions[i].incorrect_answers)];
            case 2:
                createdQuestion = _a.sent();
                if (!createdQuestion) {
                    repetidas++;
                }
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, repetidas];
        }
    });
}); };
exports.saveQuestionsToDB = saveQuestionsToDB;
var getAvailableQuestionService = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dbQuestions, questionsAvailable, QAid, length, i, availableLength, nuevo, j, category, difficulty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getAllQuestions)()];
            case 1:
                dbQuestions = _a.sent();
                questionsAvailable = [
                    {
                        id: 1,
                        category: dbQuestions[0].Category.category,
                        difficulty: dbQuestions[0].Difficulty.difficulty,
                        quantity: 1
                    },
                ];
                QAid = 2;
                length = dbQuestions.length;
                //Recorremos las preguntas de la db una por una y comparamos con questionAvailable
                for (i = 1; i < length; i++) {
                    availableLength = questionsAvailable.length;
                    nuevo = true;
                    for (j = 0; j < availableLength; j++) {
                        //Si coincide con un elemento sumamos a la cantidad
                        if (dbQuestions[i].Category.category === questionsAvailable[j].category &&
                            dbQuestions[i].Difficulty.difficulty ===
                                questionsAvailable[j].difficulty) {
                            questionsAvailable[j].quantity++;
                            nuevo = false;
                        }
                    }
                    //Si no coincide con un elemento creamos un nuevo elemento.
                    if (nuevo) {
                        category = dbQuestions[i].Category.category;
                        difficulty = dbQuestions[i].Difficulty.difficulty;
                        questionsAvailable.push({
                            id: QAid,
                            category: category,
                            difficulty: difficulty,
                            quantity: 1
                        });
                        QAid++;
                    }
                }
                return [2 /*return*/, questionsAvailable];
        }
    });
}); };
exports.getAvailableQuestionService = getAvailableQuestionService;
var getAllQuestions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allQuestions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1["default"].question.findMany({
                    select: {
                        id: true,
                        questionType: true,
                        question: true,
                        Difficulty: true,
                        Category: true,
                        Answer: true
                    }
                })];
            case 1:
                allQuestions = _a.sent();
                return [2 /*return*/, allQuestions];
        }
    });
}); };
exports.getAllQuestions = getAllQuestions;
var getQuestionsByDifCat = function (difficulty, category) { return __awaiter(void 0, void 0, void 0, function () {
    var allQuestions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1["default"].question.findMany({
                    select: {
                        id: true,
                        questionType: true,
                        question: true,
                        Answer: true
                    },
                    where: {
                        Difficulty: {
                            difficulty: difficulty
                        },
                        Category: {
                            category: category
                        }
                    }
                })];
            case 1:
                allQuestions = _a.sent();
                return [2 /*return*/, allQuestions];
        }
    });
}); };
exports.getQuestionsByDifCat = getQuestionsByDifCat;
var getQuestionFromSource = function (quantity, idCategory, difficulty, source) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        if (source === "opentdb") {
            data = sourceInterface_1.opentdb.getQuestions(quantity, idCategory, difficulty);
            return [2 /*return*/, data];
        }
        else {
            // otra source y su logica
            return [2 /*return*/];
        }
        return [2 /*return*/];
    });
}); };
exports.getQuestionFromSource = getQuestionFromSource;
var createQuestion = function (categoryId, difficultyId, questionType, question, correct_answer, incorrect_answers) { return __awaiter(void 0, void 0, void 0, function () {
    var exist, questionId, incorrectAnswersLength, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1["default"].question.findUnique({
                    where: { question: question }
                })];
            case 1:
                exist = _a.sent();
                //Si ya existe la pregunta salimos
                if (exist) {
                    console.log("una pregunta ya existente.");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma_1["default"].question.create({
                        data: {
                            question: question,
                            questionType: questionType,
                            categoryId: categoryId,
                            difficultyId: difficultyId
                        },
                        select: { id: true }
                    })];
            case 2:
                questionId = _a.sent();
                // Creamos y vinculamos la respuesta correcta
                return [4 /*yield*/, (0, answerService_1.createAnswer)(correct_answer, true, questionId.id)];
            case 3:
                // Creamos y vinculamos la respuesta correcta
                _a.sent();
                incorrectAnswersLength = incorrect_answers.length;
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < incorrectAnswersLength)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, answerService_1.createAnswer)(incorrect_answers[i], false, questionId.id)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7: return [2 /*return*/, questionId];
        }
    });
}); };
exports.createQuestion = createQuestion;
var connectQuestionWithTrivia = function (questionId, triviaId) { return __awaiter(void 0, void 0, void 0, function () {
    var connected;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1["default"].question.update({
                    where: {
                        id: questionId
                    },
                    data: {
                        Trivia: {
                            connect: { id: triviaId }
                        }
                    }
                })];
            case 1:
                connected = _a.sent();
                return [2 /*return*/, connected];
        }
    });
}); };
exports.connectQuestionWithTrivia = connectQuestionWithTrivia;
//# sourceMappingURL=questionService.js.map