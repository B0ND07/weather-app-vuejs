import express from "express";
import { config } from "dotenv";
import connect from "./config/db.js";
import cors from "cors"
import AuthRoute from "./routes/auth.js"
import cityRoute from "./routes/city.js";

config();
const app = express();
app.use(express.json());


app.use(cors({origin:["http://localhost:5173","https://vueweatherforcast.vercel.app"],credentials: true,})) //temp

connect();

app.use("/api/auth", AuthRoute);
app.use("/api/city", cityRoute);

const PORT = process.env.PORT || 5000;



app.listen(PORT, console.log(`running on http://localhost:${PORT}`));
