import envConfig from '../config/env.config';
import { PrismaClient } from '../generated/prisma';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const checkUserExists = async (userId: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    return !!user;
}

const createUser = async (email: string, password: string): Promise<User> => {
    const user = await prisma.user.create({
        data: {
            email,
            password
        }
    });
    return user;
};

const checkCredentials = async (email: string, password: string): Promise<User | null> => {
    const user = await prisma.user.findFirst({
        where: {
            email,
            password
        }
    });
    return user;
};



export { checkUserExists, createUser, checkCredentials };
