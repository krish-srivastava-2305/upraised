import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface EnvConfig {
    PORT: string;
    NODE_ENV: string;
    DB_URL: string | null;
}

const envConfig: EnvConfig = Object.freeze({
    // Environment variables with default values
    PORT: process.env.PORT || '3000',
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URI || null,
})

export default envConfig;