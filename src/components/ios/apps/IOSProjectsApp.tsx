"use client";

import { useEffect, useMemo, useState } from "react";
import { ProjectArtwork } from "@/components/apps/ProjectArtwork";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { getAdjacentProject, projects } from "@/data/projects";

type ProjectFilter = "All" | "Case studies" | "Experiments";

export function IOSProjectsApp({
  initialSlug,
  onOpenProjectHandled,
}: {
  initialSlug?: string;
  onOpenProjectHandled?: () => void;
}) {
  const [selectedSlug, setSelectedSlug] = useState(initialSlug ?? "");
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [query, setQuery] = useState("");
  const selected = projects.find((project) => project.slug === selectedSlug);

  useEffect(() => {
    if (initialSlug) {
      setSelectedSlug(initialSlug);
      onOpenProjectHandled?.();
    }
  }, [initialSlug, onOpenProjectHandled]);

  useEffect(() => {
    if (!selectedSlug) return;
    window.requestAnimationFrame(() => {
      document
        .querySelector(".ios-app-view__scroll")
        ?.scrollTo({ top: 0, behavior: "instant" });
    });
  }, [selectedSlug]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Case studies" && project.status === "Case study") ||
        (filter === "Experiments" && project.status === "Experiment");
      const matchesQuery = `${project.name} ${project.category} ${project.tagline} ${project.stack.join(" ")}`
        .toLowerCase()
        .includes(needle);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  if (selected) {
    const adjacent = getAdjacentProject(selected.slug, 1);
    return (
      <div className="ios-app-view ios-projects-detail">
        <div className="ios-app-view__scroll">
          <header className="ios-project-detail__bar">
            <button
              type="button"
              className="ios-back-button"
              onClick={() => setSelectedSlug("")}
            >
              <SystemIcon name="chevron-left" size={18} />
              Projects
            </button>
            <a
              href={selected.demo ?? selected.repo}
              target="_blank"
              rel="noreferrer"
              className="ios-project-detail__share"
              aria-label={`Open ${selected.name} live`}
            >
              <SystemIcon name="external" size={15} />
            </a>
          </header>

          <div className="ios-project-detail__art">
            <ProjectArtwork project={selected} />
          </div>

          <div className="ios-project-detail__meta">
            <span
              className={`ios-status-chip ${
                selected.status === "Case study" ? "is-study" : "is-experiment"
              }`}
            >
              {selected.status}
            </span>
            <span>{selected.category}</span>
          </div>
          <h1>{selected.name}</h1>
          <p className="ios-project-detail__tagline">{selected.tagline}</p>

          <div className="ios-project-detail__actions">
            {selected.demo && (
              <a
                href={selected.demo}
                target="_blank"
                rel="noreferrer"
                className="ios-button ios-button--primary"
              >
                Visit live project
                <SystemIcon name="external" size={13} />
              </a>
            )}
            {selected.repo && (
              <a
                href={selected.repo}
                target="_blank"
                rel="noreferrer"
                className="ios-button ios-button--secondary"
              >
                Source
                <SystemIcon name="external" size={12} />
              </a>
            )}
            {selected.adminDemo && (
              <a
                href={selected.adminDemo}
                target="_blank"
                rel="noreferrer"
                className="ios-button ios-button--secondary"
              >
                Admin demo
              </a>
            )}
          </div>

          <section className="ios-group">
            <h2>Overview</h2>
            <p className="ios-body-copy">{selected.description}</p>
            {selected.contextNote && (
              <p className="ios-note">{selected.contextNote}</p>
            )}
          </section>

          <section className="ios-group">
            <h2>Stack, in detail</h2>
            <div className="ios-stack-groups">
              {selected.techStack.map((group) => (
                <article className="ios-stack-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <p>{group.summary}</p>
                  <div className="ios-chip-row">
                    {group.items.map((item) => (
                      <span key={item} className="ios-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="ios-group">
            <h2>What is inside</h2>
            <ul className="ios-feature-list">
              {selected.highlights.map((highlight) => (
                <li key={highlight}>
                  <SystemIcon name="check" size={13} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {adjacent && (
            <button
              type="button"
              className="ios-next-project"
              onClick={() => setSelectedSlug(adjacent.slug)}
            >
              <span>
                <small>Next project</small>
                <strong>{adjacent.name}</strong>
              </span>
              <SystemIcon name="chevron-right" size={17} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="ios-app-view">
      <div className="ios-app-view__scroll">
        <header className="ios-large-header">
          <span className="ios-eyebrow">Portfolio / 2026</span>
          <h1>Projects</h1>
          <p>
            {projects.length} systems across commerce, healthcare, learning,
            AI, search, books, and the network.
          </p>
        </header>

        <div className="ios-search-field">
          <SystemIcon name="search" size={14} />
          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search projects"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <SystemIcon name="close" size={10} />
            </button>
          )}
        </div>

        <div className="ios-segmented" role="tablist" aria-label="Project filter">
          {(["All", "Case studies", "Experiments"] as ProjectFilter[]).map(
            (option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={filter === option}
                className={filter === option ? "is-active" : ""}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ),
          )}
        </div>

        <div className="ios-project-list">
          {visible.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                className="ios-project-card"
                style={{ "--card-index": index } as React.CSSProperties}
                onClick={() => setSelectedSlug(project.slug)}
              >
                <span className="ios-project-card__art">
                  <ProjectArtwork project={project} compact />
                </span>
                <span className="ios-project-card__copy">
                  <span className="ios-project-card__meta">
                    <span
                      className={`ios-status-chip ${
                        project.status === "Case study"
                          ? "is-study"
                          : "is-experiment"
                      }`}
                    >
                      {project.status}
                    </span>
                    <span>{project.category}</span>
                  </span>
                  <strong>{project.name}</strong>
                  <span className="ios-project-card__tagline">
                    {project.tagline}
                  </span>
                  <span className="ios-project-card__arrow">
                    <SystemIcon name="chevron-right" size={14} />
                  </span>
                </span>
              </button>
          ))}
          {visible.length === 0 && (
            <p className="ios-empty-state">No projects match that search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
