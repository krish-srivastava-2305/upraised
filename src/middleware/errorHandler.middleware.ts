import { Request, Response, NextFunction } from 'express';
import APIError from '../config/apiError.config';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof APIError) {
        console.error("Error occurred:", err);
        res.status(err.status).json(err.toJson());
    } else {
        console.error("Unexpected error occurred:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default errorHandler;
