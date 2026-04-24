import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import handler from "./api/generate-thumbnail.js";

function vercelApiDevPlugin() {
  return {
    name: "vercel-api-dev-plugin",
    configureServer(server) {
      server.middlewares.use("/api/generate-thumbnail", async (req, res, next) => {
        try {
          const body = await new Promise((resolve, reject) => {
            let raw = "";

            req.on("data", (chunk) => {
              raw += chunk;
            });

            req.on("end", () => {
              if (!raw) {
                resolve({});
                return;
              }

              try {
                resolve(JSON.parse(raw));
              } catch (error) {
                reject(error);
              }
            });

            req.on("error", reject);
          });

          req.body = body;
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (payload) => {
            if (!res.headersSent) {
              res.setHeader("Content-Type", "application/json");
            }
            res.end(JSON.stringify(payload));
            return res;
          };

          await handler(req, res);
        } catch (error) {
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
          }

          res.end(
            JSON.stringify({
              error: "No se pudo procesar la peticion local.",
              details: error instanceof Error ? error.message : "Unknown error",
            })
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    base: "/", // Ej: '/mi-portfolio-tools/'
    plugins: [react(), vercelApiDevPlugin()],
  };
});
