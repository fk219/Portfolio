"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export function IOSLinksApp() {
  const links = [
    {
      id: "github",
      label: "GitHub",
      handle: "github.com/fk219",
      monogram: "GH",
      tone: "dark",
      href: profile.socials.github,
      description: "Source code, experiments, and repositories.",
    },
    ...(profile.socials.linkedin
      ? [
          {
            id: "linkedin",
            label: "LinkedIn",
            handle: "linkedin.com/in/fk219",
            monogram: "in",
            tone: "blue",
            href: profile.socials.linkedin,
            description: "Experience, certifications, and the professional record.",
          },
        ]
      : []),
    ...(profile.socials.twitter
      ? [
          {
            id: "twitter",
            label: "X",
            handle: profile.socials.twitter.replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//, "@"),
            monogram: "X",
            tone: "black",
            href: profile.socials.twitter,
            description: "Notes, work in progress, and things worth sharing.",
          },
        ]
      : []),
    {
      id: "fkodelabs",
      label: "FKodeLabs",
      handle: "fkodelabs.com",
      monogram: "FK",
      tone: "dark",
      href: profile.companyUrl,
      description: "The studio for web applications and intelligent automation.",
    },
    {
      id: "email",
      label: "Email",
      handle: profile.email,
      monogram: "@",
      tone: "sky",
      href: `mailto:${profile.email}`,
      description: "The fastest way to start a conversation.",
    },
  ];

  const repositories = projects.filter((project) => project.repo);

  return (
    <div className="ios-app-view ios-links">
      <div className="ios-app-view__scroll">
        <header className="ios-large-header">
          <span className="ios-eyebrow">Connect</span>
          <h1>Links</h1>
          <p>Find the work in the wild, or start a conversation.</p>
        </header>

        <div className="ios-link-grid">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`ios-link-card is-${link.tone}`}
            >
              <span className="ios-link-card__monogram">{link.monogram}</span>
              <span>
                <strong>{link.label}</strong>
                <small>{link.handle}</small>
                <p>{link.description}</p>
              </span>
              <SystemIcon name="external" size={12} />
            </a>
          ))}
        </div>

        <section className="ios-group ios-group--list">
          <h2>Documents</h2>
          <a
            href="/furqan-khan-resume.pdf"
            download
            className="ios-list-row"
          >
            <span className="ios-list-row__icon ios-list-row__icon--blue">
              <SystemIcon name="document" size={16} />
            </span>
            <span>
              <strong>Resume</strong>
              <small>Download the PDF resume</small>
            </span>
            <SystemIcon name="download" size={14} />
          </a>
          <a
            href="https://github.com/fk219/Portfolio"
            target="_blank"
            rel="noreferrer"
            className="ios-list-row"
          >
            <span className="ios-list-row__icon ios-list-row__icon--dark">
              <SystemIcon name="command" size={16} />
            </span>
            <span>
              <strong>Portfolio source</strong>
              <small>Built with Next.js, React, and CSS</small>
            </span>
            <SystemIcon name="external" size={12} />
          </a>
        </section>

        <section className="ios-group">
          <h2>Repositories</h2>
          <div className="ios-repo-list">
            {repositories.map((project) => (
              <a
                key={project.slug}
                href={project.repo}
                target="_blank"
                rel="noreferrer"
              >
                <span>{project.name}</span>
                <small>{project.category}</small>
                <SystemIcon name="external" size={11} />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
