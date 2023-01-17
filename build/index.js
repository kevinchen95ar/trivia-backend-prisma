"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
//Imports
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes/routes"));
//Definition
var app = (0, express_1["default"])();
var corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].json());
app.use(routes_1["default"]);
app.use((0, cors_1["default"])(corsOptions));
var PORT = 4000;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
//# sourceMappingURL=index.js.map