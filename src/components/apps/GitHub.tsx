"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { useDevkitCommits } from "@/lib/devkit";
import { useGithubProfile } from "@/lib/github-profile";
import { useOS } from "@/lib/os-context";

function relativeDate(iso: string) {
  const date = new Date(iso);
  const days = Math.round((Date.now() - date.getTime()) / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.round(days / 30)}mo ago`;
  return `${Math.round(days / 365)}y ago`;
}

export function GitHub() {
  const { openResume, openApp } = useOS();
  const { user, repos, loading, error, refresh } = useGithubProfile();
  const { commits } = useDevkitCommits(4);
  const pinned = projects.filter((project) => project.repo).slice(0, 6);
  const latest = repos.filter((repo) => !repo.fork).slice(0, 6);
  const name = user?.name ?? profile.name;
  const login = user?.login ?? "fk219";
  const bio = user?.bio ?? profile.shorterSummary;
  const stats = user
    ? [
        ["Repositories", user.public_repos],
        ["Followers", user.followers],
        ["Following", user.following],
        ["Joined", new Date(user.created_at).getFullYear()],
      ]
    : [
        ["Portfolio apps", projects.length],
        ["Case studies", projects.filter((p) => p.status === "Case study").length],
        ["Certifications", 9],
        ["Location", "Dubai"],
      ];

  return (
    <div className="github-app">
      <div className="github-app__topbar">
        <span className="github-app__mark">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.35-3.87-1.35-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.08.78 2.17v3.22c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="github-app__wordmark">GitHub</span>
        <span className="github-app__handle">@{login}</span>
        <div className="github-app__top-actions">
          <button type="button" onClick={() => void refresh()} disabled={loading}>
            <SystemIcon name="refresh" size={12} />
            Refresh
          </button>
          <button type="button" onClick={openResume}>
            <SystemIcon name="document" size={12} />
            Resume
          </button>
          <a href={profile.socials.github} target="_blank" rel="noreferrer">
            Open GitHub
            <SystemIcon name="external" size={11} />
          </a>
        </div>
      </div>

      <div className="github-app__scroll">
        {error && (
          <div className="github-app__error" role="status">
            <SystemIcon name="alert" size={14} />
            <span>
              Live GitHub data is unavailable ({error}). The curated profile is
              still below.
            </span>
            <button type="button" onClick={() => void refresh()}>
              Retry
            </button>
          </div>
        )}

        <header className="github-app__hero">
          <span className="github-app__avatar">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt=""
                referrerPolicy="no-referrer"
              />
            ) : (
              "FK"
            )}
          </span>
          <div className="github-app__identity">
            <span className="github-app__eyebrow">Developer profile</span>
            <h2>{name}</h2>
            <span className="github-app__login">@{login}</span>
            <p>{bio}</p>
            <div className="github-app__meta">
              {user?.location && (
                <span>
                  <SystemIcon name="pin" size={11} />
                  {user.location}
                </span>
              )}
              <span>
                <SystemIcon name="branch" size={11} />
                github.com/{login}
              </span>
              <span>
                <SystemIcon name="globe" size={11} />
                {user?.blog || "furqankhan.dev"}
              </span>
            </div>
          </div>
          <div className="github-app__hero-actions">
            <a
              className="github-app__primary"
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
            >
              Follow on GitHub
              <SystemIcon name="external" size={11} />
            </a>
            <button type="button" onClick={() => openApp("linkedin")}>
              LinkedIn
              <SystemIcon name="arrow-right" size={11} />
            </button>
          </div>
        </header>

        <div className="github-app__stats">
          {stats.map(([label, value]) => (
            <span key={label}>
              <strong>{value}</strong>
              {label}
            </span>
          ))}
        </div>

        <div className="github-app__columns">
          <main className="github-app__main">
            <section className="github-app__card">
              <header className="github-app__card-head">
                <span>Pinned work</span>
                <span>{pinned.length} repositories</span>
              </header>
              <div className="github-app__pinned">
                {pinned.map((project) => (
                  <a
                    key={project.slug}
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="github-app__repo-name">
                      <SystemIcon name="folder" size={12} />
                      {project.repo?.split("/").slice(-1)[0]}
                    </span>
                    <p>{project.tagline}</p>
                    <span className="github-app__repo-meta">
                      <i aria-hidden="true" />
                      {project.stack[0]}
                      <span>Portfolio project</span>
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section className="github-app__card">
              <header className="github-app__card-head">
                <span>Recent repositories</span>
                <span>{loading ? "loading…" : `${latest.length} shown`}</span>
              </header>
              {latest.map((repo) => (
                <a
                  key={repo.id}
                  className="github-app__repo"
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="github-app__repo-name">
                    <SystemIcon name="folder" size={11} />
                    {repo.name}
                  </span>
                  <p>{repo.description ?? "No description yet."}</p>
                  <span className="github-app__repo-meta">
                    <i aria-hidden="true" />
                    {repo.language ?? "Code"}
                    <span>{repo.stargazers_count} stars</span>
                    <span>updated {relativeDate(repo.pushed_at)}</span>
                  </span>
                </a>
              ))}
              {!loading && latest.length === 0 && (
                <p className="github-app__empty">No public repositories returned.</p>
              )}
            </section>
          </main>

          <aside className="github-app__aside">
            <section className="github-app__card">
              <header className="github-app__card-head">
                <span>Latest commits</span>
                <span>main</span>
              </header>
              {commits.length === 0 && (
                <p className="github-app__empty">Loading activity…</p>
              )}
              {commits.map((commit) => (
                <a
                  key={commit.sha}
                  className="github-app__commit"
                  href={commit.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{commit.sha}</span>
                  <strong>{commit.message}</strong>
                  <small>{relativeDate(commit.date)}</small>
                </a>
              ))}
            </section>

            <section className="github-app__card">
              <header className="github-app__card-head">
                <span>Stack</span>
                <span>repo signals</span>
              </header>
              <div className="github-app__stack">
                {Object.entries(profile.skills).map(([group, skills]) => (
                  <div key={group}>
                    <strong>{group}</strong>
                    <p>{skills.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
