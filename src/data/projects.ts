export type ProjectMotif =
  | "books"
  | "layers"
  | "cross"
  | "path"
  | "signal"
  | "network"
  | "vector"
  | "mood"
  | "frames"
  | "versus"
  | "notes";

export type ProjectStatus = "Case study" | "Experiment";

export interface ProjectTechGroup {
  label: string;
  summary: string;
  items: string[];
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  status: ProjectStatus;
  featured: boolean;
  tagline: string;
  description: string;
  stack: string[];
  techStack: ProjectTechGroup[];
  highlights: string[];
  contextNote?: string;
  repo?: string;
  demo?: string;
  adminDemo?: string;
  screenshots: ProjectScreenshot[];
  cover: {
    from: string;
    to: string;
    ink: string;
    motif: ProjectMotif;
  };
}

export const projects: Project[] = [
  {
    slug: "photo-social",
    name: "PhotoSocial",
    shortName: "PhotoSocial",
    category: "Social photo app",
    status: "Case study",
    featured: true,
    tagline: "A complete social loop for photos, stories and messages.",
    description:
      "PhotoSocial is a full social photo product behind a clean Instagram-style shell: a Following feed, an Explore grid, profiles, stories, direct messages, notifications, search and saved posts. The interesting work is underneath the familiar surface: cursor-paginated feeds, unread state without a socket server, threaded comments, block filtering, mention fan-out, 24-hour story expiry, and a warmed guest cache that keeps Explore fast. The live demo runs on a shared account and a free-tier API, so it is ready to review without any setup.",
    stack: [
      "React 19",
      "Vite",
      "Sass",
      "Express 5",
      "MongoDB",
      "ImageKit",
      "JWT",
      "Render",
      "Vercel",
    ],
    techStack: [
      {
        label: "Interface",
        summary: "One shell for the whole social loop, from the feed to the inbox.",
        items: ["React 19", "Vite", "Sass", "Cursor-paginated feeds"],
      },
      {
        label: "Server",
        summary: "Authenticated API, media uploads, and the unread state behind the badges.",
        items: ["Express 5", "JWT", "ImageKit", "Incremental polling"],
      },
      {
        label: "Data",
        summary: "The social graph, stored so feed reads stay batched and cheap.",
        items: ["MongoDB", "TTL story expiry", "Batched reads", "Warmed guest cache"],
      },
      {
        label: "Delivery",
        summary: "A free-tier API with a static frontend and a cache in front of Explore.",
        items: ["Render", "Vercel", "Stale-while-revalidate"],
      },
    ],
    highlights: [
      "A full social graph: posts, stories, likes, nested comments and comment likes, follows, saves, blocks and reports.",
      "Direct messages with conversation unread counts, shared post cards, read receipts and incremental polling without a realtime service.",
      "Notifications for likes, comments, replies, follows and mentions, with live unread badges in the navigation.",
      "People, caption and hashtag search, suggested accounts, follower lists and a private Saved grid.",
      "Stories expire after 24 hours through a MongoDB TTL index; the viewer supports keyboard navigation and seen state.",
      "Cursor pagination, a warmed stale-while-revalidate guest feed cache and batched reads keep the feed fast on a free Render instance.",
    ],
    contextNote:
      "The live demo uses the shared demo_photo account, pre-filled on the sign-in page. The API runs on Render's free plan, so the first request after idle may take a moment.",
    repo: "https://github.com/fk219/photo-social",
    demo: "https://photosocial.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/photo-social/home.png",
        alt: "PhotoSocial Following feed with a story rail, post card and unread notification badge",
        width: 1425,
        height: 1000,
      },
      {
        src: "/projects/photo-social/messages.png",
        alt: "PhotoSocial direct messages with a conversation list, shared post card and read receipt",
        width: 1425,
        height: 1000,
      },
      {
        src: "/projects/photo-social/profile.png",
        alt: "PhotoSocial profile for @demo_photo with a six-photo grid and follower counts",
        width: 1425,
        height: 1000,
      },
    ],
    cover: {
      from: "#eaf5ff",
      to: "#7fbdf5",
      ink: "#0b2b4a",
      motif: "frames",
    },
  },
  {
    slug: "mood-music",
    name: "MoodMusic",
    shortName: "MoodMusic",
    category: "Mood-aware listening room",
    status: "Case study",
    featured: true,
    tagline: "A listening room that reads the room, then tunes the queue.",
    description:
      "MoodMusic starts with a question most music apps never ask: how does today feel? A browser-side MediaPipe face model reads an expression into one of five moods, a manual check-in covers the camera-shy, and the room builds a queue that matches. Every check-in stays in a private seven-day journal, while a protected Studio lets the owner grow the catalog with tagged MP3s. The camera path is entirely on-device; no frame is uploaded.",
    stack: [
      "React 19",
      "Vite",
      "Sass",
      "MediaPipe",
      "Express 5",
      "MongoDB",
      "ImageKit",
      "JWT",
    ],
    techStack: [
      {
        label: "Interface",
        summary: "A listening room, mood ring and journal that stay out of the music's way.",
        items: ["React 19", "Vite", "Sass", "Mood ring"],
      },
      {
        label: "On-device vision",
        summary: "The expression read happens in the browser; no camera frame is uploaded.",
        items: ["MediaPipe Face Landmarker", "Five-mood classifier", "Manual check-in fallback"],
      },
      {
        label: "Server",
        summary: "Accounts, catalog, uploads and the private journal behind the room.",
        items: ["Express 5", "JWT cookies", "bcrypt", "Helmet", "Scoped rate limits"],
      },
      {
        label: "Data & media",
        summary: "A mood-tagged catalog and a per-listener journal with a seven-day window.",
        items: ["MongoDB", "ImageKit", "Tagged MP3s", "Embedded covers"],
      },
      {
        label: "Delivery",
        summary: "The free-tier split used across the portfolio: API on Render, client on Vercel.",
        items: ["Render", "Vercel"],
      },
    ],
    highlights: [
      "On-device MediaPipe face landmarks map an expression to neutral, happy, sad, angry, or surprised without sending a frame off the device.",
      "The manual check-in uses the same mood path, so the room works with or without camera access.",
      "A private seven-day journal counts moods, marks camera versus manual reads, and can be cleared without touching the catalog.",
      "A protected Studio accepts tagged MP3s with ID3 titles and embedded covers, then files them into the right mood.",
      "JWT cookies, bcrypt hashing, token-version revocation, Helmet headers, and scoped rate limits sit behind the room.",
    ],
    contextNote:
      "The live demo opens in one click from the sign-in page. The camera path runs in the browser, and the API uses Render's free plan, so the first request after idle may take a moment.",
    repo: "https://github.com/fk219/mood-music",
    demo: "https://moodmusic.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/mood-music/home.png",
        alt: "MoodMusic listening room with a happy mood ring, manual check-in and now-playing bar",
        width: 1425,
        height: 1000,
      },
      {
        src: "/projects/mood-music/journal.png",
        alt: "MoodMusic private weekly journal with mood bars, dominant mood and recent check-ins",
        width: 1425,
        height: 1000,
      },
    ],
    cover: {
      from: "#f0d9ff",
      to: "#5a3f97",
      ink: "#24143d",
      motif: "mood",
    },
  },
  {
    slug: "model-compare",
    name: "ModelCompare",
    shortName: "ModelCompare",
    category: "AI model evaluation",
    status: "Case study",
    featured: true,
    tagline: "Pick two models. A third judge keeps score.",
    description:
      "Public benchmarks are averages; a developer's actual question is not. ModelCompare sends one prompt to two selectable models from an OpenRouter catalog, runs them in parallel, then asks a judge model to score both answers, explain its reasoning, and call a winner. The result is a shareable fight card, a Markdown report, and a local leaderboard of who keeps winning your prompts. When no OpenRouter key is configured, the arena deliberately falls back to Cohere and Groq so the live demo still works.",
    stack: [
      "React 19",
      "Vite",
      "Express 5",
      "TypeScript",
      "LangGraph",
      "OpenRouter",
      "Cohere",
      "Groq",
      "Zod",
    ],
    techStack: [
      {
        label: "Interface",
        summary: "A broadcast-style fight card with prompts, starters and a shareable report.",
        items: ["React 19", "Vite", "Fight-card layout", "#b= report links"],
      },
      {
        label: "Orchestration",
        summary: "Two parallel answers and a judge that must return a typed scorecard.",
        items: ["TypeScript", "LangGraph", "Zod", "Structured output", "Defensive JSON parsing"],
      },
      {
        label: "Models",
        summary: "A live catalog when a key is present, with a deliberate no-key demo pair.",
        items: ["OpenRouter catalog", "Cohere", "Groq", "Parallel invocation"],
      },
      {
        label: "Server & delivery",
        summary: "Cost guards and cold-start tolerance for a public demo.",
        items: ["Express 5", "LRU cache", "Per-IP limits", "60s timeout", "Render", "Vercel"],
      },
    ],
    highlights: [
      "Two model selectors backed by a curated OpenRouter catalog; the pair is saved locally and checked before a bout.",
      "Fighters answer in parallel while a separate judge uses structured output and defensive JSON parsing to return typed scores, feedback and a winner.",
      "A no-key fallback pair keeps the live demo working, and the UI presents it as an intentional demo bout instead of a broken selector.",
      "Shareable #b= reports compress the full scorecard into a URL, with Markdown export and a local battle history.",
      "Per-IP limits, prompt caps, a 60-second timeout, and an LRU cache make repeated prompts cheap and safe.",
    ],
    contextNote:
      "The live demo runs the no-key fallback pair, Cohere vs Groq. The OpenRouter catalog and selectors are wired and activate with an OpenRouter key. The API is on Render's free plan, so a cold start can take up to a minute.",
    repo: "https://github.com/fk219/model-compare",
    demo: "https://modelcompare.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/model-compare/home.png",
        alt: "ModelCompare battle card with the demo fighter pair, prompt starters and composer",
        width: 1440,
        height: 1000,
      },
      {
        src: "/projects/model-compare/battle.png",
        alt: "ModelCompare judges' scorecard with Cohere and Groq answers, scores and written reasoning",
        width: 1440,
        height: 1000,
      },
    ],
    cover: {
      from: "#2c303c",
      to: "#0c0d11",
      ink: "#f5eee0",
      motif: "versus",
    },
  },
  {
    slug: "research-desk",
    name: "ResearchDesk",
    shortName: "ResearchDesk",
    category: "Sourced research workspace",
    status: "Case study",
    featured: true,
    tagline: "Answers with the sources still attached.",
    description:
      "Search gives you an answer, then loses the trail. ResearchDesk keeps the trail: Tavily retrieves live results, Groq reasons over them, and the answer is filed as a reading note with numbered sources. Threads can be reopened, renamed, pinned, exported as Markdown, or published as a read-only report. The point is not a faster chat window; it is an answer you can defend later.",
    stack: [
      "React 19",
      "Vite",
      "Redux Toolkit",
      "Express 5",
      "MongoDB",
      "Groq",
      "Tavily",
      "JWT",
    ],
    techStack: [
      {
        label: "Interface",
        summary: "An editorial research desk: threads, notes and a read-only report view.",
        items: ["React 19", "Vite", "Redux Toolkit", "Markdown export"],
      },
      {
        label: "Retrieval & reasoning",
        summary: "Search runs server-side, and the sources are stored before the prose is written.",
        items: ["Tavily", "Groq", "Source capture", "Numbered citations"],
      },
      {
        label: "Server",
        summary: "Accounts and quotas around every research call.",
        items: ["Express 5", "JWT", "HTTP-only sessions", "Daily quotas"],
      },
      {
        label: "Data",
        summary: "Threads, notes and share links scoped to the account that made them.",
        items: ["MongoDB", "Pinned threads", "Revocable share links"],
      },
      {
        label: "Delivery",
        summary: "The same free-tier split as the rest of the portfolio.",
        items: ["Render", "Vercel"],
      },
    ],
    highlights: [
      "Tavily search results are captured by the backend; every answer stores numbered sources beside the prose.",
      "Threads are saved per account, grouped by date, renameable, pinnable, and exportable as Markdown.",
      "A share link exposes a clean read-only report with no account identity and can be switched off.",
      "A one-click demo desk seeds example research threads without asking for an email.",
      "Daily quotas, per-IP limits, HTTP-only sessions, and token-version logout keep the workspace honest.",
    ],
    contextNote:
      "The live API runs on Render's free plan and answers through Groq and Tavily. The one-click demo desk is shared and seeded with three sample notes.",
    repo: "https://github.com/fk219/research-desk",
    demo: "https://researchdesk.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/research-desk/home.png",
        alt: "ResearchDesk reading room with a research composer and suggested lines of inquiry",
        width: 1440,
        height: 1000,
      },
      {
        src: "/projects/research-desk/answer.png",
        alt: "ResearchDesk research memo with a sourced answer and numbered citations",
        width: 1440,
        height: 1000,
      },
      {
        src: "/projects/research-desk/sources.png",
        alt: "ResearchDesk source cards with numbered references and source links",
        width: 1440,
        height: 1000,
      },
    ],
    cover: {
      from: "#ece5d6",
      to: "#a08a68",
      ink: "#2b241a",
      motif: "notes",
    },
  },
  {
    slug: "foliofind",
    name: "FolioFind",
    shortName: "FolioFind",
    category: "Second-hand book marketplace",
    status: "Case study",
    featured: true,
    tagline: "A used-book marketplace where the copy on the shelf is the product.",
    description:
      "Most book marketplaces flatten a book into a title, a cover, and a price. FolioFind treats every used copy as its own record: edition, condition, seller note, ISBN, and price. Readers can also keep a private shelf of what they want to read, are reading, and have finished. It is a catalogue and reading room, not another checkout flow.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Zod",
      "JWT",
    ],
    techStack: [
      {
        label: "Interface",
        summary: "A bookshop catalogue and a Reading Room that behaves like a shelf, not a list.",
        items: ["React", "Vite", "Tailwind CSS", "Book-spine shelf view"],
      },
      {
        label: "API",
        summary: "Validated listing, seller and shelf operations behind an account boundary.",
        items: ["Node.js", "Express", "Zod", "JWT"],
      },
      {
        label: "Data",
        summary: "Copy-level records with the details that make a used book a specific object.",
        items: ["MongoDB", "Edition & condition fields", "Account-scoped shelves"],
      },
      {
        label: "Delivery",
        summary: "One Render service serves the built client from the Express app.",
        items: ["Render", "Vite production build"],
      },
    ],
    highlights: [
      "Search by title or author, filter by category and price, sort results, and page through the catalogue on the API side.",
      "Copy-level listings carry the details that make a second-hand book specific: edition, publication year, condition, ISBN, and seller notes.",
      "An account-scoped Reading Room with Want to read, Reading, and Finished shelves, private notes, and a book-spine view.",
      "Seller tools for creating, marking, relisting, and deleting listings, plus an admin ledger for inventory and users.",
    ],
    repo: "https://github.com/fk219/FolioFind",
    demo: "https://foliofind.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/foliofind/home.png",
        alt: "FolioFind home page with a searchable grid of second-hand book listings",
        width: 1440,
        height: 1100,
      },
      {
        src: "/projects/foliofind/reading-room.png",
        alt: "FolioFind Reading Room showing saved books arranged as shelves",
        width: 1440,
        height: 1150,
      },
      {
        src: "/projects/foliofind/admin.png",
        alt: "FolioFind admin ledger with listing totals and an inventory table",
        width: 1440,
        height: 1000,
      },
    ],
    cover: {
      from: "#f4c76d",
      to: "#c96c3b",
      ink: "#332015",
      motif: "books",
    },
  },
  {
    slug: "klinikly",
    name: "Klinikly",
    shortName: "Klinikly",
    category: "Healthcare booking platform",
    status: "Case study",
    featured: true,
    tagline: "Care, scheduled, with every slot claimed exactly once.",
    description:
      "Klinikly gives patients a clear path from specialist discovery to a confirmed appointment, and gives each hospital its own scoped admin workspace. Slots are generated from weekly doctor schedules, and booking is claimed atomically at the database level, so two people cannot take the same appointment.",
    stack: [
      "TypeScript",
      "React",
      "Express",
      "Mongoose",
      "MongoDB",
      "Zod",
      "JWT",
      "npm workspaces",
    ],
    techStack: [
      {
        label: "Patient app",
        summary: "Specialist discovery, generated availability and a claim that can only succeed once.",
        items: ["TypeScript", "React", "14-day calendar", "Atomic booking"],
      },
      {
        label: "Hospital portal",
        summary: "A tenant-scoped back office for the people and schedules behind the slots.",
        items: ["React", "TypeScript", "Doctor CRUD", "Bulk slot generation"],
      },
      {
        label: "API",
        summary: "Validated endpoints with a hard tenant boundary and rotating sessions.",
        items: ["Express", "Mongoose", "Zod", "JWT", "Refresh-token rotation"],
      },
      {
        label: "Data",
        summary: "The unique constraint that makes two patients unable to take the same slot.",
        items: ["MongoDB", "Atomic claims", "Per-hospital isolation"],
      },
      {
        label: "Workspace & delivery",
        summary: "One repository for both clients and the shared API.",
        items: ["npm workspaces", "Render"],
      },
    ],
    highlights: [
      "A 14-day doctor calendar generated from weekly hospital schedules, with past slots excluded by the API.",
      "Atomic booking claims produce one appointment under concurrent requests while the losing request receives a conflict response.",
      "Per-hospital tenant isolation keeps doctors, slots, schedules, and appointments inside the right admin account.",
      "Refresh-token rotation revokes old tokens and rejects reuse, with access tokens kept short lived.",
      "Admin tools for doctors, availability, bulk slot generation, manual blocking, and an appointment desk.",
    ],
    repo: "https://github.com/fk219/Klinikly",
    demo: "https://klinikly.furqankhan.dev",
    adminDemo: "https://klinikly-admin.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/klinikly/home.png",
        alt: "Klinikly patient home page with specialist search and care categories",
        width: 1440,
        height: 1000,
      },
      {
        src: "/projects/klinikly/booking.png",
        alt: "Klinikly appointment confirmation screen with doctor and slot details",
        width: 1440,
        height: 1000,
      },
      {
        src: "/projects/klinikly/admin.png",
        alt: "Klinikly hospital admin dashboard showing appointments and schedule controls",
        width: 1440,
        height: 1000,
      },
    ],
    cover: {
      from: "#c5ebe5",
      to: "#3c8a8a",
      ink: "#123636",
      motif: "cross",
    },
  },
  {
    slug: "learnhub",
    name: "LearnHub",
    shortName: "LearnHub",
    category: "Learning platform",
    status: "Case study",
    featured: true,
    tagline: "A course route that always shows the next piece of work.",
    description:
      "LearnHub is built around a visible route instead of an endless feed of lessons. Every module has a sequence, every lesson has a kind and an objective, and progress belongs to the learner. The admin side records the real course, learner, enrollment, and order counts rather than decorative metrics.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Express",
      "Mongoose",
      "MongoDB",
      "Zod",
      "JWT",
    ],
    techStack: [
      {
        label: "Interface",
        summary: "A course map that always makes the next piece of work visible.",
        items: ["React", "Vite", "Tailwind CSS", "Course route"],
      },
      {
        label: "API",
        summary: "Catalogue, enrollment, progress and admin operations on one ledger.",
        items: ["Express", "Mongoose", "Zod", "JWT"],
      },
      {
        label: "Commerce",
        summary: "A real checkout path kept in mock mode for the public demo.",
        items: ["Stripe Checkout", "Webhook path", "Demo enrollment"],
      },
      {
        label: "Data",
        summary: "Progress that belongs to the learner, not the browser session.",
        items: ["MongoDB", "Account-scoped progress", "Real admin counts"],
      },
      {
        label: "Delivery",
        summary: "Client, admin and API shipped from one npm workspace.",
        items: ["npm workspaces", "Render"],
      },
    ],
    highlights: [
      "A course route that labels lessons, labs, critiques, and projects, with an objective and duration for every step.",
      "Account-scoped progress with complete and reopen actions, a continue point, and overall learner progress.",
      "Catalogue search with category, level, and sort controls, plus direct demo enrollment without a payment being taken.",
      "An admin ledger with real course, learner, enrollment, and order counts, alongside publishing and learner tools.",
      "An optional Stripe checkout and webhook path retained for production while the public demo runs in mock mode.",
    ],
    contextNote:
      "The live demo uses Stripe mock mode. No payment is collected when you enroll.",
    repo: "https://github.com/fk219/Learn-Hub",
    demo: "https://learnhub.furqankhan.dev",
    adminDemo: "https://learnhub-admin.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/learnhub/home.png",
        alt: "LearnHub home page introducing the studio-style learning approach",
        width: 1440,
        height: 1100,
      },
      {
        src: "/projects/learnhub/route.png",
        alt: "LearnHub course route listing modules, lessons, labs, and projects",
        width: 1440,
        height: 1100,
      },
      {
        src: "/projects/learnhub/my-courses.png",
        alt: "LearnHub My Learning page showing course progress",
        width: 1440,
        height: 1100,
      },
    ],
    cover: {
      from: "#dfdcff",
      to: "#6d67bb",
      ink: "#211f4d",
      motif: "path",
    },
  },
  {
    slug: "hooked-on-cakes",
    name: "Hooked on Cakes",
    shortName: "Hooked",
    category: "Cake commerce platform",
    status: "Case study",
    featured: true,
    tagline: "A patisserie storefront with the back office to match.",
    description:
      "Hooked on Cakes is a full-stack shop for celebration cakes with a storefront for customers and a separate dashboard for the owner. Customers can configure a cake, place a cash-on-delivery order, leave a review, and track an order. The admin app handles products, inventory, orders, users, and revenue.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "GSAP",
      "Express",
      "Mongoose",
      "MongoDB",
      "Cloudinary",
      "JWT",
    ],
    techStack: [
      {
        label: "Storefront",
        summary: "A photographic patisserie with an atelier that estimates as you configure.",
        items: ["React", "Vite", "Tailwind CSS", "GSAP"],
      },
      {
        label: "Owner dashboard",
        summary: "A separate admin app for the business behind the cakes.",
        items: ["React", "Revenue charts", "Product CRUD", "Order desk"],
      },
      {
        label: "API",
        summary: "One API serving customers and the owner, with role-scoped access.",
        items: ["Express", "Mongoose", "JWT", "Server-side orders"],
      },
      {
        label: "Media & mail",
        summary: "Cake photography and transactional messages around each order.",
        items: ["Cloudinary", "Transactional email"],
      },
      {
        label: "Delivery",
        summary: "Storefront, admin app and API deployed together.",
        items: ["Render", "Monorepo build scripts"],
      },
    ],
    highlights: [
      "A storefront with product search and filtering, cart, checkout, order history, profiles, addresses, and reviews.",
      "Cash-on-delivery checkout with server-side order records and owner-side status updates.",
      "A photographic atelier for format, crumb, finish, inscription, and a live estimate.",
      "A separate admin dashboard for revenue and order charts, product CRUD, inventory, order status, and customers.",
      "Cloudinary image uploads and transactional email notifications behind the shop.",
    ],
    // Source stays private until the credentials in git history are rotated and purged.
    demo: "https://hookedoncakes.furqankhan.dev",
    adminDemo: "https://hookedoncakes-admin.furqankhan.dev/admin/",
    screenshots: [
      {
        src: "/projects/hooked-on-cakes/home.png",
        alt: "Hooked on Cakes storefront with a chocolate layer cake and a couture patisserie layout",
        width: 1430,
        height: 1000,
      },
      {
        src: "/projects/hooked-on-cakes/atelier.png",
        alt: "Hooked on Cakes atelier with format, crumb, and finish controls beside a photographic cake reference and commission docket",
        width: 1430,
        height: 1000,
      },
    ],
    cover: {
      from: "#f7d6d2",
      to: "#bf6664",
      ink: "#421d1c",
      motif: "layers",
    },
  },
  {
    slug: "packet-analyzer",
    name: "PacketAnalyzer",
    shortName: "PacketAnalyzer",
    category: "Network analysis lab",
    status: "Experiment",
    featured: false,
    tagline: "Deep packet inspection, in plain sight.",
    description:
      "PacketAnalyzer is a browser-based PCAP analysis lab. It parses packet captures, identifies applications and domains, aggregates traffic into flows, and applies DPI-style blocking rules. The project is a MERN rebuild of an earlier C++ packet-inspection engine, which is preserved in the repository.",
    stack: [
      "React",
      "Vite",
      "Express",
      "Mongoose",
      "MongoDB",
      "PCAP parsing",
      "DPI",
    ],
    techStack: [
      {
        label: "Lab UI",
        summary: "Capture intake, a traffic preview and a readable flow table.",
        items: ["React", "Vite", "Flow table", "Demo capture"],
      },
      {
        label: "Parser",
        summary: "The part that turns bytes into applications and domains.",
        items: ["PCAP parsing", "TLS SNI", "DNS names", "HTTP Host", "Five-tuple flows"],
      },
      {
        label: "API",
        summary: "Analysis runs, saved runs and rule snapshots.",
        items: ["Express", "Mongoose", "Rule snapshots"],
      },
      {
        label: "Data",
        summary: "Every analysis keeps the rules that were active when it ran.",
        items: ["MongoDB", "Saved analyses", "Blocked state"],
      },
      {
        label: "Reference",
        summary: "The original C++ engine remains in the repository for comparison.",
        items: ["C++ DPI engine", "Sample captures"],
      },
    ],
    highlights: [
      "Classic PCAP parsing across little and big endian captures, microsecond and nanosecond timestamps, VLAN tags, and raw IP.",
      "Application identification from TLS ClientHello SNI, DNS query names, and HTTP Host headers.",
      "Five-tuple flow aggregation with packet and byte counts, domains, applications, and blocked state.",
      "Saved analyses keep a snapshot of the blocking rules that were active at the time.",
      "A synthetic demo capture makes the lab explorable without uploading a private packet trace.",
    ],
    contextNote:
      "The browser implementation rebuilds an earlier DPI project. Its original C++ engine and sample captures remain in the repository.",
    repo: "https://github.com/fk219/packet-analyzer",
    demo: "https://packetanalyzer.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/packet-analyzer/home.png",
        alt: "PacketAnalyzer capture intake with PCAP upload, blocking rules, and a live traffic preview",
        width: 1425,
        height: 1000,
      },
      {
        src: "/projects/packet-analyzer/analysis.png",
        alt: "PacketAnalyzer analysis of a demo capture with application breakdown, flow counts, and blocked packets",
        width: 1425,
        height: 1000,
      },
    ],
    cover: {
      from: "#202735",
      to: "#0b0f15",
      ink: "#ffb067",
      motif: "signal",
    },
  },
  {
    slug: "mesh-pay",
    name: "MeshPay",
    shortName: "MeshPay",
    category: "Payments systems experiment",
    status: "Experiment",
    featured: false,
    tagline: "Offline payments, deferred settlement, one delivery.",
    description:
      "A simulation of how UPI-style payments could move through a Bluetooth-like mesh when the sender has no internet. Payments hop between virtual phones and settle only when a bridge device reaches the network. The lab also makes failure modes visible: duplicate storms, tampering, replays, and offline double-spend.",
    stack: [
      "React",
      "Vite",
      "Express",
      "Mongoose",
      "MongoDB",
      "AES-256-GCM",
      "RSA-OAEP",
      "Java reference",
    ],
    techStack: [
      {
        label: "Control room",
        summary: "A five-phone mesh you can watch route, stall, duplicate and settle.",
        items: ["React", "Vite", "Mesh topology", "Live ledger"],
      },
      {
        label: "Cryptography",
        summary: "Per-payment keys, sealed on the sender and opened only at settlement.",
        items: ["AES-256-GCM", "RSA-2048-OAEP", "SHA-256", "Per-hop TTL"],
      },
      {
        label: "API",
        summary: "Gossip intake, settlement and the demo failure modes.",
        items: ["Express", "Mongoose", "Idempotent settlement"],
      },
      {
        label: "Data",
        summary: "The unique index that turns a duplicate packet into the same payment.",
        items: ["MongoDB", "Ciphertext-hash key", "Unique index"],
      },
      {
        label: "Reference",
        summary: "The original Java and Spring Boot implementation stays in the repository.",
        items: ["Java", "Spring Boot", "java-reference/"],
      },
    ],
    highlights: [
      "A five-phone mesh with four offline relays and one internet bridge, using gossip and per-hop TTL.",
      "Per-payment hybrid encryption: a fresh AES-256-GCM key wrapped with RSA-2048-OAEP.",
      "Idempotent settlement keyed by a SHA-256 hash of the ciphertext and enforced with a unique index.",
      "Demo actions for duplicate storms, tamper detection, replay, and insufficient funds.",
      "A preserved Java and Spring Boot reference implementation alongside the browser rebuild.",
    ],
    contextNote:
      "This is a simulation, not a connection to UPI or a bank. It also shows a real limitation: a receiver cannot verify funds offline, so an offline double-spend is possible until one packet settles.",
    repo: "https://github.com/fk219/mesh-pay",
    demo: "https://meshpay.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/mesh-pay/home.png",
        alt: "MeshPay control room with settled volume, ledger accounts, and a payment ready to seal",
        width: 1425,
        height: 1000,
      },
      {
        src: "/projects/mesh-pay/ledger.png",
        alt: "MeshPay ledger showing a settled transaction keyed by its ciphertext hash",
        width: 1425,
        height: 1000,
      },
    ],
    cover: {
      from: "#d8f1d3",
      to: "#2f7d6d",
      ink: "#12352d",
      motif: "network",
    },
  },
  {
    slug: "vector-search",
    name: "VectorSearch",
    shortName: "VectorSearch",
    category: "Vector search and RAG lab",
    status: "Experiment",
    featured: false,
    tagline: "HNSW, KD-tree, and RAG, measured against brute force.",
    description:
      "VectorSearch is a live nearest-neighbour lab and retrieval shelf. Twenty 16-dimensional vectors are projected with PCA, then HNSW, a KD-tree, and brute force are compared on the same query. Its MongoDB document library uses deterministic hash-256 embeddings and answers questions extractively, citing the passages it retrieved. The original C++ vector database remains in the repository for reference.",
    stack: [
      "React",
      "Vite",
      "Express",
      "MongoDB",
      "HNSW",
      "KD-tree",
      "PCA",
      "Render",
    ],
    techStack: [
      {
        label: "Lab UI",
        summary: "A projected vector field next to the numbers that decide the result.",
        items: ["React", "Vite", "PCA scatter", "Distance controls"],
      },
      {
        label: "Indexes",
        summary: "Three approaches to the same query, measured against each other.",
        items: ["HNSW", "KD-tree", "Brute force", "Recall benchmark"],
      },
      {
        label: "API",
        summary: "Benchmark and retrieval endpoints over the seeded library.",
        items: ["Express", "Mongoose", "Per-query timings"],
      },
      {
        label: "Data & retrieval",
        summary: "Deterministic embeddings and extractive answers that cite what they found.",
        items: ["MongoDB", "Hash-256 embeddings", "Extractive RAG", "Cited passages"],
      },
      {
        label: "Reference",
        summary: "The original C++ vector database is preserved for comparison.",
        items: ["C++ vector database", "engine/"],
      },
    ],
    highlights: [
      "Three search indexes side by side: HNSW, KD-tree, and brute force, with cosine, Euclidean, and Manhattan distance.",
      "A real recall benchmark where every demo vector is a query and recall is measured against brute force.",
      "Twenty hand-authored 16-dimensional vectors projected into two dimensions with PCA for a readable scatter plot.",
      "A MongoDB document library with 12 seeded passages and deterministic hash-256 embeddings.",
      "Extractive RAG returns cited sentences with per-query timings. No language model is called.",
    ],
    contextNote:
      "The live demo uses lexical hash-256 embeddings rather than a transformer, and the interface says so. The original C++ vector database is preserved in the repository.",
    repo: "https://github.com/fk219/vector-search",
    demo: "https://vectorsearch.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/vector-search/home.png",
        alt: "VectorSearch lab with a projected 16-dimensional scatter plot and nearest-neighbour results",
        width: 1425,
        height: 1000,
      },
      {
        src: "/projects/vector-search/answer.png",
        alt: "VectorSearch extractive answer with retrieved source passages and timings",
        width: 1425,
        height: 1000,
      },
    ],
    cover: {
      from: "#c9d6ff",
      to: "#303f74",
      ink: "#101a3c",
      motif: "vector",
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectIndex(slug: string) {
  return projects.findIndex((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string, direction: 1 | -1) {
  const index = getProjectIndex(slug);
  if (index < 0) return undefined;
  const nextIndex = (index + direction + projects.length) % projects.length;
  return projects[nextIndex];
}
