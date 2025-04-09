import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import themeStore from "./store/themeStore";
import HomePage from "./pages/HomePage";
import Favorites from "./pages/Favorites";
import { Toaster } from "react-hot-toast";
import weatherStore from "./store/weatherStore";
import { useEffect } from "react";

function App() {
  const { hydrateWeather, getGeoPosition } = weatherStore();

  // calls the 3 backend endpoints to collect the data about the weather
  useEffect(() => {
    hydrateWeather();
  }, []);

  const { theme } = themeStore();
  return (
    <BrowserRouter>
      <div data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
