"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { projects } from "@/data/projects";

interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  project: string;
  category: string;
}

export function IOSPhotosApp({
  onViewerChange,
}: {
  onViewerChange?: (open: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const photos = useMemo<Photo[]>(
    () =>
      projects.flatMap((project) =>
        project.screenshots.map((screenshot, index) => ({
          id: `${project.slug}-${index}`,
          src: screenshot.src,
          alt: screenshot.alt,
          width: screenshot.width,
          height: screenshot.height,
          project: project.name,
          category: project.category,
        })),
      ),
    [],
  );

  const active = selected === null ? null : photos[selected];

  useEffect(() => {
    onViewerChange?.(selected !== null);
  }, [onViewerChange, selected]);

  useEffect(() => () => onViewerChange?.(false), [onViewerChange]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="ios-app-view ios-photos">
      <div className="ios-app-view__scroll">
        <header className="ios-large-header">
          <span className="ios-eyebrow">Library</span>
          <h1>Photos</h1>
          <p>{photos.length} screens from the work.</p>
        </header>

        <div className="ios-photo-grid">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className="ios-photo"
              onClick={() => setSelected(index)}
              aria-label={`Open ${photo.project} screenshot`}
            >
              <Image
                src={photo.src}
                alt=""
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 620px) 31vw, 120px"
              />
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="ios-photo-viewer" role="dialog" aria-modal="true" aria-label={active.project}>
          <div className="ios-photo-viewer__top">
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close photo"
            >
              <SystemIcon name="close" size={17} />
            </button>
            <span>
              <strong>{active.project}</strong>
              <small>{active.category}</small>
            </span>
            <span className="ios-photo-viewer__count">
              {(selected ?? 0) + 1} / {photos.length}
            </span>
          </div>
          <div className="ios-photo-viewer__stage">
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="390px"
              priority
            />
          </div>
          <div className="ios-photo-viewer__nav">
            <button
              type="button"
              onClick={() =>
                setSelected((current) =>
                  current === null
                    ? null
                    : (current - 1 + photos.length) % photos.length,
                )
              }
              aria-label="Previous photo"
            >
              <SystemIcon name="chevron-left" size={20} />
            </button>
            <button
              type="button"
              onClick={() =>
                setSelected((current) =>
                  current === null ? null : (current + 1) % photos.length,
                )
              }
              aria-label="Next photo"
            >
              <SystemIcon name="chevron-right" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
