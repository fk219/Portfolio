"use client";

import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/icons/AppIcon";
import { FileIcon, FolderIcon } from "@/components/icons/FileIcon";
import { useOS } from "@/lib/os-context";

const desktopItems = [
  { id: "projects", label: "Projects", kind: "folder" },
  { id: "about", label: "About Me", kind: "safari" },
  { id: "resume", label: "Resume", kind: "pdf" },
  { id: "contact", label: "Contact", kind: "mail" },
] as const;

type DesktopItem = (typeof desktopItems)[number];
type DesktopItemId = DesktopItem["id"];

export function DesktopIcons() {
  const { openApp, openResume, activeWindow } = useOS();
  const [selected, setSelected] = useState<DesktopItemId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setSelected(null);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!activeWindow) setSelected(null);
  }, [activeWindow]);

  const openItem = (id: DesktopItemId) => {
    if (id === "projects") openApp("finder", { section: "projects" });
    if (id === "about") openApp("safari", { section: "about" });
    if (id === "resume") openResume();
    if (id === "contact") openApp("mail");
  };

  return (
    <div
      ref={containerRef}
      className="desktop-icons"
      aria-label="Desktop items"
      role="group"
    >
      {desktopItems.map((item) => {
        const isSelected = selected === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className={`desktop-icon ${isSelected ? "is-selected" : ""}`}
            aria-label={`${item.label}. Double-click or press Enter to open.`}
            aria-pressed={isSelected}
            title="Double-click to open"
            onClick={() => setSelected(item.id)}
            onDoubleClick={() => openItem(item.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openItem(item.id);
              }
            }}
            onFocus={() => setSelected(item.id)}
          >
            <span className="desktop-icon__art">
              {item.kind === "folder" ? (
                <FolderIcon size={50} />
              ) : item.kind === "pdf" ? (
                <FileIcon size={48} variant="pdf" />
              ) : item.kind === "safari" ? (
                <AppIcon app="safari" size={50} />
              ) : (
                <AppIcon app="mail" size={50} />
              )}
            </span>
            <span className="desktop-icon__label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
