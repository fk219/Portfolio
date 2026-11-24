import type { ReactNode, SVGProps } from "react";

export type SystemIconName =
  | "apple"
  | "wifi"
  | "wifi-off"
  | "battery"
  | "control-center"
  | "search"
  | "focus"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "chevron-up"
  | "sidebar"
  | "grid"
  | "list"
  | "share"
  | "close"
  | "minimize"
  | "maximize"
  | "plus"
  | "minus"
  | "more-horizontal"
  | "lock"
  | "power"
  | "moon"
  | "sun"
  | "cloud"
  | "cloud-rain"
  | "display"
  | "volume"
  | "volume-off"
  | "bluetooth"
  | "airdrop"
  | "check"
  | "folder"
  | "document"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "arrow-down"
  | "refresh"
  | "download"
  | "play"
  | "pause"
  | "skip-back"
  | "skip-forward"
  | "trash"
  | "copy"
  | "external"
  | "info"
  | "keyboard"
  | "clock"
  | "calendar"
  | "music-note"
  | "pin"
  | "command"
  | "alert"
  | "gear"
  | "mail"
  | "iphone"
  | "mac"
  | "house"
  | "globe"
  | "rocket"
  | "code"
  | "gauge"
  | "branch"
  | "shield"
  | "bag"
  | "person";

interface SystemIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: SystemIconName;
  size?: number;
}

const strokePaths: Partial<Record<SystemIconName, ReactNode>> = {
  wifi: (
    <>
      <path d="M3.6 8.7a12.5 12.5 0 0 1 16.8 0" />
      <path d="M6.6 12a8 8 0 0 1 10.8 0" />
      <path d="M9.7 15.2a3.5 3.5 0 0 1 4.6 0" />
      <circle cx="12" cy="18.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  "wifi-off": (
    <>
      <path d="M3.6 8.7a12.5 12.5 0 0 1 8.5-3.6" />
      <path d="M17.5 7.8a12.4 12.4 0 0 1 2.9 1" />
      <path d="M6.6 12a8 8 0 0 1 3.1-1.8" />
      <path d="M9.7 15.2a3.5 3.5 0 0 1 4.6 0" />
      <circle cx="12" cy="18.4" r="0.9" fill="currentColor" stroke="none" />
      <path d="m4 4 16 16" />
    </>
  ),
  battery: (
    <>
      <rect x="2.5" y="7.5" width="17" height="9" rx="2.4" />
      <path d="M21.5 10.5v3" strokeWidth="2.2" />
      <rect
        x="4.8"
        y="9.8"
        width="11.8"
        height="4.4"
        rx="1"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  "control-center": (
    <>
      <rect x="3" y="4" width="7.2" height="7.2" rx="2.2" />
      <rect x="13.8" y="4" width="7.2" height="7.2" rx="2.2" />
      <rect x="3" y="14.8" width="7.2" height="5.2" rx="2.2" />
      <rect x="13.8" y="14.8" width="7.2" height="5.2" rx="2.2" />
      <path d="M5.7 7.6h1.8" />
      <circle cx="17.4" cy="7.6" r="0.8" fill="currentColor" stroke="none" />
      <path d="M16.7 17.4h1.8" />
      <circle cx="6.6" cy="17.4" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="m15.5 15.5 4.1 4.1" />
    </>
  ),
  focus: (
    <>
      <path d="M20.2 15.1A8.5 8.5 0 0 1 8.8 3.8a8.7 8.7 0 1 0 11.4 11.3Z" />
    </>
  ),
  "chevron-left": <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />,
  "chevron-right": <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  "chevron-down": <path d="m5.5 9.5 6.5 6.5 6.5-6.5" />,
  "chevron-up": <path d="m5.5 14.5 6.5-6.5 6.5 6.5" />,
  sidebar: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M9 4v16" />
      <path d="M5.5 8h1" />
      <path d="M5.5 11h1" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
    </>
  ),
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  share: (
    <>
      <path d="M12 3v12" />
      <path d="m8 7 4-4 4 4" />
      <path d="M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  minimize: <path d="M5 12h14" />,
  maximize: (
    <>
      <path d="M8.5 5H5v3.5" />
      <path d="M15.5 5H19v3.5" />
      <path d="M8.5 19H5v-3.5" />
      <path d="M15.5 19H19v-3.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  "more-horizontal": (
    <>
      <circle cx="5.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2.5" />
      <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
      <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  power: (
    <>
      <path d="M12 3.5v8" />
      <path d="M7.2 6.8a7.5 7.5 0 1 0 9.6 0" />
    </>
  ),
  moon: <path d="M20 15.1A8.5 8.5 0 0 1 8.9 4a8.7 8.7 0 1 0 11.1 11.1Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  cloud: (
    <path d="M7 18.5a4.5 4.5 0 0 1-.3-9 6 6 0 0 1 11.4 1.4A3.8 3.8 0 0 1 17.4 18.5Z" />
  ),
  "cloud-rain": (
    <>
      <path d="M7 16a4.5 4.5 0 0 1-.3-9 6 6 0 0 1 11.4 1.4A3.8 3.8 0 0 1 17.4 16Z" />
      <path d="M8.5 19v1.5M12.2 19v1.5M15.9 19v1.5" />
    </>
  ),
  display: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="2" />
      <path d="M9 20h6M12 16.5V20" />
      <path d="M6.5 14.5h4.5" />
    </>
  ),
  volume: (
    <>
      <path d="M5 9.5h3l4-3.5v12l-4-3.5H5Z" />
      <path d="M15 9a4.2 4.2 0 0 1 0 6" />
      <path d="M17.5 6.5a7.8 7.8 0 0 1 0 11" />
    </>
  ),
  "volume-off": (
    <>
      <path d="M5 9.5h3l4-3.5v12l-4-3.5H5Z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </>
  ),
  bluetooth: (
    <path d="m8 7 8 10V7L8 17l4-3.3V3.2Z" />
  ),
  airdrop: (
    <>
      <path d="M12 13.5 7.3 6.8a2 2 0 0 1 1.4-3.1 10.5 10.5 0 0 1 6.6 0 2 2 0 0 1 1.4 3.1Z" />
      <path d="M7.5 16a8 8 0 0 1-.9-2M16.5 16a8 8 0 0 0 .9-2" />
      <path d="M4.2 19a13 13 0 0 1-1-2.7M19.8 19a13 13 0 0 0 1-2.7" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 6.5" />,
  folder: (
    <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h4l2 2h6a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 18 20H6a2.5 2.5 0 0 1-2.5-2.5Z" />
  ),
  document: (
    <>
      <path d="M6 3h8l4 4v14H6Z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  "arrow-left": <path d="M19 12H5m6-6-6 6 6 6" />,
  "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
  "arrow-up": <path d="M12 19V5m-6 6 6-6 6 6" />,
  "arrow-down": <path d="M12 5v14m-6-6 6 6 6-6" />,
  refresh: (
    <>
      <path d="M20 6.5V11h-4.5" />
      <path d="M19.2 11a7.5 7.5 0 1 0-1.3 6.9" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m-4.5-4.5L12 15l4.5-4.5" />
      <path d="M5 20h14" />
    </>
  ),
  play: <path d="M7 4.5 19.5 12 7 19.5Z" fill="currentColor" stroke="none" />,
  pause: (
    <>
      <rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  "skip-back": (
    <>
      <path d="M19 5 9 12l10 7Z" />
      <path d="M5 4.5v15" />
    </>
  ),
  "skip-forward": (
    <>
      <path d="m5 5 10 7L5 19Z" />
      <path d="M19 4.5v15" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V4.5h6V7" />
      <path d="m6 7 .9 13.5h10.2L18 7" />
      <path d="M10 11v5.5M14 11v5.5" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="m20 4-9 9" />
      <path d="M19 14v5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 19V7a1.5 1.5 0 0 1 1.5-1.5H10" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  keyboard: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <path d="M6 9.5h.1M9.3 9.5h.1M12.6 9.5h.1M15.9 9.5h.1M19 9.5h.1M6 13h.1M9.3 13h.1M12.6 13h.1M15.9 13h.1M19 13h.1M8 16.5h8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.5 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </>
  ),
  "music-note": (
    <>
      <path d="M9 18V6.5l10-2v10" />
      <ellipse cx="6.2" cy="18" rx="2.8" ry="2.2" />
      <ellipse cx="16.2" cy="14.5" rx="2.8" ry="2.2" />
    </>
  ),
  pin: (
    <>
      <path d="m9 3 6 6" />
      <path d="m14 2 8 8-4 1-3 3-1 4-3-3-3-3 4-1 3-3Z" />
      <path d="m10 14-7 7" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 21 20H3Z" />
      <path d="M12 9v5" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08a1.7 1.7 0 0 0-1.1-1.58 1.7 1.7 0 0 0-1.88.34l-.06.06-2.86-2.86.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3v-4h.08A1.7 1.7 0 0 0 4.66 8.9a1.7 1.7 0 0 0-.34-1.88l-.06-.06L7.12 4.1l.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 10.1 2.94V3H14v-.08a1.7 1.7 0 0 0 1.09 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.86 2.86-.06.06a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 21 10h.08v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7.5 8 6 8-6" />
    </>
  ),
  iphone: (
    <>
      <rect x="6.5" y="2.2" width="11" height="19.6" rx="2.8" />
      <path d="M10.6 4.8h2.8" />
    </>
  ),
  mac: (
    <>
      <rect x="2.8" y="4" width="18.4" height="12.2" rx="1.8" />
      <path d="M8.4 19.6h7.2M12 16.2v3.4" />
    </>
  ),
  house: (
    <>
      <path d="m3.2 10.8 8.8-7.2 8.8 7.2" />
      <path d="M5.2 9.4V20h13.6V9.4" />
      <path d="M9.6 20v-5.2h4.8V20" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.4 12h17.2M12 3a16.8 16.8 0 0 1 0 18M12 3a16.8 16.8 0 0 0 0 18" />
    </>
  ),
  rocket: (
    <>
      <path d="M14.2 4.2c3 1 5 4 5.6 8.3l-7.1 7.1c-4.3-.6-7.3-2.6-8.3-5.6Z" />
      <path d="m7.4 16.6-3.2 3.2M9.8 7.5 5.4 5.2 3.2 9.6l3.1.9M16.5 14.2l2.3 4.4-4.4 2.2-.9-3.1" />
      <circle cx="14.5" cy="9.5" r="1.6" />
    </>
  ),
  code: (
    <>
      <path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4M13.5 4l-3 16" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 17.5a8 8 0 1 1 16 0" />
      <path d="m12 13 4.4-4.4" />
      <circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  branch: (
    <>
      <circle cx="6.5" cy="5.5" r="2.1" />
      <circle cx="17.5" cy="5.5" r="2.1" />
      <circle cx="6.5" cy="18.5" r="2.1" />
      <path d="M6.5 7.6v8.8M17.5 7.6c0 4.5-3.2 5.6-7.5 7.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 5.5 5.8v5.3c0 4.2 2.6 7.3 6.5 9.5 3.9-2.2 6.5-5.3 6.5-9.5V5.8Z" />
      <path d="m9 12.2 2.1 2.1 4-4.3" />
    </>
  ),
  bag: (
    <>
      <path d="M5.2 8.2h13.6L20 20.5H4Z" />
      <path d="M8.8 8.2V6a3.2 3.2 0 0 1 6.4 0v2.2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5.2 20.2a6.8 6.8 0 0 1 13.6 0" />
    </>
  ),
};

export function SystemIcon({
  name,
  size = 16,
  strokeWidth = 1.7,
  className,
  ...props
}: SystemIconProps) {
  if (name === "apple") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path
          fill="currentColor"
          d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"
        />
      </svg>
    );
  }

  if (name === "command") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <path
          d="M9 9V5.5A3.5 3.5 0 1 0 5.5 9H9Zm0 0h6m-6 0v6m6-6V5.5A3.5 3.5 0 1 1 18.5 9H15Zm0 0v6m0 0h3.5A3.5 3.5 0 1 1 15 18.5V15Zm-6 0H5.5A3.5 3.5 0 1 0 9 18.5V15Zm0 0h6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  const content = strokePaths[name];
  if (!content) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {content}
    </svg>
  );
}
