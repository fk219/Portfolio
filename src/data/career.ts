export interface CareerRole {
  id: string;
  period: string;
  role: string;
  organization: string;
  employmentType: string;
  location: string;
  summary: string;
  highlights: string[];
  current?: boolean;
  resume?: boolean;
}

export interface EducationEntry {
  id: string;
  period: string;
  qualification: string;
  institution: string;
  grade?: string;
  summary: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
}

export const careerRoles: CareerRole[] = [
  {
    id: "fkodelabs",
    period: "Oct 2025 – Present",
    role: "Founder",
    organization: "FKodeLabs",
    employmentType: "Freelance",
    location: "Dubai, UAE · Remote",
    current: true,
    resume: true,
    summary:
      "Founded a studio for high-performance web applications and intelligent automation. The portfolio's full-stack systems and this operating-system experience are part of that practice.",
    highlights: [
      "Built web applications with React, Next.js, Node.js, and modern data layers.",
      "Implemented AI workflows with OpenAI, LangChain, and Google ADK to automate operations.",
      "Led product work from scope and architecture through interface and deployment.",
    ],
  },
  {
    id: "danube",
    period: "Aug 2024 – Present",
    role: "Lead + Community Management Specialist — AI & Marketing Intelligence",
    organization: "Danube Properties",
    employmentType: "Full-time",
    location: "Dubai, UAE · On-site",
    current: true,
    resume: true,
    summary:
      "Lead AI and marketing intelligence across lead management, CRM operations, messaging, and process automation for a Dubai real-estate developer.",
    highlights: [
      "Integrated digital, CRM, and social leads into one workflow, improving follow-up speed and conversion.",
      "Automated WhatsApp and email journeys with Gupshup, Engati, MoEngage, and n8n.",
      "Built an AI-powered Telegram lead bot and a custom full-stack form that syncs to Google Sheets.",
      "Centralized social responses, CRM reporting, and campaign coordination for marketing, sales, and customer service.",
    ],
  },
  {
    id: "prepinsta-fullstack",
    period: "Jun 2024 – Sep 2024",
    role: "Full-stack Developer",
    organization: "PrepInsta",
    employmentType: "Internship",
    location: "India · Remote",
    resume: true,
    summary:
      "Built responsive application interfaces and connected them to Node.js, Express, and MongoDB back ends in an agile training environment.",
    highlights: [
      "Developed web applications with HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.",
      "Shipped training projects end to end while working with mentors and peers.",
    ],
  },
  {
    id: "prepinsta-python",
    period: "Mar 2024 – May 2024",
    role: "Python Developer",
    organization: "PrepInsta",
    employmentType: "Internship",
    location: "India · Remote",
    resume: false,
    summary:
      "Built Python projects and web scrapers, including games, a portfolio, and a Netflix clone.",
    highlights: [
      "Worked with Python, Flask, and BeautifulSoup.",
      "Focused on clean, documented implementations and practical problem solving.",
    ],
  },
  {
    id: "teleperformance",
    period: "Jul 2023 – Apr 2024",
    role: "Fraud Operations Analyst — Banking Operations",
    organization: "Teleperformance",
    employmentType: "Full-time",
    location: "Mumbai, India · On-site",
    resume: true,
    summary:
      "Worked on fraud prevention for Chime Bank through non-voice banking operations, investigating suspicious activity and resolving cases.",
    highlights: [
      "Analyzed fraud scenarios and helped reduce fraudulent transactions.",
      "Trained new team members and maintained clear, timely case documentation.",
    ],
  },
  {
    id: "firstsource",
    period: "Jan 2022 – Dec 2022",
    role: "Technical Support Specialist",
    organization: "Firstsource",
    employmentType: "Full-time",
    location: "Mumbai, India · Hybrid",
    resume: true,
    summary:
      "Supported Comcast and Xfinity customers through chat, resolving technical and billing issues while maintaining service quality.",
    highlights: [
      "Troubleshot connectivity and account issues across a high-volume support queue.",
      "Identified customer needs and recommended additional services.",
    ],
  },
  {
    id: "total-reqcoll",
    period: "May 2020 – Aug 2021",
    role: "Collection Executive",
    organization: "Total Reqcoll",
    employmentType: "Full-time",
    location: "Mira Bhayandar, India · On-site",
    resume: false,
    summary:
      "Handled RBL credit-card recovery and customer service by phone, including repayment planning and dispute resolution.",
    highlights: [
      "Negotiated repayment plans and settlements for overdue accounts.",
      "Resolved customer complaints while maintaining service quality.",
    ],
  },
  {
    id: "epicenter",
    period: "Oct 2018 – Feb 2019",
    role: "Customer Service Representative — Voice",
    organization: "Epicenter",
    employmentType: "Part-time",
    location: "Mira Bhayandar, India · On-site",
    resume: false,
    summary:
      "Supported LG showroom dealers with product information, troubleshooting, and timely issue resolution.",
    highlights: [
      "Worked directly with the LG team on dealer concerns.",
      "Maintained customer satisfaction through clear communication.",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    id: "mca",
    period: "Jan 2022 – May 2024",
    qualification: "Master of Computer Applications — MCA",
    institution: "Manipal University Jaipur",
    grade: "8.38 / 10",
    summary:
      "Computer software engineering, databases, operating systems, web technologies, Java, algorithms, cryptography, and a major project.",
  },
  {
    id: "bsc",
    period: "Jul 2018 – Jul 2021",
    qualification: "B.Sc. Information Technology",
    institution: "Reena Mehta College",
    grade: "7.2 CGPI",
    summary:
      "Programming, networks, databases, Python, Java, software engineering, IoT, security, business intelligence, and enterprise systems.",
  },
];

/**
 * Certifications listed on Furqan's LinkedIn profile. Credential links open
 * the issuer's verification page where a public URL is available.
 */
export const certifications: Certification[] = [
  {
    id: "javascript-es6",
    name: "JavaScript ES6",
    issuer: "PrepInsta",
    issued: "May 2026",
    credentialId: "69f4bde77a51d9dcd1485479",
    credentialUrl: "https://certifications.prepinstaprime.com/verify/",
    skills: ["JavaScript", "ES6"],
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    issuer: "PrepInsta",
    issued: "May 2026",
    credentialId: "69f4bdd47a51d9dcd1485478",
    credentialUrl: "https://certifications.prepinstaprime.com/verify/",
    skills: ["Generative AI", "Retrieval-Augmented Generation"],
  },
  {
    id: "google-project-execution",
    name: "Project Execution: Running the Project",
    issuer: "Google · Coursera",
    issued: "May 2026",
    credentialId: "KA6Q05MQURK8",
    credentialUrl: "https://coursera.org/verify/KA6Q05MQURK8",
    skills: ["Project Management", "Quality Management", "Data Storytelling"],
  },
  {
    id: "google-project-planning",
    name: "Project Planning: Putting It All Together",
    issuer: "Google · Coursera",
    issued: "Apr 2026",
    credentialId: "VOKM900GI7O0",
    credentialUrl: "https://coursera.org/verify/VOKM900GI7O0",
    skills: ["Project Planning", "Risk Management", "Budgeting"],
  },
  {
    id: "google-project-initiation",
    name: "Project Initiation: Starting a Successful Project",
    issuer: "Google · Coursera",
    issued: "Apr 2026",
    credentialId: "5RKCIDDWPIAU",
    credentialUrl: "https://coursera.org/verify/5RKCIDDWPIAU",
    skills: ["Project Initiation", "Stakeholder Management", "Project Charters"],
  },
  {
    id: "scaler-prompt-to-prototype",
    name: "Startup School: Prompt to Prototype",
    issuer: "Google × Scaler",
    issued: "Dec 2025",
    skills: ["Generative AI", "AI Prompting", "Prototyping"],
  },
  {
    id: "cbre-project-management",
    name: "CBRE — Project Management Job Simulation",
    issuer: "Forage",
    issued: "Jul 2025",
    credentialId: "z5zzQx7bHkPKzmqwL",
    credentialUrl:
      "https://www.theforage.com/completion-certificates/PDmHHPmLyCgdQWzdt/STkypM8iMfn4Gk9BF_PDmHHPmLyCgdQWzdt_dHwTnEQB3pXuvzufg_1752919284114_completion_certificate.pdf",
    skills: ["Project Management", "Risk", "Gantt Charts"],
  },
  {
    id: "mastercard-cybersecurity",
    name: "Mastercard — Cybersecurity Job Simulation",
    issuer: "Forage",
    issued: "Jan 2026",
    credentialId: "HBGn4kLE6seNLmopu",
    credentialUrl:
      "https://www.theforage.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_dHwTnEQB3pXuvzufg_1768480162093_completion_certificate.pdf",
    skills: ["Cybersecurity", "Phishing Analysis", "Security Awareness"],
  },
  {
    id: "one-million-prompters",
    name: "One Million Prompters",
    issuer: "Dubai Future Foundation",
    issued: "Dec 2025",
    credentialId: "KqpMxnWNNDun",
    credentialUrl: "https://omp.dub.ai/certificate/KqpMxnWNNDun",
    skills: ["Prompt Engineering", "Generative AI"],
  },
];

export const experienceNote =
  "Full employment history, certification credentials, and references are available on request.";
