import { Response, NextFunction } from 'express';
import APIError from '../config/apiError.config';
import { decodeJWT } from '../services/jwt.services';
import AuthRequest from '../types/request';

export default async function auth(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            throw new APIError(401, "Unauthorized");
        }

        const decodedToken = decodeJWT(token) as { id: string };
        console.log("Decoded token:", decodedToken);

        if (decodedToken instanceof Error || !decodedToken) {
            throw new APIError(401, "Invalid token");
        }

        req.user = {
            id: decodedToken.id
        };
        next();
    } catch (error) {
        next(error);
    }
}
