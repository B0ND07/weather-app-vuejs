import express from "express";
import { config } from "dotenv";


config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;



app.listen(PORT, console.log(`running on http://localhost:${PORT}`));
