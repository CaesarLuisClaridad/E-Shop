import express from 'express'
import dotenv from 'dotenv'
import errorMiddleware from './middleware/errors.js';
import productRoutes from "./routes/product.js"
import { connectDatabase } from './config/connectDb.js';

const app = express();

dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());

//connection to DB
connectDatabase();

//routes
app.use("/api/v1/", productRoutes);

//error middlware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
})