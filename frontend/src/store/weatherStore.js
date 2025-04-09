import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const weatherStore = create(
  persist(
    (set, get) => ({
      currentCity: null,
      dailyWeather: [],
      currentConditions: null,
      favorites: [],
      isFavorite: false,
      isSearching: false,
      isCelsius: true,
      setIsCelsius: () => {
        set({ isCelsius: !get().isCelsius });
      },

      setIsFavorite: () => {
        const { favorites, currentCity } = get();
        const exists = favorites.some(
          (item) => item.cityName === currentCity.cityName
        );

        if (exists) {
          set({ isFavorite: true });
        } else {
          set({ isFavorite: false });
        }
      },

      addToFavorites: () => {
        const { favorites, currentCity, currentConditions } = get();
        set({
          favorites: [
            ...favorites,
            {
              cityName: currentCity.cityName,
              currentWeather: currentConditions,
              imgURL: `https://developer.accuweather.com/sites/default/files/${currentConditions.icon
                .toString()
                .padStart(2, "0")}-s.png`,
            },
          ],
        });
      },

      removeFromFavorites: () => {
        const newFavorites = get().favorites.filter(
          (item) => item.cityName !== get().currentCity.cityName
        );

        set({ favorites: newFavorites });
      },

      getCurrentCity: async (city) => {
        try {
          const res = await axios(`${baseURL}/city`, {
            params: {
              q: city,
            },
          });

          set({ currentCity: res.data.data });
        } catch (error) {
          console.log("Something went wrong", error?.message);
        }
      },

      getDailyWeather: async (key) => {
        try {
          const res = await axios(`${baseURL}/daily/${key}`);

          set({ dailyWeather: res.data.data });
        } catch (error) {
          console.log("Something went wront", error);
        }
      },

      getCurrentConditions: async (key) => {
        try {
          const response = await axios(`${baseURL}/current/${key}`);

          set({ currentConditions: response.data.data });
        } catch (error) {
          console.log("Something went wrong", error);
        }
      },

      getGeoPosition: async () => {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const info = position.coords;
          const coords = `${info.latitude},${info.longitude}`;

          const res = await axios(`${baseURL}/position`, {
            params: {
              q: coords,
            },
          });
          const cityData = res.data.data;

          set({ currentCity: cityData });

          return cityData.key;
        } catch (error) {
          console.log(error);
        }
      },

      hydrateWeather: async () => {
        set({ isSearching: true });
        const {
          currentCity,
          getCurrentConditions,
          getDailyWeather,
          getGeoPosition,
        } = get();

        try {
          if (!currentCity) {
            const key = await getGeoPosition();
            await getDailyWeather(key);
            await getCurrentConditions(key);
          } else {
            const key = currentCity.key;
            await getDailyWeather(key);

            await getCurrentConditions(key);
          }
        } catch (error) {
          console.log("something went wrong");
          console.log(error);
        } finally {
          set({ isSearching: false });
        }
      },
    }),
    {
      name: "weather-store",
    }
  )
);

export default weatherStore;
