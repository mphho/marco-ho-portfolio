# Marco Ho Portfolio Website

Single-page personal CV and portfolio website with:

- Vite + React + TypeScript frontend
- Azure Static Web Apps-compatible serverless chat API (`/api/chat`)
- Dark/light mode toggle
- Floating "Ask AI about Marco" chatbot using secure server-side environment variables

## Project structure

```text
.
├── api/                  # Azure Functions (TypeScript) backend
│   └── src/index.ts      # POST /api/chat endpoint
├── src/                  # Frontend source
├── staticwebapp.config.json
├── index.html
└── package.json
```

## Local development

### 1) Install dependencies

```bash
npm install
npm --prefix api install
```

### 2) Configure local chat

Copy `.env.example` to `.env` and set `AI_API_ENDPOINT`, `AI_API_KEY`, and `AI_MODEL_NAME`. Keep `.env` private; it is ignored by Git.

### 3) Run the site and chat API locally

```bash
npm run dev
```

The Vite dev server serves both the site and `/api/chat`. It loads the three `AI_API_*` settings from the root `.env` into the server process and invokes the same chat handler used by Azure Functions. The settings remain server-side and are not exposed to the browser. You do not need Azure Functions Core Tools for this local development mode.

### 4) Build API for Azure

```bash
npm --prefix api run build
```

## Build

```bash
npm run build
npm --prefix api run build
```

## Azure Static Web Apps deployment

1. Push this repository to GitHub.
2. In Azure Portal, create a **Static Web App** and connect it to this repo.
3. Use build settings:
   - App location: `/`
   - API location: `api`
   - Output location: `dist`
4. In Static Web App > **Configuration** > **Application settings**, add:
   - `AI_API_ENDPOINT`
   - `AI_API_KEY`
   - `AI_MODEL_NAME` (optional)

The variable names and endpoint format are listed in `.env.example`. Set `AI_API_ENDPOINT` to an HTTPS Responses API endpoint and `AI_MODEL_NAME` to the model or deployment name expected by your provider. The API key is sent in the `api-key` request header. Configure production settings in Azure rather than committing a populated `.env` file. The chat endpoint runs server-side, so API keys are not exposed in the browser.

## Chat diagnostics

For local runs, check the Vite terminal. Each request logs a `[chat:<invocationId>]` trace with configuration validation, provider host/model, HTTP status, content type, provider request ID, and duration. Function responses include the invocation ID in `x-chat-invocation-id`; for a non-JSON `/api/chat` response, the browser console logs that ID with the HTTP status, content type, response length, and Azure request ID when available. Neither the API key nor visitor messages are logged.
