import { Request } from "express";

interface AuthRequest extends Request {
    user?: {
        id: string;
    }
}

export default AuthRequest;
// This interface extends the Express Request object to include a user property, which contains the user's ID.