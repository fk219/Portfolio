import { ExperienceShell } from "@/components/ExperienceShell";
import { ResumeSheet } from "@/components/apps/ResumeSheet";
import { profile } from "@/data/profile";
import { featuredProjects, projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <ExperienceShell />
      <div className="print-only-resume" aria-hidden="true">
        <ResumeSheet />
      </div>
      <noscript>
        <style>{`
          .os-shell,
          .experience-loading { display: none !important; }
          .no-js-portfolio {
            min-height: 100vh;
            margin: 0;
            padding: 48px 24px;
            background: #10151d;
            color: #f5f1e8;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          .no-js-portfolio__inner { max-width: 940px; margin: 0 auto; }
          .no-js-portfolio h1 { font-size: clamp(2.5rem, 7vw, 5rem); line-height: .95; letter-spacing: -.05em; margin: 0 0 20px; }
          .no-js-portfolio p { max-width: 58ch; line-height: 1.6; color: #b9c0c8; }
          .no-js-portfolio a { color: #ffd39d; }
          .no-js-portfolio h2 { margin-top: 48px; }
          .no-js-portfolio li { margin: 10px 0; color: #d8dde2; }
        `}</style>
        <main className="no-js-portfolio">
          <div className="no-js-portfolio__inner">
            <p>PortfolioOS</p>
            <h1>{profile.name}</h1>
            <p>
              {profile.role}. {profile.education}. {profile.summary}
            </p>
            <p>
              The interactive desktop needs JavaScript. The work and contact
              details are available below.
            </p>
            <h2>Selected work</h2>
            <ul>
              {featuredProjects.map((project) => (
                <li key={project.slug}>
                  <a href={project.demo ?? project.repo}>{project.name}</a>
                  : {project.tagline}
                </li>
              ))}
            </ul>
            <h2>All projects</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.slug}>
                  <a href={project.demo ?? project.repo}>{project.name}</a> ·{" "}
                  {project.category}
                </li>
              ))}
            </ul>
            <h2>Contact</h2>
            <p>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              {" · "}
              <a href="https://github.com/fk219">GitHub</a>
            </p>
          </div>
        </main>
      </noscript>
    </>
  );
}

