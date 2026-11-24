"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { BugHunt } from "@/components/arcade/BugHunt";
import { ProjectArtwork } from "@/components/apps/ProjectArtwork";
import {
  featuredProjects,
  projects,
  type Project,
} from "@/data/projects";
import { profile } from "@/data/profile";
import { certifications } from "@/data/career";

type StoreTab = "today" | "apps" | "arcade" | "developer";

const tabs: Array<{
  id: StoreTab;
  label: string;
  icon: "house" | "grid" | "play" | "person";
}> = [
  { id: "today", label: "Today", icon: "house" },
  { id: "apps", label: "Apps", icon: "grid" },
  { id: "arcade", label: "Arcade", icon: "play" },
  { id: "developer", label: "Developer", icon: "person" },
];

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function IOSStoreApp({
  onOpenProject,
  onOpenResume,
}: {
  onOpenProject: (slug: string) => void;
  onOpenResume: () => void;
}) {
  const [tab, setTab] = useState<StoreTab>("today");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "Case study" | "Experiment">("all");
  const activeProject = activeSlug ? findProject(activeSlug) : undefined;
  const hero = featuredProjects[0] ?? projects[0];
  const apps = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (filter !== "all" && project.status !== filter) return false;
      if (!needle) return true;
      return `${project.name} ${project.category} ${project.stack.join(" ")} ${project.tagline}`
        .toLowerCase()
        .includes(needle);
    });
  }, [filter, query]);

  const openApp = (slug: string) => setActiveSlug(slug);

  return (
    <div className="ios-app-view ios-store">
      <div className="ios-app-view__scroll ios-store__scroll">
        {activeProject ? (
          <StoreProject
            project={activeProject}
            onBack={() => setActiveSlug(null)}
            onOpenProject={() => onOpenProject(activeProject.slug)}
          />
        ) : (
          <>
            <header className="ios-store__masthead">
              <span className="ios-store__title">
                <span className="ios-eyebrow">Portfolio OS</span>
                <h1>Store</h1>
              </span>
              <span className="ios-store__bag">
                <SystemIcon name="bag" size={16} />
              </span>
            </header>

            {tab === "today" && (
              <div className="ios-store-today">
                {hero && (
                  <button
                    type="button"
                    className="ios-store-hero"
                    onClick={() => openApp(hero.slug)}
                  >
                    <span className="ios-store-hero__art" aria-hidden="true">
                      <ProjectArtwork project={hero} />
                    </span>
                    <span className="ios-store-hero__shade" aria-hidden="true" />
                    <span className="ios-store-hero__copy">
                      <span className="ios-store__eyebrow">New this week</span>
                      <strong>{hero.name}</strong>
                      <small>{hero.tagline}</small>
                      <span className="ios-store-hero__cta">
                        View app
                        <SystemIcon name="arrow-right" size={11} />
                      </span>
                    </span>
                  </button>
                )}

                <section className="ios-store-collection">
                  <header>
                    <div>
                      <span className="ios-store__eyebrow">Built with AI</span>
                      <h2>Models with a job.</h2>
                    </div>
                    <span>{3} apps</span>
                  </header>
                  <div className="ios-store-carousel">
                    {["model-arena", "research-desk", "moodify"].map((slug) => {
                      const project = findProject(slug);
                      if (!project) return null;
                      return (
                        <button
                          type="button"
                          key={slug}
                          className="ios-store-tile"
                          onClick={() => openApp(slug)}
                        >
                          <span className="ios-store-tile__art">
                            <ProjectArtwork project={project} compact />
                          </span>
                          <strong>{project.name}</strong>
                          <small>{project.category}</small>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <button
                  type="button"
                  className="ios-store-arcade"
                  onClick={() => setTab("arcade")}
                >
                  <span className="ios-store-arcade__icon">
                    <SystemIcon name="play" size={16} />
                  </span>
                  <span>
                    <span className="ios-store__eyebrow">Arcade</span>
                    <strong>Bug Hunt</strong>
                    <small>Seven bugs. Find them before the build ships.</small>
                  </span>
                  <SystemIcon name="arrow-right" size={13} />
                </button>

                <button
                  type="button"
                  className="ios-store-developer-card"
                  onClick={() => setTab("developer")}
                >
                  <span className="ios-store-developer-card__avatar">FK</span>
                  <span>
                    <span className="ios-store__eyebrow">The developer</span>
                    <strong>Furqan Khan</strong>
                    <small>Full-stack developer · Dubai</small>
                  </span>
                  <span className="ios-store-developer-card__status">
                    <i aria-hidden="true" />
                    Open to work
                  </span>
                </button>
              </div>
            )}

            {tab === "apps" && (
              <div className="ios-store-apps">
                <div className="ios-store-search">
                  <SystemIcon name="search" size={13} />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search apps, stacks, categories"
                    aria-label="Search the store"
                  />
                </div>
                <div className="ios-store-filters" role="group" aria-label="Filter apps">
                  {(["all", "Case study", "Experiment"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={filter === value ? "is-active" : ""}
                      onClick={() => setFilter(value)}
                    >
                      {value === "all" ? "All" : value === "Case study" ? "Case studies" : "Experiments"}
                    </button>
                  ))}
                </div>
                <div className="ios-store-grid">
                  {apps.map((project) => (
                    <button
                      type="button"
                      key={project.slug}
                      className="ios-store-app-card"
                      onClick={() => openApp(project.slug)}
                    >
                      <span className="ios-store-app-card__art">
                        <ProjectArtwork project={project} compact />
                      </span>
                      <strong>{project.name}</strong>
                      <small>{project.category}</small>
                    </button>
                  ))}
                </div>
                {apps.length === 0 && (
                  <p className="ios-store-empty">No apps match “{query}”.</p>
                )}
              </div>
            )}

            {tab === "arcade" && (
              <div className="ios-store-arcade-page">
                <header className="ios-store-page-title">
                  <span className="ios-store__eyebrow">Arcade / 01</span>
                  <h2>Play the work.</h2>
                  <p>Seven bugs from the same systems in this portfolio.</p>
                </header>
                <BugHunt compact />
              </div>
            )}

            {tab === "developer" && (
              <div className="ios-store-developer">
                <header className="ios-store-dev-hero">
                  <span className="ios-store-dev-hero__avatar">FK</span>
                  <span>
                    <span className="ios-store__eyebrow">Independent developer</span>
                    <h2>{profile.name}</h2>
                    <p>{profile.headline}</p>
                    <small>
                      {profile.location} · Open to work
                    </small>
                  </span>
                </header>
                <div className="ios-store-dev-actions">
                  <button type="button" onClick={onOpenResume}>
                    <SystemIcon name="document" size={12} />
                    Resume
                  </button>
                  <a href={`mailto:${profile.email}`}>
                    <SystemIcon name="mail" size={12} />
                    Email
                  </a>
                  <a href={profile.socials.github} target="_blank" rel="noreferrer">
                    <SystemIcon name="branch" size={12} />
                    GitHub
                  </a>
                  <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                    <SystemIcon name="person" size={12} />
                    LinkedIn
                  </a>
                </div>
                <div className="ios-store-dev-stats">
                  <span><strong>{projects.length}</strong>apps</span>
                  <span><strong>{featuredProjects.length}</strong>case studies</span>
                  <span><strong>{certifications.length}</strong>certifications</span>
                </div>
                <section className="ios-store-dev-section">
                  <header>
                    <span className="ios-store__eyebrow">About</span>
                  </header>
                  <p>{profile.summary}</p>
                </section>
                <section className="ios-store-dev-section">
                  <header>
                    <span className="ios-store__eyebrow">Toolkit</span>
                  </header>
                  {Object.entries(profile.skills).map(([group, skills]) => (
                    <div className="ios-store-dev-skill" key={group}>
                      <strong>{group}</strong>
                      <small>{skills.join(" · ")}</small>
                    </div>
                  ))}
                </section>
                <section className="ios-store-dev-section">
                  <header>
                    <span className="ios-store__eyebrow">Certifications</span>
                  </header>
                  {certifications.slice(0, 6).map((certification) => (
                    <div className="ios-store-dev-cert" key={certification.id}>
                      <strong>{certification.name}</strong>
                      <small>{certification.issuer} · {certification.issued}</small>
                    </div>
                  ))}
                </section>
              </div>
            )}
          </>
        )}
      </div>

      {!activeProject && (
        <nav className="ios-store-tabs" aria-label="Store sections" role="tablist">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={tab === item.id ? "is-active" : ""}
              onClick={() => setTab(item.id)}
            >
              <SystemIcon name={item.icon} size={17} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function StoreProject({
  project,
  onBack,
  onOpenProject,
}: {
  project: Project;
  onBack: () => void;
  onOpenProject: () => void;
}) {
  const screenshot = project.screenshots[0];
  return (
    <article className="ios-store-project">
      <button type="button" className="ios-store-back" onClick={onBack}>
        <SystemIcon name="chevron-left" size={13} />
        Store
      </button>
      <div className="ios-store-project__head">
        <span className="ios-store__eyebrow">
          {project.status} · {project.category}
        </span>
        <h2>{project.name}</h2>
        <p>{project.tagline}</p>
      </div>
      <div className="ios-store-project__actions">
        <button type="button" className="ios-store-project__primary" onClick={onOpenProject}>
          Open case study
          <SystemIcon name="arrow-right" size={12} />
        </button>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer">
            Live site
            <SystemIcon name="external" size={10} />
          </a>
        )}
      </div>
      {screenshot && (
        <div className="ios-store-project__screenshot">
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            sizes="(max-width: 940px) 100vw, 390px"
          />
        </div>
      )}
      <section className="ios-store-project__section">
        <span className="ios-store__eyebrow">What it is</span>
        <p>{project.description}</p>
      </section>
      <section className="ios-store-project__section">
        <span className="ios-store__eyebrow">What I built</span>
        <ul>
          {project.highlights.map((highlight) => (
            <li key={highlight}>
              <SystemIcon name="check" size={10} />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="ios-store-project__section">
        <span className="ios-store__eyebrow">Built with</span>
        <div className="ios-store-project__stack">
          {project.stack.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </section>
      {project.repo && (
        <a className="ios-store-project__repo" href={project.repo} target="_blank" rel="noreferrer">
          Source on GitHub
          <SystemIcon name="external" size={10} />
        </a>
      )}
    </article>
  );
}
