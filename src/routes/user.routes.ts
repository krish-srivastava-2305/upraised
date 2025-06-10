import { Router } from "express";
import { login, logout, signup } from "../controllers/user.controllers";
import auth from "../middleware/auth.middleware";
import { body } from "express-validator";
import validateRequest from "../middleware/validator.middleware";

const userRouter = Router();

const credValidation = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

userRouter.post("/login",
    credValidation,
    validateRequest,
    login);
userRouter.post("/signup", credValidation, validateRequest, signup);
userRouter.post("/logout", auth, logout);

export default userRouter;