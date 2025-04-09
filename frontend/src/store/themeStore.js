import { create } from "zustand";

const themeStore = create((set) => ({
  theme: localStorage.getItem("app-theme") || "dim",

  setTheme: (theme) => {
    localStorage.setItem("app-theme", theme);
    set({ theme });
  },
}));

export default themeStore;
