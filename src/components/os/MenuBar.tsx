"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { profile } from "@/data/profile";
import { formatMenuBarParts, useClickOutside, useNow } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";

type MenuEntry =
  | {
      type: "item";
      label: string;
      shortcut?: string;
      onSelect?: () => void;
      disabled?: boolean;
      href?: string;
    }
  | { type: "separator" };

interface MenuGroup {
  id: string;
  label: string;
  entries: MenuEntry[];
  isAppMenu?: boolean;
}

export function MenuBar() {
  const {
    activeAppName,
    activeWindow,
    closeActiveWindow,
    closeAllWindows,
    openAbout,
    openApp,
    openOverlay,
    openSettings,
    overlay,
    focusEnabled,
    wifiEnabled,
    settings,
    updateSettings,
    closeOverlay,
    toggleOverlay,
    lockScreen,
    logOut,
    restart,
    shutDown,
    sleepComputer,
    toggleMaximizeActiveWindow,
    minimizeActiveWindow,
    quitActiveApp,
  } = useOS();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuBarRef = useRef<HTMLElement>(null);
  const now = useNow(15000);
  const { day, time } = formatMenuBarParts(now);

  useClickOutside(
    [menuBarRef],
    openMenu !== null,
    () => setOpenMenu(null),
  );

  useEffect(() => {
    if (overlay) setOpenMenu(null);
  }, [overlay]);

  useEffect(() => {
    if (!openMenu) return;
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        const trigger = document.getElementById(`menu-trigger-${openMenu}`);
        setOpenMenu(null);
        trigger?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [openMenu]);

  const closeMenu = () => setOpenMenu(null);

  const withMenuClose = (action?: () => void) => () => {
    closeMenu();
    action?.();
  };

  const isFinder = activeWindow?.appId === "finder";
  const canClose = Boolean(activeWindow);
  const canQuit = Boolean(activeWindow) && !isFinder;
  const displayAppName =
    overlay === "launchpad" ? "Launchpad" : activeAppName;

  const menus: MenuGroup[] = [
    {
      id: "app",
      label: displayAppName,
      isAppMenu: true,
      entries: [
        {
          type: "item",
          label: "About Portfolio OS",
          onSelect: withMenuClose(openAbout),
        },
        {
          type: "item",
          label: "Settings…",
          shortcut: "⌘,",
          onSelect: withMenuClose(() => openSettings()),
        },
        { type: "separator" },
        {
          type: "item",
          label: "Minimize This Window",
          shortcut: "⌘M",
          disabled: !canClose,
          onSelect: withMenuClose(minimizeActiveWindow),
        },
        {
          type: "item",
          label: `Quit ${displayAppName}`,
          shortcut: "⌘Q",
          disabled: !canQuit,
          onSelect: withMenuClose(quitActiveApp),
        },
      ],
    },
    {
      id: "file",
      label: "File",
      entries: [
        {
          type: "item",
          label: "Open Projects Folder",
          shortcut: "⌘O",
          onSelect: withMenuClose(() => openApp("finder", { section: "projects" })),
        },
        { type: "separator" },
        {
          type: "item",
          label: "Close Window",
          shortcut: "⌘W",
          disabled: !canClose,
          onSelect: withMenuClose(closeActiveWindow),
        },
        {
          type: "item",
          label: "Close All Windows",
          shortcut: "⌥⌘W",
          disabled: !activeWindow,
          onSelect: withMenuClose(closeAllWindows),
        },
      ],
    },
    {
      id: "edit",
      label: "Edit",
      entries: [
        { type: "item", label: "Undo", shortcut: "⌘Z", disabled: true },
        { type: "item", label: "Redo", shortcut: "⇧⌘Z", disabled: true },
        { type: "separator" },
        { type: "item", label: "Cut", shortcut: "⌘X", disabled: true },
        { type: "item", label: "Copy", shortcut: "⌘C", disabled: true },
        { type: "item", label: "Paste", shortcut: "⌘V", disabled: true },
        { type: "separator" },
        {
          type: "item",
          label: "Spotlight Search…",
          shortcut: "⌘K",
          onSelect: withMenuClose(() => openOverlay("spotlight")),
        },
      ],
    },
    {
      id: "view",
      label: "View",
      entries: [
        {
          type: "item",
          label: activeWindow?.maximized ? "Restore Window" : "Zoom Window",
          disabled: !activeWindow,
          onSelect: withMenuClose(toggleMaximizeActiveWindow),
        },
        { type: "separator" },
        {
          type: "item",
          label:
            settings.appearance === "light"
              ? "Use Dark Appearance"
              : "Use Light Appearance",
          onSelect: withMenuClose(() =>
            updateSettings({
              appearance: settings.appearance === "light" ? "dark" : "light",
            }),
          ),
        },
        {
          type: "item",
          label: "Change Wallpaper…",
          onSelect: withMenuClose(() => openSettings("wallpaper")),
        },
      ],
    },
    {
      id: "go",
      label: "Go",
      entries: [
        {
          type: "item",
          label: "Projects",
          onSelect: withMenuClose(() => openApp("finder", { section: "projects" })),
        },
        {
          type: "item",
          label: "About Furqan",
          onSelect: withMenuClose(() => openApp("safari", { section: "about" })),
        },
        {
          type: "item",
          label: "Notes",
          onSelect: withMenuClose(() => openApp("notes")),
        },
        {
          type: "item",
          label: "Terminal",
          onSelect: withMenuClose(() => openApp("terminal")),
        },
        {
          type: "item",
          label: "Contact",
          onSelect: withMenuClose(() => openApp("mail")),
        },
        { type: "separator" },
        {
          type: "item",
          label: "GitHub",
          href: profile.links.find((link) => link.label === "GitHub")?.href,
          onSelect: closeMenu,
        },
      ],
    },
    {
      id: "window",
      label: "Window",
      entries: [
        {
          type: "item",
          label: "Minimize",
          shortcut: "⌘M",
          disabled: !canClose,
          onSelect: withMenuClose(minimizeActiveWindow),
        },
        {
          type: "item",
          label: "Zoom",
          disabled: !activeWindow,
          onSelect: withMenuClose(toggleMaximizeActiveWindow),
        },
        { type: "separator" },
        {
          type: "item",
          label: "Close",
          shortcut: "⌘W",
          disabled: !canClose,
          onSelect: withMenuClose(closeActiveWindow),
        },
      ],
    },
    {
      id: "help",
      label: "Help",
      entries: [
        {
          type: "item",
          label: "Portfolio OS Help",
          onSelect: withMenuClose(() => openOverlay("help")),
        },
        {
          type: "item",
          label: "Keyboard Shortcuts",
          onSelect: withMenuClose(() => openOverlay("help")),
        },
        { type: "separator" },
        {
          type: "item",
          label: "About Furqan's Portfolio",
          onSelect: withMenuClose(openAbout),
        },
      ],
    },
  ];

  const appleMenu: MenuGroup = {
    id: "apple",
    label: "Apple",
    entries: [
      { type: "item", label: "About This Mac", onSelect: withMenuClose(openAbout) },
      {
        type: "item",
        label: "System Settings…",
        onSelect: withMenuClose(() => openSettings()),
      },
      { type: "item", label: "App Store…", disabled: true },
      { type: "separator" },
      {
        type: "item",
        label: "Sleep",
        onSelect: withMenuClose(sleepComputer),
      },
      {
        type: "item",
        label: "Restart…",
        onSelect: withMenuClose(restart),
      },
      {
        type: "item",
        label: "Shut Down…",
        onSelect: withMenuClose(shutDown),
      },
      { type: "separator" },
      {
        type: "item",
        label: "Lock Screen",
        shortcut: "⌃⌘Q",
        onSelect: withMenuClose(lockScreen),
      },
      {
        type: "item",
        label: "Log Out Furqan…",
        shortcut: "⇧⌘Q",
        onSelect: withMenuClose(logOut),
      },
    ],
  };

  const focusMenuPanel = (menuId: string) => {
    window.setTimeout(() => {
      const panel = document.querySelector<HTMLElement>(
        `[data-menu-panel="${menuId}"]`,
      );
      const first = panel?.querySelector<HTMLElement>(
        "[role='menuitem']:not([disabled])",
      );
      first?.focus();
    }, 10);
  };

  const handleMenuTrigger = (menuId: string) => {
    closeOverlay();
    setOpenMenu((current) => (current === menuId ? null : menuId));
  };

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    menuId: string,
  ) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpenMenu(menuId);
      focusMenuPanel(menuId);
    }
    if (event.key === "Escape") {
      setOpenMenu(null);
    }
  };

  const handlePanelKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "[role='menuitem']:not([disabled])",
      ),
    );
    if (items.length === 0) return;
    const currentIndex = items.indexOf(
      document.activeElement as HTMLElement,
    );
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex =
      currentIndex < 0
        ? 0
        : (currentIndex + delta + items.length) % items.length;
    items[nextIndex].focus();
  };

  const renderMenu = (menu: MenuGroup) => (
    <div className="menu-bar__menu" key={menu.id}>
      <button
        id={`menu-trigger-${menu.id}`}
        type="button"
        className={`menu-bar__trigger ${menu.isAppMenu ? "is-app-menu" : ""} ${
          openMenu === menu.id ? "is-open" : ""
        }`}
        aria-haspopup="menu"
        aria-expanded={openMenu === menu.id}
        onClick={() => handleMenuTrigger(menu.id)}
        onPointerEnter={() => {
          if (openMenu && openMenu !== menu.id) setOpenMenu(menu.id);
        }}
        onKeyDown={(event) => handleTriggerKeyDown(event, menu.id)}
      >
        {menu.label}
      </button>
      {openMenu === menu.id && (
        <div
          className="menu-popover"
          role="menu"
          aria-label={`${menu.label} menu`}
          data-menu-panel={menu.id}
          onKeyDown={handlePanelKeyDown}
        >
          {menu.entries.map((entry, index) =>
            entry.type === "separator" ? (
              <div
                className="menu-popover__separator"
                role="separator"
                key={`separator-${index}`}
              />
            ) : entry.href ? (
              <a
                key={entry.label}
                className="menu-popover__item"
                role="menuitem"
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  closeMenu();
                  entry.onSelect?.();
                }}
              >
                <span>{entry.label}</span>
                <span className="menu-popover__shortcut" aria-hidden="true">
                  <SystemIcon name="external" size={11} />
                </span>
              </a>
            ) : (
              <button
                key={entry.label}
                type="button"
                role="menuitem"
                className="menu-popover__item"
                disabled={entry.disabled}
                onClick={() => entry.onSelect?.()}
              >
                <span>{entry.label}</span>
                {entry.shortcut && (
                  <span className="menu-popover__shortcut" aria-hidden="true">
                    {entry.shortcut}
                  </span>
                )}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );

  return (
    <header className="menu-bar" ref={menuBarRef}>
      <div className="menu-bar__left">
        <div className="menu-bar__menu">
          <button
            id="menu-trigger-apple"
            type="button"
            className={`menu-bar__trigger menu-bar__apple-trigger ${
              openMenu === "apple" ? "is-open" : ""
            }`}
            aria-label="Apple menu"
            aria-haspopup="menu"
            aria-expanded={openMenu === "apple"}
            onClick={() => handleMenuTrigger("apple")}
            onPointerEnter={() => {
              if (openMenu && openMenu !== "apple") setOpenMenu("apple");
            }}
            onKeyDown={(event) => handleTriggerKeyDown(event, "apple")}
          >
            <SystemIcon name="apple" size={15} />
          </button>
          {openMenu === "apple" && (
            <div
              className="menu-popover menu-popover--apple"
              role="menu"
              aria-label="Apple menu"
              data-menu-panel="apple"
              onKeyDown={handlePanelKeyDown}
            >
              {appleMenu.entries.map((entry, index) =>
                entry.type === "separator" ? (
                  <div
                    className="menu-popover__separator"
                    role="separator"
                    key={`apple-separator-${index}`}
                  />
                ) : (
                  <button
                    key={entry.label}
                    type="button"
                    role="menuitem"
                    className="menu-popover__item"
                    disabled={entry.disabled}
                    onClick={() => entry.onSelect?.()}
                  >
                    <span>{entry.label}</span>
                    {entry.shortcut && (
                      <span
                        className="menu-popover__shortcut"
                        aria-hidden="true"
                      >
                        {entry.shortcut}
                      </span>
                    )}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
        <nav className="menu-bar__menus" aria-label="Application menu">
          {menus.map(renderMenu)}
        </nav>
      </div>

      <div className="menu-bar__right">
        {focusEnabled && (
          <button
            type="button"
            className="menu-bar__status menu-bar__status--icon menu-bar__focus"
            aria-label="Focus is on. Open Control Center."
            title="Focus is on"
            aria-expanded={overlay === "control-center"}
            onClick={() => toggleOverlay("control-center")}
          >
            <SystemIcon name="focus" size={15} />
          </button>
        )}
        <button
          type="button"
          className="menu-bar__status menu-bar__status--icon menu-bar__wifi"
          aria-label={`Wi-Fi is ${
            wifiEnabled ? "on" : "off"
          }. Open Control Center.`}
          title={wifiEnabled ? "Wi-Fi: On" : "Wi-Fi: Off"}
          aria-expanded={overlay === "control-center"}
          onClick={() => toggleOverlay("control-center")}
        >
          <SystemIcon name={wifiEnabled ? "wifi" : "wifi-off"} size={16} />
        </button>
        <span className="menu-bar__status menu-bar__battery" aria-hidden="true">
          <SystemIcon name="battery" size={22} />
        </span>
        <button
          type="button"
          className="menu-bar__status menu-bar__status--icon"
          aria-label="Open Control Center"
          title="Control Center"
          aria-expanded={overlay === "control-center"}
          onClick={() => toggleOverlay("control-center")}
        >
          <SystemIcon name="control-center" size={16} />
        </button>
        <button
          type="button"
          className="menu-bar__status menu-bar__status--icon"
          aria-label="Open Spotlight search"
          title="Spotlight Search"
          onClick={() => openOverlay("spotlight")}
        >
          <SystemIcon name="search" size={16} />
        </button>
        <button
          type="button"
          className="menu-bar__clock"
          aria-label={`${day} ${time || "9:41 AM"}. Open Notification Center.`}
          aria-expanded={overlay === "notification-center"}
          onClick={() => toggleOverlay("notification-center")}
        >
          <span className="menu-bar__date">{day}</span>
          <span>{time || "9:41 AM"}</span>
        </button>
      </div>
    </header>
  );
}
