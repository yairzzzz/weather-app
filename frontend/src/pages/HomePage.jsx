import { Search } from "lucide-react";
import weatherStore from "../store/weatherStore";
import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import toast from "react-hot-toast";

const HomePage = () => {
  const [cityName, setCityName] = useState("");

  const {
    getCurrentCity,
    getDailyWeather,
    getCurrentConditions,
    setIsFavorite,
    isFavorite,
    currentCity,
    isDailyMetric,
  } = weatherStore();

  useEffect(() => {
    setIsFavorite();
  }, [isFavorite, currentCity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!cityName.trim()) return toast.error("Please fill up the field");

      if (!isNaN(cityName))
        return toast.error("Please do not include numbers in the field");

      await getCurrentCity(cityName.trim());

      const key = weatherStore.getState().currentCity?.key;

      await getDailyWeather(key, isDailyMetric);

      await getCurrentConditions(key);

      setCityName("");
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col justify-end sm:justify-center items-center">
      <div className=" mb-10">
        <div className="relative">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                className="input w-45 sm:w-sm"
                placeholder="Type a location"
              />
              <button className="border-none absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 active:scale-90 transition-all duration-150">
                <Search className="size-5 sm:size-6 " />
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="bg-base-300 h-[80%] w-full sm:h-[70%] sm:w-[70%] rounded-xl">
        <WeatherCard />
      </div>
    </div>
  );
};

export default HomePage;
