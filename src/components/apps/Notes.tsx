"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { profile } from "@/data/profile";
import { featuredProjects, projects } from "@/data/projects";
import { copyText } from "@/lib/clipboard";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";

interface PortfolioNote {
  id: string;
  title: string;
  meta: string;
  paragraphs: string[];
  bullets?: string[];
  checklist?: Array<{ id: string; label: string }>;
  links?: Array<{ label: string; href: string; external?: boolean }>;
  pinned?: boolean;
  action?: {
    label: string;
    app: "finder" | "safari" | "mail" | "terminal" | "resume";
  };
}

const notes: PortfolioNote[] = [
  {
    id: "start-here",
    title: "Start here",
    meta: "A map of this desktop",
    pinned: true,
    paragraphs: [
      "This portfolio is built as a small operating system. The work is in Finder, the story is in Safari, and the quickest route anywhere is Spotlight.",
    ],
    checklist: [
      { id: "projects", label: "Open a project from Finder" },
      { id: "spotlight", label: "Search the desktop with ⌘K or Ctrl K" },
      { id: "terminal", label: "Ask the Terminal for a tour" },
      { id: "contact", label: "Send a note through Mail" },
    ],
  },
  {
    id: "hello",
    title: "Hello, I'm Furqan",
    meta: "About",
    paragraphs: [
      "Full-stack developer with a Master of Computer Applications. I build products across the data model, the API, and the interface, with a bias toward systems that make their rules visible.",
      "The projects in this portfolio are real, with source and live demos where available. The desktop around them is a way to look around rather than a pitch deck with a background image.",
    ],
    action: { label: "Read the full about page", app: "safari" },
  },
  {
    id: "how-i-work",
    title: "How I work",
    meta: "Principles",
    paragraphs: [
      "Good product decisions usually start below the interface. I like to understand the constraints first, then build outward.",
    ],
    bullets: profile.approach.map(
      (approach) => `${approach.title}: ${approach.body}`,
    ),
    action: { label: "Open selected work", app: "finder" },
  },
  {
    id: "toolkit",
    title: "Toolkit",
    meta: "Tools and systems",
    paragraphs: [
      "The stack changes with the problem. These are the tools that show up most often across the work here.",
    ],
    bullets: Object.entries(profile.skills).map(
      ([group, skills]) => `${group}: ${skills.join(", ")}`,
    ),
  },
  {
    id: "education",
    title: "Education",
    meta: "Background",
    paragraphs: [
      profile.education,
      profile.educationDetails.note,
    ],
  },
  {
    id: "find-me",
    title: "Find me",
    meta: "Contact",
    paragraphs: [
      profile.availabilityNote,
      "Email is the most direct route. GitHub has the source for every project shown in Finder.",
    ],
    links: [
      {
        label: profile.email,
        href: `mailto:${profile.email}`,
      },
      {
        label: "github.com/fk219",
        href: "https://github.com/fk219",
        external: true,
      },
      {
        label: "View resume",
        href: "#resume-note",
      },
    ],
    action: { label: "Open Mail", app: "mail" },
  },
];

export function Notes() {
  const { openApp, openResume } = useOS();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(notes[0].id);
  const [checked, setChecked] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState("");
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    };
  }, []);

  const filteredNotes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return notes;
    return notes.filter((note) =>
      [
        note.title,
        note.meta,
        ...note.paragraphs,
        ...(note.bullets ?? []),
        ...(note.checklist?.map((item) => item.label) ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const selected =
    notes.find((note) => note.id === selectedId) ?? filteredNotes[0] ?? notes[0];

  useEffect(() => {
    if (filteredNotes.length > 0 && !filteredNotes.some((note) => note.id === selectedId)) {
      setSelectedId(filteredNotes[0].id);
    }
  }, [filteredNotes, selectedId]);

  const runAction = () => {
    if (!selected.action) return;
    if (selected.action.app === "resume") {
      openResume();
      return;
    }
    if (selected.action.app === "safari") {
      openApp("safari", { section: "about" });
      return;
    }
    openApp(selected.action.app);
  };

  const handleCopy = async () => {
    const lines = [
      selected.title,
      ...selected.paragraphs,
      ...(selected.bullets ?? []),
      ...(selected.checklist?.map(
        (item) => `[${checked.includes(item.id) ? "x" : " "}] ${item.label}`,
      ) ?? []),
    ];
    const copied = await copyText(lines.join("\n\n"));
    setCopyStatus(copied ? "Copied" : "Copy unavailable");
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopyStatus(""), 2200);
  };

  const toggleChecklist = (id: string) => {
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const getSnippet = (note: PortfolioNote) =>
    note.paragraphs[0].slice(0, 64).trimEnd();

  return (
    <div className="notes">
      <aside className="notes__sidebar" aria-label="Notes sidebar">
        <div className="notes__sidebar-top">
          <span className="notes__folder">
            <SystemIcon name="folder" size={14} />
            Portfolio
          </span>
          <span className="notes__count">{notes.length}</span>
        </div>
        <div className="notes__search">
          <SystemIcon name="search" size={12} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search notes"
            aria-label="Search notes"
          />
        </div>
        <nav className="notes__list" aria-label="Notes">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <button
                key={note.id}
                type="button"
                className={`notes__list-item ${
                  note.id === selected.id ? "is-selected" : ""
                }`}
                onClick={() => setSelectedId(note.id)}
              >
                <span className="notes__list-title">
                  {note.pinned && (
                    <SystemIcon name="pin" size={10} aria-label="Pinned" />
                  )}
                  {note.title}
                </span>
                <span className="notes__list-meta">{note.meta}</span>
                <span className="notes__list-snippet">{getSnippet(note)}</span>
              </button>
            ))
          ) : (
            <div className="notes__list-empty">
              <p>No notes match “{query}”.</p>
              <button
                type="button"
                className="os-text-button"
                onClick={() => setQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
        </nav>
      </aside>

      <section className="notes__editor" aria-label={`Note: ${selected.title}`}>
        <div className="notes__toolbar">
          <span className="notes__toolbar-status">
            {selected.meta}
            <span className="notes__toolbar-dot" aria-hidden="true" />
            {notes.length} notes
          </span>
          <div className="notes__toolbar-actions">
            <span className="notes__copy-status" aria-live="polite">
              {copyStatus}
            </span>
            <button
              type="button"
              className="notes__tool"
              onClick={handleCopy}
              aria-label="Copy this note"
              title="Copy note"
            >
              <SystemIcon name="copy" size={14} />
            </button>
          </div>
        </div>

        <div className="notes__paper">
          <div className="notes__paper-inner">
            <span className="notes__kicker">{selected.meta}</span>
            <h2>{selected.title}</h2>
            <div className="notes__body">
              {selected.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {selected.checklist && (
                <ul className="notes__checklist">
                  {selected.checklist.map((item) => {
                    const isChecked = checked.includes(item.id);
                    return (
                      <li key={item.id}>
                        <label className="notes__check-row">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleChecklist(item.id)}
                          />
                          <span>{item.label}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}

              {selected.links && (
                <div className="notes__links">
                  {selected.links.map((link) =>
                    link.href === "#resume-note" ? (
                      <button
                        key={link.label}
                        type="button"
                        className="notes__link"
                        onClick={openResume}
                      >
                        {link.label}
                        <SystemIcon name="arrow-right" size={12} />
                      </button>
                    ) : (
                      <a
                        key={link.label}
                        className="notes__link"
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer" : undefined}
                      >
                        {link.label}
                        <SystemIcon
                          name={link.external ? "external" : "arrow-right"}
                          size={11}
                        />
                      </a>
                    ),
                  )}
                </div>
              )}

              {selected.bullets && (
                <ul className="notes__bullets">
                  {selected.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}

              {selected.action && (
                <button
                  type="button"
                  className="os-secondary-button notes__action"
                  onClick={runAction}
                >
                  {selected.action.label}
                  <SystemIcon name="arrow-right" size={12} />
                </button>
              )}
            </div>
            <footer className="notes__footer">
              <span>
                {featuredProjects.length} case studies · {projects.length} projects
              </span>
              <span>PortfolioOS</span>
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
}
