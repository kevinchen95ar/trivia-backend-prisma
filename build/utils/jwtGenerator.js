"use strict";
exports.__esModule = true;
exports.jwtGenerator = void 0;
var jwt = require("jsonwebtoken");
require("dotenv").config();
function jwtGenerator(user_id, user_role) {
    var payload = {
        user: user_id,
        role: user_role
    };
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}
exports.jwtGenerator = jwtGenerator;
//# sourceMappingURL=jwtGenerator.js.map