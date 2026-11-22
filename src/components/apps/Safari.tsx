"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { featuredProjects, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { careerRoles, certifications, education } from "@/data/career";
import { useOS } from "@/lib/os-context";
import { resolveWebAddress, webAddressLabel } from "@/lib/web-url";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { ProjectArtwork } from "./ProjectArtwork";

export function Safari({ section }: { section?: string }) {
  const { openProject, openApp, openResume, isCompact } = useOS();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const [reloadKey, setReloadKey] = useState(0);
  const [webUrl, setWebUrl] = useState<string | null>(null);
  const [addressDraft, setAddressDraft] = useState("furqan.local");
  const [webHistory, setWebHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [webKey, setWebKey] = useState(0);
  const activeProject =
    projects.find((project) => project.slug === activeSlug) ?? projects[0];
  const previewImage = activeProject?.screenshots[0];

  const goHome = () => {
    setWebUrl(null);
    setAddressDraft("furqan.local");
    setReloadKey((key) => key + 1);
  };

  const openWebAddress = (raw: string) => {
    const resolved = resolveWebAddress(raw);
    if (!resolved) return;
    const label = resolved.isSearch
      ? raw.trim()
      : resolved.url.replace(/^https?:\/\//, "");
    setWebUrl(resolved.url);
    setAddressDraft(label);
    const nextHistory = webHistory.slice(0, historyIndex + 1);
    nextHistory.push(resolved.url);
    setWebHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setWebKey((key) => key + 1);
  };

  const submitAddress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openWebAddress(addressDraft);
  };

  const goBackInWeb = () => {
    if (historyIndex <= 0) return;
    const nextIndex = historyIndex - 1;
    const nextUrl = webHistory[nextIndex];
    setHistoryIndex(nextIndex);
    setWebUrl(nextUrl);
    setAddressDraft(nextUrl.replace(/^https?:\/\//, ""));
    setWebKey((key) => key + 1);
  };

  const goForwardInWeb = () => {
    if (historyIndex >= webHistory.length - 1) return;
    const nextIndex = historyIndex + 1;
    const nextUrl = webHistory[nextIndex];
    setHistoryIndex(nextIndex);
    setWebUrl(nextUrl);
    setAddressDraft(nextUrl.replace(/^https?:\/\//, ""));
    setWebKey((key) => key + 1);
  };

  useEffect(() => {
    if (!section) return;
    if (webUrl) {
      setWebUrl(null);
      setAddressDraft("furqan.local");
    }
    const targetId =
      section === "about"
        ? "safari-about"
        : section === "work"
          ? "safari-work"
          : section === "career" || section === "experience"
            ? "safari-career"
            : section === "toolkit"
              ? "safari-toolkit"
              : section === "contact"
                ? "safari-contact"
                : "safari-top";
    const timer = window.setTimeout(() => {
      pageRef.current
        ?.querySelector<HTMLElement>(`#${targetId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [section]);

  const handleReload = () => {
    if (webUrl) {
      setWebKey((key) => key + 1);
      return;
    }
    pageRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setReloadKey((key) => key + 1);
  };

  return (
    <div className="safari">
      <div className="safari__toolbar">
        <div className="safari__nav">
          <button
            type="button"
            className="safari__tool"
            disabled={historyIndex <= 0}
            aria-label="Back"
            title={historyIndex > 0 ? "Back" : "No previous page"}
            onClick={goBackInWeb}
          >
            <SystemIcon name="chevron-left" size={17} />
          </button>
          <button
            type="button"
            className="safari__tool"
            disabled={historyIndex >= webHistory.length - 1}
            aria-label="Forward"
            title={
              historyIndex < webHistory.length - 1
                ? "Forward"
                : "No next page"
            }
            onClick={goForwardInWeb}
          >
            <SystemIcon name="chevron-right" size={17} />
          </button>
          <button
            type="button"
            className="safari__tool"
            onClick={goHome}
            aria-label="Portfolio home"
            title="Portfolio home"
          >
            <SystemIcon name="house" size={15} />
          </button>
        </div>

        <form
          className="safari__address"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            if (addressDraft.trim().toLowerCase() === "furqan.local") {
              goHome();
              return;
            }
            submitAddress(event);
          }}
        >
          <SystemIcon name={webUrl ? "globe" : "lock"} size={11} />
          <input
            value={addressDraft}
            onChange={(event) => setAddressDraft(event.target.value)}
            onFocus={(event) => event.currentTarget.select()}
            aria-label="Address or search"
            placeholder="Search the web or enter a website"
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="off"
          />
          <button
            type="submit"
            className="safari__address-go"
            aria-label="Go to address"
            title="Go"
          >
            <SystemIcon name="arrow-right" size={12} />
          </button>
          <button
            type="button"
            className="safari__reload"
            onClick={handleReload}
            aria-label={webUrl ? "Reload page" : "Reload page and return to the top"}
            title="Reload"
          >
            <span
              className={`safari__reload-icon ${
                reloadKey > 0 ? "is-spinning" : ""
              }`}
              key={reloadKey + webKey}
            >
              <SystemIcon name="refresh" size={13} />
            </span>
          </button>
        </form>

        <div className="safari__toolbar-end">
          {webUrl && (
            <a
              className="safari__open-external"
              href={webUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open the page in a new browser tab"
              title="Open in a new tab"
            >
              <SystemIcon name="external" size={14} />
            </a>
          )}
          <button
            type="button"
            className="safari__resume-button"
            onClick={openResume}
          >
            <SystemIcon name="document" size={13} />
            Resume
          </button>
        </div>
      </div>

      <div
        className={`safari__viewport ${webUrl ? "is-web" : ""}`}
        ref={pageRef}
      >
        {webUrl ? (
          <div className="safari-web">
            <iframe
              key={`${webUrl}-${webKey}`}
              src={webUrl}
              title={webAddressLabel(webUrl)}
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
        <article className="safari-page">
          <header className="safari-site-header">
            <a href="#safari-top" className="safari-site-mark">
              <span>FK</span>
              <span className="safari-site-mark__text">
                Furqan Khan
                <small>Full-stack developer</small>
              </span>
            </a>
            <nav aria-label="Portfolio website">
              <a href="#safari-work">Work</a>
              <a href="#safari-career">Career</a>
              <a href="#safari-about">About</a>
              <a href="#safari-contact">Contact</a>
            </nav>
          </header>

          <section className="safari-hero" id="safari-top">
            <div className="safari-hero__main">
              <p className="safari-hero__eyebrow">
                Portfolio <span aria-hidden="true">/</span> 2026
              </p>
              <h2>
                Full-stack products,
                <br />
                built from the
                <br />
                <em>data model up.</em>
              </h2>
              <p className="safari-hero__intro">
                I&apos;m Furqan Khan, founder of FKodeLabs and a full-stack
                developer with an MCA from Manipal University Jaipur. I work
                across the API, the interface, and the systems in between.
              </p>
              <div className="safari-hero__actions">
                <a className="safari-button safari-button--dark" href="#safari-work">
                  View the work
                  <SystemIcon name="arrow-down" size={14} />
                </a>
                <a
                  className="safari-inline-link"
                  href={`mailto:${profile.email}`}
                >
                  Email me
                  <SystemIcon name="external" size={11} />
                </a>
              </div>
            </div>

            <aside className="safari-hero__aside" aria-label="At a glance">
              <div className="safari-fact">
                <span className="safari-fact__label">Education</span>
                <span>{profile.education}</span>
              </div>
              <div className="safari-fact">
                <span className="safari-fact__label">Company</span>
                <span>Founder, {profile.company}</span>
              </div>
              <div className="safari-fact">
                <span className="safari-fact__label">Projects</span>
                <span>
                  {projects.length} shipped · {certifications.length}{" "}
                  certifications
                </span>
              </div>
              <div className="safari-fact">
                <span className="safari-fact__label">Based in</span>
                <span>{profile.location}</span>
              </div>
              <div className="safari-hero__aside-footer">
                <span className="safari-live-dot" aria-hidden="true" />
                <span>Portfolio OS is open</span>
              </div>
            </aside>
          </section>

          <section className="safari-work" id="safari-work">
            <div className="safari-section-heading">
              <div>
                <span className="safari-section-kicker">01 / Work</span>
                <h3>Systems with real constraints.</h3>
              </div>
              <p>
                Seven projects across commerce, healthcare, learning, books,
                and network systems. Every live demo is linked, with source
                where public.
              </p>
            </div>

            <div className="safari-work__layout">
              <div className="safari-work__list">
                {projects.map((project, index) => (
                  <button
                    key={project.slug}
                    type="button"
                    className={`safari-work-row ${
                      activeProject?.slug === project.slug ? "is-active" : ""
                    }`}
                    onPointerEnter={() => setActiveSlug(project.slug)}
                    onFocus={() => setActiveSlug(project.slug)}
                    onClick={() => openProject(project.slug)}
                  >
                    <span className="safari-work-row__index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="safari-work-row__copy">
                      <span className="safari-work-row__topline">
                        <strong>{project.name}</strong>
                        <SystemIcon name="arrow-right" size={15} />
                      </span>
                      <span className="safari-work-row__category">
                        {project.status} · {project.category}
                      </span>
                      <span className="safari-work-row__tagline">
                        {project.tagline}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              {!isCompact && activeProject && (
                <div className="safari-work__preview" aria-hidden="true">
                  <div className="safari-work-preview">
                    {previewImage ? (
                      <Image
                        src={previewImage.src}
                        alt=""
                        width={previewImage.width}
                        height={previewImage.height}
                        sizes="(max-width: 900px) 0px, 430px"
                      />
                    ) : (
                      <ProjectArtwork project={activeProject} />
                    )}
                    <span className="safari-work-preview__label">
                      <span>{activeProject.name}</span>
                      <span>Open case study</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="safari-work__footer">
              <button
                type="button"
                className="safari-text-link"
                onClick={() => openApp("finder", { section: "projects" })}
              >
                Browse all {projects.length} projects in Finder
                <SystemIcon name="arrow-right" size={13} />
              </button>
            </div>
          </section>

          <section className="safari-career" id="safari-career">
            <div className="safari-section-heading">
              <div>
                <span className="safari-section-kicker">02 / Career</span>
                <h3>Experience that compounds.</h3>
              </div>
              <p>
                Full-stack engineering, AI automation, and marketing
                intelligence across FKodeLabs, Danube Properties, and
                PrepInsta.
              </p>
            </div>

            <div className="safari-career__timeline">
              {careerRoles.map((role) => (
                <article key={role.id} className="safari-career__role">
                  <span className="safari-career__period">{role.period}</span>
                  <div>
                    <h4>
                      {role.role}
                      {role.current && <em>Now</em>}
                    </h4>
                    <p className="safari-career__org">
                      {role.organization} · {role.location}
                    </p>
                    <p>{role.summary}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="safari-career__subhead">
              <div>
                <span className="safari-section-kicker">Credentials</span>
                <h4>Certifications</h4>
              </div>
              <span>
                {certifications.length} verified credentials across AI, project
                delivery, and cybersecurity.
              </span>
            </div>

            <div className="safari-certifications">
              {certifications.map((certification) =>
                certification.credentialUrl ? (
                  <a
                    key={certification.id}
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="safari-certification"
                  >
                    <span>{certification.issuer}</span>
                    <strong>{certification.name}</strong>
                    <small>{certification.issued}</small>
                    <SystemIcon name="external" size={10} />
                  </a>
                ) : (
                  <div key={certification.id} className="safari-certification">
                    <span>{certification.issuer}</span>
                    <strong>{certification.name}</strong>
                    <small>{certification.issued}</small>
                  </div>
                ),
              )}
            </div>

            <div className="safari-career__education">
              <span className="safari-section-kicker">Education</span>
              {education.map((entry) => (
                <div key={entry.id}>
                  <h4>{entry.qualification}</h4>
                  <p>
                    {entry.institution} · {entry.period}
                    {entry.grade ? ` · ${entry.grade}` : ""}
                  </p>
                </div>
              ))}
            </div>

            <div className="safari-work__footer">
              <button
                type="button"
                className="safari-text-link"
                onClick={() => openApp("career")}
              >
                Open the full Career app
                <SystemIcon name="arrow-right" size={13} />
              </button>
            </div>
          </section>

          <section className="safari-about" id="safari-about">
            <div className="safari-about__heading">
              <span className="safari-section-kicker">03 / About</span>
              <h3>I care about the parts nobody screenshots.</h3>
            </div>
            <div className="safari-about__content">
              <p className="safari-about__lead">{profile.summary}</p>
              <p>
                My work tends to start with a system that is harder than it
                first looks: an appointment that can only be claimed once, a
                packet trace that needs to become a readable flow, or a
                marketplace where every used book is a different record. I
                enjoy making those rules concrete in the backend, then giving
                them an interface that does not make the complexity someone
                else&apos;s problem.
              </p>
              <dl className="safari-principles">
                {profile.approach.map((approach, index) => (
                  <div key={approach.title} className="safari-principle">
                    <dt>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {approach.title}
                    </dt>
                    <dd>{approach.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="safari-toolkit" id="safari-toolkit">
            <div className="safari-section-heading safari-section-heading--plain">
              <div>
                <span className="safari-section-kicker">04 / Toolkit</span>
                <h3>The tools I reach for.</h3>
              </div>
            </div>
            <div className="safari-toolkit__grid">
              {Object.entries(profile.skills).map(([group, skills]) => (
                <div className="safari-skill-group" key={group}>
                  <h4>{group}</h4>
                  <ul>
                    {skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="safari-education">
                <span className="safari-section-kicker">Education</span>
                <h4>{profile.educationDetails.degree}</h4>
                <p>{profile.educationDetails.note}</p>
              </div>
            </div>
          </section>

          <section className="safari-contact" id="safari-contact">
            <span className="safari-section-kicker">05 / Contact</span>
            <h3>Have a problem worth building for?</h3>
            <p>{profile.availabilityNote}</p>
            <div className="safari-contact__actions">
              <a
                className="safari-button safari-button--light"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
                <SystemIcon name="external" size={12} />
              </a>
              <a
                className="safari-contact__github"
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
                <SystemIcon name="external" size={11} />
              </a>
              <a
                className="safari-contact__github"
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
                <SystemIcon name="external" size={11} />
              </a>
              {profile.socials.twitter && (
                <a
                  className="safari-contact__github"
                  href={profile.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  X
                  <SystemIcon name="external" size={11} />
                </a>
              )}
            </div>
          </section>

          <footer className="safari-site-footer">
            <span>Furqan Khan</span>
            <span>Designed and built as an interactive macOS portfolio.</span>
            <button type="button" onClick={() => openApp("terminal")}>
              Open the Terminal
            </button>
          </footer>
        </article>
        )}
      </div>
    </div>
  );
}
