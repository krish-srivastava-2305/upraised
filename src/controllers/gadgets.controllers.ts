import { NextFunction, Response } from "express";
import { create, destructor, getGadgets, updateName, updateStatus } from "../services/gadgets.services";
import APIError from "../config/apiError.config";
import AuthRequest from '../types/request';

const createGadget = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;

        // let otp = ""
        // for (let i = 0; i < 6; i++) {
        //     otp += Math.floor(Math.random() * 10).toString();
        // }

        // console.log(`Generated OTP for gadget creation: ${otp}`);
        // const gadget = await create({ name, otp });

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

const fetchAllGadgets = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let gadgets = await getGadgets();

        if (!gadgets || gadgets.length === 0) {
            throw new APIError(404, "No gadgets found");
        }

        const { status } = req.query as { status: string };

        const validStatuses = ["DEPLOYED", "DECOMMISSIONED", "AVAILABLE", "DESTROYED"];

        if (status) {
            if (!validStatuses.includes(status.toUpperCase())) {
                throw new APIError(400, `Invalid status: ${status}. Valid statuses are: ${validStatuses.join(", ")}`);
            }
            gadgets = gadgets.filter(gadget => gadget.status.toLowerCase() === status.toLowerCase());
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

const updateGadget = async (req: AuthRequest, res: Response, next: NextFunction) => {
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

const deleteGadget = async (req: AuthRequest, res: Response, next: NextFunction) => {
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

const destructGadget = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { otp } = req.body;

        const gadget = await destructor(id, otp);

        if (!gadget) {
            throw new APIError(400, "Database error: Unable to destruct gadget");
        }

        res.status(200).json({
            status: 200,
            message: "Gadget destructed successfully",
        });
    } catch (error) {
        next(error);
    }
}

export { createGadget, fetchAllGadgets, updateGadget, deleteGadget, destructGadget };
