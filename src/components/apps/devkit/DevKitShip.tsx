"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import {
  DEVKIT_DOMAIN,
  DEVKIT_REPO,
  useDevkitChecks,
  useDevkitCommits,
  type DevkitCheck,
} from "@/lib/devkit";

const groups: Array<{
  id: DevkitCheck["group"];
  label: string;
  caption: string;
}> = [
  { id: "Assets", label: "Assets", caption: "files & media" },
  { id: "Data", label: "Data", caption: "project index" },
  { id: "Services", label: "Services", caption: "live APIs" },
  { id: "Origin", label: "Origin", caption: "production edge" },
];

function relativeTime(iso: string) {
  const date = new Date(iso);
  const diff = Date.now() - date.getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}
function checkIcon(status: DevkitCheck["status"]) {
  if (status === "pass") return "check";
  if (status === "fail") return "close";
  if (status === "running") return "refresh";
  return "minus";
}

export function DevKitShip() {
  const {
    checks,
    running,
    run,
    lastRun,
    passed,
    failed,
  } = useDevkitChecks();
  const { commits, loading, error, refresh } = useDevkitCommits(3);
  const hasRun = Boolean(lastRun);
  const allPassed = hasRun && checks.every((check) => check.status === "pass");

  const groupStatus = (group: DevkitCheck["group"]) => {
    const groupChecks = checks.filter((check) => check.group === group);
    if (groupChecks.some((check) => check.status === "fail")) return "fail";
    if (groupChecks.some((check) => check.status === "running")) return "running";
    if (groupChecks.every((check) => check.status === "pass")) return "pass";
    return "pending";
  };

  return (
    <div className="devkit-panel devkit-ship">
      <header className="devkit-panel__head">
        <div>
          <span className="devkit-kicker">Release console</span>
          <h2>Ship with receipts.</h2>
          <p>
            Live checks against the assets, services, and production edge behind
            this portfolio. Nothing here is decorative.
          </p>
        </div>
        <button
          type="button"
          className={`devkit-run ${running ? "is-running" : ""}`}
          onClick={() => void run()}
          disabled={running}
        >
          <SystemIcon name={running ? "refresh" : "play"} size={13} />
          {running ? "Running checks" : hasRun ? "Run again" : "Run checks"}
        </button>
      </header>

      <div className="devkit-release">
        <div className="devkit-release__topline">
          <span
            className={`devkit-release__status ${
              allPassed ? "is-good" : failed ? "is-bad" : ""
            }`}
          >
            <i aria-hidden="true" />
            {allPassed
              ? "Production checked"
              : running
                ? "Checking production"
                : failed
                  ? "Needs attention"
                  : "Ready to verify"}
          </span>
          <span className="devkit-release__env">Production · aliased</span>
        </div>
        <div className="devkit-release__domain">
          <span>https://</span>
          {DEVKIT_DOMAIN}
        </div>
        <div className="devkit-release__meta">
          <span>Next.js 16 · Vercel Edge</span>
          <span>
            {hasRun
              ? `${passed}/${checks.length} checks passed`
              : `${checks.length} checks waiting`}
          </span>
          <a href={`https://${DEVKIT_DOMAIN}`} target="_blank" rel="noreferrer">
            Open live
            <SystemIcon name="external" size={11} />
          </a>
        </div>
      </div>

      <div className="devkit-pipeline" aria-label="Release pipeline">
        {groups.map((group, index) => {
          const status = groupStatus(group.id);
          const groupChecks = checks.filter(
            (check) => check.group === group.id,
          );
          return (
            <div
              key={group.id}
              className={`devkit-pipeline__node is-${status}`}
            >
              <span className="devkit-pipeline__index">0{index + 1}</span>
              <span className="devkit-pipeline__dot">
                {status === "pass" ? (
                  <SystemIcon name="check" size={11} />
                ) : status === "fail" ? (
                  <SystemIcon name="close" size={11} />
                ) : (
                  <i aria-hidden="true" />
                )}
              </span>
              <span className="devkit-pipeline__copy">
                <strong>{group.label}</strong>
                <small>{group.caption}</small>
              </span>
              <span className="devkit-pipeline__count">
                {groupChecks.length}
              </span>
            </div>
          );
        })}
      </div>

      <div className="devkit-ship__grid">
        <section className="devkit-checks" aria-label="Live checks">
          <div className="devkit-checks__head">
            <span>Live checks</span>
            <span>
              {lastRun
                ? `last run ${relativeTime(lastRun.toISOString())}`
                : "not run yet"}
            </span>
          </div>
          {checks.map((check) => (
            <div
              key={check.id}
              className={`devkit-check is-${check.status}`}
            >
              <span className="devkit-check__status" aria-hidden="true">
                <SystemIcon
                  name={checkIcon(check.status)}
                  size={11}
                />
              </span>
              <span className="devkit-check__label">
                <strong>{check.label}</strong>
                <small>{check.group}</small>
              </span>
              <span className="devkit-check__detail">{check.detail}</span>
              <span className="devkit-check__time">
                {check.durationMs ? `${check.durationMs}ms` : "—"}
              </span>
            </div>
          ))}
        </section>

        <aside className="devkit-commits" aria-label="Recent commits">
          <div className="devkit-commits__head">
            <span>
              <SystemIcon name="branch" size={11} />
              main
            </span>
            <button
              type="button"
              onClick={() => void refresh()}
              aria-label="Refresh commits"
              title="Refresh commits"
              disabled={loading}
            >
              <SystemIcon name="refresh" size={11} />
            </button>
          </div>
          {loading && (
            <div className="devkit-commits__state">Loading from GitHub…</div>
          )}
          {!loading && error && (
            <div className="devkit-commits__state is-error">
              <span>{error}</span>
              <button type="button" onClick={() => void refresh()}>
                Retry
              </button>
            </div>
          )}
          {!loading &&
            !error &&
            commits.map((commit) => (
              <a
                key={commit.sha}
                className="devkit-commit"
                href={commit.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="devkit-commit__sha">{commit.sha}</span>
                <span className="devkit-commit__message">{commit.message}</span>
                <span className="devkit-commit__meta">
                  {commit.author} · {relativeTime(commit.date)}
                </span>
              </a>
            ))}
          <a
            className="devkit-commits__repo"
            href={`https://github.com/${DEVKIT_REPO}`}
            target="_blank"
            rel="noreferrer"
          >
            View repository
            <SystemIcon name="external" size={10} />
          </a>
        </aside>
      </div>
    </div>
  );
}
