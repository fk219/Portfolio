"use client";

import { useState } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

interface Note {
  id: string;
  title: string;
  date: string;
  body: string[];
}

const notes: Note[] = [
  {
    id: "how-i-work",
    title: "How I work",
    date: "Today",
    body: [
      ...profile.approach.map(
        (item) => `${item.title}. ${item.body}`,
      ),
      "The best work happens when the data model and the interface are designed together.",
    ],
  },
  {
    id: "toolkit",
    title: "Toolkit",
    date: "Yesterday",
    body: Object.entries(profile.skills).map(
      ([group, skills]) => `${group}: ${skills.join(", ")}.`,
    ),
  },
  {
    id: "the-portfolio",
    title: "The portfolio",
    date: "Nov 22",
    body: [
      `${projects.length} projects: four case studies and three experiments.`,
      "The desktop is a working macOS-inspired environment. The phone is its iOS counterpart, with the same content and a separate home screen.",
      "Built with Next.js, React, TypeScript, hand-written CSS, and original SVG artwork.",
    ],
  },
];

export function IOSNotesApp() {
  const [selected, setSelected] = useState<Note | null>(null);

  if (selected) {
    return (
      <div className="ios-app-view ios-notes">
        <div className="ios-app-view__scroll">
          <header className="ios-project-detail__bar">
            <button
              type="button"
              className="ios-back-button"
              onClick={() => setSelected(null)}
            >
              <SystemIcon name="chevron-left" size={18} />
              Notes
            </button>
            <span className="ios-note-date">{selected.date}</span>
          </header>
          <h1 className="ios-note-title">{selected.title}</h1>
          <div className="ios-note-body">
            {selected.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ios-app-view ios-notes">
      <div className="ios-app-view__scroll">
        <header className="ios-large-header">
          <span className="ios-eyebrow">Notes</span>
          <h1>Notes</h1>
          <p>A few things worth writing down.</p>
        </header>
        <div className="ios-note-list">
          {notes.map((note) => (
            <button
              key={note.id}
              type="button"
              className="ios-note-row"
              onClick={() => setSelected(note)}
            >
              <span>
                <strong>{note.title}</strong>
                <small>
                  {note.date} · {note.body[0]}
                </small>
              </span>
              <SystemIcon name="chevron-right" size={13} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
