import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./middleWare/db";
import userRoutes from "./routes/userRoute";
import postRoutes from "./routes/postRoute";
import commentRoutes from "./routes/commentRoute";
import errorHandler from "./middleWare/errorHandler";
import "./types/types";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express"
import options from "./doc/swagger";

dotenv.config();

const app: Application = express();

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        if (process.env.NODE_ENV === "test") return;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server due to DB connection issue.");
        process.exit(1); 
    }
};

startServer();

export default app;
