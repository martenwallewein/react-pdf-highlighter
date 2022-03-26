import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  base: "/react-pdf-highlighter/",
  build: {
    outDir: "dist",
  },
  publicDir: "/Users/martengartner/Projects/Uni/phd/",
  plugins: [reactRefresh()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: /^@mui\/icons-material\/(.*)/,
        replacement: "@mui/icons-material/esm/$1"
      }
    ]
  }
});
