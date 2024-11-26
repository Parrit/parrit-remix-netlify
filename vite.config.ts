import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [remix(), netlifyPlugin(), tsconfigPaths(), react()],
  optimizeDeps: {
    exclude: ["bcrypt"],
  },
});
