"use client";

import Image from "next/image";
import { useRef } from "react";
import { ProjectArtwork } from "@/components/apps/ProjectArtwork";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { profile } from "@/data/profile";
import { certifications } from "@/data/career";
import { featuredProjects, projects } from "@/data/projects";

export function IOSSafariApp({
  onOpenProject,
}: {
  onOpenProject: (slug: string) => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);

  return (
    <div className="ios-app-view ios-safari">
      <div className="ios-app-view__scroll ios-safari__scroll" ref={viewportRef}>
        <article className="ios-site">
          <header className="ios-site__header">
            <span className="ios-site__mark">
              <span>FK</span>
              <span>
                Furqan Khan
                <small>Full-stack developer</small>
              </span>
            </span>
            <span className="ios-site__live">
              <i aria-hidden="true" />
              Open
            </span>
          </header>

          <section className="ios-site__hero">
            <span className="ios-eyebrow">Portfolio / 2026</span>
            <h1>
              Full-stack products,
              <br />
              built from the <em>data model up.</em>
            </h1>
            <p>
              I&apos;m Furqan Khan, founder of FKodeLabs and a full-stack
              developer with an MCA from Manipal University Jaipur. I work
              across the API, the interface, and the systems in between.
            </p>
            <div className="ios-site__hero-actions">
              <a href="#ios-site-work" className="ios-button ios-button--primary">
                Explore work
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="ios-button ios-button--ghost"
              >
                Email me
              </a>
            </div>
            <dl className="ios-site__facts">
              <div>
                <dt>Education</dt>
                <dd>{profile.education}</dd>
              </div>
              <div>
                <dt>Projects</dt>
                <dd>
                  {projects.length} shipped · {certifications.length}{" "}
                  certifications
                </dd>
              </div>
              <div>
                <dt>Company</dt>
                <dd>Founder, FKodeLabs · Dubai</dd>
              </div>
            </dl>
          </section>

          <section className="ios-site__section" id="ios-site-work">
            <div className="ios-site__section-head">
              <span className="ios-eyebrow">01 / Work</span>
              <h2>Systems with real constraints.</h2>
              <p>
                Selected products across commerce, healthcare, learning, and
                second-hand books.
              </p>
            </div>
            <div className="ios-site__work">
              {featuredProjects.map((project) => {
                const screenshot = project.screenshots[0];
                return (
                  <button
                    key={project.slug}
                    type="button"
                    className="ios-site-project"
                    onClick={() => onOpenProject(project.slug)}
                  >
                    <span className="ios-site-project__art">
                      {screenshot ? (
                        <Image
                          src={screenshot.src}
                          alt=""
                          width={screenshot.width}
                          height={screenshot.height}
                          sizes="(max-width: 620px) 85vw, 340px"
                        />
                      ) : (
                        <ProjectArtwork project={project} compact />
                      )}
                    </span>
                    <span className="ios-site-project__copy">
                      <small>{project.category}</small>
                      <strong>{project.name}</strong>
                      <span>{project.tagline}</span>
                    </span>
                    <SystemIcon name="arrow-right" size={14} />
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="ios-site__all-link"
              onClick={() => onOpenProject("")}
            >
              Browse all {projects.length} projects
              <SystemIcon name="chevron-right" size={13} />
            </button>
          </section>

          <section className="ios-site__section ios-site__about">
            <span className="ios-eyebrow">02 / About</span>
            <h2>I care about the parts nobody screenshots.</h2>
            <p>{profile.summary}</p>
            <div className="ios-site__principles">
              {profile.approach.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ios-site__section ios-site__contact">
            <span className="ios-eyebrow">03 / Contact</span>
            <h2>Have a problem worth building for?</h2>
            <p>{profile.availabilityNote}</p>
            <a
              href={`mailto:${profile.email}`}
              className="ios-site__email"
            >
              {profile.email}
              <SystemIcon name="external" size={12} />
            </a>
            <div className="ios-site__socials">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              {profile.socials.twitter && (
                <a
                  href={profile.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  X
                </a>
              )}
              <a href="#ios-site-work">Work</a>
            </div>
          </section>

          <footer className="ios-site__footer">
            <span>Furqan Khan</span>
            <span>An interactive portfolio in your pocket.</span>
          </footer>
        </article>
      </div>

      <div className="ios-safari__toolbar">
        <button
          type="button"
          className="ios-safari__nav"
          onClick={() =>
            viewportRef.current?.querySelector("#ios-site-work")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          aria-label="Jump to work"
        >
          <SystemIcon name="list" size={16} />
        </button>
        <span className="ios-safari__address">
          <SystemIcon name="lock" size={10} />
          furqan.local
        </span>
        <button
          type="button"
          className="ios-safari__nav"
          onClick={() => viewportRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <SystemIcon name="refresh" size={15} />
        </button>
      </div>
    </div>
  );
}
