import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import {
  getCurrentCity,
  getCurrentConditions,
  getDailyWeather,
  getGeoPosition,
} from "./src/controllers/weather.controller.js";

const __dirname = path.resolve();

const app = express();
app.use(cors());

app.get("/city", getCurrentCity);

app.get("/daily/:id", getDailyWeather);

app.get("/current/:id", getCurrentConditions);

app.get("/position", getGeoPosition);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
