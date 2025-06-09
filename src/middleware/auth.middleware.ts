import { Request, Response, NextFunction } from 'express';
import APIError from '../config/apiError.config';

export default async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            throw new APIError(401, "Unauthorized");
        }
        if (token !== "dummytoken") {
            throw new APIError(401, "Invalid token");
        }
        next();
    } catch (error) {
        next(error);
    }
}
