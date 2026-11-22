"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { careerRoles, certifications, education, experienceNote } from "@/data/career";
import { projects } from "@/data/projects";

export function IOSCareerApp({ onOpenLinks }: { onOpenLinks: () => void }) {
  return (
    <div className="ios-app-view ios-career">
      <div className="ios-app-view__scroll">
        <header className="ios-large-header">
          <span className="ios-eyebrow">Portfolio / Career</span>
          <h1>Experience</h1>
          <p>The practice, the study, and the work behind the systems.</p>
        </header>

        <section className="ios-career-stats">
          <div>
            <strong>{projects.length}</strong>
            <span>Projects</span>
          </div>
          <div>
            <strong>{careerRoles.length}</strong>
            <span>Roles</span>
          </div>
          <div>
            <strong>{certifications.length}</strong>
            <span>Certifications</span>
          </div>
          <div>
            <strong>MCA</strong>
            <span>Education</span>
          </div>
        </section>

        <section className="ios-group">
          <h2>Timeline</h2>
          <div className="ios-timeline">
            {careerRoles.map((role) => (
              <article className="ios-timeline__item" key={role.id}>
                <span className={`ios-timeline__dot ${role.current ? "is-current" : ""}`} />
                <div>
                  <span className="ios-timeline__period">
                    {role.period}
                    {role.current ? " · Now" : ""}
                  </span>
                  <h3>{role.role}</h3>
                  <small>{role.organization}</small>
                  <p>{role.summary}</p>
                  <ul>
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {certifications.length > 0 ? (
          <section className="ios-group">
            <h2>Certifications</h2>
            <div className="ios-cert-list">
              {certifications.map((certification) => {
                const content = (
                  <>
                    <span className="ios-cert-card__badge">
                      <SystemIcon name="check" size={15} />
                    </span>
                    <span>
                      <strong>{certification.name}</strong>
                      <small>
                        {certification.issuer} · {certification.issued}
                      </small>
                    </span>
                    {certification.credentialUrl && (
                      <SystemIcon name="external" size={12} />
                    )}
                  </>
                );

                return certification.credentialUrl ? (
                  <a
                    key={certification.id}
                    className="ios-cert-card"
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="ios-cert-card" key={certification.id}>
                    {content}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="ios-group">
          <h2>Education</h2>
          {education.map((entry) => (
            <div className="ios-education-card" key={entry.id}>
              <span className="ios-education-card__icon">
                <SystemIcon name="document" size={17} />
              </span>
              <div>
                <strong>{entry.qualification}</strong>
                <p>
                  {entry.institution} · {entry.period}
                  {entry.grade ? ` · ${entry.grade}` : ""}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="ios-group">
          <h2>Credentials &amp; contact</h2>
          <p className="ios-body-copy">{experienceNote}</p>
          <div className="ios-career-actions">
            <button
              type="button"
              className="ios-button ios-button--secondary"
              onClick={onOpenLinks}
            >
              Open links
              <SystemIcon name="chevron-right" size={12} />
            </button>
            <a
              href="/furqan-khan-resume.pdf"
              download
              className="ios-button ios-button--primary"
            >
              Download resume
              <SystemIcon name="download" size={13} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
