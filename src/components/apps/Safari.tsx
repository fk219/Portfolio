"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { featuredProjects, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { ProjectArtwork } from "./ProjectArtwork";

export function Safari({ section }: { section?: string }) {
  const { openProject, openApp, openResume, isCompact } = useOS();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const [reloadKey, setReloadKey] = useState(0);
  const activeProject =
    projects.find((project) => project.slug === activeSlug) ?? projects[0];
  const previewImage = activeProject?.screenshots[0];

  useEffect(() => {
    if (!section) return;
    const targetId =
      section === "about"
        ? "safari-about"
        : section === "work"
          ? "safari-work"
          : section === "toolkit"
            ? "safari-toolkit"
            : section === "contact"
              ? "safari-contact"
              : "safari-top";
    const timer = window.setTimeout(() => {
      pageRef.current
        ?.querySelector<HTMLElement>(`#${targetId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [section]);

  const handleReload = () => {
    pageRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setReloadKey((key) => key + 1);
  };

  return (
    <div className="safari">
      <div className="safari__toolbar">
        <div className="safari__nav">
          <button
            type="button"
            className="safari__tool"
            disabled
            aria-label="Back, no browsing history"
            title="No previous page"
          >
            <SystemIcon name="chevron-left" size={17} />
          </button>
          <button
            type="button"
            className="safari__tool"
            disabled
            aria-label="Forward, no browsing history"
            title="No next page"
          >
            <SystemIcon name="chevron-right" size={17} />
          </button>
        </div>

        <div className="safari__address" role="group" aria-label="Current page">
          <SystemIcon name="lock" size={11} />
          <span>furqan.local</span>
          <button
            type="button"
            className="safari__reload"
            onClick={handleReload}
            aria-label="Reload page and return to the top"
            title="Reload"
          >
            <span
              className={`safari__reload-icon ${
                reloadKey > 0 ? "is-spinning" : ""
              }`}
              key={reloadKey}
            >
              <SystemIcon name="refresh" size={13} />
            </span>
          </button>
        </div>

        <div className="safari__toolbar-end">
          <button
            type="button"
            className="safari__resume-button"
            onClick={openResume}
          >
            <SystemIcon name="document" size={13} />
            Resume
          </button>
        </div>
      </div>

      <div className="safari__viewport" ref={pageRef}>
        <article className="safari-page">
          <header className="safari-site-header">
            <a href="#safari-top" className="safari-site-mark">
              <span>FK</span>
              <span className="safari-site-mark__text">
                Furqan Khan
                <small>Full-stack developer</small>
              </span>
            </a>
            <nav aria-label="Portfolio website">
              <a href="#safari-work">Work</a>
              <a href="#safari-about">About</a>
              <a href="#safari-toolkit">Toolkit</a>
              <a href="#safari-contact">Contact</a>
            </nav>
          </header>

          <section className="safari-hero" id="safari-top">
            <div className="safari-hero__main">
              <p className="safari-hero__eyebrow">
                Portfolio <span aria-hidden="true">/</span> 2026
              </p>
              <h2>
                Full-stack products,
                <br />
                built from the
                <br />
                <em>data model up.</em>
              </h2>
              <p className="safari-hero__intro">
                I&apos;m Furqan Khan, a full-stack developer with a Master of
                Computer Applications. I work across the API, the interface,
                and the states in between.
              </p>
              <div className="safari-hero__actions">
                <a className="safari-button safari-button--dark" href="#safari-work">
                  View the work
                  <SystemIcon name="arrow-down" size={14} />
                </a>
                <a
                  className="safari-inline-link"
                  href={`mailto:${profile.email}`}
                >
                  Email me
                  <SystemIcon name="external" size={11} />
                </a>
              </div>
            </div>

            <aside className="safari-hero__aside" aria-label="At a glance">
              <div className="safari-fact">
                <span className="safari-fact__label">Education</span>
                <span>{profile.education}</span>
              </div>
              <div className="safari-fact">
                <span className="safari-fact__label">Focus</span>
                <span>Full-stack systems and interface craft</span>
              </div>
              <div className="safari-fact">
                <span className="safari-fact__label">Projects</span>
                <span>
                  {projects.length} shipped · {featuredProjects.length} case
                  studies
                </span>
              </div>
              <div className="safari-hero__aside-footer">
                <span className="safari-live-dot" aria-hidden="true" />
                <span>Portfolio OS is open</span>
              </div>
            </aside>
          </section>

          <section className="safari-work" id="safari-work">
            <div className="safari-section-heading">
              <div>
                <span className="safari-section-kicker">01 / Work</span>
                <h3>Systems with real constraints.</h3>
              </div>
              <p>
                Seven projects across commerce, healthcare, learning, books,
                and network systems. Every live demo is linked, with source
                where public.
              </p>
            </div>

            <div className="safari-work__layout">
              <div className="safari-work__list">
                {projects.map((project, index) => (
                  <button
                    key={project.slug}
                    type="button"
                    className={`safari-work-row ${
                      activeProject?.slug === project.slug ? "is-active" : ""
                    }`}
                    onPointerEnter={() => setActiveSlug(project.slug)}
                    onFocus={() => setActiveSlug(project.slug)}
                    onClick={() => openProject(project.slug)}
                  >
                    <span className="safari-work-row__index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="safari-work-row__copy">
                      <span className="safari-work-row__topline">
                        <strong>{project.name}</strong>
                        <SystemIcon name="arrow-right" size={15} />
                      </span>
                      <span className="safari-work-row__category">
                        {project.status} · {project.category}
                      </span>
                      <span className="safari-work-row__tagline">
                        {project.tagline}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              {!isCompact && activeProject && (
                <div className="safari-work__preview" aria-hidden="true">
                  <div className="safari-work-preview">
                    {previewImage ? (
                      <Image
                        src={previewImage.src}
                        alt=""
                        width={previewImage.width}
                        height={previewImage.height}
                        sizes="(max-width: 900px) 0px, 430px"
                      />
                    ) : (
                      <ProjectArtwork project={activeProject} />
                    )}
                    <span className="safari-work-preview__label">
                      <span>{activeProject.name}</span>
                      <span>Open case study</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="safari-work__footer">
              <button
                type="button"
                className="safari-text-link"
                onClick={() => openApp("finder", { section: "projects" })}
              >
                Browse all {projects.length} projects in Finder
                <SystemIcon name="arrow-right" size={13} />
              </button>
            </div>
          </section>

          <section className="safari-about" id="safari-about">
            <div className="safari-about__heading">
              <span className="safari-section-kicker">02 / About</span>
              <h3>I care about the parts nobody screenshots.</h3>
            </div>
            <div className="safari-about__content">
              <p className="safari-about__lead">{profile.summary}</p>
              <p>
                My work tends to start with a system that is harder than it
                first looks: an appointment that can only be claimed once, a
                packet trace that needs to become a readable flow, or a
                marketplace where every used book is a different record. I
                enjoy making those rules concrete in the backend, then giving
                them an interface that does not make the complexity someone
                else&apos;s problem.
              </p>
              <dl className="safari-principles">
                {profile.approach.map((approach, index) => (
                  <div key={approach.title} className="safari-principle">
                    <dt>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {approach.title}
                    </dt>
                    <dd>{approach.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="safari-toolkit" id="safari-toolkit">
            <div className="safari-section-heading safari-section-heading--plain">
              <div>
                <span className="safari-section-kicker">03 / Toolkit</span>
                <h3>The tools I reach for.</h3>
              </div>
            </div>
            <div className="safari-toolkit__grid">
              {Object.entries(profile.skills).map(([group, skills]) => (
                <div className="safari-skill-group" key={group}>
                  <h4>{group}</h4>
                  <ul>
                    {skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="safari-education">
                <span className="safari-section-kicker">Education</span>
                <h4>{profile.educationDetails.degree}</h4>
                <p>{profile.educationDetails.note}</p>
              </div>
            </div>
          </section>

          <section className="safari-contact" id="safari-contact">
            <span className="safari-section-kicker">04 / Contact</span>
            <h3>Have a problem worth building for?</h3>
            <p>{profile.availabilityNote}</p>
            <div className="safari-contact__actions">
              <a
                className="safari-button safari-button--light"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
                <SystemIcon name="external" size={12} />
              </a>
              <a
                className="safari-contact__github"
                href="https://github.com/fk219"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
                <SystemIcon name="external" size={11} />
              </a>
            </div>
          </section>

          <footer className="safari-site-footer">
            <span>Furqan Khan</span>
            <span>Designed and built as an interactive macOS portfolio.</span>
            <button type="button" onClick={() => openApp("terminal")}>
              Open the Terminal
            </button>
          </footer>
        </article>
      </div>
    </div>
  );
}
