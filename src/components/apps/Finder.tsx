"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { FolderIcon } from "@/components/icons/FileIcon";
import { ProjectArtwork } from "./ProjectArtwork";

type FinderFilter = "all" | "case-studies" | "experiments";
type FinderView = "grid" | "list";
type FinderSort = "curated" | "name" | "status";

const filterLabels: Record<FinderFilter, string> = {
  all: "All Work",
  "case-studies": "Case Studies",
  experiments: "Experiments",
};

function statusLabel(project: Project) {
  return project.status;
}

function selectedFromSection(section?: string): FinderFilter {
  if (section === "case-studies") return "case-studies";
  if (section === "experiments") return "experiments";
  return "all";
}

export function Finder({ section }: { section?: string }) {
  const {
    openProject,
    openApp,
    openResume,
    isCompact,
  } = useOS();
  const [filter, setFilter] = useState<FinderFilter>(
    selectedFromSection(section),
  );
  const [view, setView] = useState<FinderView>("grid");
  const [sort, setSort] = useState<FinderSort>("curated");
  const [query, setQuery] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    projects[0]?.slug ?? null,
  );
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilter(selectedFromSection(section));
  }, [section]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let list = projects.filter((project) => {
      if (filter === "case-studies" && !project.featured) return false;
      if (filter === "experiments" && project.featured) return false;
      if (!normalized) return true;
      return [
        project.name,
        project.category,
        project.description,
        project.stack.join(" "),
        project.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });

    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "status") {
        return (
          (a.status === "Case study" ? 0 : 1) -
            (b.status === "Case study" ? 0 : 1) ||
          a.name.localeCompare(b.name)
        );
      }
      return projects.indexOf(a) - projects.indexOf(b);
    });

    return list;
  }, [filter, query, sort]);

  const selectedProject =
    projects.find((project) => project.slug === selectedSlug) ?? null;

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedSlug(null);
      return;
    }
    if (!filtered.some((project) => project.slug === selectedSlug)) {
      setSelectedSlug(filtered[0].slug);
    }
  }, [filtered, selectedSlug]);

  const handleItemClick = (project: Project) => {
    setSelectedSlug(project.slug);
    if (isCompact) openProject(project.slug);
  };

  const handleItemDoubleClick = (project: Project) => {
    if (!isCompact) openProject(project.slug);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const sidebarFilters: Array<{
    id: FinderFilter;
    icon: "folder" | "document" | "grid";
  }> = [
    { id: "all", icon: "folder" },
    { id: "case-studies", icon: "document" },
    { id: "experiments", icon: "grid" },
  ];

  const resultLabel =
    filtered.length === 1
      ? "1 item"
      : `${filtered.length} items`;

  return (
    <div className={`finder ${isCompact ? "is-compact" : ""}`}>
      <aside className="finder__sidebar" aria-label="Finder sidebar">
        <div className="finder__sidebar-section">
          <h2 className="finder__sidebar-heading">Favorites</h2>
          <nav aria-label="Portfolio folders">
            {sidebarFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`finder__sidebar-item ${
                  filter === item.id ? "is-selected" : ""
                }`}
                onClick={() => {
                  setFilter(item.id);
                  setQuery("");
                }}
              >
                <SystemIcon name={item.icon} size={14} />
                <span>{filterLabels[item.id]}</span>
                <span className="finder__sidebar-count">
                  {item.id === "all"
                    ? projects.length
                    : projects.filter((project) =>
                        item.id === "case-studies"
                          ? project.featured
                          : !project.featured,
                      ).length}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="finder__sidebar-section">
          <h2 className="finder__sidebar-heading">The rest</h2>
          <nav aria-label="Portfolio links">
            <button
              type="button"
              className="finder__sidebar-item"
              onClick={() => openApp("safari", { section: "about" })}
            >
              <SystemIcon name="info" size={14} />
              <span>About Me</span>
            </button>
            <button
              type="button"
              className="finder__sidebar-item"
              onClick={() => openApp("mail")}
            >
              <SystemIcon name="mail" size={14} />
              <span>Contact</span>
            </button>
            <button
              type="button"
              className="finder__sidebar-item"
              onClick={openResume}
            >
              <SystemIcon name="document" size={14} />
              <span>Resume</span>
            </button>
          </nav>
        </div>

        <div className="finder__sidebar-section finder__sidebar-section--tags">
          <h2 className="finder__sidebar-heading">Tags</h2>
          <div className="finder__tag-row">
            <span className="finder__tag-dot finder__tag-dot--blue" />
            <span>Systems</span>
          </div>
          <div className="finder__tag-row">
            <span className="finder__tag-dot finder__tag-dot--orange" />
            <span>Commerce</span>
          </div>
          <div className="finder__tag-row">
            <span className="finder__tag-dot finder__tag-dot--green" />
            <span>Experiments</span>
          </div>
        </div>

        <div className="finder__sidebar-footer">
          <span className="finder__avatar" aria-hidden="true">
            {profile.initials}
          </span>
          <div>
            <strong>{profile.name}</strong>
            <span>PortfolioOS</span>
          </div>
        </div>
      </aside>

      <div className="finder__main">
        <div className="finder__toolbar">
          <div className="finder__nav-buttons">
            <button
              type="button"
              className="finder__tool-button"
              disabled
              aria-label="Back, no previous folder"
              title="No previous folder"
            >
              <SystemIcon name="chevron-left" size={17} />
            </button>
            <button
              type="button"
              className="finder__tool-button"
              disabled
              aria-label="Forward, no next folder"
              title="No next folder"
            >
              <SystemIcon name="chevron-right" size={17} />
            </button>
          </div>

          <div className="finder__folder-title">
            <FolderIcon size={17} />
            <h2>{filterLabels[filter]}</h2>
          </div>

          <div className="finder__toolbar-actions">
            <div className="finder__search">
              <SystemIcon name="search" size={13} />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="Search"
                aria-label="Search projects"
                spellCheck={false}
              />
              {query && (
                <button
                  type="button"
                  className="finder__search-clear"
                  aria-label="Clear project search"
                  onClick={() => {
                    setQuery("");
                    searchRef.current?.focus();
                  }}
                >
                  <SystemIcon name="close" size={9} />
                </button>
              )}
            </div>

            <label className="finder__sort">
              <span className="sr-only">Sort projects</span>
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as FinderSort)
                }
              >
                <option value="curated">Default order</option>
                <option value="name">Name</option>
                <option value="status">Status</option>
              </select>
              <SystemIcon name="chevron-down" size={10} />
            </label>

            <div
              className="finder__segmented"
              role="group"
              aria-label="Project view"
            >
              <button
                type="button"
                className={view === "grid" ? "is-selected" : ""}
                aria-label="View as icons"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
              >
                <SystemIcon name="grid" size={13} />
              </button>
              <button
                type="button"
                className={view === "list" ? "is-selected" : ""}
                aria-label="View as list"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                <SystemIcon name="list" size={14} />
              </button>
            </div>

            {!isCompact && (
              <button
                type="button"
                className={`finder__tool-button ${
                  showPreview ? "is-selected" : ""
                }`}
                aria-label={
                  showPreview ? "Hide preview pane" : "Show preview pane"
                }
                aria-pressed={showPreview}
                onClick={() => setShowPreview((visible) => !visible)}
              >
                <SystemIcon name="sidebar" size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="finder__content-row">
          <div className="finder__list-area">
            {filtered.length === 0 ? (
              <div className="finder__empty" role="status">
                <span className="finder__empty-icon" aria-hidden="true">
                  <SystemIcon name="search" size={25} />
                </span>
                <h3>No projects match “{query}”</h3>
                <p>
                  Try a project name, a category, or a tool from the stack.
                </p>
                <button
                  type="button"
                  className="os-text-button"
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                    searchRef.current?.focus();
                  }}
                >
                  Clear search
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="finder__grid">
                {filtered.map((project) => {
                  const isSelected = project.slug === selectedSlug;
                  return (
                    <button
                      key={project.slug}
                      type="button"
                      className={`finder__item ${
                        isSelected ? "is-selected" : ""
                      }`}
                      aria-label={`${project.name}, ${project.category}. ${
                        isCompact
                          ? "Open case study."
                          : "Select, then double-click or press Enter to open."
                      }`}
                      aria-pressed={isSelected}
                      onClick={() => handleItemClick(project)}
                      onDoubleClick={() => handleItemDoubleClick(project)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          openProject(project.slug);
                        }
                      }}
                    >
                      <span className="finder__item-art">
                        <ProjectArtwork project={project} compact />
                      </span>
                      <span className="finder__item-name">{project.name}</span>
                      <span className="finder__item-meta">
                        {project.category}
                      </span>
                      <span className="finder__item-status">
                        {statusLabel(project)}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="finder__list-view">
                <div className="finder__list-header" aria-hidden="true">
                  <span>Name</span>
                  <span>Category</span>
                  <span>Status</span>
                  <span>Stack</span>
                </div>
                {filtered.map((project) => {
                  const isSelected = project.slug === selectedSlug;
                  return (
                    <button
                      key={project.slug}
                      type="button"
                      className={`finder__list-row ${
                        isSelected ? "is-selected" : ""
                      }`}
                      aria-label={`${project.name}, ${project.category}. ${
                        isCompact
                          ? "Open case study."
                          : "Select, then double-click or press Enter to open."
                      }`}
                      aria-pressed={isSelected}
                      onClick={() => handleItemClick(project)}
                      onDoubleClick={() => handleItemDoubleClick(project)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          openProject(project.slug);
                        }
                      }}
                    >
                      <span className="finder__list-name">
                        <span className="finder__list-thumb">
                          <ProjectArtwork project={project} compact />
                        </span>
                        <span>{project.name}</span>
                      </span>
                      <span>{project.category}</span>
                      <span>{project.status}</span>
                      <span className="finder__list-stack">
                        {project.stack.slice(0, 3).join(", ")}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="finder__path-bar" aria-hidden="true">
              <SystemIcon name="folder" size={12} />
              <span>PortfolioOS</span>
              <SystemIcon name="chevron-right" size={9} />
              <span>Projects</span>
              <SystemIcon name="chevron-right" size={9} />
              <span>{filterLabels[filter]}</span>
            </div>
          </div>

          {showPreview && !isCompact && (
            <aside className="finder__preview" aria-label="Project preview">
              {selectedProject ? (
                <>
                  <div className="finder__preview-art">
                    <ProjectArtwork project={selectedProject} />
                  </div>
                  <div className="finder__preview-body">
                    <span className="finder__preview-kind">
                      {selectedProject.status}
                    </span>
                    <h3>{selectedProject.name}</h3>
                    <p className="finder__preview-category">
                      {selectedProject.category}
                    </p>
                    <p className="finder__preview-description">
                      {selectedProject.tagline}
                    </p>
                    <div className="finder__preview-stack">
                      {selectedProject.stack.slice(0, 4).map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="os-primary-button finder__preview-open"
                      onClick={() => openProject(selectedProject.slug)}
                    >
                      Open case study
                    </button>
                    <div className="finder__preview-links">
                      {selectedProject.demo && (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live site
                          <SystemIcon name="external" size={10} />
                        </a>
                      )}
                      {selectedProject.repo && (
                        <a
                          href={selectedProject.repo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Source
                          <SystemIcon name="external" size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="finder__preview-empty">
                  <SystemIcon name="sidebar" size={25} />
                  <h3>Select a project</h3>
                  <p>Its details will appear here.</p>
                </div>
              )}
            </aside>
          )}
        </div>

        <footer className="finder__status-bar">
          <span aria-live="polite">
            {resultLabel} · {filterLabels[filter].toLowerCase()}
          </span>
          <span>
            {projects.filter((project) => project.featured).length} case studies
            <span className="finder__status-dot" aria-hidden="true" />
            {projects.filter((project) => !project.featured).length} experiments
          </span>
        </footer>
      </div>
    </div>
  );
}
