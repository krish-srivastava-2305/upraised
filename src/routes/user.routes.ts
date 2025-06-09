import { Router } from "express";
import { login, logout, signup } from "../controllers/user.controllers";
import auth from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", auth, logout);

export default userRouter;