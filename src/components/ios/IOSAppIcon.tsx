import { AppIcon } from "@/components/icons/AppIcon";
import type { IOSAppId } from "./ios-apps";

function CustomTile({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span className="ios-custom-icon" aria-hidden="true" data-ios-icon={label}>
      <svg viewBox="0 0 64 64" className="ios-custom-icon__svg">
        {children}
      </svg>
    </span>
  );
}

function ProjectsIcon() {
  return (
    <CustomTile label="projects">
      <defs>
        <linearGradient id="ios-projects-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6fb9ff" />
          <stop offset=".52" stopColor="#1f74e8" />
          <stop offset="1" stopColor="#1747b8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#ios-projects-bg)" />
      <rect
        x="11.5"
        y="16.5"
        width="41"
        height="31"
        rx="5"
        fill="#ffffff"
        opacity=".97"
      />
      <rect x="16" y="21" width="32" height="6" rx="2" fill="#b9d8ff" />
      <rect x="16" y="31" width="14" height="11" rx="2" fill="#f5b74d" />
      <rect x="33" y="31" width="15" height="4" rx="2" fill="#a9c7ec" />
      <rect x="33" y="38" width="11" height="4" rx="2" fill="#cddff4" />
      <rect
        x="11.5"
        y="16.5"
        width="41"
        height="31"
        rx="5"
        fill="none"
        stroke="#ffffff"
        strokeOpacity=".4"
      />
    </CustomTile>
  );
}

function ProfileIcon() {
  return (
    <CustomTile label="profile">
      <defs>
        <linearGradient id="ios-profile-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3c414c" />
          <stop offset=".55" stopColor="#171a21" />
          <stop offset="1" stopColor="#050609" />
        </linearGradient>
        <linearGradient id="ios-profile-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd28f" />
          <stop offset=".55" stopColor="#e7a35f" />
          <stop offset="1" stopColor="#875631" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#ios-profile-bg)" />
      <circle
        cx="32"
        cy="32"
        r="21"
        fill="none"
        stroke="url(#ios-profile-ring)"
        strokeWidth="1.4"
        opacity=".9"
      />
      <text
        x="32"
        y="38.5"
        textAnchor="middle"
        fill="#fff6e7"
        fontSize="19"
        fontWeight="650"
        letterSpacing="-1"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
      >
        FK
      </text>
      <circle cx="47.5" cy="17.5" r="2.4" fill="#ffd08d" />
    </CustomTile>
  );
}

function ResumeIcon() {
  return (
    <CustomTile label="resume">
      <rect width="64" height="64" rx="15" fill="#f8f7f2" />
      <rect
        x="16"
        y="10"
        width="32"
        height="44"
        rx="4"
        fill="#ffffff"
        stroke="#d8d5cd"
      />
      <path
        d="M22 22h20M22 27.5h16M22 33h12"
        stroke="#c2bdb2"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="21" y="39" width="22" height="9" rx="2.4" fill="#d13a35" />
      <text
        x="32"
        y="45.6"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="5.6"
        fontWeight="700"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
      >
        PDF
      </text>
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="14"
        fill="none"
        stroke="#ffffff"
        strokeOpacity=".55"
      />
    </CustomTile>
  );
}

function CareerIcon() {
  return (
    <CustomTile label="career">
      <defs>
        <linearGradient id="ios-career-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd7a1" />
          <stop offset=".48" stopColor="#e08c4a" />
          <stop offset="1" stopColor="#91341e" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#ios-career-bg)" />
      <path
        d="M16 44.5h9v-9h8v-8h8v-8h8"
        fill="none"
        stroke="#fff9ef"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="49" cy="19.5" r="5.1" fill="#fff9ef" />
      <circle cx="16" cy="44.5" r="3" fill="#fff9ef" opacity=".85" />
      <path
        d="M15 16.5h13"
        stroke="#ffffff"
        strokeOpacity=".65"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </CustomTile>
  );
}

function LinksIcon() {
  return (
    <CustomTile label="links">
      <defs>
        <linearGradient id="ios-links-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#91f1e0" />
          <stop offset=".48" stopColor="#25b6a8" />
          <stop offset="1" stopColor="#0d5b72" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#ios-links-bg)" />
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
    </CustomTile>
  );
}

function CalculatorIcon() {
  return (
    <CustomTile label="calculator">
      <defs>
        <linearGradient id="ios-calc-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4c4c50" />
          <stop offset="1" stopColor="#141416" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#ios-calc-bg)" />
      <rect x="12" y="12" width="40" height="10" rx="3" fill="#2b2b2e" />
      <g fill="#e9e9ec">
        {[20, 29, 38, 47].map((x) =>
          [30, 40, 50].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3.1" opacity=".82" />
          )),
        )}
      </g>
      <circle cx="47" cy="30" r="3.1" fill="#ff9f0a" />
      <circle cx="47" cy="40" r="3.1" fill="#ff9f0a" />
      <circle cx="47" cy="50" r="3.1" fill="#ff9f0a" />
    </CustomTile>
  );
}

function ClockIcon() {
  const now = new Date();
  const minutes = now.getMinutes() * 6;
  const hours = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;

  return (
    <CustomTile label="clock">
      <defs>
        <linearGradient id="ios-clock-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2a2d" />
          <stop offset="1" stopColor="#050506" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#ios-clock-bg)" />
      <circle cx="32" cy="32" r="22" fill="#f7f5ef" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="#ffffff" strokeOpacity=".4" />
      <g stroke="#313135" strokeWidth="1.4" strokeLinecap="round">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
          (angle) => {
            const radius = angle % 90 === 0 ? 4.2 : 2.2;
            const radians = (angle * Math.PI) / 180;
            const x1 = 32 + Math.sin(radians) * 17;
            const y1 = 32 - Math.cos(radians) * 17;
            const x2 = 32 + Math.sin(radians) * (17 - radius);
            const y2 = 32 - Math.cos(radians) * (17 - radius);
            return (
              <path key={angle} d={`M${x1} ${y1}L${x2} ${y2}`} />
            );
          },
        )}
      </g>
      <path
        d={`M32 32L${32 + Math.sin((hours * Math.PI) / 180) * 10} ${
          32 - Math.cos((hours * Math.PI) / 180) * 10
        }`}
        stroke="#111113"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d={`M32 32L${32 + Math.sin((minutes * Math.PI) / 180) * 15} ${
          32 - Math.cos((minutes * Math.PI) / 180) * 15
        }`}
        stroke="#111113"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="2.2" fill="#ff9f0a" />
      <path d="M32 32v-13" stroke="#ff9f0a" strokeWidth="1.2" strokeLinecap="round" />
    </CustomTile>
  );
}

function DevKitIcon() {
  return (
    <CustomTile label="devkit">
      <defs>
        <linearGradient id="ios-devkit-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b3a34" />
          <stop offset=".55" stopColor="#101815" />
          <stop offset="1" stopColor="#050807" />
        </linearGradient>
        <linearGradient id="ios-devkit-lime" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ddff9d" />
          <stop offset="1" stopColor="#79d95d" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#ios-devkit-bg)" />
      <rect
        x="9.5"
        y="11.5"
        width="45"
        height="41"
        rx="8"
        fill="#070c0a"
        stroke="#ffffff"
        strokeOpacity=".18"
      />
      <path
        d="M18 24.5 24.5 30 18 35.5"
        fill="none"
        stroke="url(#ios-devkit-lime)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 37h12"
        stroke="#f6f1df"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity=".84"
      />
      <circle cx="47" cy="18" r="2.8" fill="#f0b65e" />
      <path d="M14 45h36" stroke="#ffffff" strokeOpacity=".09" />
      <rect x="1" y="1" width="62" height="62" rx="15" fill="none" stroke="#ffffff" strokeOpacity=".4" />
    </CustomTile>
  );
}

export function IOSAppIcon({
  app,
  size = 60,
  className = "",
}: {
  app: IOSAppId;
  size?: number;
  className?: string;
}) {
  let icon: React.ReactNode;
  switch (app) {
    case "projects":
      icon = <ProjectsIcon />;
      break;
    case "profile":
      icon = <ProfileIcon />;
      break;
    case "experience":
      icon = <CareerIcon />;
      break;
    case "links":
      icon = <LinksIcon />;
      break;
    case "calculator":
      icon = <CalculatorIcon />;
      break;
    case "clock":
      icon = <ClockIcon />;
      break;
    case "safari":
      icon = <AppIcon app="safari" size={size} />;
      break;
    case "music":
      icon = <AppIcon app="music" size={size} />;
      break;
    case "devkit":
      icon = <DevKitIcon />;
      break;
    case "photos":
      icon = <AppIcon app="photos" size={size} />;
      break;
    case "resume":
      icon = <ResumeIcon />;
      break;
    case "contact":
      icon = <AppIcon app="mail" size={size} />;
      break;
    case "notes":
      icon = <AppIcon app="notes" size={size} />;
      break;
    case "settings":
      icon = <AppIcon app="settings" size={size} />;
      break;
    default:
      icon = <AppIcon app="finder" size={size} />;
  }

  return (
    <span
      className={`ios-app-icon ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}
