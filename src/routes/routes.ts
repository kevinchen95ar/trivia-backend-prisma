const { Router } = require("express");
import { registerUser } from "../controllers/userController";

const router = Router();

//User routes
router.post("/register", registerUser);

export default router;
