import express from "express";
import { config } from "dotenv";
import connect from "./config/db.js";
import cors from "cors"
import AuthRoute from "./routes/auth.js"

config();
const app = express();
app.use(express.json());


app.use(cors({origin:"*"}))

connect();

app.use("/api/auth", AuthRoute);

const PORT = process.env.PORT || 5000;



app.listen(PORT, console.log(`running on http://localhost:${PORT}`));
