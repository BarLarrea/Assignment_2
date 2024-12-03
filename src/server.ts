import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


const app: Application = express();

dotenv.config();

// Middleware
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
if (process.env.MONGO_URI === undefined || process.env.MONGO_URI === "")
{
  console.log("MONGO_URI is not set");
  process.exit(1);
}
else
{
  mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection failed:', err));
}

// Start the server
let PORT: number = parseInt(process.env.PORT || "", 10)
if (isNaN(PORT))
  PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
