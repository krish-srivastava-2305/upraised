import { NextFunction, Request, Response } from 'express';
import APIError from '../config/apiError.config';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new APIError(400, "Email and password are required");
        }
        // Simulate user authentication (replace with actual logic)
        if (email === "user@example.com" && password === "password") {
            res.cookie("token", "dummytoken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });
            res.status(200).json({ message: "Login successful" });
        } else {
            throw new APIError(401, "Invalid email or password");
        }
    } catch (error) {
        next(error)
    }
}

export { login }