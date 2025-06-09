import { Router } from "express";
import { createGadget } from "../controllers/gadgets.controllers";
import auth from "../middleware/auth.middleware";

const gadgetRouter: Router = Router();

gadgetRouter.post("/", auth, createGadget)

export default gadgetRouter;    