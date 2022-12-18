const jwt = require("jsonwebtoken");
require("dotenv").config();

export function jwtGenerator(user_id: String, user_role: String) {
  const payload = {
    user: user_id,
    role: user_role,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}
