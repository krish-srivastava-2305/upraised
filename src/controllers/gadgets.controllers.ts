import { NextFunction, Request, Response } from "express";
import { create, getGadgets, updateName, updateStatus } from "../services/gadgets.services";
import APIError from "../config/apiError.config";

const createGadget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;

        const gadget = await create({ name });

        if (!gadget) {
            throw new APIError(400, "Database error: Unable to create gadget");
        }

        res.status(201).json({
            status: 201,
            data: {
                gadget
            }
        });
    } catch (error) {
        next(error);
    }
};

const fetchAllGadgets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gadgets = await getGadgets();

        if (!gadgets || gadgets.length === 0) {
            throw new APIError(404, "No gadgets found");
        }

        res.status(200).json({
            status: 200,
            message: "Gadgets retrieved successfully",
            data: {
                gadgets
            }
        });
    } catch (error) {
        next(error);
    }
}

const updateGadget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const gadget = await updateName(id, { name });

        if (!gadget) {
            throw new APIError(400, "Database error: Unable to update gadget");
        }

        res.status(200).json({
            status: 200,
            data: {
                gadget
            }
        });
    } catch (error) {
        next(error);
    }
}

const deleteGadget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const gadget = await updateStatus(id);

        if (!gadget) {
            throw new APIError(400, "Database error: Unable to delete gadget");
        }

        res.status(200).json({
            status: 200,
            message: "Gadget deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}

export { createGadget, fetchAllGadgets, updateGadget, deleteGadget };
