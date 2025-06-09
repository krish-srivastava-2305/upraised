import cors from "cors"

const configureCors = () => {
    return cors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }
            const allowedOrigins = [
                "https://example.com",
                "https://another-example.com"
            ];

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            // Reject other origins
            return callback(new Error("Not allowed by CORS"));
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
}

export default configureCors;