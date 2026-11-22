"use client";

import Image from "next/image";
import { getProject, getAdjacentProject, projects } from "@/data/projects";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { ProjectArtwork } from "./ProjectArtwork";

interface ProjectViewProps {
  slug?: string;
}

export function ProjectView({ slug }: ProjectViewProps) {
  const { openProject, openApp } = useOS();
  const project = slug ? getProject(slug) : undefined;

  if (!project) {
    return (
      <div className="project-view project-view--missing">
        <SystemIcon name="folder" size={26} />
        <h2>Project not found</h2>
        <p>This window does not have a project attached to it.</p>
        <button
          type="button"
          className="os-primary-button"
          onClick={() => openApp("finder")}
        >
          Open Finder
        </button>
      </div>
    );
  }

  const previous = getAdjacentProject(project.slug, -1);
  const next = getAdjacentProject(project.slug, 1);
  const projectNumber = projects.findIndex(
    (candidate) => candidate.slug === project.slug,
  ) + 1;

  return (
    <div className="project-view">
      <div className="project-view__toolbar">
        <button
          type="button"
          className="project-view__back"
          onClick={() => openApp("finder", { section: "projects" })}
        >
          <SystemIcon name="chevron-left" size={15} />
          All projects
        </button>
        <span className="project-view__index">
          {String(projectNumber).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
        <div className="project-view__toolbar-links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Live site
              <SystemIcon name="external" size={11} />
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer">
              Source
              <SystemIcon name="external" size={11} />
            </a>
          )}
        </div>
      </div>

      <div className="project-view__scroll">
        <header className="project-view__hero">
          <div className="project-view__intro">
            <div className="project-view__meta">
              <span className={`project-view__status project-view__status--${project.status === "Case study" ? "study" : "experiment"}`}>
                {project.status}
              </span>
              <span>{project.category}</span>
            </div>
            <h2>{project.name}</h2>
            <p className="project-view__tagline">{project.tagline}</p>
            <div className="project-view__hero-actions">
              {project.demo && (
                <a
                  className="os-primary-button"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit live project
                  <SystemIcon name="external" size={12} />
                </a>
              )}
              {project.adminDemo && (
                <a
                  className="os-secondary-button"
                  href={project.adminDemo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open admin demo
                  <SystemIcon name="external" size={11} />
                </a>
              )}
              {!project.demo && project.repo && (
                <a
                  className="os-primary-button"
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore source
                  <SystemIcon name="external" size={12} />
                </a>
              )}
            </div>
          </div>

          <div className="project-view__stack-card">
            <span className="project-view__stack-label">Built with</span>
            <div className="project-view__stack">
              {project.stack.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </header>

        <div className="project-view__media">
          {project.screenshots[0] ? (
            <a
              className="project-view__browser"
              href={project.screenshots[0].src}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open a full-size screenshot of ${project.name}`}
            >
              <div className="project-view__browser-bar" aria-hidden="true">
                <span className="browser-dot browser-dot--red" />
                <span className="browser-dot browser-dot--yellow" />
                <span className="browser-dot browser-dot--green" />
                <span className="project-view__browser-address">
                  {project.demo
                    ? project.demo.replace(/^https?:\/\//, "")
                    : project.name.toLowerCase()}
                </span>
                <SystemIcon name="external" size={11} />
              </div>
              <div className="project-view__browser-screen">
                <Image
                  src={project.screenshots[0].src}
                  alt={project.screenshots[0].alt}
                  width={project.screenshots[0].width}
                  height={project.screenshots[0].height}
                  sizes="(max-width: 940px) 100vw, 900px"
                />
              </div>
            </a>
          ) : (
            <div className="project-view__abstract">
              <ProjectArtwork project={project} />
              <span className="project-view__abstract-label">
                {project.category}
              </span>
            </div>
          )}
        </div>

        <div className="project-view__body">
          <section className="project-view__section project-view__overview">
            <span className="project-view__section-number">01</span>
            <div>
              <h3>What it is</h3>
              <p>{project.description}</p>
            </div>
          </section>

          <section className="project-view__section">
            <span className="project-view__section-number">02</span>
            <div>
              <h3>What I built</h3>
              <ul className="project-view__highlights">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>
                    <span className="project-view__bullet" aria-hidden="true">
                      <SystemIcon name="check" size={11} />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {project.contextNote && (
            <section className="project-view__note">
              <SystemIcon name="info" size={16} />
              <div>
                <h3>Worth knowing</h3>
                <p>{project.contextNote}</p>
              </div>
            </section>
          )}

          {project.screenshots.length > 1 && (
            <section className="project-view__gallery-section">
              <div className="project-view__gallery-heading">
                <span className="project-view__section-number">03</span>
                <h3>A closer look</h3>
              </div>
              <div className="project-view__gallery">
                {project.screenshots.slice(1).map((screenshot) => (
                  <a
                    key={screenshot.src}
                    href={screenshot.src}
                    target="_blank"
                    rel="noreferrer"
                    className="project-view__gallery-item"
                    aria-label={`Open a full-size screenshot of ${project.name}`}
                  >
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={screenshot.width}
                      height={screenshot.height}
                      sizes="(max-width: 940px) 100vw, 440px"
                    />
                    <span className="project-view__gallery-zoom">
                      <SystemIcon name="external" size={12} />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        <footer className="project-view__footer">
          <div>
            <span className="project-view__footer-label">Previous</span>
            {previous && (
              <button
                type="button"
                onClick={() => openProject(previous.slug)}
              >
                {previous.name}
              </button>
            )}
          </div>
          <div className="project-view__footer-center">
            <span aria-hidden="true">FK</span>
          </div>
          <div className="project-view__footer-next">
            <span className="project-view__footer-label">Next</span>
            {next && (
              <button type="button" onClick={() => openProject(next.slug)}>
                {next.name}
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

