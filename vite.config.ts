import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const apiSettings = ["AI_API_ENDPOINT", "AI_API_KEY", "AI_MODEL_NAME"] as const;

type LocalChatContext = {
  invocationId: string;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

type LocalChatHandler = (
  request: Pick<Request, "json">,
  context: LocalChatContext,
) => Promise<{ status?: number; headers?: HeadersInit; jsonBody?: unknown }>;

function loadLocalApiSettings(mode: string) {
  const localSettings = loadEnv(mode, process.cwd(), "");
  for (const name of apiSettings) {
    if (process.env[name] === undefined && localSettings[name]) {
      process.env[name] = localSettings[name];
    }
  }
}

function localChatApi(): Plugin {
  return {
    name: "local-chat-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url ?? "/", "http://localhost").pathname;
        if (pathname !== "/api/chat") {
          next();
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed." }));
          return;
        }

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(Buffer.from(chunk));
          }
          const request = new Request(`http://${req.headers.host ?? "localhost"}${req.url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: Buffer.concat(chunks),
          });
          const apiModule = await server.ssrLoadModule("/api/src/index.ts");
          if (typeof apiModule.chat !== "function") {
            throw new Error("The Azure Functions chat handler was not exported.");
          }
          const chat: LocalChatHandler = apiModule.chat;
          const invocationId = randomUUID();
          const response = await chat(request, {
            invocationId,
            info: (...args: unknown[]) => console.info(...args),
            warn: (...args: unknown[]) => console.warn(...args),
            error: (...args: unknown[]) => console.error(...args),
          });

          res.statusCode = response.status ?? 200;
          new Headers(response.headers).forEach((value, name) => res.setHeader(name, value));
          res.end(JSON.stringify(response.jsonBody ?? {}));
        } catch (error) {
          console.error(
            "[local-chat-api] Request failed.",
            error instanceof Error ? error.name : "UnknownError",
          );
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "The local chat service failed. Check the Vite console." }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  loadLocalApiSettings(mode);
  return {
    plugins: [react(), localChatApi()],
  };
});
