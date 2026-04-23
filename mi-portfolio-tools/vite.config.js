import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/', // Ej: '/mi-portfolio-tools/'
  plugins: [react()],
});
