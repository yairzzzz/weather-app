import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const api = axios.create({
  baseURL: "http://dataservice.accuweather.com/",
  timeout: 10000,
  params: {
    apikey: process.env.API_KEY,
  },
});

export default api;
