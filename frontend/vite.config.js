import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "react", // enables automatic runtime
      babel: {
        presets: [],
        plugins: [],
      },
    }),
    tailwindcss(),
  ],
});
