import express from 'express'
import dotenv from 'dotenv'

const app = express();

dotenv.config({ path: "backend/config/config.env" });

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
})