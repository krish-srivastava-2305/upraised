import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface EnvConfig {
    PORT: string;
    NODE_ENV: string;
    DB_URL: string | null;
    SECRET_KEY: string; // Optional, can be used for JWT or other purposes
}

const envConfig: EnvConfig = Object.freeze({
    // Environment variables with default values
    PORT: process.env.PORT || '3000',
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URI || null,
    SECRET_KEY: process.env.SECRET_KEY || 'your-secret-key'
})

export default envConfig;