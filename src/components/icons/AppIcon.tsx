import type { DockAppId } from "@/lib/types";

type AppIconId = DockAppId | "launchpad" | "preview";

interface AppIconProps {
  app: AppIconId;
  size?: number;
  date?: Date;
  className?: string;
}

function IconShell({
  children,
  size,
  className = "",
  label,
}: {
  children: React.ReactNode;
  size: number;
  className?: string;
  label: string;
}) {
  return (
    <span
      className={`os-app-icon ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
      data-app-icon={label}
    >
      {children}
    </span>
  );
}

function FinderIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell size={size ?? 52} className={`${className ?? ""} icon-shadowed`} label="finder">
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="url(#grad-finder-left)" />
        <path
          d="M32 1.5h17.3c6.7 0 13.2 6.5 13.2 13.2v34.6c0 6.7-6.5 13.2-13.2 13.2H32Z"
          fill="url(#grad-finder-right)"
        />
        <path
          d="M32 1.5v61"
          stroke="#0a5da9"
          strokeOpacity=".28"
          strokeWidth=".8"
        />
        <path
          d="M12.2 22.3v10.5"
          stroke="#274b6c"
          strokeWidth="2.7"
          strokeLinecap="round"
        />
        <path
          d="M51.8 22.3v10.5"
          stroke="#f8fcff"
          strokeWidth="2.7"
          strokeLinecap="round"
        />
        <path
          d="M20.9 40.1c3.3 5 6.9 7.3 11.1 7.3s7.8-2.3 11.1-7.3"
          fill="none"
          stroke="#183f60"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M2 14.3C2 7.4 7.4 2 14.3 2h17.3v60H14.3C7.4 62 2 56.6 2 49.7Z"
          fill="url(#grad-finder-left)"
          opacity=".18"
        />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="14"
          fill="none"
          stroke="#ffffff"
          strokeOpacity=".46"
          strokeWidth="1"
        />
      </svg>
    </IconShell>
  );
}

const LAUNCHPAD_COLORS = [
  "#ff5f57",
  "#ffbd2e",
  "#28c840",
  "#0a84ff",
  "#bf5af2",
  "#ff9f0a",
  "#64d2ff",
  "#30d158",
  "#ff375f",
];

function LaunchpadIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="launchpad"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="url(#grad-launchpad)" />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="14"
          fill="none"
          stroke="#9d9da4"
          strokeOpacity=".5"
          strokeWidth=".9"
        />
        <rect
          x="2"
          y="2"
          width="60"
          height="27"
          rx="13"
          fill="#ffffff"
          opacity=".42"
        />
        {LAUNCHPAD_COLORS.map((color, index) => {
          const column = index % 3;
          const row = Math.floor(index / 3);
          return (
            <rect
              key={color}
              x={13.5 + column * 14.4}
              y={13.5 + row * 14.4}
              width="9"
              height="9"
              rx="2.6"
              fill={color}
            />
          );
        })}
      </svg>
    </IconShell>
  );
}

function SafariIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="safari"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="url(#grad-safari)" />
        <circle cx="32" cy="32" r="25.5" fill="url(#grad-safari-face)" />
        <circle
          cx="32"
          cy="32"
          r="25.5"
          fill="none"
          stroke="#8fbadd"
          strokeOpacity=".4"
          strokeWidth=".8"
        />
        <g stroke="#8ba5bb" strokeWidth=".8" strokeLinecap="round" opacity=".8">
          <path d="M32 9.5v3M32 51.5v3M9.5 32h3M51.5 32h3" />
          <path d="m16.8 16.8 2.1 2.1M45.1 45.1l2.1 2.1M47.2 16.8l-2.1 2.1M18.9 45.1l-2.1 2.1" />
        </g>
        <g transform="rotate(44 32 32)">
          <path d="M32 12.8 38 35l-6-4.4Z" fill="#ff3b30" />
          <path d="M32 51.2 26 29l6 4.4Z" fill="#d2d8de" />
          <path d="M32 12.8 32 30.6 38 35Z" fill="#ff5148" opacity=".5" />
        </g>
        <circle cx="32" cy="32" r="2.6" fill="#f8fbff" stroke="#b7c7d5" strokeWidth=".8" />
      </svg>
    </IconShell>
  );
}

function MailIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="mail"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="url(#grad-mail)" />
        <rect
          x="11"
          y="18.8"
          width="42"
          height="27.5"
          rx="4"
          fill="#ffffff"
          opacity=".97"
        />
        <path
          d="m13.7 22.8 16.4 12.4c1.1.8 2.7.8 3.8 0l16.4-12.4"
          fill="none"
          stroke="#4ba1e8"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 43.6 27 33.4M49.5 43.6 37 33.4"
          stroke="#cfe8ff"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="14"
          fill="none"
          stroke="#ffffff"
          strokeOpacity=".36"
        />
      </svg>
    </IconShell>
  );
}

function NotesIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="notes"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="url(#grad-notes)" />
        <path d="M1.5 14.3C1.5 7.2 7.2 1.5 14.3 1.5h35.4c7.1 0 12.8 5.7 12.8 12.8V15H1.5Z" fill="url(#grad-notes-band)" />
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="none" stroke="#b8ad76" strokeOpacity=".42" />
        <g stroke="#c8c0a6" strokeWidth="1.7" strokeLinecap="round">
          <path d="M12 26h40M12 34.5h40M12 43h40M12 51.5h27" />
        </g>
        <path d="M12 21.2h18" stroke="#9a9074" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

const PETAL_COLORS = [
  "#ff5f57",
  "#ff9f0a",
  "#ffd60a",
  "#30d158",
  "#64d2ff",
  "#0a84ff",
  "#bf5af2",
  "#ff375f",
];

function PhotosIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="photos"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="#fbfbfc" />
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="none" stroke="#c8c8ce" strokeOpacity=".45" />
        <g>
          {PETAL_COLORS.map((color, index) => (
            <ellipse
              key={color}
              cx="32"
              cy="17.8"
              rx="6.8"
              ry="13"
              fill={color}
              opacity=".88"
              transform={`rotate(${index * 45} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="5.2" fill="#ffffff" opacity=".95" />
          <circle cx="32" cy="32" r="3" fill="#f2f2f6" />
        </g>
      </svg>
    </IconShell>
  );
}

function MusicIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="music"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="url(#grad-music)" />
        <path
          d="M42.5 14.7v24.6a6.8 6.8 0 1 1-3-5.6V22.2l-14.1 3.3v19.5a6.8 6.8 0 1 1-3-5.6V21.1a1.7 1.7 0 0 1 1.3-1.7l17.1-4.2a1.7 1.7 0 0 1 1.7 1.7Z"
          fill="#ffffff"
        />
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="none" stroke="#ffffff" strokeOpacity=".26" />
      </svg>
    </IconShell>
  );
}

function TerminalIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="terminal"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="url(#grad-terminal)" />
        <path d="M1.5 14.3C1.5 7.2 7.2 1.5 14.3 1.5h35.4c7.1 0 12.8 5.7 12.8 12.8V11H1.5Z" fill="url(#grad-terminal-bar)" />
        <path d="M1.5 15.5h61" stroke="#09090b" strokeOpacity=".55" />
        <circle cx="10.4" cy="8.6" r="1.7" fill="#ff5f57" />
        <circle cx="16.3" cy="8.6" r="1.7" fill="#febc2e" />
        <circle cx="22.2" cy="8.6" r="1.7" fill="#28c840" />
        <path
          d="m16.5 28.7 8.2 5.8-8.2 5.8"
          fill="none"
          stroke="#f7f7fa"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.5 41.6h10.8"
          stroke="#f7f7fa"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="none" stroke="#ffffff" strokeOpacity=".26" />
      </svg>
    </IconShell>
  );
}

function Gear({ teeth = 8, radius = 19, color = "#87878e", rotation = 0 }) {
  return (
    <g transform={`rotate(${rotation} 32 32)`}>
      {Array.from({ length: teeth }).map((_, index) => (
        <rect
          key={index}
          x="29.5"
          y={32 - radius - 5}
          width="5"
          height="10"
          rx="1.8"
          fill={color}
          transform={`rotate(${(index * 360) / teeth} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r={radius} fill={color} />
      <circle cx="32" cy="32" r={radius * 0.62} fill="url(#grad-settings-base)" />
      <circle cx="32" cy="32" r={radius * 0.3} fill={color} opacity=".65" />
    </g>
  );
}

function SettingsIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="settings"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="url(#grad-settings-base)" />
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="none" stroke="#8e8e93" strokeOpacity=".45" />
        <g transform="translate(-6 -5) scale(1.48)" opacity=".92">
          <Gear radius={13.5} color="#77777f" />
        </g>
        <g transform="translate(22 21) scale(.78)">
          <Gear teeth={7} radius={13.5} color="#9d9da4" rotation={12} />
        </g>
        <circle cx="27" cy="26.2" r="7.4" fill="url(#grad-settings-gear)" opacity=".3" />
      </svg>
    </IconShell>
  );
}

function TrashIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} trash-app-icon`}
      label="trash"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <defs>
          <linearGradient id="trash-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d5d5da" />
            <stop offset=".4" stopColor="#ffffff" />
            <stop offset="1" stopColor="#b4b4bb" />
          </linearGradient>
        </defs>
        <path
          d="M17 17.5h30l-3.2 36.8a5.7 5.7 0 0 1-5.7 5.2H25.9a5.7 5.7 0 0 1-5.7-5.2Z"
          fill="url(#grad-trash-body)"
          stroke="#8d8d95"
          strokeOpacity=".75"
          strokeWidth="1.1"
        />
        <ellipse cx="32" cy="17.5" rx="15.7" ry="4.2" fill="url(#trash-rim)" stroke="#888890" strokeOpacity=".8" />
        <path
          d="M25.5 11.2h13v6.1h-13z"
          fill="none"
          stroke="#a3a3aa"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <g stroke="#ffffff" strokeOpacity=".62" strokeWidth="1.2">
          <path d="M23.8 25.5 25 51.5M30.3 25.5v27M36.7 25.5v27M42.5 25.5 41 51.5" />
        </g>
        <path d="M14 17.5h36" stroke="#ffffff" strokeOpacity=".75" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </IconShell>
  );
}

function CareerIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="career"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <defs>
          <linearGradient id="career-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6b66f" />
            <stop offset=".5" stopColor="#d5793b" />
            <stop offset="1" stopColor="#772818" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="url(#career-bg)" />
        <path
          d="M14 47.5h11v-9h9v-8h9v-8h9"
          fill="none"
          stroke="#fff9ef"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="52" cy="18" r="5.2" fill="#fff9ef" />
        <circle cx="14" cy="47.5" r="3" fill="#fff9ef" opacity=".85" />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="14"
          fill="none"
          stroke="#ffffff"
          strokeOpacity=".25"
        />
      </svg>
    </IconShell>
  );
}

function LinksIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="links"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <defs>
          <linearGradient id="links-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9cf3e4" />
            <stop offset=".5" stopColor="#25b6a8" />
            <stop offset="1" stopColor="#0b5268" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="url(#links-bg)" />
        <path
          d="M27.2 36.8 20.4 43.6a6 6 0 0 1-8.5-8.5l7.5-7.5a6 6 0 0 1 8.5 0"
          fill="none"
          stroke="#f5fffd"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="m36.8 27.2 6.8-6.8a6 6 0 0 1 8.5 8.5l-7.5 7.5a6 6 0 0 1-8.5 0"
          fill="none"
          stroke="#f5fffd"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="m24.5 39.5 15-15"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity=".75"
        />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="14"
          fill="none"
          stroke="#ffffff"
          strokeOpacity=".22"
        />
      </svg>
    </IconShell>
  );
}

function PreviewIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="preview"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <defs>
          <linearGradient id="preview-sheet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#eef7ff" />
          </linearGradient>
          <linearGradient id="preview-photo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8ec8ea" />
            <stop offset="0.55" stopColor="#356e91" />
            <stop offset="1" stopColor="#163846" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="#eaf5ff" />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="14"
          fill="none"
          stroke="#8fb7d3"
          strokeOpacity=".55"
        />
        <rect
          x="11.5"
          y="9"
          width="41"
          height="45"
          rx="3"
          fill="url(#preview-sheet)"
          stroke="#adc3d3"
          strokeWidth=".8"
        />
        <rect
          x="16"
          y="14"
          width="32"
          height="23"
          rx="1.5"
          fill="url(#preview-photo)"
        />
        <circle cx="40" cy="20" r="4" fill="#f7e0ad" opacity=".92" />
        <path
          d="m17 36 10-12 7 8 5-5 7 9Z"
          fill="#102d3a"
          opacity=".76"
        />
        <path d="M17 42h20M17 46h13" stroke="#a4b3bc" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="43" cy="42" r="7" fill="#f5fbff" stroke="#277bb4" strokeWidth="2.2" />
        <path d="m48.5 47.5 5.5 5.5" stroke="#277bb4" strokeWidth="2.6" strokeLinecap="round" />
        <path d="m40 42 2.2 2.2 4-4.4" stroke="#277bb4" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconShell>
  );
}

function CalendarIcon({ size = 52, date = new Date(), className }: Omit<AppIconProps, "app">) {
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" })
    .format(date)
    .toUpperCase();
  const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(date);

  return (
    <IconShell
      size={size}
      className={`${className ?? ""} calendar-app-icon icon-shadowed`}
      label="calendar"
    >
      <span
        className="calendar-app-icon__weekday"
        aria-hidden="true"
        style={{ fontSize: Math.max(5, size * 0.145) }}
      >
        {weekday}
      </span>
      <span
        className="calendar-app-icon__day"
        aria-hidden="true"
        style={{ fontSize: Math.max(14, size * 0.46) }}
      >
        {day}
      </span>
    </IconShell>
  );
}

function DevKitIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="devkit"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <defs>
          <linearGradient id="grad-devkit-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#25332f" />
            <stop offset=".55" stopColor="#0f1614" />
            <stop offset="1" stopColor="#060a09" />
          </linearGradient>
          <linearGradient id="grad-devkit-lime" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9ff92" />
            <stop offset="1" stopColor="#79d95d" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="15" fill="url(#grad-devkit-bg)" />
        <rect
          x="10.5"
          y="12.5"
          width="43"
          height="39"
          rx="7"
          fill="#080d0b"
          stroke="#ffffff"
          strokeOpacity=".18"
        />
        <path
          d="M18 24.5 24.5 30 18 35.5"
          fill="none"
          stroke="url(#grad-devkit-lime)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 36h12"
          stroke="#f5f0df"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity=".82"
        />
        <circle cx="46" cy="19" r="2.6" fill="#f0b65e" />
        <path
          d="M14 45h36"
          stroke="#ffffff"
          strokeOpacity=".09"
          strokeWidth="1"
        />
        {[0, 1, 2].map((index) => (
          <rect
            key={index}
            x={17 + index * 8}
            y="48.5"
            width="5"
            height="1.6"
            rx=".8"
            fill="#b9ff74"
            opacity={0.5 - index * 0.12}
          />
        ))}
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="14"
          fill="none"
          stroke="#ffffff"
          strokeOpacity=".38"
        />
      </svg>
    </IconShell>
  );
}

function StoreIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="store"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect width="64" height="64" rx="15" fill="#0b78e8" />
        <path
          d="M19 27h26l-2.2 23H21.2Z"
          fill="#ffffff"
          opacity=".96"
        />
        <path
          d="M25 28v-4.5a7 7 0 0 1 14 0V28"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M25.5 35h13" stroke="#0b78e8" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="47.5" cy="17.5" r="2.8" fill="#b8f25c" />
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="none" stroke="#ffffff" strokeOpacity=".4" />
      </svg>
    </IconShell>
  );
}

function LinkedInIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="linkedin"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect width="64" height="64" rx="15" fill="#0a66c2" />
        <text
          x="32"
          y="44"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="35"
          fontWeight="700"
          fontFamily="Arial, Helvetica, sans-serif"
          letterSpacing="-2"
        >
          in
        </text>
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="none" stroke="#ffffff" strokeOpacity=".35" />
      </svg>
    </IconShell>
  );
}

function GitHubIcon({ size, className }: Omit<AppIconProps, "app">) {
  return (
    <IconShell
      size={size ?? 52}
      className={`${className ?? ""} icon-shadowed`}
      label="github"
    >
      <svg viewBox="0 0 64 64" className="os-app-icon__svg">
        <rect width="64" height="64" rx="15" fill="#11151b" />
        <g transform="translate(14 13) scale(1.5)" fill="#f5f6f7">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.35-3.87-1.35-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.08.78 2.17v3.22c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </g>
        <rect x="1.5" y="1.5" width="61" height="61" rx="14" fill="none" stroke="#ffffff" strokeOpacity=".24" />
      </svg>
    </IconShell>
  );
}

export function AppIcon({ app, size = 52, date, className = "" }: AppIconProps) {
  switch (app) {
    case "finder":
      return <FinderIcon size={size} className={className} />;
    case "launchpad":
      return <LaunchpadIcon size={size} className={className} />;
    case "safari":
      return <SafariIcon size={size} className={className} />;
    case "mail":
      return <MailIcon size={size} className={className} />;
    case "notes":
      return <NotesIcon size={size} className={className} />;
    case "photos":
      return <PhotosIcon size={size} className={className} />;
    case "calendar":
      return <CalendarIcon size={size} date={date} className={className} />;
    case "music":
      return <MusicIcon size={size} className={className} />;
    case "terminal":
      return <TerminalIcon size={size} className={className} />;
    case "devkit":
      return <DevKitIcon size={size} className={className} />;
    case "store":
      return <StoreIcon size={size} className={className} />;
    case "linkedin":
      return <LinkedInIcon size={size} className={className} />;
    case "github":
      return <GitHubIcon size={size} className={className} />;
    case "settings":
      return <SettingsIcon size={size} className={className} />;
    case "trash":
      return <TrashIcon size={size} className={className} />;
    case "career":
      return <CareerIcon size={size} className={className} />;
    case "links":
      return <LinksIcon size={size} className={className} />;
    case "preview":
      return <PreviewIcon size={size} className={className} />;
    default:
      return null;
  }
}
