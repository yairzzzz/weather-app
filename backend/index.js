import express from "express";
import cors from "cors";

import {
  getCurrentCity,
  getCurrentConditions,
  getDailyWeather,
  getGeoPosition,
} from "./src/controllers/weather.controller.js";

const app = express();
app.use(cors());

app.get("/city", getCurrentCity);

app.get("/daily/:id", getDailyWeather);

app.get("/current/:id", getCurrentConditions);

app.get("/position", getGeoPosition);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
