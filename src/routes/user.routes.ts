import { Router } from "express";
import { login } from "../controllers/user.controllers";

const userRouter = Router();

userRouter.post("/", login);

export default userRouter;