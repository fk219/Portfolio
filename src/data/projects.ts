export type ProjectMotif =
  | "books"
  | "layers"
  | "cross"
  | "path"
  | "signal"
  | "network"
  | "vector";

export type ProjectStatus = "Case study" | "Experiment";

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
      "Hooked on Cakes is a full-stack shop for celebration cakes with a storefront for customers and a separate dashboard for the owner. Customers can configure a cake, check out through Razorpay, leave a review, and track an order. The admin app handles products, inventory, orders, users, and revenue.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "GSAP",
      "Express",
      "Mongoose",
      "MongoDB",
      "Razorpay",
      "Cloudinary",
    ],
    highlights: [
      "A storefront with product search and filtering, cart, checkout, order history, profiles, addresses, and reviews.",
      "Razorpay order creation and server-side payment verification.",
      "An atelier cake configurator for size, flavour, finish, and inscription.",
      "A separate admin dashboard for revenue and order charts, product CRUD, inventory, order status, and customers.",
      "Cloudinary image uploads and transactional email notifications behind the shop.",
    ],
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
        alt: "Hooked on Cakes atelier with size, flavour, and finish controls beside a live cake preview",
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
    slug: "packet-lab",
    name: "Packet Lab",
    shortName: "Packet Lab",
    category: "Network analysis lab",
    status: "Experiment",
    featured: false,
    tagline: "Deep packet inspection, in plain sight.",
    description:
      "Packet Lab is a browser-based PCAP analysis lab. It parses packet captures, identifies applications and domains, aggregates traffic into flows, and applies DPI-style blocking rules. The project is a MERN rebuild of an earlier C++ packet-inspection engine, which is preserved in the repository.",
    stack: [
      "React",
      "Vite",
      "Express",
      "Mongoose",
      "MongoDB",
      "PCAP parsing",
      "DPI",
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
    repo: "https://github.com/fk219/Packet_Analyzer",
    demo: "https://packetlab.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/packet-lab/home.png",
        alt: "Packet Lab capture intake with PCAP upload, blocking rules, and a live traffic preview",
        width: 1425,
        height: 1000,
      },
      {
        src: "/projects/packet-lab/analysis.png",
        alt: "Packet Lab analysis of a demo capture with application breakdown, flow counts, and blocked packets",
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
    slug: "upi-offline-mesh",
    name: "UPI Offline Mesh",
    shortName: "UPI Mesh",
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
    highlights: [
      "A five-phone mesh with four offline relays and one internet bridge, using gossip and per-hop TTL.",
      "Per-payment hybrid encryption: a fresh AES-256-GCM key wrapped with RSA-2048-OAEP.",
      "Idempotent settlement keyed by a SHA-256 hash of the ciphertext and enforced with a unique index.",
      "Demo actions for duplicate storms, tamper detection, replay, and insufficient funds.",
      "A preserved Java and Spring Boot reference implementation alongside the browser rebuild.",
    ],
    contextNote:
      "This is a simulation, not a connection to UPI or a bank. It also shows a real limitation: a receiver cannot verify funds offline, so an offline double-spend is possible until one packet settles.",
    repo: "https://github.com/fk219/UPI_Without_Internet",
    demo: "https://upimesh.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/upi-offline-mesh/home.png",
        alt: "UPI Offline Mesh control room with settled volume, ledger accounts, and a payment ready to seal",
        width: 1425,
        height: 1000,
      },
      {
        src: "/projects/upi-offline-mesh/ledger.png",
        alt: "UPI Offline Mesh ledger showing a settled transaction keyed by its ciphertext hash",
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
    slug: "vector-field",
    name: "Vector Field",
    shortName: "Vector Field",
    category: "Vector search and RAG lab",
    status: "Experiment",
    featured: false,
    tagline: "HNSW, KD-tree, and RAG, measured against brute force.",
    description:
      "Vector Field is a live nearest-neighbour lab and retrieval shelf. Twenty 16-dimensional vectors are projected with PCA, then HNSW, a KD-tree, and brute force are compared on the same query. Its MongoDB document library uses deterministic hash-256 embeddings and answers questions extractively, citing the passages it retrieved. The original C++ vector database remains in the repository for reference.",
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
    highlights: [
      "Three search indexes side by side: HNSW, KD-tree, and brute force, with cosine, Euclidean, and Manhattan distance.",
      "A real recall benchmark where every demo vector is a query and recall is measured against brute force.",
      "Twenty hand-authored 16-dimensional vectors projected into two dimensions with PCA for a readable scatter plot.",
      "A MongoDB document library with 12 seeded passages and deterministic hash-256 embeddings.",
      "Extractive RAG returns cited sentences with per-query timings. No language model is called.",
    ],
    contextNote:
      "The live demo uses lexical hash-256 embeddings rather than a transformer, and the interface says so. The original C++ vector database is preserved in the repository.",
    repo: "https://github.com/fk219/Your-OWN-AI",
    demo: "https://vectorfield.furqankhan.dev",
    screenshots: [
      {
        src: "/projects/vector-field/home.png",
        alt: "Vector Field lab with a projected 16-dimensional scatter plot and nearest-neighbour results",
        width: 1425,
        height: 1000,
      },
      {
        src: "/projects/vector-field/answer.png",
        alt: "Vector Field extractive answer with retrieved source passages and timings",
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
