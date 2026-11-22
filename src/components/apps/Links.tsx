"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { useOS } from "@/lib/os-context";

export function Links() {
  const { openApp, openProject } = useOS();
  const repositories = projects.filter((project) => project.repo);
  const socials = [
    {
      id: "github",
      label: "GitHub",
      href: profile.socials.github,
      handle: "github.com/fk219",
      monogram: "GH",
      tone: "graphite",
      description: "Repositories, experiments, and the source behind the work.",
    },
    ...(profile.socials.linkedin
      ? [
          {
            id: "linkedin",
            label: "LinkedIn",
            href: profile.socials.linkedin,
            handle: "linkedin.com/in/fk219",
            monogram: "in",
            tone: "blue",
            description:
              "The full professional record, certifications, and experience.",
          },
        ]
      : []),
    ...(profile.socials.twitter
      ? [
          {
            id: "twitter",
            label: "X",
            href: profile.socials.twitter,
            handle: "@fk219",
            monogram: "X",
            tone: "black",
            description: "Short notes from the workbench.",
          },
        ]
      : []),
    {
      id: "fkodelabs",
      label: "FKodeLabs",
      href: profile.companyUrl,
      handle: "fkodelabs.com",
      monogram: "FK",
      tone: "paper",
      description: "The studio for web applications and intelligent automation.",
    },
    {
      id: "email",
      label: "Email",
      href: `mailto:${profile.email}`,
      handle: profile.email,
      monogram: "@",
      tone: "sky",
      description: "The fastest way to start a conversation.",
    },
  ];

  return (
    <div className="links-app">
      <div className="links-app__scroll">
        <header className="links-app__hero">
          <span className="career-app__eyebrow">CONNECT / PORTFOLIO OS</span>
          <h1>
            Find the work
            <br />
            <em>in the wild.</em>
          </h1>
          <p>
            The code, the profile, and the places to start a conversation. Every
            link opens the real destination.
          </p>
          <div className="links-app__hero-actions">
            <a
              className="os-primary-button"
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <SystemIcon name="external" size={11} />
            </a>
            <a
              className="os-secondary-button"
              href={`mailto:${profile.email}`}
            >
              Email
              <SystemIcon name="mail" size={11} />
            </a>
            <a
              className="os-secondary-button"
              href="/furqan-khan-resume.pdf"
              download
            >
              Resume PDF
              <SystemIcon name="download" size={11} />
            </a>
          </div>
        </header>

        <section className="links-app__section">
          <div className="links-app__section-heading">
            <span>01 / Profiles</span>
            <h2>Where to find me.</h2>
          </div>
          <div className="links-grid">
            {socials.map((social) => (
              <a
                key={social.id}
                className={`links-card links-card--${social.tone}`}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <span className="links-card__monogram">{social.monogram}</span>
                <span className="links-card__copy">
                  <strong>{social.label}</strong>
                  <small>{social.handle}</small>
                  <p>{social.description}</p>
                </span>
                <SystemIcon name="external" size={11} />
              </a>
            ))}
            <button
              type="button"
              className="links-card links-card--paper"
              onClick={() => openApp("mail")}
            >
              <span className="links-card__monogram">CV</span>
              <span className="links-card__copy">
                <strong>Complete profile</strong>
                <small>Resume, experience, and credentials</small>
                <p>Ask for the full professional record and references.</p>
              </span>
              <SystemIcon name="arrow-right" size={11} />
            </button>
          </div>
        </section>

        <section className="links-app__section">
          <div className="links-app__section-heading">
            <span>02 / Repositories</span>
            <h2>The source.</h2>
          </div>
          <div className="links-repos">
            {repositories.map((project) => (
              <div className="links-repo" key={project.slug}>
                <button
                  type="button"
                  className="links-repo__name"
                  onClick={() => openProject(project.slug)}
                >
                  {project.name}
                  <small>{project.category}</small>
                </button>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source
                  <SystemIcon name="external" size={10} />
                </a>
              </div>
            ))}
          </div>
        </section>

        <footer className="links-app__footer">
          <span>More profiles and credentials are available on request.</span>
          <button type="button" onClick={() => openApp("career")}>
            Open Career
            <SystemIcon name="arrow-right" size={11} />
          </button>
        </footer>
      </div>
    </div>
  );
}
