"use client";

import { AppIcon } from "@/components/icons/AppIcon";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { useOS } from "@/lib/os-context";

export function Trash() {
  const { openApp } = useOS();

  return (
    <div className="trash-app">
      <div className="trash-app__empty">
        <span className="trash-app__icon" aria-hidden="true">
          <AppIcon app="trash" size={82} />
        </span>
        <h2>Trash is empty</h2>
        <p>
          There is nothing to recover. Every project in this portfolio is
          still where it belongs.
        </p>
        <button
          type="button"
          className="os-secondary-button"
          onClick={() => openApp("finder", { section: "projects" })}
        >
          <SystemIcon name="folder" size={13} />
          Open Finder
        </button>
      </div>
      <footer className="trash-app__footer">
        <span>
          <SystemIcon name="lock" size={11} />
          Items deleted in this portfolio are not stored.
        </span>
      </footer>
    </div>
  );
}
