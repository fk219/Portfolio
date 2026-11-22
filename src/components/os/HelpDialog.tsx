"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { useDialog } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";

const shortcutGroups = [
  {
    title: "Move around",
    shortcuts: [
      { keys: "⌘ K", action: "Open Spotlight search (Ctrl K on Windows)" },
      { keys: "F4", action: "Open Launchpad" },
      { keys: "Esc", action: "Close a search or panel" },
      { keys: "Tab", action: "Move keyboard focus" },
    ],
  },
  {
    title: "Windows",
    shortcuts: [
      { keys: "⌘ W", action: "Close the active window" },
      { keys: "⌘ M", action: "Minimize the active window" },
      { keys: "⌘ ,", action: "Open System Settings" },
      { keys: "double-click", action: "Zoom a window title bar" },
    ],
  },
  {
    title: "On the desktop",
    shortcuts: [
      { keys: "double-click", action: "Open a desktop item" },
      { keys: "drag", action: "Move a window by its title bar" },
      { keys: "right-click", action: "Open the desktop menu" },
      { keys: "⌘ K → Enter", action: "Jump to a project or action" },
    ],
  },
];

export function HelpDialog() {
  const { closeOverlay, isCompact } = useOS();
  const dialogRef = useDialog(true, closeOverlay);

  return (
    <dialog
      ref={dialogRef}
      className="help-dialog"
      aria-labelledby="portfolio-help-title"
    >
      <div className="help-dialog__surface">
        <header className="help-dialog__header">
          <span className="help-dialog__icon" aria-hidden="true">
            <SystemIcon name="keyboard" size={24} />
          </span>
          <div>
            <span className="help-dialog__eyebrow">Portfolio OS</span>
            <h2 id="portfolio-help-title">Help and keyboard shortcuts</h2>
          </div>
          <button
            type="button"
            className="help-dialog__close"
            aria-label="Close help"
            onClick={closeOverlay}
          >
            <SystemIcon name="close" size={13} />
          </button>
        </header>

        <p className="help-dialog__intro">
          {isCompact
            ? "Every part of this desktop works with touch. If you have a keyboard connected, these shortcuts work too. Start with Finder for the work, or use the search icon to jump anywhere."
            : "Every window, app, and menu in this portfolio is usable with a mouse or a keyboard. Start with Finder for the work, or press Spotlight to jump straight to anything."}
        </p>

        <div className="help-dialog__groups">
          {shortcutGroups.map((group) => (
            <section key={group.title} className="help-dialog__group">
              <h3>{group.title}</h3>
              <dl>
                {group.shortcuts.map((shortcut) => (
                  <div
                    className="help-dialog__shortcut"
                    key={shortcut.action}
                  >
                    <dt>
                      <kbd>{shortcut.keys}</kbd>
                    </dt>
                    <dd>{shortcut.action}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <footer className="help-dialog__footer">
          <span>
            This is an independent portfolio experience. Not affiliated with
            Apple Inc.
          </span>
          <button
            type="button"
            className="os-primary-button"
            onClick={closeOverlay}
          >
            Done
          </button>
        </footer>
      </div>
    </dialog>
  );
}
