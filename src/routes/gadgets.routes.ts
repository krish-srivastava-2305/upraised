import { Router } from "express";
import { createGadget, deleteGadget, destructGadget, fetchAllGadgets, updateGadget } from "../controllers/gadgets.controllers";
import auth from "../middleware/auth.middleware";
import { body, param, query } from "express-validator"
import validateRequest from "../middleware/validator.middleware";

const gadgetRouter: Router = Router();

gadgetRouter.post("/",
    auth,
    [
        body("name").notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string"),
        body("name").isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters long"),
    ],
    validateRequest,
    createGadget
)

gadgetRouter.get("/",
    auth,
    [
        query("status").optional().isString().withMessage("Status must be a string").isIn(["DEPLOYED", "DECOMMISSIONED", "AVAILABLE", "DESTROYED"]).withMessage("Invalid status. Valid statuses are: DEPLOYED, DECOMMISSIONED, AVAILABLE, DESTROYED")
    ],
    validateRequest,
    fetchAllGadgets
)

gadgetRouter.patch("/:id",
    auth,
    [
        param("id").notEmpty().isUUID().withMessage("Gadget ID is required"),
        body("name").notEmpty().withMessage("Name is required"),
    ],
    validateRequest,
    updateGadget
)

gadgetRouter.delete("/:id",
    auth,
    [
        param("id").notEmpty().isUUID().withMessage("Gadget ID is required"),
    ],
    validateRequest,
    deleteGadget
)

// OTP sender router needed to run before self destruct    
gadgetRouter.post("/:id/self-destruct",
    auth,
    [
        param("id").notEmpty().isUUID().withMessage("Gadget ID is required"),
        body("otp").notEmpty().isString().withMessage("OTP is required"),
        body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be exactly 6 characters long")
    ],
    validateRequest,
    destructGadget
)

export default gadgetRouter;