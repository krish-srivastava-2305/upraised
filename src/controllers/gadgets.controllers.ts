import { NextFunction, Request, Response } from "express";

const createGadget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Gadget creation request received:", req.body);
    } catch (error) {
        next(error);
    }

}

export { createGadget }
