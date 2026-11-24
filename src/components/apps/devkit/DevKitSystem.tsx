"use client";

import { SystemIcon } from "@/components/icons/SystemIcon";
import { useFrameRate } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import { projects, featuredProjects } from "@/data/projects";
import { useDeviceSnapshot } from "@/lib/devkit";

export function DevKitSystem() {
  const { fps, history } = useFrameRate();
  const { device, refresh } = useDeviceSnapshot();
  const { settings, updateSettings } = useOS();

  const peak = Math.max(60, ...history, 1);
  const points =
    history.length > 1
      ? history
          .map((value, index) => {
            const x = (index / (history.length - 1)) * 200;
            const y = 58 - (value / peak) * 50;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          })
          .join(" ")
      : "0,58 200,58";

  const stackCount = new Set(projects.flatMap((project) => project.stack)).size;

  return (
    <div className="devkit-panel devkit-system">
      <header className="devkit-panel__head">
        <div>
          <span className="devkit-kicker">Runtime</span>
          <h2>The machine under the OS.</h2>
          <p>
            What this browser actually exposes, measured live. No invented
            process list, no fake memory graph.
          </p>
        </div>
        <button
          type="button"
          className="devkit-quiet-button"
          onClick={() => void refresh()}
        >
          <SystemIcon name="refresh" size={12} />
          Refresh
        </button>
      </header>

      <div className="devkit-system__grid">
        <div className="devkit-metric devkit-metric--fps">
          <span className="devkit-metric__label">Render loop</span>
          <div className="devkit-metric__value">
            {fps || "—"}
            <small>fps</small>
          </div>
          <svg
            className="devkit-sparkline"
            viewBox="0 0 200 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="devkit-spark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#d7ff87" stopOpacity=".2" />
                <stop offset="1" stopColor="#9aef75" />
              </linearGradient>
            </defs>
            <path
              d={`M${points.replaceAll(" ", " L")}`}
              fill="none"
              stroke="url(#devkit-spark)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={`M${points.replaceAll(" ", " L")} L200,60 L0,60 Z`}
              fill="url(#devkit-spark)"
              opacity=".12"
            />
          </svg>
          <span className="devkit-metric__caption">
            {history.length > 1
              ? `${history.length}s window · peak ${Math.max(...history)} fps`
              : "sampling the next second…"}
          </span>
        </div>

        <div className="devkit-metric">
          <span className="devkit-metric__label">Viewport</span>
          <div className="devkit-metric__value is-text">
            {device?.viewport ?? "—"}
          </div>
          <span className="devkit-metric__caption">
            {device
              ? `DPR ${device.dpr} · ${device.touch ? "touch" : "pointer"}`
              : "reading display…"}
          </span>
        </div>

        <div className="devkit-metric">
          <span className="devkit-metric__label">Compute</span>
          <div className="devkit-metric__value is-text">
            {device?.cores ?? "—"}
          </div>
          <span className="devkit-metric__caption">
            {device?.memory ?? "memory not exposed"}
          </span>
        </div>

        <div className="devkit-metric">
          <span className="devkit-metric__label">Network</span>
          <div className="devkit-metric__value is-text">
            {device?.online ? "Online" : "Offline"}
          </div>
          <span className="devkit-metric__caption">
            {device?.connection ?? "connection API hidden"}
          </span>
        </div>
      </div>

      <div className="devkit-system__columns">
        <section className="devkit-device" aria-label="Device details">
          <div className="devkit-block__head">
            <span>Device</span>
            <span>{device?.platform ?? "—"}</span>
          </div>
          {[
            ["Language", device?.language],
            ["Timezone", device?.timezone],
            ["Battery", device?.battery],
            ["Theme", device?.theme],
            ["Reduced motion", device?.reducedMotion ? "On" : "Off"],
            ["Secure context", device?.secure ? "Yes" : "No"],
          ].map(([label, value]) => (
            <div className="devkit-row" key={label}>
              <span>{label}</span>
              <strong>{value ?? "—"}</strong>
            </div>
          ))}
        </section>

        <section className="devkit-inventory" aria-label="Portfolio inventory">
          <div className="devkit-block__head">
            <span>Inventory</span>
            <span>data/projects.ts</span>
          </div>
          <div className="devkit-inventory__counts">
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
                {projects.filter((project) => project.status === "Experiment").length}
              </strong>
              experiments
            </span>
            <span>
              <strong>{stackCount}</strong>
              tools
            </span>
          </div>
          <div className="devkit-inventory__tags">
            {Array.from(
              new Set(projects.flatMap((project) => project.stack)),
            )
              .slice(0, 14)
              .map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            <span>+{Math.max(0, stackCount - 14)}</span>
          </div>
        </section>
      </div>

      <section className="devkit-workbench">
        <div className="devkit-workbench__copy">
          <span className="devkit-kicker">Workbench</span>
          <strong>Blueprint wallpaper</strong>
          <p>
            A dark grid, a signal ring, and enough room for windows. Built for
            this desktop, not borrowed from a theme pack.
          </p>
        </div>
        <button
          type="button"
          className="devkit-wallpaper-button"
          onClick={() => updateSettings({ wallpaper: "blueprint" })}
          disabled={settings.wallpaper === "blueprint"}
        >
          <span className="devkit-wallpaper-swatch" aria-hidden="true" />
          {settings.wallpaper === "blueprint" ? "Applied" : "Apply blueprint"}
        </button>
      </section>
    </div>
  );
}
