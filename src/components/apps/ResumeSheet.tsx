import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { SystemIcon } from "@/components/icons/SystemIcon";

export function ResumeSheet() {
  return (
    <article className="resume__sheet resume-print-area">
      <header className="resume__header">
        <div>
          <h2>{profile.name}</h2>
          <p>
            {profile.role} · {profile.education}
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
        </div>
      </header>

      <section className="resume__section">
        <h3>Summary</h3>
        <p>{profile.summary}</p>
      </section>

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

      <div className="resume__two-column">
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

        <section className="resume__section">
          <h3>Education</h3>
          <h4 className="resume__education-title">
            {profile.educationDetails.degree}
          </h4>
          <p>{profile.educationDetails.note}</p>
        </section>
      </div>

      <footer className="resume__footer">
        <p>
          Full academic details, references, and project context are
          available on request.
        </p>
        <span>{profile.name} · Portfolio OS</span>
      </footer>
    </article>
  );
}
