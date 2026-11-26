import { profile } from "@/data/profile";
import { careerRoles, certifications, education } from "@/data/career";
import { featuredProjects } from "@/data/projects";
import { SystemIcon } from "@/components/icons/SystemIcon";

export function ResumeSheet() {
  return (
    <article className="resume__sheet resume-print-area">
      <header className="resume__header">
        <div>
          <h2>{profile.name}</h2>
          <p>
            {profile.role} · Founder, {profile.company}
          </p>
        </div>
        <div className="resume__contact">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a
            href="https://github.com/fk219"
            target="_blank"
            rel="noreferrer"
          >
            github.com/fk219
            <SystemIcon name="external" size={9} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/fk219
            <SystemIcon name="external" size={9} />
          </a>
        </div>
      </header>

      <section className="resume__section">
        <h3>Summary</h3>
        <p>{profile.summary}</p>
      </section>

      <section className="resume__section">
        <h3>Experience</h3>
        <div className="resume__roles">
          {careerRoles
            .filter((role) => role.resume)
            .map((role) => (
              <article className="resume__role" key={role.id}>
                <div className="resume__project-title">
                  <h4>{role.role}</h4>
                  <span>{role.period}</span>
                </div>
                <p className="resume__role-org">
                  {role.organization} · {role.location}
                </p>
                <p>{role.summary}</p>
              </article>
            ))}
        </div>
      </section>

      <section className="resume__section">
        <h3>Education</h3>
        <div className="resume__education-list">
          {education.map((entry) => (
            <div key={entry.id}>
              <h4 className="resume__education-title">
                {entry.qualification}
              </h4>
              <p>
                {entry.institution} · {entry.period}
                {entry.grade ? ` · ${entry.grade}` : ""}
              </p>
            </div>
          ))}
        </div>
      </section>

      {certifications.length > 0 && (
        <section className="resume__section">
          <h3>Certifications</h3>
          <div className="resume__certifications">
            {certifications.map((certification) => (
              <div key={certification.id}>
                <strong>{certification.name}</strong>
                <span>
                  {certification.issuer} · {certification.issued}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="resume__section">
        <h3>Selected Work</h3>
        <div className="resume__projects">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="resume__project">
              <div className="resume__project-title">
                <h4>{project.name}</h4>
                <span>{project.category}</span>
              </div>
              <p>{project.tagline}</p>
              <p className="resume__project-stack">
                {project.stack.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume__section">
        <h3>Toolkit</h3>
        <dl className="resume__skills">
          {Object.entries(profile.skills).map(([group, skills]) => (
            <div key={group}>
              <dt>{group}</dt>
              <dd>{skills.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="resume__footer">
        <p>
          Full employment history, certification credentials, references, and
          project context are available on request.
        </p>
        <span>{profile.name} · PortfolioOS</span>
      </footer>
    </article>
  );
}
