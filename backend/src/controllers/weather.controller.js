import api from "../lib/axios.js";
import { config } from "dotenv";
config();

export const getCurrentCity = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  try {
    const response = await api("locations/v1/cities/autocomplete", {
      params: {
        apikey: process.env.API_KEY3,
        q,
      },
    });

    if (!response.data[0].Key) {
      return res.status(400).json({ message: "Wasn't able to find that city" });
    }

    res.status(200).json({
      message: "Success",
      data: {
        key: response.data[0].Key,
        cityName: response.data[0].LocalizedName,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wront", error: error.message });
    console.log("Error in getCurrentCity controller", error);
  }
};

export const getDailyWeather = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "City Key is required" });
  }

  try {
    const responseF = await api(`forecasts/v1/daily/5day/${id}`, {
      params: {
        apikey: process.env.API_KEY3,
        metric: false,
      },
    });

    const responseCel = await api(`forecasts/v1/daily/5day/${id}`, {
      params: {
        apikey: process.env.API_KEY3,
        metric: true,
      },
    });

    const mergedForecasts = responseCel.data.DailyForecasts.map((cel, i) => {
      const fahr = responseF.data.DailyForecasts[i];

      return {
        date: cel.Date,
        icon: cel.Day.Icon,
        weather: cel.Day.IconPhrase,

        temp: {
          celsius: {
            unit: cel.Temperature.Minimum.Unit,
            min: cel.Temperature.Minimum.Value,
            max: cel.Temperature.Maximum.Value,
          },
          fahrenheit: {
            unit: fahr.Temperature.Minimum.Unit,
            min: fahr.Temperature.Minimum.Value,
            max: fahr.Temperature.Maximum.Value,
          },
        },
      };
    });

    res.status(200).json({ message: "Success", data: mergedForecasts });
  } catch (error) {
    res.status(400).json({ error: "Error in getDailyWeather controller" });

    console.log(error.message);
  }
};

export const getCurrentConditions = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "City Key is required" });
  }

  try {
    const response = await api(`currentconditions/v1/${id}`, {
      params: {
        apikey: process.env.API_KEY3,
      },
    });

    const result = response.data[0];

    res.status(200).json({
      message: "success",
      data: {
        weather: result.WeatherText,
        icon: result.WeatherIcon,
        celValue: result.Temperature.Metric.Value,
        celUnit: result.Temperature.Metric.Unit,
        fahrValue: result.Temperature.Imperial.Value,
        fahrUnit: result.Temperature.Imperial.Unit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log("Error in getCurrentConditions controller");
  }
};

export const getGeoPosition = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  try {
    const response = await api("locations/v1/cities/geoposition/search", {
      params: {
        apikey: process.env.API_KEY3,
        q,
      },
    });

    res.status(200).json({
      message: "Success",
      data: {
        key: response.data.Key,
        cityName: response.data.AdministrativeArea.LocalizedName,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
    console.log("Error in getGeoPosition controller", error);
  }
};
