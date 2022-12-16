"use strict";
exports.__esModule = true;
var Router = require("express").Router;
var userController_1 = require("../controllers/userController");
var router = Router();
//User routes
router.post("/register", userController_1.registerUser);
exports["default"] = router;
//# sourceMappingURL=routes.js.map