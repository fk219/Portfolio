"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { projects, type Project } from "@/data/projects";
import { useEscape, useFocusTrap } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { ProjectArtwork } from "./ProjectArtwork";

type PhotoFilter = "all" | "screenshots" | "artwork";

interface PhotoItem {
  id: string;
  kind: "screenshot" | "artwork";
  project: Project;
  title: string;
  caption: string;
  src?: string;
  width?: number;
  height?: number;
}

const filterLabels: Record<PhotoFilter, string> = {
  all: "Library",
  screenshots: "Screenshots",
  artwork: "Project Art",
};

export function Photos() {
  const { openProject, isCompact } = useOS();
  const [filter, setFilter] = useState<PhotoFilter>("all");
  const [gridScale, setGridScale] = useState(150);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const items = useMemo<PhotoItem[]>(() => {
    const screenshots = projects.flatMap((project) =>
      project.screenshots.map<PhotoItem>((screenshot, index) => ({
        id: `${project.slug}-shot-${index}`,
        kind: "screenshot",
        project,
        title: `${project.name} screenshot ${index + 1}`,
        caption: screenshot.alt,
        src: screenshot.src,
        width: screenshot.width,
        height: screenshot.height,
      })),
    );
    const artwork = projects.map<PhotoItem>((project) => ({
      id: `${project.slug}-art`,
      kind: "artwork",
      project,
      title: `${project.name} artwork`,
      caption: `Cover artwork for ${project.name}.`,
    }));
    return [...screenshots, ...artwork];
  }, []);

  const filtered = items.filter((item) =>
    filter === "all" ? true : item.kind === filter,
  );

  const activeIndex = filtered.findIndex((item) => item.id === activeId);
  const activeItem = activeIndex >= 0 ? filtered[activeIndex] : null;
  const selectedItem =
    filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  useEffect(() => {
    if (filtered.length === 0) return;
    if (!filtered.some((item) => item.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  useFocusTrap(viewerRef, Boolean(activeItem), closeButtonRef);
  useEscape(Boolean(activeItem), () => setActiveId(null));

  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex =
        (activeIndex + direction + filtered.length) % filtered.length;
      setActiveId(filtered[nextIndex].id);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, activeItem, filtered]);

  const navigate = (direction: 1 | -1) => {
    if (filtered.length === 0) return;
    const baseIndex = activeIndex >= 0 ? activeIndex : 0;
    const nextIndex =
      (baseIndex + direction + filtered.length) % filtered.length;
    setActiveId(filtered[nextIndex].id);
  };

  const columns = isCompact
    ? 2
    : gridScale <= 130
      ? 5
      : gridScale <= 180
        ? 4
        : 3;

  return (
    <div className="photos">
      <aside
        className="photos__sidebar"
        aria-label="Photos sidebar"
        aria-hidden={Boolean(activeItem) || undefined}
        inert={Boolean(activeItem) || undefined}
      >
        <h2 className="photos__sidebar-heading">Photos</h2>
        <nav className="photos__sidebar-nav" aria-label="Photo filters">
          {(["all", "screenshots", "artwork"] as PhotoFilter[]).map((key) => {
            const count =
              key === "screenshots"
                ? items.filter((item) => item.kind === "screenshot").length
                : key === "artwork"
                  ? items.filter((item) => item.kind === "artwork").length
                  : items.length;
            return (
              <button
                key={key}
                type="button"
                className={`photos__nav-item ${
                  filter === key ? "is-selected" : ""
                }`}
                onClick={() => {
                  setFilter(key);
                  setActiveId(null);
                }}
              >
                <SystemIcon
                  name={
                    key === "screenshots"
                      ? "grid"
                      : key === "artwork"
                        ? "document"
                        : "display"
                  }
                  size={14}
                />
                <span>{filterLabels[key]}</span>
                <span className="photos__nav-count">{count}</span>
              </button>
            );
          })}
        </nav>

        <div className="photos__sidebar-albums">
          <h2 className="photos__sidebar-heading">Projects</h2>
          {projects.map((project) => (
            <button
              type="button"
              key={project.slug}
              className={`photos__album ${
                selectedItem?.project.slug === project.slug ? "is-selected" : ""
              }`}
              onClick={() => {
                setFilter("all");
                setActiveId(null);
                setSelectedId(`${project.slug}-art`);
              }}
            >
              <span
                className="photos__album-swatch"
                style={
                  {
                    "--swatch-from": project.cover.from,
                    "--swatch-to": project.cover.to,
                  } as CSSProperties
                }
                aria-hidden="true"
              />
              <span>{project.shortName}</span>
            </button>
          ))}
        </div>
      </aside>

      <div
        className="photos__main"
        aria-hidden={Boolean(activeItem) || undefined}
        inert={Boolean(activeItem) || undefined}
      >
        <div className="photos__toolbar">
          <div className="photos__toolbar-title">
            <h2>{filterLabels[filter]}</h2>
            <span>{filtered.length} items</span>
          </div>
          <label className="photos__zoom">
            <SystemIcon name="grid" size={12} />
            <span className="sr-only">Gallery thumbnail size</span>
            <input
              type="range"
              min="110"
              max="220"
              step="10"
              value={gridScale}
              onChange={(event) => setGridScale(Number(event.target.value))}
              style={
                {
                  "--range-progress": `${
                    ((gridScale - 110) / 110) * 100
                  }%`,
                } as CSSProperties
              }
            />
            <SystemIcon name="grid" size={17} />
          </label>
        </div>

        <div className="photos__content">
          {filtered.length > 0 ? (
            <div
              className="photos__grid"
              style={{ "--photo-columns": columns } as CSSProperties}
            >
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`photos__tile ${
                    selectedItem?.id === item.id ? "is-selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedId(item.id);
                    if (isCompact) setActiveId(item.id);
                  }}
                  onDoubleClick={() => {
                    if (!isCompact) setActiveId(item.id);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      setActiveId(item.id);
                    }
                  }}
                  aria-label={`${item.title}. ${
                    isCompact
                      ? "Open preview."
                      : "Select, then double-click or press Enter for a larger view."
                  }`}
                >
                  <span className="photos__tile-media">
                    {item.src ? (
                      <Image
                        src={item.src}
                        alt={item.caption}
                        width={item.width}
                        height={item.height}
                        sizes="(max-width: 940px) 45vw, 240px"
                        loading="lazy"
                      />
                    ) : (
                      <ProjectArtwork project={item.project} compact />
                    )}
                  </span>
                  <span className="photos__tile-label">
                    {item.kind === "screenshot" ? "Screenshot" : "Artwork"}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="photos__empty" role="status">
              <SystemIcon name="display" size={26} />
              <h3>No visuals in this album</h3>
              <button
                type="button"
                className="os-text-button"
                onClick={() => setFilter("all")}
              >
                Show everything
              </button>
            </div>
          )}
        </div>

        <div className="photos__caption-bar">
          {selectedItem ? (
            <>
              <span>
                {selectedItem.title} · {selectedItem.project.category}
              </span>
              <button
                type="button"
                onClick={() => openProject(selectedItem.project.slug)}
              >
                Open case study
                <SystemIcon name="arrow-right" size={11} />
              </button>
            </>
          ) : (
            <span>Select an item to see its details.</span>
          )}
        </div>
      </div>

      {activeItem && (
        <div
          ref={viewerRef}
          className="photos__viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${activeItem.title}`}
        >
          <div className="photos__viewer-toolbar">
            <div className="photos__viewer-title">
              <span>{activeItem.project.name}</span>
              <span>
                {activeIndex + 1} of {filtered.length}
              </span>
            </div>
            <div className="photos__viewer-actions">
              <button
                type="button"
                className="photos__viewer-button"
                onClick={() => openProject(activeItem.project.slug)}
              >
                Open case study
              </button>
              <button
                type="button"
                className="photos__viewer-close"
                ref={closeButtonRef}
                aria-label="Close photo viewer"
                onClick={() => setActiveId(null)}
              >
                <SystemIcon name="close" size={13} />
              </button>
            </div>
          </div>

          <div className="photos__viewer-stage">
            <button
              type="button"
              className="photos__viewer-nav photos__viewer-nav--prev"
              aria-label="Previous photo"
              onClick={() => navigate(-1)}
            >
              <SystemIcon name="chevron-left" size={22} />
            </button>
            <div className="photos__viewer-image">
              {activeItem.src ? (
                <Image
                  src={activeItem.src}
                  alt={activeItem.caption}
                  width={activeItem.width}
                  height={activeItem.height}
                  sizes="(max-width: 940px) 92vw, 820px"
                />
              ) : (
                <ProjectArtwork project={activeItem.project} />
              )}
            </div>
            <button
              type="button"
              className="photos__viewer-nav photos__viewer-nav--next"
              aria-label="Next photo"
              onClick={() => navigate(1)}
            >
              <SystemIcon name="chevron-right" size={22} />
            </button>
          </div>

          <p className="photos__viewer-caption">{activeItem.caption}</p>
        </div>
      )}
    </div>
  );
}

