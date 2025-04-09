import themeStore from "../store/themeStore";
import themes from "../lib/themes";
const ThemeChange = () => {
  const { setTheme } = themeStore();

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className=" flex cursor-pointer hover:opacity:80 transition-all"
      >
        <div className="bg-base-100 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1">
          <div className="bg-base-content size-1.5 rounded-full"></div>
          <div className="bg-primary size-1.5 rounded-full"></div>
          <div className="bg-secondary  size-1.5 rounded-full"></div>
          <div className="bg-accent  size-1.5 rounded-full"></div>
        </div>
        <svg
          width="12px"
          height="12px"
          className=" w-2 fill-current opacity-60 h-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="absolute right-20 top-20 dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl max-h-[345px] overflow-y-auto overflow-x-hidden"
      >
        <p className="menu-title text-md mb-3">Theme</p>
        {themes.map((theme, i) => (
          <li
            onClick={() => setTheme(theme)}
            key={i}
            className="cursor-pointer hover:opacity-90 flex justify-center items-center ml-4 "
          >
            <div
              className="bg-base-100 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 group-hover:opacity-70 transition-all"
              data-theme={theme}
            >
              <div className="bg-base-content size-1.5 rounded-full"></div>
              <div className="bg-primary size-1.5 rounded-full"></div>
              <div className="bg-secondary  size-1.5 rounded-full"></div>
              <div className="bg-accent  size-1.5 rounded-full"></div>
            </div>
            <input
              type="radio"
              name="theme-dropdown"
              className="  btn btn-sm btn-block btn-ghost justify-start text-lg"
              aria-label={theme}
              value={theme}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeChange;
