"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { careerRoles, certifications, education, experienceNote } from "@/data/career";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { useOS } from "@/lib/os-context";

export function Career() {
  const { openApp, openProject, openResume } = useOS();

  return (
    <div className="career-app">
      <div className="career-app__scroll">
        <header className="career-app__hero">
          <div className="career-app__hero-copy">
            <span className="career-app__eyebrow">CAREER / PORTFOLIO OS</span>
            <h1>
              Experience with
              <br />
              <em>the whole path.</em>
            </h1>
            <p>
              A full-stack practice built across commerce, healthcare, learning,
              books, and systems. The work, the study, and the credentials
              behind the portfolio.
            </p>
            <div className="career-app__actions">
              <button
                type="button"
                className="os-primary-button"
                onClick={openResume}
              >
                Open resume
                <SystemIcon name="document" size={12} />
              </button>
              <a
                className="os-secondary-button"
                href="/furqan-khan-resume.pdf"
                download
              >
                Download PDF
                <SystemIcon name="download" size={12} />
              </a>
              <a
                className="career-app__mail"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
            </div>
          </div>
          <aside className="career-app__stats" aria-label="Career at a glance">
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
          </aside>
        </header>

        <section className="career-app__section">
          <div className="career-app__section-heading">
            <span>01 / Experience</span>
            <h2>The practice.</h2>
          </div>
          <div className="career-timeline">
            {careerRoles.map((role) => (
              <article className="career-timeline__item" key={role.id}>
                <div className="career-timeline__marker">
                  <span className={role.current ? "is-current" : ""} />
                </div>
                <div className="career-timeline__copy">
                  <span className="career-timeline__period">
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

        <section className="career-app__section career-app__section--split">
          <div>
            <div className="career-app__section-heading">
              <span>02 / Credentials</span>
              <h2>Certifications.</h2>
            </div>
            {certifications.length > 0 ? (
              <div className="career-certifications">
                {certifications.map((certification) => (
                  <a
                    key={certification.id}
                    className="career-certification"
                    href={certification.credentialUrl ?? `mailto:${profile.email}`}
                    target={certification.credentialUrl ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    <span className="career-certification__icon">
                      <SystemIcon name="check" size={14} />
                    </span>
                    <span>
                      <strong>{certification.name}</strong>
                      <small>
                        {certification.issuer} · {certification.issued}
                      </small>
                    </span>
                    <SystemIcon name="external" size={10} />
                  </a>
                ))}
              </div>
            ) : (
              <div className="career-credentials">
                <span className="career-credentials__mark">A</span>
                <div>
                  <h3>Credentials available on request</h3>
                  <p>
                    Certification names, issuers, and verification links can be
                    shared with the complete professional record.
                  </p>
                  <button
                    type="button"
                    className="os-text-button"
                    onClick={() => openApp("mail")}
                  >
                    Request the credential list
                    <SystemIcon name="arrow-right" size={11} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="career-app__section-heading">
              <span>03 / Education</span>
              <h2>The foundation.</h2>
            </div>
            <div className="career-education-list">
              {education.map((entry) => (
                <div className="career-education" key={entry.id}>
                  <span className="career-education__icon">
                    <SystemIcon name="document" size={18} />
                  </span>
                  <div>
                    <h3>{entry.qualification}</h3>
                    <p>
                      {entry.institution} · {entry.period}
                      {entry.grade ? ` · ${entry.grade}` : ""}
                    </p>
                    <p>{entry.summary}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="career-app__manual">
              <span>Selected systems</span>
              <div>
                {projects.slice(0, 4).map((project) => (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => openProject(project.slug)}
                  >
                    {project.name}
                    <SystemIcon name="arrow-right" size={10} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="career-app__footer">
          <span>{profile.name} · Portfolio OS</span>
          <span>{experienceNote}</span>
        </footer>
      </div>
    </div>
  );
}
