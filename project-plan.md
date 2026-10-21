Part 1: Technical & Project Plan
To host this for free on Azure while securely using environment variables for your AI API keys (so they aren't exposed in the user's browser), the best approach is Azure Static Web Apps (Free Tier). It natively supports a Vite/TypeScript frontend alongside a lightweight, managed Node.js/TypeScript serverless API backend (Azure Functions).
1. Tech Stack & Architecture
•	Frontend: Vite + React (or Vue/Svelte) + TypeScript + Tailwind CSS (for a clean, neat, and concise UI).
•	Backend (Managed API): Azure Static Web Apps Managed Functions (Node.js/TypeScript).
•	Hosting: Azure Static Web Apps (Free Tier includes free SSL, custom domain support, global CDN, and serverless API execution).
•	Environment Variables: Stored securely in the Azure Portal under Static Web App -> Configuration -> Application settings:
o	AI_API_ENDPOINT: Your chosen LLM provider endpoint (e.g., Azure AI Foundry, OpenRouter, or OpenAI).
o	AI_API_KEY: Your secret API key.
o	AI_MODEL_NAME: (Optional) Allows you to swap models easily without redeploying code.
2. Step-by-Step Implementation Plan
•	Phase 1: Scaffolding (Day 1)
o	Initialize a Vite + TypeScript project (npm create vite@latest).
o	Initialize an /api folder in the root directory using Azure Functions Core Tools (TypeScript) to handle the /api/chat POST route.
•	Phase 2: UI & Content Implementation (Days 2–3)
o	Build a clean, single-page layout (Hero, Featured Projects, Skills, and a floating Chatbot widget).
o	Implement a dark/light mode toggle (showcasing your frontend UI experience ).
•	Phase 3: Lightweight RAG Chatbot Integration (Days 4–5)
o	Create a resume-context.json or markdown string on the backend containing the public-safe summary of your experience.
o	In the /api/chat Node.js function, read process.env.AI_API_ENDPOINT and process.env.AI_API_KEY, inject the system prompt with your portfolio context, and stream or return the response to the Vite frontend.
•	Phase 4: Deployment (Day 6)
o	Push code to a GitHub repository.
o	Create an Azure Static Web App resource linked to your GitHub repo (this automatically sets up a GitHub Actions CI/CD pipeline).
o	Add your environment variables in the Azure Portal.
 
Part 2: Website Content Plan (Public-Safe & Concise)
The website should follow a minimalist, single-page layout that immediately highlights your ability to build high-scale web interfaces, AI platforms, and automated workflows.
Section 1: Hero & Bio
•	Headline: Marco Ho — Full-Stack & AI Applications Developer
•	Sub-headline: Building scalable GenAI platforms, agentic workflows, and modern web interfaces on Microsoft Azure.
•	Quick Stats Bar: 
o	25,000+ AI Platform Users 
o	5.5M+ AI API Requests Processed 
o	47,000+ Monthly Active Portal Users 
•	Links: GitHub | LinkedIn | Email
Section 2: Featured Projects (Categorized by your focus areas)
1. Enterprise Multi-Model GenAI Platform & API Gateway (Showcases Web Interfaces & AI Integration)
•	Role: Sole Full-Stack Developer 
•	Overview: Architected and customized an enterprise GenAI web application (built on Open WebUI) and developer API portal serving over 25,000 unique users .
•	Key Highlights:
o	Integrated 22 text models and 6 image models across Azure, AWS Bedrock, and Google Cloud (Gemini/Vertex AI) .
o	Built custom UI features from the ground up: an interactive Image Studio & Gallery, seamless multi-model switching within a single chat, Tavily web search integration, and flexible local-browser vs. cloud-database save modes .
o	Engineered a modular Azure API Management pipeline using policy fragments to automate quota management, routing, and credit calculations .
2. Agentic AI & RAG Chatbot Ecosystem (Showcases AI Agents & Automation)
•	Role: AI Application Developer 
•	Overview: Designed and deployed a multi-agent orchestration system (aiHKUer) and specialized RAG chatbots handling over 7,800+ annual user conversations for student admissions and onboarding . Featured in an official Microsoft Customer Story (Jan 2025) .
•	Key Highlights:
o	Built automated data ingestion pipelines using Node.js, Playwright, and Azure DevOps CI/CD to scrape, chunk, and vectorize web content into Azure Blob Storage and AI Search .
o	Developed agentic workflows using n8n and Azure/Microsoft Foundry models to automate task summarization and cross-platform integrations .
o	Planned and architected browser extension plugins for seamless GenAI access .
3. High-Traffic University Portals & Interactive Widgets (Showcases Web Interfaces & Interactive Plugins)
•	Role: Frontend & Full-Stack Developer 
•	Overview: Developed responsive frontend features and custom interactive widgets for Staff and Student Portals reaching up to 47,000+ monthly active users .
•	Key Highlights:
o	Built custom interactive widgets from the ground up (e.g., multi-language Calendar with API caching, auto-scrolling Announcements, and personalized onboarding modules) .
o	Implemented global UI enhancements including Dark Mode, sticky navigation, role-based search filtering, and idle-state API call optimization .
4. Legacy Event Management System UI Modernization (Showcases Web Interfaces)
•	Role: Sole Full-Stack Developer 
•	Overview: Led the first major UI/UX overhaul since 2005 for an enterprise event management platform (.NET/C#, SQL), generating 1.29M+ page hits and 29,000+ event registrations within the first three months of launch .
•	Key Highlights:
o	Redesigned event details, registration forms, and payment workflows into a clean, modern, mobile-responsive layout with collapsible sections .
o	Expanded backend REST API operations for external website syndication .
Section 3: Technical Skills & Certifications (Clean Tag Cloud)
•	AI & Agents: OpenAI / GPT-5, Claude, Gemini, DeepSeek, Microsoft Foundry, Copilot Studio, Open WebUI, n8n (Agentic AI), RAG Pipelines, GitHub Copilot .
•	Frontend & UI: TypeScript, React, Vue.js, Next.js, Svelte, HTML5/CSS3, Power Pages, Playwright / Puppeteer .
•	Backend & Cloud: Microsoft Azure (APIM, Functions, Container Registry, PostgreSQL, Blob Storage, DevOps CI/CD), Node.js, .NET 10 / C#, Python, Django, Docker .
•	Certifications: Microsoft Certified: Azure Developer Associate (AZ-204) & Azure Administrator Associate (AZ-104), CompTIA Security+, CompTIA Linux+, Network+, A+.
 
Part 3: Lightweight Chatbot Design ("Ask My Portfolio")
To keep the chatbot lightweight and showcase your AI agent skills without incurring database costs, use an In-Memory Context Injection approach.
1. UI Design
•	A neat, floating button in the bottom-right corner ("Ask AI about Marco").
•	Includes 3 clickable starter prompts so visitors don't have to guess what to type:
1.	"How does Marco use AI agents and n8n?"
2.	"Tell me about the GenAI platform he built."
3.	"What is his experience with frontend development and Azure?"
2. System Prompt (Stored in your /api/chat backend)
text
You are a helpful, concise AI assistant embedded in Marco Ho's personal portfolio website. 
Answer visitor questions strictly based on the following professional profile. 
Keep answers short (2-4 sentences max), professional, and highlight his ability to build web interfaces, AI platforms, and agentic workflows. 
Do not invent information. If asked about something not in the profile, invite the user to contact Marco via LinkedIn or email (mphhohku@gmail.com).

[Insert the text from Part 2: Website Content Plan here]
3. Example Backend Code (/api/chat/index.ts)
This shows how cleanly your Vite app can call your own model using environment variables:
typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function chat(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const endpoint = process.env.AI_API_ENDPOINT; // e.g., https://api.openai.com/v1/chat/completions
    const apiKey = process.env.AI_API_KEY;
    const model = process.env.AI_MODEL_NAME || "gpt-4o-mini";

    const body: any = await request.json();
    const userMessage = body?.message || "";

    const response = await fetch(endpoint!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: "system", content: "YOUR_PORTFOLIO_SYSTEM_PROMPT_HERE" },
                { role: "user", content: userMessage }
            ],
            max_tokens: 250,
            temperature: 0.3
        })
    });

    const data = await response.json();
    return { jsonBody: { reply: data.choices?.[0]?.message?.content || "Sorry, I couldn't process that." } };
}

app.http('chat', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: chat
});
