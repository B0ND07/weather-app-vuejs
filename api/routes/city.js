import express from "express";
import { getCity, saveCity, updateCity } from "../controllers/city.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";


const cityRoute = express.Router();
cityRoute.post("/savecity",saveCity);
cityRoute.get("/getcities",isAuthenticated,getCity);
cityRoute.put("/updatecities",updateCity);



export default cityRoute