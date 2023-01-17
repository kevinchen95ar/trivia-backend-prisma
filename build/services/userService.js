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
exports.getJwtToken = exports.checkValidPassword = exports.encryptPassword = exports.updateUser = exports.createUser = exports.getAllUsers = exports.getUser = void 0;
var prisma_1 = __importDefault(require("../utils/prisma"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jwtGenerator_1 = require("../utils/jwtGenerator");
var getUser = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1["default"].user.findUnique({
                    where: {
                        username: username
                    }
                })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUser = getUser;
var getAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1["default"].user.findMany({
                    select: {
                        id: true,
                        username: true,
                        role: true
                    }
                })];
            case 1:
                allUsers = _a.sent();
                return [2 /*return*/, allUsers];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var createUser = function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var createdUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1["default"].user.create({
                    data: {
                        username: username,
                        password: password
                    }
                })];
            case 1:
                createdUser = _a.sent();
                return [2 /*return*/, createdUser];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (id, role) { return __awaiter(void 0, void 0, void 0, function () {
    var updateUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1["default"].user.update({
                    where: {
                        id: id
                    },
                    data: {
                        role: role
                    }
                })];
            case 1:
                updateUser = _a.sent();
                return [2 /*return*/, updateUser];
        }
    });
}); };
exports.updateUser = updateUser;
var encryptPassword = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    var saltRound, salt, bcryptPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                saltRound = 10;
                return [4 /*yield*/, bcrypt_1["default"].genSalt(saltRound)];
            case 1:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1["default"].hash(password, salt)];
            case 2:
                bcryptPassword = _a.sent();
                return [2 /*return*/, bcryptPassword];
        }
    });
}); };
exports.encryptPassword = encryptPassword;
var checkValidPassword = function (password, user) { return __awaiter(void 0, void 0, void 0, function () {
    var validPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt_1["default"].compare(password, user.password)];
            case 1:
                validPassword = _a.sent();
                return [2 /*return*/, validPassword];
        }
    });
}); };
exports.checkValidPassword = checkValidPassword;
var getJwtToken = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        token = (0, jwtGenerator_1.jwtGenerator)(user.id, user.role);
        return [2 /*return*/, token];
    });
}); };
exports.getJwtToken = getJwtToken;
//# sourceMappingURL=userService.js.map