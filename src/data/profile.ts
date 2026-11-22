export const profile = {
  name: "Furqan Khan",
  firstName: "Furqan",
  initials: "FK",
  role: "Full-stack developer",
  education: "Master of Computer Applications",
  email: "furqank219@gmail.com",
  headline: "I build software for the space between the database and the last pixel.",
  summary:
    "I am a full-stack developer with a Master of Computer Applications. I like taking a complicated workflow, finding the system underneath it, and building the whole path from data model to interface. My work spans commerce, healthcare, learning, network tooling, and offline payments.",
  shorterSummary:
    "Full-stack developer with an MCA, building systems that are as considered behind the API as they are on screen.",
  approach: [
    {
      title: "Model first",
      body: "I start with the shape of the data and the rules around it. When the model is honest, the interface has something solid to stand on.",
    },
    {
      title: "Build the whole path",
      body: "I work across the client, server, and database so decisions stay connected instead of turning into handoff gaps.",
    },
    {
      title: "Sweat the small states",
      body: "Empty, loading, and failure states are part of the product. They deserve the same attention as the happy path.",
    },
  ],
  skills: {
    Frontend: ["React", "TypeScript", "Next.js", "Vite", "Tailwind CSS"],
    Backend: ["Node.js", "Express", "MongoDB", "Mongoose", "Zod", "JWT"],
    Systems: [
      "REST API design",
      "Multi-tenant data",
      "PCAP analysis",
      "Applied cryptography",
      "Docker",
      "C++",
    ],
  },
  links: [
    {
      label: "Email",
      href: "mailto:furqank219@gmail.com",
      kind: "email" as const,
    },
    {
      label: "GitHub",
      href: "https://github.com/fk219",
      kind: "external" as const,
    },
  ],
  educationDetails: {
    degree: "Master of Computer Applications",
    note: "Graduate study focused on application development and the systems around it. Full academic details are available on request.",
  },
  availabilityNote:
    "The best way to start a conversation is a short note about what you are building and where I might help.",
};
