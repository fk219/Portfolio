"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { BugHunt } from "@/components/arcade/BugHunt";
import { SnakeGame } from "@/components/arcade/SnakeGame";
import { ProjectArtwork } from "@/components/apps/ProjectArtwork";
import {
  featuredProjects,
  projects,
  type Project,
} from "@/data/projects";
import { profile } from "@/data/profile";
import { certifications } from "@/data/career";
import { useOS } from "@/lib/os-context";

type StoreView = "today" | "apps" | "labs" | "arcade" | "developer" | "project";

const navItems: Array<{
  id: Exclude<StoreView, "project">;
  label: string;
  caption: string;
  icon: "house" | "grid" | "folder" | "play" | "command";
}> = [
  { id: "today", label: "Today", caption: "Curated", icon: "house" },
  { id: "apps", label: "Apps", caption: `${projects.length} products`, icon: "grid" },
  { id: "labs", label: "Labs", caption: "Experiments", icon: "folder" },
  { id: "arcade", label: "Arcade", caption: "Snake + bugs", icon: "play" },
  { id: "developer", label: "Developer", caption: "Furqan Khan", icon: "command" },
];

const collections = [
  {
    id: "ai",
    kicker: "Built with AI",
    title: "Models, retrieval, and mood.",
    blurb: "Three products where the model is part of the product, not a sticker.",
    slugs: ["model-compare", "research-desk", "mood-music"],
  },
  {
    id: "fullstack",
    kicker: "Full-stack, end to end",
    title: "The unglamorous work.",
    blurb: "Auth, messages, bookings, catalogues, commerce, and the data model underneath.",
    slugs: ["photo-social", "klinikly", "foliofind", "learnhub", "hooked-on-cakes"],
  },
];

function storeProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function Store() {
  const { openProject, openResume, openApp } = useOS();
  const [view, setView] = useState<StoreView>("today");
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "Case study" | "Experiment">("all");
  const [arcadeGame, setArcadeGame] = useState<"snake" | "bug">("snake");

  const activeProject = storeProject(activeSlug);
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

  const showProject = (slug: string) => {
    setActiveSlug(slug);
    setView("project");
  };

  const labs = projects.filter((project) => project.status === "Experiment");

  return (
    <div className="store">
      <aside className="store__rail">
        <div className="store__brand">
          <span className="store__mark">FK</span>
          <span>
            <strong>Store</strong>
            <small>PortfolioOS</small>
          </span>
        </div>

        <nav className="store__nav" aria-label="Store sections">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`store__nav-item ${view !== "project" && view === item.id ? "is-active" : ""}`}
              onClick={() => setView(item.id)}
            >
              <SystemIcon name={item.icon} size={16} />
              <span>
                <strong>{item.label}</strong>
                <small>{item.caption}</small>
              </span>
              <span className="store__nav-arrow" aria-hidden="true">
                {view !== "project" && view === item.id ? "↗" : ""}
              </span>
            </button>
          ))}
        </nav>

        <div className="store__rail-foot">
          <span>Curated by Furqan</span>
          <small>{projects.length} apps · {featuredProjects.length} featured</small>
        </div>
      </aside>

      <main className="store__main">
        <header className="store__topbar">
          <span className="store__breadcrumb">
            <SystemIcon name="bag" size={13} />
            Store
            <span>/</span>
            {view === "project" ? activeProject?.name ?? "Project" : navItems.find((item) => item.id === view)?.label}
          </span>
          <div className="store__top-actions">
            <button type="button" onClick={() => setView("developer")}>
              <SystemIcon name="command" size={12} />
              Developer
            </button>
            <button type="button" onClick={() => setView("arcade")}>
              <SystemIcon name="play" size={12} />
              Arcade
            </button>
          </div>
        </header>

        <div className="store__scroll">
          {view === "today" && (
            <div className="store-today">
              {hero && (
                <section className="store-hero">
                  <div className="store-hero__art" aria-hidden="true">
                    <ProjectArtwork project={hero} />
                  </div>
                  <div className="store-hero__shade" aria-hidden="true" />
                  <div className="store-hero__copy">
                    <span className="store-eyebrow">New this week</span>
                    <h2>{hero.name}</h2>
                    <p>{hero.tagline}</p>
                    <div className="store-hero__actions">
                      <button type="button" className="store-primary" onClick={() => showProject(hero.slug)}>
                        View app
                        <SystemIcon name="arrow-right" size={12} />
                      </button>
                      {hero.demo && (
                        <a className="store-secondary" href={hero.demo} target="_blank" rel="noreferrer">
                          Live site
                          <SystemIcon name="external" size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="store-hero__index">01 / {String(featuredProjects.length).padStart(2, "0")}</span>
                </section>
              )}

              <section className="store-collections">
                {collections.map((collection) => (
                  <div className="store-collection" key={collection.id}>
                    <div className="store-collection__head">
                      <span className="store-eyebrow">{collection.kicker}</span>
                      <h3>{collection.title}</h3>
                      <p>{collection.blurb}</p>
                    </div>
                    <div className="store-collection__list">
                      {collection.slugs.map((slug) => {
                        const project = storeProject(slug);
                        if (!project) return null;
                        return (
                          <button
                            key={slug}
                            type="button"
                            className="store-mini"
                            onClick={() => showProject(slug)}
                          >
                            <span className="store-mini__art">
                              <ProjectArtwork project={project} compact />
                            </span>
                            <span className="store-mini__copy">
                              <strong>{project.name}</strong>
                              <small>{project.category}</small>
                            </span>
                            <SystemIcon name="chevron-right" size={12} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </section>

              <button type="button" className="store-arcade-card" onClick={() => setView("arcade")}>
                <span className="store-arcade-card__icon">
                  <SystemIcon name="play" size={18} />
                </span>
                <span>
                  <span className="store-eyebrow">Arcade</span>
                  <strong>Snake + Bug Hunt</strong>
                  <small>Two original games. No accounts, no ads, no network.</small>
                </span>
                <span className="store-arcade-card__cta">
                  Play
                  <SystemIcon name="arrow-right" size={12} />
                </span>
              </button>
            </div>
          )}

          {(view === "apps" || view === "labs") && (
            <div className="store-apps">
              <header className="store-page-head">
                <div>
                  <span className="store-eyebrow">
                    {view === "apps" ? "The catalogue" : "The labs"}
                  </span>
                  <h2>{view === "apps" ? "Every product." : "Ideas under test."}</h2>
                  <p>
                    {view === "apps"
                      ? "Case studies and experiments, presented as products. Open one for the reasoning, the stack, and the live build."
                      : "Smaller systems built to answer a technical question. They are experiments, and the interfaces say so."}
                  </p>
                </div>
                <span className="store-page-head__count">
                  {view === "apps" ? projects.length : labs.length}
                  <small>{view === "apps" ? "apps" : "labs"}</small>
                </span>
              </header>

              <div className="store-toolbar">
                <label className="store-search">
                  <SystemIcon name="search" size={13} />
                  <span className="sr-only">Search the store</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search apps, stacks, categories"
                  />
                </label>
                {view === "apps" && (
                  <div className="store-filters" role="group" aria-label="Filter apps">
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
                )}
              </div>

              <div className="store-grid">
                {(view === "labs" ? labs.filter((project) => {
                  const needle = query.trim().toLowerCase();
                  if (!needle) return true;
                  return `${project.name} ${project.category} ${project.stack.join(" ")}`.toLowerCase().includes(needle);
                }) : apps).map((project) => (
                  <StoreCard key={project.slug} project={project} onOpen={() => showProject(project.slug)} />
                ))}
              </div>
              {apps.length === 0 && view === "apps" && (
                <p className="store-empty">No apps match “{query}”.</p>
              )}
            </div>
          )}

          {view === "arcade" && (
            <div className="store-arcade">
              <header className="store-page-head">
                <div>
                  <span className="store-eyebrow">Arcade / 02</span>
                  <h2>Play the work.</h2>
                  <p>
                    Two small games made from the same systems the portfolio
                    solves. No timer pressure, no account, no fake leaderboard.
                  </p>
                </div>
              </header>
              <div className="store-arcade__switch" role="tablist" aria-label="Choose a game">
                <button
                  type="button"
                  role="tab"
                  aria-selected={arcadeGame === "snake"}
                  className={arcadeGame === "snake" ? "is-active" : ""}
                  onClick={() => setArcadeGame("snake")}
                >
                  Snake
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={arcadeGame === "bug"}
                  className={arcadeGame === "bug" ? "is-active" : ""}
                  onClick={() => setArcadeGame("bug")}
                >
                  Bug Hunt
                </button>
              </div>
              {arcadeGame === "snake" ? <SnakeGame /> : <BugHunt />}
            </div>
          )}

          {view === "developer" && (
            <div className="store-developer">
              <header className="store-developer__hero">
                <span className="store-developer__avatar">FK</span>
                <div>
                  <span className="store-eyebrow">Independent developer</span>
                  <h2>{profile.name}</h2>
                  <p>{profile.headline}</p>
                  <span className="store-developer__meta">
                    {profile.location} · {profile.availability}
                  </span>
                </div>
                <span className="store-developer__status">
                  <i aria-hidden="true" />
                  Open to work
                </span>
              </header>

              <div className="store-developer__actions">
                <button type="button" className="store-primary" onClick={openResume}>
                  <SystemIcon name="document" size={12} />
                  Resume
                </button>
                <button type="button" className="store-secondary" onClick={() => openApp("linkedin")}>
                  <SystemIcon name="person" size={12} />
                  LinkedIn
                </button>
                <button type="button" className="store-secondary" onClick={() => openApp("github")}>
                  <SystemIcon name="branch" size={12} />
                  GitHub
                </button>
                <a className="store-secondary" href={`mailto:${profile.email}`}>
                  <SystemIcon name="mail" size={12} />
                  Email
                </a>
              </div>

              <section className="store-developer__bio">
                <span className="store-eyebrow">About</span>
                <p>{profile.summary}</p>
              </section>

              <div className="store-developer__stats">
                <span><strong>{projects.length}</strong>apps</span>
                <span><strong>{featuredProjects.length}</strong>case studies</span>
                <span><strong>{certifications.length}</strong>certifications</span>
                <span><strong>5+</strong>years</span>
              </div>

              <div className="store-developer__columns">
                <section>
                  <span className="store-eyebrow">Toolkit</span>
                  <div className="store-developer__skills">
                    {Object.entries(profile.skills).map(([group, skills]) => (
                      <div key={group}>
                        <strong>{group}</strong>
                        <p>{skills.join(" · ")}</p>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <span className="store-eyebrow">Certifications</span>
                  <div className="store-developer__certs">
                    {certifications.slice(0, 6).map((certification) => (
                      <span key={certification.id}>
                        {certification.name}
                        <small>{certification.issuer}</small>
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {view === "project" && activeProject && (
            <ProjectStorePage
              project={activeProject}
              onBack={() => setView("apps")}
              onOpenProject={() => openProject(activeProject.slug)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function StoreCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button type="button" className="store-card" onClick={onOpen}>
      <span className="store-card__art">
        <ProjectArtwork project={project} compact />
        <span className={`store-card__status store-card__status--${project.status === "Case study" ? "study" : "lab"}`}>
          {project.status}
        </span>
      </span>
      <span className="store-card__copy">
        <strong>{project.name}</strong>
        <small>{project.category}</small>
        <span className="store-card__tags">
          {project.stack.slice(0, 3).map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </span>
      </span>
    </button>
  );
}

function ProjectStorePage({
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
    <article className="store-project">
      <button type="button" className="store-back" onClick={onBack}>
        <SystemIcon name="chevron-left" size={13} />
        All apps
      </button>
      <header className="store-project__head">
        <div>
          <span className="store-eyebrow">
            {project.status} · {project.category}
          </span>
          <h2>{project.name}</h2>
          <p>{project.tagline}</p>
        </div>
        <span className="store-project__number">
          {String(projects.indexOf(project) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </header>
      <div className="store-project__actions">
        <button type="button" className="store-primary" onClick={onOpenProject}>
          Open case study
          <SystemIcon name="arrow-right" size={12} />
        </button>
        {project.demo && (
          <a className="store-secondary" href={project.demo} target="_blank" rel="noreferrer">
            Live site
            <SystemIcon name="external" size={11} />
          </a>
        )}
        {project.repo && (
          <a className="store-secondary" href={project.repo} target="_blank" rel="noreferrer">
            Source
            <SystemIcon name="external" size={11} />
          </a>
        )}
      </div>
      {screenshot && (
        <a className="store-project__browser" href={screenshot.src} target="_blank" rel="noreferrer">
          <span className="store-project__browser-bar">
            <i />
            <i />
            <i />
            <span>{project.demo?.replace(/^https?:\/\//, "") ?? project.name.toLowerCase()}</span>
          </span>
          <span className="store-project__shot">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={screenshot.width}
              height={screenshot.height}
              sizes="(max-width: 940px) 90vw, 760px"
            />
          </span>
        </a>
      )}
      <div className="store-project__body">
        <section>
          <span className="store-eyebrow">What it is</span>
          <p>{project.description}</p>
        </section>
        <section>
          <span className="store-eyebrow">What I built</span>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <SystemIcon name="check" size={11} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="store-project__stack-section">
          <span className="store-eyebrow">Stack, in detail</span>
          <div className="store-project__stack-groups">
            {project.techStack.map((group) => (
              <article key={group.label}>
                <h4>{group.label}</h4>
                <p>{group.summary}</p>
                <div className="store-project__stack">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        {project.contextNote && (
          <aside className="store-project__note">
            <SystemIcon name="info" size={13} />
            <p>{project.contextNote}</p>
          </aside>
        )}
      </div>
    </article>
  );
}
