import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

type Project = {
  number: string;
  category: string;
  title: string;
  role: string;
  summary: string;
  highlights: string[];
  tags: string[];
  metric: string;
  tone: string;
  url: string;
  images: GalleryImage[];
};

type GalleryImage = {
  src: string;
  alt: string;
};

type DemoProject = {
  title: string;
  description: string;
  tags: string[];
  url: string;
  images: GalleryImage[];
};

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const projects: Project[] = [
  {
    number: "01",
    category: "AI PLATFORMS · CLOUD",
    title: "Enterprise GenAI Platform & API Gateway",
    role: "Sole Full-Stack Developer",
    summary:
      "A custom enterprise GenAI application and developer API portal, built on Open WebUI and serving more than 25,000 unique users.",
    highlights: [
      "Connected 22 text and 6 image models across Azure, AWS Bedrock, and Google Cloud.",
      "Created an Image Studio, in-chat model switching, Tavily search, and flexible save modes.",
      "Built a modular Azure API Management pipeline for quota, routing, and credit calculations.",
    ],
    tags: ["Open WebUI", "Azure APIM", "Multi-model AI"],
    metric: "25K+ users",
    tone: "project-lime",
    url: "https://genai.hku.hk",
    images: [
      { src: "/01-a-genai-chat.png", alt: "Enterprise GenAI chat interface" },
      { src: "/01-b-genai-image-studio.png", alt: "GenAI image studio" },
      { src: "/01-c-genai-dev-portal.png", alt: "HKU ITS API developer portal" },
    ],
  },
  {
    number: "02",
    category: "AGENTIC AI · RAG",
    title: "Agentic AI & RAG Chatbot Ecosystem",
    role: "AI Application Developer",
    summary:
      "A multi-agent orchestration system and specialist RAG chatbots for student admissions and onboarding, handling 7,800+ annual conversations.",
    highlights: [
      "Automated content ingestion, chunking, and indexing with Node.js, Playwright, Blob Storage, and AI Search.",
      "Built n8n agentic workflows for task summaries and cross-platform integrations.",
      "Featured in an official Microsoft Customer Story in January 2025.",
    ],
    tags: ["RAG", "n8n", "Azure AI Search"],
    metric: "7.8K+ conversations",
    tone: "project-blue",
    url: "https://chatbots.hku.hk/aiHKUer",
    images: [
      { src: "/02-a-aihkuer.png", alt: "aiHKUer university assistant" },
      { src: "/02-b-tpg-chatbot.png", alt: "Taught postgraduate admissions chatbot" },
      { src: "/02-c-github-copilot-sdk.png", alt: "aiHKUer chat history interface" },
    ],
  },
  {
    number: "03",
    category: "WEB APPLICATIONS · UX",
    title: "High-Traffic University Portals",
    role: "Frontend & Full-Stack Developer",
    summary:
      "Responsive portal features and custom interactive widgets used by staff and students across university services.",
    highlights: [
      "Shipped a multilingual calendar with API caching, auto-scrolling announcements, and onboarding modules.",
      "Delivered global dark mode, sticky navigation, and role-based search filtering.",
      "Optimized idle-state API calls for portals with up to 47,000+ monthly active users.",
    ],
    tags: ["TypeScript", "Portal UX", "Performance"],
    metric: "47K+ monthly users",
    tone: "project-coral",
    url: "https://userguide.hku.hk/staffportal",
    images: [
      { src: "/03-a-staff-portal.png", alt: "HKU staff portal dashboard" },
      { src: "/03-b-student-portal.png", alt: "HKU student portal dashboard" },
      { src: "/03-student-portal-widgets-dark.png", alt: "Student portal widgets in dark mode" },
    ],
  },
  {
    number: "04",
    category: "PRODUCT MODERNIZATION",
    title: "Event Management UI Modernization",
    role: "Sole Full-Stack Developer",
    summary:
      "The first major UI/UX overhaul since 2005 for a .NET and SQL enterprise event platform.",
    highlights: [
      "Modernized event details, registration, and payment flows with a responsive, collapsible layout.",
      "Expanded REST API operations to support syndication on external websites.",
      "The first three months after launch brought 1.29M+ page hits and 29,000+ registrations.",
    ],
    tags: [".NET / C#", "SQL", "Responsive UI"],
    metric: "1.29M+ page hits",
    tone: "project-lavender",
    url: "https://userguide.hku.hk/hku-event-management-system-user-guide",
    images: [
      { src: "/04-a-ems-hdetail.png", alt: "Event Management System event details page" },
      { src: "/04-b-ems-registration.png", alt: "Event Management System registration form" },
    ],
  },
];

const demoProjects: DemoProject[] = [
  {
    title: "University Course Generator",
    description:
      "A course-design workspace for turning a course brief into structured lectures, learning objectives, and teaching notes.",
    tags: ["Course design", "AI", "Web app"],
    url: "https://github.com/mphhohku/university-course-generator",
    images: [
      { src: "/github-01-a-homepage.png", alt: "Course Generator homepage and course brief form" },
      { src: "/github-01-b-list.png", alt: "Course library with generated courses and starter briefs" },
      { src: "/github-01-c-notes.png", alt: "Generated lecture notes and learning objectives" },
    ],
  },
  {
    title: "Ticket Master",
    description:
      "A local-only workspace for IT ticket resolution and knowledge management, with a responsive interface and AI-powered ticket summarization.",
    tags: ["IT Support", "AI", "Web app"],
    url: "https://github.com/mphhohku/ticket-master",
    images: [
      { src: "/github-02-a-homepage.png", alt: "Ticket Master homepage and ticket list" },
      { src: "/github-02-b-knowledge.png", alt: "Ticket Master knowledge base and search" },
    ],
  },
  {
    title: "Project Lightfield",
    description:
      "A static web app for lightning talks and hour-long workshops, with interactive quizzes, polls, and live Q&A sessions.",
    tags: ["Enterprise training", "AI", "Web app"],
    url: "https://github.com/mphhohku/project-lightfield",
    images: [
      { src: "/github-04-a-homepage.png", alt: "Project Lightfield homepage and event list" },
      { src: "/github-04-b-demo.png", alt: "Project Lightfield demo with interactive elements" },
    ],
  },
  {
    title: "Chatbot-powered portfolio",
    description:
      "This portfolio pairs a responsive project showcase with an AI assistant that helps visitors explore my experience and work.",
    tags: ["React", "AI assistant", "Portfolio"],
    url: "https://github.com/mphhohku/marco-ho-portfolio",
    images: [
      { src: "/github-03-a-homepage.png", alt: "Portfolio chat assistant interface" },
      { src: "/github-03-b-work.png", alt: "Portfolio work section with project cards" },
      { src: "/github-03-c-demo.png", alt: "Portfolio about section with personal information" },
    ],
  },
];

const skillGroups = [
  {
    title: "AI & agents",
    skills: [
      "Microsoft Foundry",
      "OpenAI / GPT",
      "Claude",
      "Gemini",
      "DeepSeek",
      "Copilot Studio",
      "Open WebUI",
      "n8n",
      "RAG pipelines",
      "GitHub Copilot",
    ],
  },
  {
    title: "Frontend & UI",
    skills: [
      "TypeScript",
      "React",
      "Vue.js",
      "Next.js",
      "Svelte",
      "HTML5 / CSS3",
      "Power Pages",
      "Playwright",
    ],
  },
  {
    title: "Backend & cloud",
    skills: [
      "Microsoft Azure",
      "API Management",
      "Azure Functions",
      "Node.js",
      ".NET / C#",
      "Python",
      "Django",
      "Docker",
      "Azure DevOps",
    ],
  },
];

const certifications = [
  "Azure Developer Associate · AZ-204",
  "Azure Administrator Associate · AZ-104",
  "CompTIA Security+",
  "CompTIA Linux+",
  "CompTIA Network+",
  "CompTIA A+",
];

const starterPrompts = [
  "How does Marco use AI agents and n8n?",
  "Tell me about the GenAI platform he built.",
  "What is his experience with frontend development and Azure?",
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4 10h11M10 4l6 6-6 6" />
    </svg>
  );
}

function ProjectGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageButtonRef = useRef<HTMLButtonElement>(null);

  function showImage(nextIndex: number) {
    setActiveImage((nextIndex + images.length) % images.length);
  }

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      imageButtonRef.current?.focus();
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      } else if (event.key === "ArrowLeft") {
        setActiveImage((current) => (current - 1 + images.length) % images.length);
      } else if (event.key === "ArrowRight") {
        setActiveImage((current) => (current + 1) % images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, lightboxOpen]);

  if (images.length === 0) {
    return (
      <div className="project-gallery project-gallery-empty" aria-label={`${title} screenshots`}>
        <span>PROJECT SCREENSHOTS</span>
        <p>Add 2–3 screenshots to this project&apos;s images in <code>src/App.tsx</code>.</p>
      </div>
    );
  }

  const image = images[activeImage];

  return (
    <>
      <div className="project-gallery" aria-label={`${title} screenshots`}>
        <button
          ref={imageButtonRef}
          className="gallery-image-button"
          type="button"
          aria-label={`View ${title} screenshot larger`}
          onClick={() => setLightboxOpen(true)}
        >
          <img src={image.src} alt={image.alt} loading="lazy" />
        </button>
        {images.length > 1 && (
          <>
            <button
              className="gallery-arrow gallery-previous"
              type="button"
              aria-label={`Previous ${title} screenshot`}
              onClick={() => showImage(activeImage - 1)}
            >
              ‹
            </button>
            <button
              className="gallery-arrow gallery-next"
              type="button"
              aria-label={`Next ${title} screenshot`}
              onClick={() => showImage(activeImage + 1)}
            >
              ›
            </button>
            <div className="gallery-pagination" aria-label={`Screenshot ${activeImage + 1} of ${images.length}`}>
              {images.map((galleryImage, index) => (
                <button
                  key={galleryImage.src}
                  className={index === activeImage ? "is-active" : ""}
                  type="button"
                  aria-label={`Show screenshot ${index + 1} of ${images.length}`}
                  aria-current={index === activeImage ? "true" : undefined}
                  onClick={() => showImage(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {lightboxOpen && createPortal(
        <div
          className="gallery-lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxOpen(false);
          }}
        >
          <section
            className="lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshot viewer`}
          >
            <div className="lightbox-toolbar">
              <span>{title} · {activeImage + 1} / {images.length}</span>
              <button
                ref={closeButtonRef}
                className="lightbox-close"
                type="button"
                aria-label="Close image viewer"
                onClick={() => setLightboxOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="lightbox-stage">
              {images.length > 1 && (
                <button
                  className="lightbox-arrow"
                  type="button"
                  aria-label={`Previous ${title} screenshot`}
                  onClick={() => showImage(activeImage - 1)}
                >
                  ‹
                </button>
              )}
              <img src={image.src} alt={image.alt} />
              {images.length > 1 && (
                <button
                  className="lightbox-arrow"
                  type="button"
                  aria-label={`Next ${title} screenshot`}
                  onClick={() => showImage(activeImage + 1)}
                >
                  ›
                </button>
              )}
            </div>
            {images.length > 1 && (
              <div className="lightbox-pagination" aria-label={`Screenshot ${activeImage + 1} of ${images.length}`}>
                {images.map((galleryImage, index) => (
                  <button
                    key={galleryImage.src}
                    className={index === activeImage ? "is-active" : ""}
                    type="button"
                    aria-label={`Show screenshot ${index + 1} of ${images.length}`}
                    aria-current={index === activeImage ? "true" : undefined}
                    onClick={() => showImage(index)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2m14.5-6-1.4 1.4M5.4 14.6 4 16m12 0-1.4-1.4M5.4 5.4 4 4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M16.5 12.1A7 7 0 0 1 7.9 3.5 7 7 0 1 0 16.5 12Z" />
    </svg>
  );
}

function ChatIcon({ close = false }: { close?: boolean }) {
  return close ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M17 9.5a6.5 6.5 0 0 1-6.5 6.5 7 7 0 0 1-2.8-.6L3 17l1.6-3.6A6.5 6.5 0 1 1 17 9.5Z" />
      <path d="M7 9.5h.01M10.5 9.5h.01M14 9.5h.01" />
    </svg>
  );
}

function NewChatIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("marco-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatAbortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("marco-theme", theme);
  }, [theme]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [chatMessages, chatBusy]);

  async function sendMessage(message: string) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || chatBusy) return;
    setChatMessages((current) => [...current, { role: "user", content: trimmedMessage }]);
    setChatInput("");
    setChatBusy(true);
    const abortController = new AbortController();
    chatAbortControllerRef.current = abortController;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedMessage }),
        signal: abortController.signal,
      });
      const responseText = await response.text();
      let data: unknown;
      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("Portfolio chat returned a non-JSON response.", {
          status: response.status,
          contentType: response.headers.get("content-type"),
          bodyLength: responseText.length,
          invocationId: response.headers.get("x-chat-invocation-id"),
          requestId: response.headers.get("x-ms-request-id"),
        });
        throw new Error(
          `The chat service returned an invalid response (HTTP ${response.status}). Check the Azure Function logs.`,
        );
      }
      if (!response.ok) {
        const errorMessage =
          data && typeof data === "object" && "error" in data && typeof data.error === "string"
            ? data.error
            : `The chat service failed (HTTP ${response.status}). Check the Azure Function logs.`;
        throw new Error(errorMessage);
      }
      if (!data || typeof data !== "object" || !("reply" in data)) {
        console.error("Portfolio chat returned an unexpected JSON response.", {
          status: response.status,
          contentType: response.headers.get("content-type"),
          invocationId: response.headers.get("x-chat-invocation-id"),
          requestId: response.headers.get("x-ms-request-id"),
        });
        throw new Error("The chat service returned an unexpected response. Check the Azure Function logs.");
      }
      const reply = data.reply;
      if (typeof reply !== "string" || !reply.trim()) {
        throw new Error("The assistant returned an empty response. Please try again.");
      }
      setChatMessages((current) => [...current, { role: "assistant", content: reply }]);
    } catch (error) {
      if (abortController.signal.aborted) return;
      setChatMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "The assistant is unavailable right now. Please try again later.",
        },
      ]);
    } finally {
      if (chatAbortControllerRef.current === abortController) {
        chatAbortControllerRef.current = null;
        setChatBusy(false);
      }
    }
  }

  function handleNewChat() {
    chatAbortControllerRef.current?.abort();
    chatAbortControllerRef.current = null;
    setChatMessages([]);
    setChatInput("");
    setChatBusy(false);
    chatInputRef.current?.focus();
  }

  function handleChatSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(chatInput);
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Marco Ho home">
          <span className="wordmark-mark">M</span>
          <span>marco ho<span className="wordmark-period">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#demos">GitHub demos</a>
          <a href="#about">About</a>
          <a href="#skills">Toolkit</a>
          <a className="nav-contact" href="#contact">Let&apos;s talk <ArrowIcon diagonal /></a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
      </header>

      <section className="hero section-wrap" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> GENERATING NEW IDEAS EVERY NOW AND THEN...</div>
          <h1>
            Building useful
            <br />
            things with <span className="highlight-word">intelligence.</span>
          </h1>
          <p className="hero-intro">
            I&apos;m <strong>Marco Ho</strong> — a full-stack &amp; AI applications
            developer turning complex ideas into scalable platforms, agentic workflows, and
            thoughtful web experiences.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <ArrowIcon /></a>
            <a className="text-link" href="mailto:mphhohku@gmail.com">Get in touch <ArrowIcon diagonal /></a>
          </div>
          <div className="hero-socials" aria-label="Social links">
            <a href="https://github.com/mphhohku" target="_blank" rel="noreferrer">
              GitHub <ArrowIcon diagonal />
            </a>
            <a href="https://www.linkedin.com/search/results/people/?keywords=Ho%20Pak%20Hung" target="_blank" rel="noreferrer">
              LinkedIn <ArrowIcon diagonal />
            </a>
            <a href="mailto:mphhohku@gmail.com">Email <ArrowIcon diagonal /></a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Marco Ho, full-stack and AI applications developer">
          <div className="visual-topline"><span>HK · BUILDING EVERYWHERE</span><span>22° 18&apos; N</span></div>
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-cross cross-one" />
          <div className="visual-cross cross-two" />
          <div className="monogram">MH<span>.</span></div>
          <div className="visual-caption">
            <span className="caption-label">CURRENT FOCUS</span>
            <span>AI systems with a human touch<span className="caption-cursor">_</span></span>
          </div>
          <div className="visual-index">01 / 04</div>
        </div>
      </section>

      <section className="stats-band" aria-label="Career highlights">
        <div className="stats-inner">
          <div className="stat-item">
            <strong>25<span>K+</span></strong><span>AI platform users</span>
          </div>
          <div className="stat-item">
            <strong>5.5<span>M+</span></strong><span>AI API requests processed</span>
          </div>
          <div className="stat-item">
            <strong>47<span>K+</span></strong><span>Monthly active portal users</span>
          </div>
          <div className="stat-note"><span className="stat-note-dot" /> IMPACT, AT SCALE</div>
        </div>
      </section>

      <section className="work-section section-wrap" id="work">
        <div className="section-heading">
          <div>
            <div className="eyebrow section-kicker">SELECTED WORK <span>2021 — 2025</span></div>
            <h2>Ideas, shipped.</h2>
          </div>
          <p>A few ways I&apos;ve helped teams build smarter, move faster, and serve more people.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.tone}`} key={project.number}>
              <div className="project-side">
                <span className="project-number">{project.number}</span>
                <span className="project-category">{project.category}</span>
              </div>
              <div className="project-content">
                <div className="project-topline">
                  <span className="project-role">{project.role}</span>
                  <span className="project-metric">{project.metric}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <ul className="project-highlights">
                  {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a className="button button-primary project-visit-link" href={project.url} target="_blank" rel="noreferrer">
                  Visit project <ArrowIcon diagonal />
                </a>
              </div>
              <ProjectGallery images={project.images} title={project.title} />
              <div className="project-decoration" aria-hidden="true">
                <span>{project.number}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="demos-section section-wrap" id="demos">
        <div className="section-heading">
          <div>
            <div className="eyebrow section-kicker">GITHUB PROJECTS</div>
            <h2>Built on my own time.</h2>
          </div>
          <p>Independent projects that explore useful ideas, thoughtful interfaces, and applied AI.</p>
        </div>
        <div className="demo-grid">
          {demoProjects.map((project) => (
            <article className="demo-card" key={project.title}>
              <ProjectGallery images={project.images} title={project.title} />
              <div className="demo-content">
                <div className="demo-card-kicker">PERSONAL PROJECT</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                {project.url ? (
                  <a className="demo-link" href={project.url} target="_blank" rel="noreferrer">
                    Visit project <ArrowIcon diagonal />
                  </a>
                ) : (
                  <span className="demo-link demo-link-pending">Project link to be added</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-inner section-wrap">
          <div className="about-label">
            <div className="eyebrow">A LITTLE ABOUT ME</div>
            <div className="about-symbol" aria-hidden="true">✳</div>
          </div>
          <div className="about-copy">
            <h2>AI use should feel <span>thoughtful.</span></h2>
            <p>
              I work across the full stack, with a particular interest in the space where
              generative AI meets real-world products. From the first prototype to the details
              that make a busy interface feel simple, I enjoy making ambitious ideas useful,
              reliable, and ready to scale.
            </p>
            <p className="about-location"><span className="location-dot" /> Based in Hong Kong <span className="location-divider">/</span> Working at HKU</p>
          </div>
        </div>
      </section>

      <section className="toolkit-section section-wrap" id="skills">
        <div className="section-heading toolkit-heading">
          <div>
            <div className="eyebrow section-kicker">THE TOOLKIT</div>
            <h2>Curious by default.</h2>
          </div>
          <p>The right tool for the problem — and a willingness to learn the next one.</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div className="skill-group" key={group.title}>
              <div className="skill-group-top">
                <span className="skill-group-number">0{index + 1}</span>
                <span className="skill-group-title">{group.title}</span>
              </div>
              <div className="skill-tags">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="certifications">
          <div className="cert-heading"><span className="cert-star">✳</span> CERTIFICATIONS</div>
          <div className="cert-list">
            {certifications.map((certification) => <span key={certification}>{certification}</span>)}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-inner section-wrap">
          <div className="eyebrow">HAVE A GOOD ONE IN MIND?</div>
          <h2>Let&apos;s make it <span>real.</span></h2>
          <p>Looking to build something thoughtful with AI, web, or both? I&apos;d love to hear about it.</p>
          <a className="button button-light" href="mailto:mphhohku@gmail.com">
            Say hello <ArrowIcon diagonal />
          </a>
          <div className="contact-orbit contact-orbit-one" aria-hidden="true" />
          <div className="contact-orbit contact-orbit-two" aria-hidden="true" />
        </div>
      </section>

      <footer className="site-footer section-wrap">
        <a className="wordmark footer-wordmark" href="#top">
          <span className="wordmark-mark">M</span>
          <span>marco ho<span className="wordmark-period">.</span></span>
        </a>
        <span className="footer-note">Designed &amp; built with curiosity. © {new Date().getFullYear()} Marco Ho.</span>
        <a className="back-top" href="#top">BACK TO TOP <span>↑</span></a>
      </footer>

      <div className="chat-widget">
        {chatOpen && (
          <section className="chat-panel" aria-label="Ask AI about Marco">
            <div className="chat-header">
              <div className="chat-avatar">M<span>.</span></div>
              <div className="chat-heading">
                <strong>Ask about Marco</strong>
                <span><i /> Portfolio assistant</span>
              </div>
              <button className="chat-new" type="button" onClick={handleNewChat}>
                <NewChatIcon />
                <span>New chat</span>
              </button>
              <button className="chat-close" type="button" aria-label="Close chat" onClick={() => setChatOpen(false)}>
                <ChatIcon close />
              </button>
            </div>
            <div className="chat-body" aria-live="polite">
              <div className="chat-welcome">
                <span className="chat-greeting">Hey there 👋</span>
                <p>Ask me about Marco&apos;s work, experience, or tech stack.</p>
              </div>
              {chatMessages.length === 0 && (
                <div className="starter-prompts">
                  {starterPrompts.map((prompt) => (
                    <button key={prompt} type="button" onClick={() => void sendMessage(prompt)}>{prompt} <ArrowIcon /></button>
                  ))}
                </div>
              )}
              {chatMessages.map((message, index) => (
                <div className={`chat-message message-${message.role}`} key={`${message.role}-${index}`}>{message.content}</div>
              ))}
              {chatBusy && <div className="chat-thinking"><i /><i /><i /><span>Thinking</span></div>}
              <div ref={chatEndRef} />
            </div>
            <form className="chat-form" onSubmit={handleChatSubmit}>
              <label className="sr-only" htmlFor="chat-input">Ask a question about Marco</label>
              <input
                id="chat-input"
                ref={chatInputRef}
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask me anything..."
                maxLength={2000}
                disabled={chatBusy}
              />
              <button type="submit" aria-label="Send message" disabled={!chatInput.trim() || chatBusy}>
                <ArrowIcon />
              </button>
            </form>
            <div className="chat-disclaimer">Answers are based on the information on this site.</div>
          </section>
        )}
        <button
          className={`chat-launcher ${chatOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={chatOpen}
          aria-label={chatOpen ? "Close portfolio assistant" : "Ask AI about Marco"}
          onClick={() => setChatOpen(!chatOpen)}
        >
          {chatOpen ? <ChatIcon close /> : <><ChatIcon /><span>Ask AI about Marco</span></>}
        </button>
      </div>
    </main>
  );
}

export default App;
