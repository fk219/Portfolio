"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { featuredProjects, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { musicTracks } from "@/data/music";

export const DEVKIT_REPO = "fk219/Portfolio";
export const DEVKIT_DOMAIN = "furqankhan.dev";

export interface DevkitCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export type DevkitCheckStatus = "pending" | "running" | "pass" | "fail";

export interface DevkitCheck {
  id: string;
  label: string;
  group: "Assets" | "Data" | "Services" | "Origin";
  status: DevkitCheckStatus;
  detail: string;
  durationMs?: number;
}

export interface DevkitDevice {
  viewport: string;
  dpr: number;
  cores: string;
  memory: string;
  platform: string;
  language: string;
  timezone: string;
  online: boolean;
  connection: string;
  touch: boolean;
  theme: string;
  reducedMotion: boolean;
  secure: boolean;
  battery: string;
}

const CHECK_META: Array<{
  id: string;
  label: string;
  group: DevkitCheck["group"];
}> = [
  { id: "resume", label: "Resume PDF", group: "Assets" },
  { id: "music", label: "Music library", group: "Assets" },
  { id: "og", label: "Open Graph image", group: "Assets" },
  { id: "catalogue", label: "Project catalogue", group: "Data" },
  { id: "github", label: "GitHub API", group: "Services" },
  { id: "weather", label: "Weather feed", group: "Services" },
  { id: "origin", label: "Live origin", group: "Origin" },
];

const COMMITS_CACHE_KEY = "devkit-commits-v1";
const COMMITS_TTL = 5 * 60 * 1000;

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function timedFetch(
  url: string,
  init?: RequestInit,
  timeoutMs = 9000,
): Promise<Response> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      ...init,
    });
  } finally {
    window.clearTimeout(timer);
  }
}

async function checkResume() {
  const response = await timedFetch("/furqan-khan-resume.pdf", { method: "HEAD" });
  const type = response.headers.get("content-type") ?? "unknown";
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (!type.includes("pdf")) throw new Error(`Unexpected ${type}`);
  return `200 · ${type}`;
}

async function checkMusic() {
  const responses = await Promise.all(
    musicTracks.map((track) =>
      timedFetch(track.src, { method: "HEAD" }).then((response) => ({
        response,
        track,
      })),
    ),
  );
  const broken = responses.find(
    ({ response }) =>
      !response.ok ||
      !(response.headers.get("content-type") ?? "").includes("audio"),
  );
  if (broken) throw new Error(`${broken.track.title} did not return audio`);
  return `${responses.length} tracks · audio/mpeg`;
}

async function checkOgImage() {
  const response = await timedFetch("/opengraph-image", { method: "HEAD" });
  const type = response.headers.get("content-type") ?? "unknown";
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (!type.includes("image")) throw new Error(`Unexpected ${type}`);
  return `200 · ${type.split(";")[0]}`;
}

async function checkCatalogue() {
  const incomplete = projects.filter(
    (project) => !project.demo && !project.repo,
  );
  if (incomplete.length > 0) {
    throw new Error(`${incomplete.length} projects have no link`);
  }
  const noShot = projects.filter((project) => project.screenshots.length === 0);
  if (noShot.length > 0) throw new Error(`${noShot.length} projects have no shot`);
  return `${projects.length} projects · ${featuredProjects.length} featured`;
}

async function checkGithub() {
  const response = await timedFetch(`https://api.github.com/repos/${DEVKIT_REPO}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  const data = (await response.json()) as {
    stargazers_count?: number;
    default_branch?: string;
    pushed_at?: string;
  };
  const stars = data.stargazers_count ?? 0;
  return `${data.default_branch ?? "main"} · ${
    stars > 0 ? `${stars} stars` : "public repo"
  }`;
}

async function checkWeather() {
  const response = await timedFetch(
    "https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&timezone=Asia%2FDubai",
  );
  if (!response.ok) throw new Error(`Open-Meteo ${response.status}`);
  const data = (await response.json()) as {
    current?: { temperature_2m?: number };
  };
  const temperature = data.current?.temperature_2m;
  if (typeof temperature !== "number") throw new Error("No temperature in response");
  return `${Math.round(temperature)}°C · Dubai`;
}

async function checkOrigin() {
  const response = await timedFetch(window.location.origin, { method: "HEAD" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return `${window.location.protocol}//${window.location.host}`;
}

const CHECK_RUNNERS: Record<string, () => Promise<string>> = {
  resume: checkResume,
  music: checkMusic,
  og: checkOgImage,
  catalogue: checkCatalogue,
  github: checkGithub,
  weather: checkWeather,
  origin: checkOrigin,
};

export function initialChecks(): DevkitCheck[] {
  return CHECK_META.map((check) => ({
    ...check,
    status: "pending",
    detail: "Waiting for a run",
  }));
}

export async function runDevkitChecks(
  onUpdate?: (check: DevkitCheck) => void,
): Promise<DevkitCheck[]> {
  const results: DevkitCheck[] = [];
  for (const meta of CHECK_META) {
    const running: DevkitCheck = {
      ...meta,
      status: "running",
      detail: "Checking…",
    };
    onUpdate?.(running);
    await delay(100);
    const startedAt = performance.now();
    try {
      const detail = await CHECK_RUNNERS[meta.id]();
      const check: DevkitCheck = {
        ...meta,
        status: "pass",
        detail,
        durationMs: Math.round(performance.now() - startedAt),
      };
      results.push(check);
      onUpdate?.(check);
    } catch (error) {
      const check: DevkitCheck = {
        ...meta,
        status: "fail",
        detail:
          error instanceof Error
            ? error.message.replace(/^Error:\s*/, "")
            : "Check failed",
        durationMs: Math.round(performance.now() - startedAt),
      };
      results.push(check);
      onUpdate?.(check);
    }
    await delay(70);
  }
  return results;
}

export function useDevkitChecks() {
  const [checks, setChecks] = useState<DevkitCheck[]>(initialChecks);
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState<Date | null>(null);

  const run = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setChecks(initialChecks());
    try {
      await runDevkitChecks((update) => {
        setChecks((current) =>
          current.map((check) => (check.id === update.id ? update : check)),
        );
      });
      setLastRun(new Date());
    } finally {
      setRunning(false);
    }
  }, [running]);

  return {
    checks,
    running,
    lastRun,
    run,
    passed: checks.filter((check) => check.status === "pass").length,
    failed: checks.filter((check) => check.status === "fail").length,
  };
}

function readCommitCache(): DevkitCommit[] | null {
  try {
    const raw = window.sessionStorage.getItem(COMMITS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { savedAt: number; commits: DevkitCommit[] };
    if (Date.now() - parsed.savedAt > COMMITS_TTL) return null;
    return parsed.commits;
  } catch {
    return null;
  }
}

function writeCommitCache(commits: DevkitCommit[]) {
  try {
    window.sessionStorage.setItem(
      COMMITS_CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), commits }),
    );
  } catch {
    // Cache is optional.
  }
}

export async function fetchDevkitCommits(limit = 3): Promise<DevkitCommit[]> {
  const cached = readCommitCache();
  if (cached) return cached.slice(0, limit);

  const response = await timedFetch(
    `https://api.github.com/repos/${DEVKIT_REPO}/commits?per_page=${limit}`,
    { headers: { Accept: "application/vnd.github+json" } },
    10000,
  );
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  const data = (await response.json()) as Array<{
    sha: string;
    html_url: string;
    commit: {
      message: string;
      author?: { name?: string; date?: string };
      committer?: { name?: string; date?: string };
    };
  }>;
  const commits = data.map((entry) => ({
    sha: entry.sha.slice(0, 7),
    message: entry.commit.message.split("\n")[0],
    author:
      entry.commit.author?.name ?? entry.commit.committer?.name ?? "FK",
    date:
      entry.commit.author?.date ??
      entry.commit.committer?.date ??
      new Date().toISOString(),
    url: entry.html_url,
  }));
  writeCommitCache(commits);
  return commits;
}

export function useDevkitCommits(limit = 3) {
  const [commits, setCommits] = useState<DevkitCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await fetchDevkitCommits(limit);
      if (mounted.current) setCommits(next);
    } catch (caught) {
      if (mounted.current) {
        setError(caught instanceof Error ? caught.message : "Could not load commits");
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    mounted.current = true;
    void load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  return { commits, loading, error, refresh: load };
}

export function readDeviceSnapshot(): DevkitDevice {
  if (typeof window === "undefined") {
    return {
      viewport: "—",
      dpr: 1,
      cores: "—",
      memory: "—",
      platform: "—",
      language: "—",
      timezone: "—",
      online: true,
      connection: "—",
      touch: false,
      theme: "Light",
      reducedMotion: false,
      secure: false,
      battery: "—",
    };
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { effectiveType?: string; downlink?: number };
    userAgentData?: { platform?: string };
  };
  const memory = nav.deviceMemory;
  const connection = nav.connection;

  return {
    viewport: `${window.innerWidth} × ${window.innerHeight}`,
    dpr: window.devicePixelRatio,
    cores: nav.hardwareConcurrency ? `${nav.hardwareConcurrency} threads` : "—",
    memory: memory ? `${memory} GB` : "Not exposed",
    platform: nav.userAgentData?.platform ?? nav.platform ?? "Browser",
    language: nav.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    online: nav.onLine,
    connection: connection?.effectiveType
      ? `${connection.effectiveType.toUpperCase()}${
          connection.downlink ? ` · ${connection.downlink} Mb/s` : ""
        }`
      : "—",
    touch: nav.maxTouchPoints > 0,
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "Dark"
      : "Light",
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    secure: window.isSecureContext,
    battery: "—",
  };
}

async function readBattery(): Promise<string> {
  const nav = navigator as Navigator & {
    getBattery?: () => Promise<{
      level: number;
      charging: boolean;
    }>;
  };
  if (!nav.getBattery) return "Not exposed";
  try {
    const battery = await nav.getBattery();
    return `${Math.round(battery.level * 100)}%${
      battery.charging ? " · charging" : ""
    }`;
  } catch {
    return "Not exposed";
  }
}

export function useDeviceSnapshot() {
  const [device, setDevice] = useState<DevkitDevice | null>(null);

  const refresh = useCallback(async () => {
    const snapshot = readDeviceSnapshot();
    const battery = await readBattery();
    setDevice({ ...snapshot, battery });
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), 30000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  return { device, refresh };
}

export interface PlaygroundResult {
  ok: boolean;
  output: string;
  durationMs: number;
}

function formatValue(value: unknown): string {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return value;
  if (typeof value === "function") {
    return `[Function ${value.name || "anonymous"}]`;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  try {
    const json = JSON.stringify(value, null, 2);
    if (json === undefined) return String(value);
    return json.length > 5000 ? `${json.slice(0, 5000)}\n…` : json;
  } catch {
    return String(value);
  }
}

export async function evaluatePlaygroundExpression(
  code: string,
): Promise<PlaygroundResult> {
  const startedAt = performance.now();
  try {
    const fn = new Function(
      "projects",
      "featuredProjects",
      "profile",
      `"use strict"; return (${code});`,
    );
    const value = await Promise.resolve(
      fn(projects, featuredProjects, profile),
    );
    return {
      ok: true,
      output: formatValue(value),
      durationMs: Math.round(performance.now() - startedAt),
    };
  } catch (error) {
    return {
      ok: false,
      output: error instanceof Error ? error.message : "Evaluation failed",
      durationMs: Math.round(performance.now() - startedAt),
    };
  }
}

export const PLAYGROUND_SNIPPETS = [
  {
    id: "portfolio",
    label: "Portfolio snapshot",
    code: `const featured = PROJECTS.filter((project) => project.featured);
console.log(\`\${PROJECTS.length} projects, \${featured.length} featured\`);
console.log(featured.map((project) => project.name).join(" · "));`,
  },
  {
    id: "average",
    label: "Find the bug",
    code: `function average(values) {
  return values.reduce((sum, value) => sum + value) / values.length;
}
console.log("Average:", average([8, 9, 10, 7]));`,
  },
  {
    id: "debounce",
    label: "Debounce",
    code: `function debounce(callback, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), wait);
  };
}
const settle = debounce((value) => console.log("settled:", value), 80);
["a", "b", "c"].forEach((value, index) =>
  setTimeout(() => settle(value), index * 20)
);`,
  },
  {
    id: "async",
    label: "Async",
    code: `const results = await Promise.all(
  [40, 80, 120].map(async (ms) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    return \`\${ms}ms\`;
  })
);
console.log("Resolved:", results.join(" · "));`,
  },
] as const;

export const IOS_PLAYGROUND_SNIPPETS = [
  { id: "count", label: "Projects", code: "projects.length" },
  {
    id: "stack",
    label: "Newest stack",
    code: "projects[0].stack.join(\" · \")",
  },
  { id: "featured", label: "Featured", code: "featuredProjects.map((p) => p.name)" },
  { id: "role", label: "Whoami", code: "profile.role" },
  { id: "longest", label: "Longest name", code: "projects.map((p) => p.name).sort((a, b) => b.length - a.length)[0]" },
] as const;
