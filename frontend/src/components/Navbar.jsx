import { CloudSun, House, BookHeart } from "lucide-react";
import ThemeChange from "./themeChange";
import { Link } from "react-router-dom";
import weatherStore from "../store/weatherStore";

const Navbar = () => {
  const { setIsCelsius, isCelsius } = weatherStore();
  return (
    <header
      className=" h-16 border-b border-base-300 fixed w-full top-0 z-40 
  backdrop-blur-lg bg-base-100/80"
    >
      <div className="w-full sm:w-4/5 mx-auto flex justify-between items-center rounded-lg px-1 sm:px-4 h-full">
        {/* Left side */}
        <div
          onClick={() => alert("there's nothing here mate, it only looks good")}
          className=" w-auto flex items-center justify-center cursor-pointer hover:opacity-80 transition-all"
        >
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
            <CloudSun className="size-6 text-primary" />
          </div>
          <h1 className="sm:block text-lg font-bold">Herolo Weather Task</h1>
        </div>
        {/* Right side */}
        <div className="w-auto flex items-center justify-center">
          <button
            onClick={setIsCelsius}
            className="hover:opacity-70 active:scale-90 transition-all duration-150 cursor-pointer"
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-primary text-bold font-bold">
                {isCelsius ? "F" : "C"}
              </span>
              <span className="relative -top-1">°</span>
            </div>
          </button>
          <Link to={"/"} className={"btn btn-sm gap-2 mx-1"}>
            <House className="size-5" />
            <span className="hidden sm:inline">Profile</span>
          </Link>
          <Link
            to={"/favorites"}
            className={"btn btn-sm gap-2 transition-colors mx-1"}
          >
            <BookHeart className="w-4 h-4" />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
          {/* Theme change button */}
          <ThemeChange />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
