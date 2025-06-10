import { NextFunction, Request, Response } from 'express';
import APIError from '../config/apiError.config';
import { comparePass, checkUserExists, createUser, hashPassword } from '../services/user.services';
import { generateJWT } from '../services/jwt.services';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt with email:", email);
        const user = await checkUserExists(email);
        console.log("User found:", user);

        if (!user) {
            throw new APIError(401, "Invalid email or password");
        }

        const isMatch = await comparePass(password, user.password);
        if (!isMatch) {
            throw new APIError(401, "Invalid email or password");
        }

        const token = generateJWT(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        next(error)
    }
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const userExists = await checkUserExists(email);
        if (userExists) {
            throw new APIError(409, "User already exists");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await createUser(email, hashedPassword);

        const token = generateJWT(newUser.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        });
    } catch (error) {
        next(error)
    }
}

const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout successful"
    });
}

export { login, signup, logout }