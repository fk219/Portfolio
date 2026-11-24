# Portfolio OS

An interactive macOS and iPhone portfolio for Furqan Khan, built with Next.js 16, React 19, and TypeScript.

**Live:** [furqankhan.dev](https://furqankhan.dev)

The desktop is not a screenshot. It is a small working operating system: the menu bar opens real menus, the Dock launches applications, windows move and resize, desktop widgets sit behind the work, and the portfolio content lives inside Finder, Safari, Mail, Notes, Terminal, DevKit, Photos, Calendar, Music, Career, Links, Preview, and System Settings.

The same portfolio also has a full iPhone experience: a framed phone on desktop, an edge-to-edge home screen on phones, a Dynamic Island, a home indicator, Control Center, a lock screen, and dedicated iOS apps for Projects, Safari, Photos, Resume, Experience, Links, Music, DevKit, Clock, Contact, and Settings.

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

Use `?skipIntro=1` to skip the startup sequence during development or screenshots. Add `?experience=ios` to open directly in the iPhone experience.

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
- Safari with a complete personal site, every project, live project previews, anchor navigation, and a printable resume window.
- A dedicated print stylesheet renders a clean, print-ready resume for PDF export without the desktop chrome.
- Mail composer with validation, mail-app handoff, and copy-address fallback.
- Notes with search, shortcuts, checklists, links, and copy.
- Interactive Terminal with history and commands such as `help`, `projects`, `open`, `theme`, `wallpaper`, `neofetch`, and `exit`.
- Photos gallery and in-window viewer with real project screenshots and generated project artwork.
- Calendar with a working local event store.
- Music with three original 32-second MP3 loops, a shared player, and now-playing state across the desktop, menu bar, and iPhone.
- DevKit with live release checks, real browser telemetry, GitHub commit history, and a sandboxed JavaScript playground.
- System Settings with working appearance, wallpaper, Dock, brightness, experience switching, and reset controls. A fifth Blueprint wallpaper is available for developer mode.
- Career app with the full professional timeline, education, and all nine certifications.
- Links app with GitHub, LinkedIn, X, FKodeLabs, email, and a downloadable resume.
- iPhone experience with a live home screen, Dynamic Island, iOS app chrome, Control Center, lock screen, lock-screen weather and now playing, and a Mac handoff in the status bar.
- Desktop widgets, Dock launch bounce, iPhone switch in the menu bar, and a cinematic handoff between the two operating systems.
- Downloadable two-page PDF resume with experience, selected work, toolkit, education, and certifications.
- Desktop context menu, welcome notification, keyboard shortcuts, reduced-motion support, and dark/light appearances.

The first entering of the desktop is remembered for the browser session. Preferences are stored in local storage.

## Demo access

Every project has a seeded demo path, and the auth screens include one-click buttons where an account is required. See [DEMO_ACCESS.md](DEMO_ACCESS.md) for the account list and project links.

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
- Full-screen iPhone mode with a home-screen grid and dock, live status widgets, scrollable app views, Control Center, Search, and a lock screen. On larger screens the same experience is shown inside a scaled iPhone frame.
- A Control Center and Settings path back to macOS alongside the status-bar Mac switch.

## Project structure

```text
src/
  app/
    globals.css      base tokens, controls, print styles
    layout.tsx       metadata, font, OS provider
    page.tsx         desktop entry point and no-JavaScript fallback
  components/
    apps/            Finder, Safari, Mail, Notes, Photos, Calendar, Music,
                     Terminal, Career, Links, Settings, Preview, Resume,
                     About, Trash
    ios/             iPhone shell, home screen, control center, lock screen,
                     search, and the iOS app suite
    icons/           custom SVG app icons, file icons, and system symbols
    os/              desktop shell, menu bar, Dock, widgets, windows, overlays
  data/
    profile.ts       name, role, bio, company, location, skills, socials
    career.ts        professional timeline, education, certifications
    projects.ts      real project case studies, stacks, links, screenshots
    wallpapers.ts    wallpaper names and descriptions
  lib/               OS state, window manager, hooks, clipboard helpers
  styles/            icons, shell, apps, overlays, career, and iPhone styles
public/
  projects/          screenshots captured from the projects' live deployments
  furqan-khan-resume.pdf
```

## Editing content

Most content is isolated from the shell:

- `src/data/profile.ts` holds identity, summary, company, location, education, skills, contact links, and social profiles.
- `src/data/career.ts` holds the professional timeline, education history, and certification catalogue. The Resume and Career surfaces read from this file.
- `src/data/projects.ts` holds case studies, highlights, stacks, live links, repository links, and screenshot references.
- `src/data/wallpapers.ts` holds wallpaper labels and descriptions.

The current profile uses Furqan Khan's name, FKodeLabs, Dubai, `furqank219@gmail.com`, `github.com/fk219`, `linkedin.com/in/fk219`, and the `@fk219` X handle. The professional timeline, education, and nine certifications were collected from Furqan's public LinkedIn profile. The X handle should be confirmed before publishing because the account is protected.

The project content, screenshots, live URLs, and repository links were collected from the existing project folders, their documentation, and their live deployments. Before publishing, review the provenance and current canonical branch for the experiment projects (`Packet Lab`, `UPI Offline Mesh`, and `Vector Field`), especially where the repositories preserve predecessor implementations.

## Design notes

- The system UI intentionally follows Apple's spatial language: translucency is reserved for system chrome and transient panels, while document content stays legible.
- The macOS experience uses spring-like window motion, Dock magnification and launch bounce, desktop widgets, and a shared wallpaper system. The iPhone experience uses a Dynamic Island, iOS typography, grouped app surfaces, a home indicator, and a device frame on larger screens.
- Inter is used only as a non-Apple fallback for San Francisco. Apple devices receive `-apple-system` and SF Pro first.
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
- `public/furqan-khan-resume.pdf` is generated from the print-only resume surface. Regenerate it after changing `career.ts` or `profile.ts`.
- The X account at `@fk219` matches the portfolio handles but is protected; confirm it is the intended public profile before distribution.
- The Experience and Certifications content reflects the public LinkedIn profile at the time of the build. Employment dates may need refreshing.

## Verification

```bash
npm run build
```

The build includes TypeScript checks, static page generation, and the custom application icon.

The final QA pass covered the macOS desktop at 1440×900, the iPhone experience at 390×844, 320×568, and 844×390 landscape, the desktop and mobile Safari site, Career, Links, Search, Control Center, and the lock screen. The final axe run reported zero WCAG A/AA violations; the remaining incomplete contrast checks depend on the wallpaper behind glass surfaces. The downloadable resume at `public/furqan-khan-resume.pdf` opens as a two-page PDF.
