"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { ProjectArtwork } from "@/components/apps/ProjectArtwork";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { profile } from "@/data/profile";
import { certifications } from "@/data/career";
import { featuredProjects, projects } from "@/data/projects";
import { useFocusTrap } from "@/lib/hooks";
import { resolveWebAddress, webAddressLabel } from "@/lib/web-url";

export function IOSSafariApp({
  onOpenProject,
}: {
  onOpenProject: (slug: string) => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetInputRef = useRef<HTMLInputElement>(null);
  const [webUrl, setWebUrl] = useState<string | null>(null);
  const [webKey, setWebKey] = useState(0);
  const [address, setAddress] = useState("furqan.local");
  const [addressSheetOpen, setAddressSheetOpen] = useState(false);
  const [addressDraft, setAddressDraft] = useState("");

  useFocusTrap(sheetRef, addressSheetOpen, sheetInputRef);

  const openAddressSheet = () => {
    setAddressDraft(address === "furqan.local" ? "" : address);
    setAddressSheetOpen(true);
  };

  const navigate = (raw: string) => {
    const resolved = resolveWebAddress(raw);
    if (!resolved) return;
    setWebUrl(resolved.url);
    setAddress(
      resolved.isSearch
        ? raw.trim()
        : resolved.url.replace(/^https?:\/\//, ""),
    );
    setWebKey((key) => key + 1);
    setAddressSheetOpen(false);
  };

  const submitAddress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (addressDraft.trim().toLowerCase() === "furqan.local") {
      goHome();
      return;
    }
    navigate(addressDraft);
  };

  const goHome = () => {
    setWebUrl(null);
    setAddress("furqan.local");
    setAddressSheetOpen(false);
  };

  const reload = () => {
    if (webUrl) {
      setWebKey((key) => key + 1);
      return;
    }
    viewportRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="ios-app-view ios-safari">
      {webUrl ? (
        <div className="ios-safari__web">
          <iframe
            key={`${webUrl}-${webKey}`}
            src={webUrl}
            title={webAddressLabel(webUrl)}
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
      <div className="ios-app-view__scroll ios-safari__scroll" ref={viewportRef}>
        <article className="ios-site">
          <header className="ios-site__header">
            <span className="ios-site__mark">
              <span>FK</span>
              <span>
                Furqan Khan
                <small>Full-stack developer</small>
              </span>
            </span>
            <span className="ios-site__live">
              <i aria-hidden="true" />
              Open
            </span>
          </header>

          <section className="ios-site__hero">
            <span className="ios-eyebrow">Portfolio / 2026</span>
            <h1>
              Full-stack products,
              <br />
              built from the <em>data model up.</em>
            </h1>
            <p>
              I&apos;m Furqan Khan, founder of FKodeLabs and a full-stack
              developer with an MCA from Manipal University Jaipur. I work
              across the API, the interface, and the systems in between.
            </p>
            <div className="ios-site__hero-actions">
              <a href="#ios-site-work" className="ios-button ios-button--primary">
                Explore work
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="ios-button ios-button--ghost"
              >
                Email me
              </a>
            </div>
            <dl className="ios-site__facts">
              <div>
                <dt>Education</dt>
                <dd>{profile.education}</dd>
              </div>
              <div>
                <dt>Projects</dt>
                <dd>
                  {projects.length} shipped · {certifications.length}{" "}
                  certifications
                </dd>
              </div>
              <div>
                <dt>Company</dt>
                <dd>Founder, FKodeLabs · Dubai</dd>
              </div>
            </dl>
          </section>

          <section className="ios-site__section" id="ios-site-work">
            <div className="ios-site__section-head">
              <span className="ios-eyebrow">01 / Work</span>
              <h2>Systems with real constraints.</h2>
              <p>
                Selected products across commerce, healthcare, learning, and
                second-hand books.
              </p>
            </div>
            <div className="ios-site__work">
              {featuredProjects.map((project) => {
                const screenshot = project.screenshots[0];
                return (
                  <button
                    key={project.slug}
                    type="button"
                    className="ios-site-project"
                    onClick={() => onOpenProject(project.slug)}
                  >
                    <span className="ios-site-project__art">
                      {screenshot ? (
                        <Image
                          src={screenshot.src}
                          alt=""
                          width={screenshot.width}
                          height={screenshot.height}
                          sizes="(max-width: 620px) 85vw, 340px"
                        />
                      ) : (
                        <ProjectArtwork project={project} compact />
                      )}
                    </span>
                    <span className="ios-site-project__copy">
                      <small>{project.category}</small>
                      <strong>{project.name}</strong>
                      <span>{project.tagline}</span>
                    </span>
                    <SystemIcon name="arrow-right" size={14} />
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="ios-site__all-link"
              onClick={() => onOpenProject("")}
            >
              Browse all {projects.length} projects
              <SystemIcon name="chevron-right" size={13} />
            </button>
          </section>

          <section className="ios-site__section ios-site__about">
            <span className="ios-eyebrow">02 / About</span>
            <h2>I care about the parts nobody screenshots.</h2>
            <p>{profile.summary}</p>
            <div className="ios-site__principles">
              {profile.approach.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ios-site__section ios-site__contact">
            <span className="ios-eyebrow">03 / Contact</span>
            <h2>Have a problem worth building for?</h2>
            <p>{profile.availabilityNote}</p>
            <a
              href={`mailto:${profile.email}`}
              className="ios-site__email"
            >
              {profile.email}
              <SystemIcon name="external" size={12} />
            </a>
            <div className="ios-site__socials">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              {profile.socials.twitter && (
                <a
                  href={profile.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  X
                </a>
              )}
              <a href="#ios-site-work">Work</a>
            </div>
          </section>

          <footer className="ios-site__footer">
            <span>Furqan Khan</span>
            <span>An interactive portfolio in your pocket.</span>
          </footer>
        </article>
      </div>
      )}

      <div className="ios-safari__toolbar">
        <button
          type="button"
          className="ios-safari__nav"
          onClick={() => {
            if (webUrl) {
              goHome();
              return;
            }
            viewportRef.current
              ?.querySelector("#ios-site-work")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          aria-label={webUrl ? "Portfolio home" : "Jump to work"}
        >
          <SystemIcon name={webUrl ? "house" : "list"} size={16} />
        </button>
        <button
          type="button"
          className="ios-safari__address"
          onClick={openAddressSheet}
          aria-label="Enter a website or search"
        >
          <SystemIcon name={webUrl ? "globe" : "lock"} size={10} />
          <span>{address}</span>
        </button>
        {webUrl && (
          <a
            href={webUrl}
            target="_blank"
            rel="noreferrer"
            className="ios-safari__nav"
            aria-label="Open in a new browser tab"
          >
            <SystemIcon name="external" size={15} />
          </a>
        )}
        <button
          type="button"
          className="ios-safari__nav"
          onClick={reload}
          aria-label={webUrl ? "Reload page" : "Scroll to top"}
        >
          <SystemIcon name="refresh" size={15} />
        </button>
      </div>

      {addressSheetOpen && (
        <div
          className="ios-browser-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Enter a website"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              setAddressSheetOpen(false);
            }
          }}
        >
          <button
            type="button"
            className="ios-browser-sheet__backdrop"
            aria-label="Close address bar"
            onClick={() => setAddressSheetOpen(false)}
          />
          <div className="ios-browser-sheet__panel" ref={sheetRef}>
            <header className="ios-browser-sheet__header">
              <span>
                <SystemIcon name="globe" size={14} />
                New Page
              </span>
              <button
                type="button"
                onClick={() => setAddressSheetOpen(false)}
                aria-label="Close"
              >
                <SystemIcon name="close" size={13} />
              </button>
            </header>
            <form onSubmit={submitAddress} className="ios-browser-sheet__form">
              <SystemIcon name="search" size={14} />
              <input
                autoFocus
                ref={sheetInputRef}
                value={addressDraft}
                onChange={(event) => setAddressDraft(event.target.value)}
                placeholder="Search the web or enter a website"
                aria-label="Address or search"
                spellCheck={false}
                autoCapitalize="none"
                autoComplete="off"
              />
              <button type="submit">Go</button>
            </form>
            <div className="ios-browser-sheet__links">
              <button
                type="button"
                onClick={() => navigate("https://en.wikipedia.org/wiki/Main_Page")}
              >
                Wikipedia
              </button>
              <button
                type="button"
                onClick={() => navigate("https://openlibrary.org/")}
              >
                Open Library
              </button>
              <button
                type="button"
                onClick={() => navigate("https://example.com")}
              >
                Example
              </button>
            </div>
            <p>
              Web search runs through Marginalia. Some sites refuse to be
              embedded; use “Open in a new tab” when a page stays blank.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
