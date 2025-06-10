import envConfig from '../config/env.config';
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const checkUserExists = async (email: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    return user;
};

const createUser = async (email: string, password: string): Promise<User> => {
    const user: User = await prisma.user.create({
        data: {
            email,
            password
        }
    });
    return user;
};


const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const comparePass = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

export { checkUserExists, createUser, hashPassword, comparePass };
