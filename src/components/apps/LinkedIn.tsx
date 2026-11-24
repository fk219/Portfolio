"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { certifications, education, careerRoles } from "@/data/career";
import { profile } from "@/data/profile";
import { useOS } from "@/lib/os-context";

export function LinkedIn() {
  const { openResume, openApp } = useOS();

  return (
    <div className="linkedin-app">
      <div className="linkedin-app__topbar">
        <span className="linkedin-app__logo">in</span>
        <span className="linkedin-app__wordmark">LinkedIn</span>
        <span className="linkedin-app__snapshot">
          <SystemIcon name="shield" size={10} />
          Profile snapshot
        </span>
        <div className="linkedin-app__top-actions">
          <button type="button" onClick={openResume}>
            <SystemIcon name="document" size={12} />
            Resume
          </button>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
            Open LinkedIn
            <SystemIcon name="external" size={11} />
          </a>
        </div>
      </div>

      <div className="linkedin-app__scroll">
        <div className="linkedin-app__cover" aria-hidden="true">
          <span>FURQAN / KHAN</span>
          <span>DUBAI · BUILDING SYSTEMS</span>
        </div>

        <header className="linkedin-app__profile">
          <span className="linkedin-app__avatar">FK</span>
          <div className="linkedin-app__identity">
            <h2>{profile.name}</h2>
            <p>{profile.headline}</p>
            <span>
              {profile.location} ·{" "}
              <button type="button" onClick={() => openApp("mail")}>
                Contact info
              </button>
            </span>
            <span className="linkedin-app__open">
              <i aria-hidden="true" />
              Open to work · on-site, hybrid, remote
            </span>
          </div>
          <div className="linkedin-app__profile-actions">
            <a
              className="linkedin-app__primary"
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              Open profile
              <SystemIcon name="external" size={11} />
            </a>
            <button type="button" onClick={() => openApp("github")}>
              <SystemIcon name="branch" size={12} />
              GitHub
            </button>
          </div>
        </header>

        <div className="linkedin-app__grid">
          <main className="linkedin-app__main">
            <section className="linkedin-app__card">
              <span className="linkedin-app__eyebrow">About</span>
              <p>{profile.summary}</p>
              <p className="linkedin-app__note">
                This is a curated snapshot rendered from the same data as the
                resume. Open LinkedIn for the live profile and activity.
              </p>
            </section>

            <section className="linkedin-app__card">
              <span className="linkedin-app__eyebrow">Experience</span>
              <div className="linkedin-app__timeline">
                {careerRoles.map((role) => (
                  <article key={role.id} className="linkedin-app__role">
                    <span className="linkedin-app__role-mark">
                      {role.organization.slice(0, 1)}
                    </span>
                    <div>
                      <h3>{role.role}</h3>
                      <strong>
                        {role.organization} · {role.employmentType}
                      </strong>
                      <small>
                        {role.period} · {role.location}
                      </small>
                      <p>{role.summary}</p>
                      <ul>
                        {role.highlights.slice(0, 3).map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="linkedin-app__card">
              <span className="linkedin-app__eyebrow">Education</span>
              {education.map((entry) => (
                <div className="linkedin-app__education" key={entry.id}>
                  <span className="linkedin-app__edu-mark">M</span>
                  <div>
                    <h3>{entry.institution}</h3>
                    <p>{entry.qualification}</p>
                    <small>
                      {entry.period}
                      {entry.grade ? ` · ${entry.grade}` : ""}
                    </small>
                  </div>
                </div>
              ))}
            </section>
          </main>

          <aside className="linkedin-app__aside">
            <section className="linkedin-app__card">
              <span className="linkedin-app__eyebrow">Skills</span>
              <div className="linkedin-app__skills">
                {Object.entries(profile.skills).flatMap(([group, skills]) =>
                  skills.map((skill) => (
                    <span key={`${group}-${skill}`} title={group}>
                      {skill}
                    </span>
                  )),
                )}
              </div>
            </section>

            <section className="linkedin-app__card">
              <span className="linkedin-app__eyebrow">
                Licenses & certifications
              </span>
              <div className="linkedin-app__certs">
                {certifications.map((certification) => (
                  <div key={certification.id}>
                    <strong>{certification.name}</strong>
                    <small>
                      {certification.issuer} · {certification.issued}
                    </small>
                    {certification.credentialUrl && (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Show credential
                        <SystemIcon name="external" size={9} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="linkedin-app__card">
              <span className="linkedin-app__eyebrow">Contact</span>
              <div className="linkedin-app__contact">
                <a href={`mailto:${profile.email}`}>
                  <SystemIcon name="mail" size={12} />
                  {profile.email}
                </a>
                <a href={profile.socials.github} target="_blank" rel="noreferrer">
                  <SystemIcon name="branch" size={12} />
                  github.com/fk219
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SystemIcon name="globe" size={12} />
                  linkedin.com/in/fk219
                </a>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
