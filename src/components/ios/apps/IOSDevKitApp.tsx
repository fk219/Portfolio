"use client";

import { useState, type KeyboardEvent } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { useFrameRate } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import {
  DEVKIT_DOMAIN,
  DEVKIT_REPO,
  IOS_PLAYGROUND_SNIPPETS,
  evaluatePlaygroundExpression,
  useDeviceSnapshot,
  useDevkitChecks,
  useDevkitCommits,
  type DevkitCheck,
} from "@/lib/devkit";
import { projects, featuredProjects } from "@/data/projects";

type DevKitTab = "ship" | "system" | "run";

const tabs: Array<{ id: DevKitTab; label: string }> = [
  { id: "ship", label: "Ship" },
  { id: "system", label: "System" },
  { id: "run", label: "Run" },
];

function checkIcon(status: DevkitCheck["status"]) {
  if (status === "pass") return "check";
  if (status === "fail") return "close";
  if (status === "running") return "refresh";
  return "minus";
}

function relativeTime(iso: string) {
  const date = new Date(iso);
  const minutes = Math.round((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function IOSDevKitApp() {
  const [tab, setTab] = useState<DevKitTab>("ship");
  const {
    checks,
    running,
    lastRun,
    run,
    passed,
    failed,
  } = useDevkitChecks();
  const { commits, loading, error, refresh } = useDevkitCommits(3);
  const { device, refresh: refreshDevice } = useDeviceSnapshot();
  const { fps, history } = useFrameRate();
  const { settings, updateSettings } = useOS();
  const [expression, setExpression] = useState("projects.length");
  const [result, setResult] = useState<{
    ok: boolean;
    output: string;
    durationMs: number;
  } | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  const allPassed = lastRun && checks.every((check) => check.status === "pass");
  const peak = Math.max(60, ...history, 1);
  const sparkPoints =
    history.length > 1
      ? history
          .map((value, index) => {
            const x = (index / (history.length - 1)) * 100;
            const y = 34 - (value / peak) * 28;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          })
          .join(" ")
      : "0,34 100,34";

  const execute = async () => {
    if (!expression.trim() || evaluating) return;
    setEvaluating(true);
    const next = await evaluatePlaygroundExpression(expression);
    setResult(next);
    setEvaluating(false);
    if (typeof navigator.vibrate === "function") {
      navigator.vibrate(next.ok ? 12 : [18, 40, 18]);
    }
  };

  const handleExpressionKey = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      void execute();
    }
  };

  const runChecks = () => {
    void run();
    if (typeof navigator.vibrate === "function") navigator.vibrate(10);
  };

  return (
    <div className="ios-app-view ios-devkit">
      <div className="ios-app-view__scroll ios-devkit__scroll">
        <header className="ios-devkit__header">
          <span className="ios-devkit__mark">DK</span>
          <span className="ios-devkit__title">
            <span className="ios-eyebrow">PortfolioOS</span>
            <h1>DevKit</h1>
          </span>
          <span className="ios-devkit__mode">
            <i aria-hidden="true" />
            local
          </span>
        </header>

        <div
          className="ios-devkit__segments"
          role="tablist"
          aria-label="DevKit sections"
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={tab === item.id ? "is-active" : ""}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === "ship" && (
          <div className="ios-devkit-ship">
            <section className="ios-devkit-hero">
              <div className="ios-devkit-hero__top">
                <span
                  className={`ios-devkit-hero__status ${
                    allPassed ? "is-good" : failed ? "is-bad" : ""
                  }`}
                >
                  <i aria-hidden="true" />
                  {allPassed
                    ? "Checked"
                    : running
                      ? "Running"
                      : failed
                        ? "Attention"
                        : "Production"}
                </span>
                <span>v1.0.0</span>
              </div>
              <span className="ios-devkit-hero__label">Live at</span>
              <strong className="ios-devkit-hero__domain">
                {DEVKIT_DOMAIN}
              </strong>
              <div className="ios-devkit-hero__meta">
                <span>Next.js · Vercel Edge</span>
                <a href={`https://${DEVKIT_DOMAIN}`} target="_blank" rel="noreferrer">
                  Open
                  <SystemIcon name="external" size={10} />
                </a>
              </div>
            </section>

            <div className="ios-devkit-actions">
              <button
                type="button"
                className={`ios-devkit-run ${running ? "is-running" : ""}`}
                onClick={runChecks}
                disabled={running}
              >
                <SystemIcon
                  name={running ? "refresh" : "play"}
                  size={13}
                />
                {running ? "Running checks…" : "Run live checks"}
                <span>
                  {passed}/{checks.length}
                </span>
              </button>
              <small>
                {lastRun
                  ? `Last run ${relativeTime(lastRun.toISOString())}`
                  : "Assets · services · origin"}
              </small>
            </div>

            <section className="ios-devkit-card">
              <header className="ios-devkit-card__head">
                <span>Release checks</span>
                <span>{failed ? `${failed} failed` : "real requests"}</span>
              </header>
              {checks.map((check) => (
                <div
                  key={check.id}
                  className={`ios-devkit-check is-${check.status}`}
                >
                  <span className="ios-devkit-check__status" aria-hidden="true">
                    <SystemIcon name={checkIcon(check.status)} size={11} />
                  </span>
                  <span className="ios-devkit-check__copy">
                    <strong>{check.label}</strong>
                    <small>{check.detail}</small>
                  </span>
                  <span className="ios-devkit-check__time">
                    {check.durationMs ? `${check.durationMs}ms` : "—"}
                  </span>
                </div>
              ))}
            </section>

            <section className="ios-devkit-card">
              <header className="ios-devkit-card__head">
                <span>Latest from main</span>
                <button
                  type="button"
                  onClick={() => void refresh()}
                  aria-label="Refresh commits"
                >
                  <SystemIcon name="refresh" size={12} />
                </button>
              </header>
              {loading && (
                <p className="ios-devkit-card__empty">Loading GitHub…</p>
              )}
              {!loading && error && (
                <div className="ios-devkit-card__empty">
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
                    className="ios-devkit-commit"
                    href={commit.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="ios-devkit-commit__sha">{commit.sha}</span>
                    <span className="ios-devkit-commit__copy">
                      <strong>{commit.message}</strong>
                      <small>
                        {commit.author} · {relativeTime(commit.date)}
                      </small>
                    </span>
                    <SystemIcon name="chevron-right" size={12} />
                  </a>
                ))}
              <a
                className="ios-devkit-card__link"
                href={`https://github.com/${DEVKIT_REPO}`}
                target="_blank"
                rel="noreferrer"
              >
                Open repository
                <SystemIcon name="external" size={10} />
              </a>
            </section>
          </div>
        )}

        {tab === "system" && (
          <div className="ios-devkit-system">
            <div className="ios-devkit-metrics">
              <div className="ios-devkit-metric is-wide">
                <span>Render loop</span>
                <strong>
                  {fps || "—"}
                  <small>fps</small>
                </strong>
                <svg
                  viewBox="0 0 100 36"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d={`M${sparkPoints.replaceAll(" ", " L")}`}
                    fill="none"
                    stroke="#b8f25c"
                    strokeWidth="1.4"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <div className="ios-devkit-metric">
                <span>Viewport</span>
                <strong>{device?.viewport ?? "—"}</strong>
                <small>DPR {device?.dpr ?? "—"}</small>
              </div>
              <div className="ios-devkit-metric">
                <span>Compute</span>
                <strong>{device?.cores ?? "—"}</strong>
                <small>{device?.memory ?? "—"}</small>
              </div>
              <div className="ios-devkit-metric">
                <span>Network</span>
                <strong>{device?.online ? "Online" : "Offline"}</strong>
                <small>{device?.connection ?? "—"}</small>
              </div>
              <div className="ios-devkit-metric is-compact">
                <span>Battery</span>
                <strong>{device?.battery ?? "—"}</strong>
                <small>{device?.touch ? "touch display" : "pointer"}</small>
              </div>
            </div>

            <section className="ios-devkit-card">
              <header className="ios-devkit-card__head">
                <span>Device surface</span>
                <button
                  type="button"
                  onClick={() => void refreshDevice()}
                  aria-label="Refresh device details"
                >
                  <SystemIcon name="refresh" size={12} />
                </button>
              </header>
              {[
                ["Platform", device?.platform],
                ["Language", device?.language],
                ["Timezone", device?.timezone],
                ["Theme", device?.theme],
                ["Reduced motion", device?.reducedMotion ? "On" : "Off"],
                ["Secure context", device?.secure ? "Yes" : "No"],
              ].map(([label, value]) => (
                <div className="ios-devkit-row" key={label}>
                  <span>{label}</span>
                  <strong>{value ?? "—"}</strong>
                </div>
              ))}
            </section>

            <section className="ios-devkit-card">
              <header className="ios-devkit-card__head">
                <span>Portfolio inventory</span>
                <span>data/projects.ts</span>
              </header>
              <div className="ios-devkit-inventory">
                <span>
                  <strong>{projects.length}</strong>
                  projects
                </span>
                <span>
                  <strong>{featuredProjects.length}</strong>
                  featured
                </span>
                <span>
                  <strong>
                    {
                      projects.filter(
                        (project) => project.status === "Experiment",
                      ).length
                    }
                  </strong>
                  experiments
                </span>
              </div>
            </section>

            <section className="ios-devkit-card ios-devkit-workbench">
              <div>
                <strong>Blueprint wallpaper</strong>
                <small>
                  Set the developer desktop. The grid travels with the OS.
                </small>
              </div>
              <button
                type="button"
                onClick={() => updateSettings({ wallpaper: "blueprint" })}
                disabled={settings.wallpaper === "blueprint"}
              >
                {settings.wallpaper === "blueprint" ? "Applied" : "Apply"}
              </button>
            </section>
          </div>
        )}

        {tab === "run" && (
          <div className="ios-devkit-run-panel">
            <section className="ios-devkit-card ios-devkit-console">
              <header className="ios-devkit-card__head">
                <span>Expression console</span>
                <span>local JS</span>
              </header>
              <div className="ios-devkit-snippets">
                {IOS_PLAYGROUND_SNIPPETS.map((snippet) => (
                  <button
                    key={snippet.id}
                    type="button"
                    onClick={() => {
                      setExpression(snippet.code);
                      setResult(null);
                    }}
                  >
                    {snippet.label}
                  </button>
                ))}
              </div>
              <textarea
                value={expression}
                onChange={(event) => setExpression(event.target.value)}
                onKeyDown={handleExpressionKey}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="JavaScript expression"
                rows={3}
              />
              <button
                type="button"
                className="ios-devkit-evaluate"
                onClick={() => void execute()}
                disabled={evaluating || !expression.trim()}
              >
                <SystemIcon
                  name={evaluating ? "refresh" : "play"}
                  size={12}
                />
                {evaluating ? "Evaluating…" : "Evaluate"}
              </button>
            </section>

            <section className="ios-devkit-output" aria-live="polite">
              <header>
                <span>Tape</span>
                {result && <span>{result.durationMs}ms</span>}
              </header>
              {result ? (
                <pre className={result.ok ? "" : "is-error"}>
                  {result.ok ? "" : "× "}
                  {result.output}
                </pre>
              ) : (
                <p>
                  Try <code>projects.length</code> or load a snippet. Runs
                  locally, against this portfolio’s own data.
                </p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
