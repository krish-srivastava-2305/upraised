import express, { Application } from 'express';
import configureCors from './config/cors.configure';
import errorHandler from './middleware/errorHandler.middleware';
import userRouter from './routes/user.routes';
import gadgetRouter from './routes/gadgets.routes';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(configureCors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Health check passed"
    });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/gadgets", gadgetRouter);




// Catch all route
app.all("/:any", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "Not Found"
    });
});
app.use(errorHandler);

export default app;

