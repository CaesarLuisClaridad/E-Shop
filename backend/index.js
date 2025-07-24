import express from 'express';
import dotenv from 'dotenv';
import errorMiddleware from './middleware/errors.js';

import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js"

import { connectDatabase } from './config/connectDb.js';
import cookieParser from 'cookie-parser';

const app = express();

//handle the uncaught exceptions 
process.on("uncaughtException", (err) => {
    console.log("Shutting down due to uncaught exceptions")
    process.exit(1);
})

//for env
dotenv.config({ path: "backend/config/config.env" });

//to send json 
app.use(express.json());

//to work with cookies
app.use(cookieParser());

//connection to DB
connectDatabase();

//routes
app.use("/api/v1/", productRoutes);
app.use("/api/v1", userRoutes);

//error middlware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
})

//handle the unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log("Shutting down due to the unhandled promise rejection")
    server.close(() => {
        process.exit(1);
    });
})

