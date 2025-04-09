import weatherStore from "../store/weatherStore";

const Favorites = () => {
  const { favorites, isCelsius } = weatherStore();

  if (favorites.length === 0) {
    return (
      <div className="overflow-y-hidden h-screen flex justify-center items-center">
        <div className="bg-base-300 w-[80%] h-[85%] mt-5 rounded-2xl shadow-2xl flex justify-center items-center">
          <p className="text-center text-base sm:text-lg text-muted py-10 px-4">
            <span className="block font-semibold text-xl sm:text-2xl mb-2">
              You haven’t added any favorites yet.
            </span>
            Start exploring the weather in different cities and tap the heart
            icon to save your favorite locations here for quick access!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-hidden h-screen flex justify-center items-center">
      <div className="bg-base-300 w-full h-full  md:w-[80%] md:h-[85%] mt-5 rounded-2xl shadow-2xl flex flex-col items-center">
        <h1 className="mb-20 mx-auto mt-20 text-2xl md:text-4xl font-bold drop-shadow-sm tracking-wide">
          Favorites
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-10">
          {/* weather cards */}

          {favorites.map((city, i) => (
            <div
              key={i}
              className="card sm:card-md md:card-lg bg-base-100 shadow-sm"
            >
              <div className="card-body items-center">
                <h2 className="card-title mx-auto">{city.cityName}</h2>
                <span>
                  {isCelsius
                    ? city.currentWeather.celValue
                    : city.currentWeather.fahrValue}
                  °{" "}
                  {isCelsius
                    ? city.currentWeather.celUnit
                    : city.currentWeather.fahrUnit}
                </span>
                <img
                  src={city.imgURL}
                  alt={`${city.currentWeather.weather} image`}
                  className="hidden md:block w-32 h-17"
                />
                <span className="text-lg md:text-xl">
                  {city.currentWeather.weather}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
