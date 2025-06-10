import jwt from "jsonwebtoken";
import envConfig from "../config/env.config";
import APIError from "../config/apiError.config";


const generateJWT = (userId: string): string => {
    const token = jwt.sign({ id: userId }, envConfig.SECRET_KEY, {
        expiresIn: '1h'
    });
    return token;
}

const decodeJWT = (token: string): string | jwt.JwtPayload => {
    try {
        const decoded = jwt.verify(token, envConfig.SECRET_KEY);
        return decoded;
    } catch (error) {
        throw new APIError(401, "Invalid token");
    }
}

export { generateJWT, decodeJWT }