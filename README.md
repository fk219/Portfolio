# Portfolio OS

An interactive macOS-inspired portfolio for Furqan Khan, built with Next.js 16, React 19, and TypeScript.

The desktop is not a screenshot. It is a small working operating system: the menu bar opens real menus, the Dock launches applications, windows move and resize, and the portfolio content lives inside Finder, Safari, Mail, Notes, Terminal, Photos, Calendar, Music, Preview, and System Settings.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` when deploying so Open Graph and canonical metadata resolve against the public domain. Vercel deployments fall back to `VERCEL_URL` automatically.

Use `?skipIntro=1` to skip the startup sequence during development or screenshots.

## What is included

- Boot, login, lock, sleep, and shut-down screens.
- Functional macOS-style menu bar with Apple, app, File, Edit, View, Go, Window, and Help menus.
- Focus-aware windows with drag, resize, minimize, zoom, close, and window stacking.
- Magnifying Dock with running indicators, tooltips, optional Preview app, and mobile adaptation.
- Spotlight search with keyboard navigation across apps, projects, and actions.
- Launchpad with search and a full app grid.
- Control Center with Wi-Fi, Bluetooth, Focus, appearance, brightness, wallpaper, and quick system actions.
- Notification Center with live date, calendar widget, Focus control, and dismissible onboarding tips.
- Finder with project filters, search, sort, grid/list views, a preview pane, and project case studies.
- Safari with a complete personal site, all seven projects, live project previews, anchor navigation, and a printable resume window.
- A dedicated print stylesheet renders a clean one-page resume for PDF export without the desktop chrome.
- Mail composer with validation, mail-app handoff, and copy-address fallback.
- Notes with search, shortcuts, checklists, links, and copy.
- Interactive Terminal with history and commands such as `help`, `projects`, `open`, `theme`, `wallpaper`, `neofetch`, and `exit`.
- Photos gallery and in-window viewer with real project screenshots and generated project artwork.
- Calendar with a working local event store.
- Music with three generated Web Audio soundscapes and no audio assets.
- System Settings with working appearance, wallpaper, Dock, brightness, and reset controls.
- Desktop context menu, welcome notification, keyboard shortcuts, reduced-motion support, and dark/light appearances.

The first entering of the desktop is remembered for the browser session. Preferences are stored in local storage.

### Mobile

The desktop has a dedicated compact mode for phones, small tablets, and narrow browser windows. It includes:

- Full-screen app windows with touch-sized window and toolbar controls.
- A six-app Dock with 44 px targets, plus Launchpad for every app.
- A touch-specific Launchpad with search, a close control, and a wrapping app grid.
- A compact menu bar, touch-safe Control Center, and a full-screen Notification Center with an explicit close button.
- A responsive Finder with three equal filter tabs, a touch search field, and two-column project grid.
- Safari with a mobile toolbar, a visible Resume shortcut, a wrapped site header on narrow phones, and no horizontal page overflow.
- Mobile Mail, Notes, Photos, Calendar, Music, Terminal, Settings, Preview, Resume, and About layouts.
- Safe-area support for notched and home-indicator devices, 16 px form fields to avoid iOS input zoom, and landscape adaptations.
- Large touch targets for navigation, form actions, photo controls, and playback controls.

## Project structure

```text
src/
  app/
    globals.css      base tokens, controls, print styles
    layout.tsx       metadata, font, OS provider
    page.tsx         desktop entry point and no-JavaScript fallback
  components/
    apps/            Finder, Safari, Mail, Notes, Photos, Calendar, Music,
                     Terminal, Settings, Preview, About, Resume, Trash
    icons/           custom SVG app icons, file icons, and system symbols
    os/              desktop shell, menu bar, Dock, windows, overlays, screens
  data/
    profile.ts       name, role, bio, education, skills, contact links
    projects.ts      real project case studies, stacks, links, screenshots
    wallpapers.ts    wallpaper names and descriptions
  lib/               OS state, window manager, hooks, clipboard helpers
  styles/            icons, shell, apps, and overlays
public/
  projects/          screenshots captured from the projects' live deployments
```

## Editing content

Most content is isolated from the shell:

- `src/data/profile.ts` holds identity, summary, education, skills, and links.
- `src/data/projects.ts` holds case studies, highlights, stacks, live links, repository links, and screenshot references.
- `src/data/wallpapers.ts` holds wallpaper labels and descriptions.

The current profile uses Furqan Khan's name, Master of Computer Applications, `furqank219@gmail.com`, and `github.com/fk219`, sourced from the workspace repositories and local Git configuration. Replace those values if any are not the final public contact details.

The project content, screenshots, live URLs, and repository links were collected from the existing project folders, their documentation, and their live deployments. Before publishing, review the provenance and current canonical branch for the experiment projects (`Packet Lab`, `UPI Offline Mesh`, and `Vector Field`), especially where the repositories preserve predecessor implementations.

## Design notes

- The system UI intentionally follows Apple's spatial language: translucency is reserved for system chrome and transient panels, while document content stays legible.
- Inter is used only as a non-Apple fallback for San Francisco. macOS visitors receive `-apple-system` and SF Pro first.
- Wallpapers are original SVG scenes built for this portfolio. They are not Apple assets.
- App icons and file icons are original SVG constructions; no third-party icon library is used.
- The default wallpaper is Hunza Dawn, a quiet mountain horizon made for this desktop.
- This is an independent portfolio experience and is not affiliated with Apple Inc.

## Keyboard

| Shortcut | Action |
| --- | --- |
| `Cmd/Ctrl + K` or `Cmd/Ctrl + Space` | Spotlight |
| `F4` | Launchpad |
| `Cmd/Ctrl + W` | Close active window |
| `Cmd/Ctrl + M` or `Cmd/Ctrl + H` | Minimize active window |
| `Cmd/Ctrl + O` | Open projects folder |
| `Cmd/Ctrl + ,` | System Settings |
| `Option/Alt + Cmd/Ctrl + W` | Close all windows |
| `Ctrl + Cmd + Q` | Lock screen |
| `Shift + Cmd + Q` | Log out |
| `Escape` | Close the current overlay or panel |

All windows, forms, menus, and launchers are keyboard reachable. Focus indicators are visible, dialogs close with Escape, and reduced-motion preferences are respected.

## Notes and limitations

- Mail is a front-end composer. It opens the visitor's mail app with a prefilled message; nothing is sent by the website.
- Calendar events are stored locally in the browser.
- Music is synthesized in the browser with the Web Audio API. There are no recordings.
- There is no server or database in this project. Project links point to their existing live deployments and repositories.
- The Hooked on Cakes repository is private, so its project entry links to the live storefront and admin demo instead of a source repository.
- The screenshots under `public/projects` were captured from the projects' live deployments.

## Verification

```bash
npm run build
```

The build includes TypeScript checks, static page generation, and the custom application icon.
