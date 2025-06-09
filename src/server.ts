import app from './app';
import envConfig from './config/env.config';

const init = async () => {
    try {
        const { PORT } = envConfig
        if (!PORT) {
            throw new Error("PORT is not defined in environment variables");
        }

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit the process with failure
    }
}

init();
