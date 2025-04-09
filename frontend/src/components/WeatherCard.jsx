import { Heart, Loader } from "lucide-react";
import weatherStore from "../store/weatherStore";
import { formatDay } from "../lib/formatDay";
import { useState } from "react";
import toast from "react-hot-toast";

const WeatherCard = () => {
  const {
    dailyWeather,
    currentConditions,
    currentCity,
    addToFavorites,
    favorites,
    removeFromFavorites,
    isFavorite,
    setIsFavorite,
    isSearching,
    isCelsius,
  } = weatherStore();

  if (
    !currentConditions ||
    !currentCity ||
    dailyWeather.length === 0 ||
    isSearching
  ) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  const handleAddToFavorites = () => {
    const exists = favorites.some(
      (item) => item.cityName === currentCity.cityName
    );

    if (exists) {
      removeFromFavorites();
      toast.success("Removed from favorites");
      setIsFavorite();
    } else {
      addToFavorites();
      toast.success("Added to favorites");
      setIsFavorite();
    }
  };

  return (
    <section className="w-full h-full flex flex-col rounded-lg shadow-xl">
      <div className="w-auto flex justify-between items-center p-9 b-bottom-2 b-base-300 rounded-xl">
        <div className="flex">
          <img
            src={`https://developer.accuweather.com/sites/default/files/${currentConditions.icon
              .toString()
              .padStart(2, "0")}-s.png`}
            alt="Weather icon"
          />
          <div className="flex flex-col">
            <span>{currentCity.cityName}</span>
            <span>
              {isCelsius
                ? currentConditions.celValue
                : currentConditions.fahrValue}
              °{" "}
              {isCelsius
                ? currentConditions.celUnit
                : currentConditions.fahrUnit}
            </span>
          </div>
        </div>
        <button
          onClick={handleAddToFavorites}
          className="hover:opacity-70 active:scale-90 transition-all duration-150 cursor-pointer"
        >
          <Heart className={isFavorite && `fill-red-500 text-red-500`} />
        </button>
      </div>

      <h1 className="mb-20 mx-auto mt-20 text-2xl md:text-4xl font-bold drop-shadow-sm tracking-wide">
        {currentConditions.weather}
      </h1>
      {/* cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-3 gap-y-3 mx-4">
        {dailyWeather.map((day, i) => (
          <article key={i} className="card bg-base-100 card-md shadow-sm">
            <div className="flex flex-col items-center justify-center h-30">
              <img
                src={`https://developer.accuweather.com/sites/default/files/${day.icon
                  .toString()
                  .padStart(2, "0")}-s.png`}
                alt="Weather icon"
                className=" hidden sm:block w-17 h-10 mx-auto"
              />
              <h2 className="card-title">{formatDay(day.date)}</h2>
              <p>
                <span className="text-xs block w-full">
                  Min:{" "}
                  {isCelsius ? day.temp.celsius.min : day.temp.fahrenheit.min}°{" "}
                  {isCelsius ? day.temp.celsius.unit : day.temp.fahrenheit.unit}
                </span>
                <span className="text-xs w-full">
                  Max:{" "}
                  {isCelsius ? day.temp.celsius.max : day.temp.fahrenheit.max}°{" "}
                  {isCelsius ? day.temp.celsius.unit : day.temp.fahrenheit.unit}
                </span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WeatherCard;
