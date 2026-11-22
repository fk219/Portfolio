"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { profile } from "@/data/profile";

export function IOSProfileApp({
  onOpenCareer,
  onOpenContact,
}: {
  onOpenCareer: () => void;
  onOpenContact: () => void;
}) {
  return (
    <div className="ios-app-view">
      <div className="ios-app-view__scroll">
        <header className="ios-large-header">
          <span className="ios-eyebrow">About</span>
          <h1>Profile</h1>
          <p>The person behind the systems.</p>
        </header>

        <section className="ios-profile-hero">
          <span className="ios-profile-hero__avatar">FK</span>
          <div>
            <h2>{profile.name}</h2>
            <p>
              Founder, {profile.company} · {profile.role}
            </p>
            <span>{profile.location}</span>
          </div>
          <span className="ios-availability">
            <i aria-hidden="true" />
            Open to work
          </span>
        </section>

        <section className="ios-group">
          <h2>About</h2>
          <p className="ios-body-copy">{profile.summary}</p>
        </section>

        <section className="ios-group">
          <h2>How I work</h2>
          <div className="ios-principles">
            {profile.approach.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ios-group">
          <h2>Toolkit</h2>
          {Object.entries(profile.skills).map(([group, skills]) => (
            <div className="ios-skill-row" key={group}>
              <span>{group}</span>
              <div>
                {skills.map((skill) => (
                  <small key={skill}>{skill}</small>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="ios-group ios-group--list">
          <h2>Background</h2>
          <button type="button" className="ios-list-row" onClick={onOpenCareer}>
            <span className="ios-list-row__icon ios-list-row__icon--orange">
              <SystemIcon name="document" size={16} />
            </span>
            <span>
              <strong>Experience &amp; certifications</strong>
              <small>Timeline, credentials, and education</small>
            </span>
            <SystemIcon name="chevron-right" size={14} />
          </button>
          <a
            className="ios-list-row"
            href="/furqan-khan-resume.pdf"
            download
          >
            <span className="ios-list-row__icon ios-list-row__icon--blue">
              <SystemIcon name="download" size={16} />
            </span>
            <span>
              <strong>Download resume</strong>
              <small>Full PDF resume</small>
            </span>
            <SystemIcon name="chevron-right" size={14} />
          </a>
        </section>

        <section className="ios-group">
          <h2>Contact</h2>
          <div className="ios-contact-actions">
            <a
              href={`mailto:${profile.email}`}
              className="ios-contact-pill"
            >
              <SystemIcon name="mail" size={14} />
              Email
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="ios-contact-pill"
            >
              GitHub
              <SystemIcon name="external" size={11} />
            </a>
            <button type="button" className="ios-contact-pill" onClick={onOpenContact}>
              All links
              <SystemIcon name="chevron-right" size={12} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
