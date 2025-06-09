import { Router } from "express";
import { createGadget, deleteGadget, fetchAllGadgets, updateGadget } from "../controllers/gadgets.controllers";
import auth from "../middleware/auth.middleware";
import { body, param } from "express-validator"
import validateRequest from "../middleware/validator.middleware";

const gadgetRouter: Router = Router();

gadgetRouter.post("/", auth, [
    body("name").notEmpty().withMessage("Name is required"),
],
    validateRequest,
    createGadget)

gadgetRouter.get("/", auth, fetchAllGadgets)

gadgetRouter.patch("/:id", auth, [
    param("id").notEmpty().isUUID().withMessage("Gadget ID is required"),
    body("name").notEmpty().withMessage("Name is required"),
],
    validateRequest,
    updateGadget)

gadgetRouter.delete("/:id", auth, [
    param("id").notEmpty().isUUID().withMessage("Gadget ID is required"),
],
    validateRequest,
    deleteGadget)

export default gadgetRouter;