import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./middleWare/db";
import userRoutes from "./routes/userRoute";
import errorHandler from "./middleWare/errorHandler";


dotenv.config();



const app: Application = express();

app.use(express.json());

app.use("/users", userRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server due to DB connection issue.");
        process.exit(1); 
    }
};

startServer();
