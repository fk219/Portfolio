"use client";

import { useId } from "react";
import type { Project } from "@/data/projects";

interface ProjectArtworkProps {
  project: Project;
  className?: string;
  compact?: boolean;
}

function Motif({ project, gradientId }: { project: Project; gradientId: string }) {
  const { ink } = project.cover;

  switch (project.cover.motif) {
    case "books":
      return (
        <g>
          <circle cx="494" cy="120" r="88" fill="#fff1cb" opacity=".2" />
          <g transform="translate(86 90) rotate(-5)">
            <rect width="290" height="55" rx="8" fill="#fff7e8" opacity=".95" />
            <rect x="26" y="57" width="350" height="61" rx="8" fill="#253d3a" opacity=".88" />
            <rect x="54" y="121" width="252" height="56" rx="8" fill="#f6e5bf" opacity=".82" />
            <rect x="20" y="180" width="383" height="63" rx="8" fill="#792f25" opacity=".88" />
            <path d="M39 117h8M67 180h8M45 239h8" stroke={ink} strokeWidth="3" opacity=".35" />
            <path d="M44 28h145M117 88h192M83 151h140M71 211h231" stroke={ink} strokeWidth="7" opacity=".58" strokeLinecap="round" />
            <path d="M44 41h88M117 103h122M83 165h93M71 226h170" stroke={ink} strokeWidth="3" opacity=".3" strokeLinecap="round" />
          </g>
          <circle cx="520" cy="302" r="56" fill="none" stroke="#fff3d5" strokeWidth="1.5" opacity=".28" />
          <circle cx="520" cy="302" r="32" fill="#fff3d5" opacity=".1" />
        </g>
      );
    case "layers":
      return (
        <g>
          <circle cx="470" cy="140" r="106" fill="#fff4ee" opacity=".22" />
          <g transform="translate(150 58)">
            <rect width="330" height="74" rx="32" fill="#fff1e8" opacity=".94" />
            <rect x="22" y="54" width="330" height="78" rx="32" fill="#6f2b2e" opacity=".82" />
            <rect x="-12" y="112" width="354" height="78" rx="32" fill="#f0b7a8" opacity=".9" />
            <rect x="20" y="170" width="330" height="82" rx="32" fill="#fff9f3" opacity=".94" />
            <path d="M147 20c14 13 22 13 36 0M172 130c12 12 20 12 32 0M157 192c12 12 20 12 32 0" stroke="#7d3e3a" strokeWidth="3" fill="none" opacity=".45" strokeLinecap="round" />
            <circle cx="165" cy="93" r="6" fill="#ffd9c4" />
            <circle cx="179" cy="93" r="6" fill="#ffd9c4" />
            <circle cx="193" cy="93" r="6" fill="#ffd9c4" />
          </g>
          <path d="M92 330c67-31 115-28 184 1" fill="none" stroke="#ffe9dc" strokeWidth="1.5" opacity=".26" />
        </g>
      );
    case "cross":
      return (
        <g>
          <circle cx="474" cy="200" r="156" fill="none" stroke="#eafff8" strokeWidth="1.2" opacity=".22" />
          <circle cx="474" cy="200" r="112" fill="none" stroke="#eafff8" strokeWidth="1.2" opacity=".16" />
          <g transform="translate(295 70) rotate(7)">
            <rect x="57" width="96" height="250" rx="42" fill="#f5fffb" opacity=".93" />
            <rect y="77" width="208" height="96" rx="42" fill="#f5fffb" opacity=".93" />
            <rect x="76" y="28" width="58" height="194" rx="27" fill="#69aaa2" opacity=".3" />
            <rect x="20" y="93" width="170" height="58" rx="27" fill="#69aaa2" opacity=".2" />
            <circle cx="104" cy="125" r="28" fill="#2d6d69" opacity=".24" />
          </g>
          <path d="M95 94h36v36" fill="none" stroke="#f4fffc" strokeWidth="1.6" opacity=".4" />
          <path d="M548 308h-33v-33" fill="none" stroke="#f4fffc" strokeWidth="1.6" opacity=".4" />
        </g>
      );
    case "path":
      return (
        <g>
          <circle cx="520" cy="91" r="78" fill="#f0eeff" opacity=".15" />
          <path
            d="M86 308C143 310 151 213 225 221s69 95 141 54 30-132 113-142 73 37 106-12"
            fill="none"
            stroke="#f6f3ff"
            strokeWidth="2.2"
            strokeDasharray="5 9"
            opacity=".55"
          />
          {[
            [86, 308],
            [225, 221],
            [366, 275],
            [513, 154],
            [585, 121],
          ].map(([cx, cy], index) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r={index === 0 ? 17 : 11} fill="#f8f5ff" opacity=".95" />
              <circle cx={cx} cy={cy} r={index === 0 ? 28 : 21} fill="none" stroke="#f8f5ff" strokeWidth="1.2" opacity=".34" />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill={ink}
                fontSize="9"
                fontWeight="700"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                {index + 1}
              </text>
            </g>
          ))}
          <g transform="translate(98 78)">
            <rect width="222" height="18" rx="9" fill="#faf8ff" opacity=".66" />
            <rect y="32" width="155" height="18" rx="9" fill="#faf8ff" opacity=".32" />
            <rect y="64" width="184" height="18" rx="9" fill="#faf8ff" opacity=".22" />
          </g>
        </g>
      );
    case "signal":
      return (
        <g>
          <g opacity=".38" stroke={ink} strokeWidth="1">
            {Array.from({ length: 11 }).map((_, index) => (
              <path key={index} d={`M${70 + index * 50} 48v304`} />
            ))}
            {Array.from({ length: 7 }).map((_, index) => (
              <path key={`h-${index}`} d={`M52 ${55 + index * 50}h540`} />
            ))}
          </g>
          <g stroke={ink} strokeWidth="3" strokeLinecap="round">
            <path d="M75 218h50l28-75 46 155 37-119 52 75 39-39h56l30-64 40 119 51-70h67" />
          </g>
          <g fill={ink}>
            <circle cx="152" cy="218" r="5" />
            <circle cx="486" cy="196" r="5" />
            <circle cx="584" cy="195" r="5" />
          </g>
          <g transform="translate(92 84)" fill={ink}>
            <rect width="8" height="22" rx="2" opacity=".72" />
            <rect x="17" width="8" height="35" rx="2" opacity=".38" />
            <rect x="34" width="8" height="14" rx="2" opacity=".55" />
            <rect x="51" width="8" height="27" rx="2" opacity=".3" />
          </g>
          <text x="518" y="344" fill={ink} fontFamily="ui-monospace, 'SF Mono', Menlo, monospace" fontSize="11" opacity=".48">
            443 · TLS · 18.2 kB
          </text>
        </g>
      );
    case "network":
      return (
        <g>
          <circle cx="320" cy="210" r="155" fill="none" stroke="#f2fff8" opacity=".17" strokeWidth="1.2" />
          <circle cx="320" cy="210" r="104" fill="none" stroke="#f2fff8" opacity=".15" strokeWidth="1.2" strokeDasharray="3 7" />
          <g fill="none" stroke="#f2fff8" strokeWidth="2" opacity=".68">
            <path d="M126 280c49-92 94-45 136-92s74-12 98-54" />
            <path d="M168 118c59 73 80 17 135 83s97 28 140 93" />
            <path d="M262 322c8-57 46-69 59-108s48-58 69-75" />
          </g>
          <g fill="#e7fff6">
            {[
              [126, 280, 12],
              [168, 118, 8],
              [262, 322, 14],
              [320, 188, 9],
              [360, 201, 7],
              [402, 134, 10],
              [443, 294, 11],
              [520, 216, 6],
            ].map(([cx, cy, r], index) => (
              <g key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r={r + 13} fill="#e7fff6" opacity=".1" />
                <circle cx={cx} cy={cy} r={r} />
                {index % 3 === 0 && <circle cx={cx} cy={cy} r={r + 21} fill="none" stroke="#e7fff6" opacity=".35" />}
              </g>
            ))}
          </g>
          <g transform="translate(440 70)" opacity=".85">
            <rect width="125" height="36" rx="10" fill="#f3fff9" opacity=".12" />
            <path d="M18 18h20M45 18h62" stroke="#f3fff9" strokeWidth="3" strokeLinecap="round" opacity=".6" />
            <circle cx="18" cy="18" r="3.5" fill="#baffd9" />
          </g>
          <text x="80" y="342" fill="#e6fff5" opacity=".55" fontSize="11" fontFamily="ui-monospace, 'SF Mono', Menlo, monospace">
            5 devices · 1 bridge · 6 hops
          </text>
        </g>
      );
    case "vector":
      return (
        <g>
          <path d="M88 316 514 90" stroke="#f9fbff" opacity=".23" strokeWidth="1.3" />
          <path d="M115 101 557 303" stroke="#f9fbff" opacity=".12" strokeWidth="1" strokeDasharray="4 8" />
          <g fill="#e7edff">
            {[
              [122, 112, 6],
              [181, 88, 10],
              [244, 132, 5],
              [310, 82, 8],
              [369, 176, 13],
              [432, 141, 6],
              [493, 235, 9],
              [542, 178, 5],
              [467, 307, 12],
              [396, 286, 7],
              [320, 324, 10],
              [238, 273, 5],
              [163, 314, 8],
              [575, 330, 4],
            ].map(([cx, cy, r], index) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} opacity={index % 3 === 0 ? 0.95 : 0.55} />
            ))}
          </g>
          <g fill="none" stroke="#dce6ff" opacity=".48">
            <circle cx="369" cy="176" r="54" />
            <circle cx="369" cy="176" r="27" />
            <path d="M315 176h108M369 122v108" strokeDasharray="3 5" />
          </g>
          <g transform="translate(84 65)" opacity=".82">
            <rect width="160" height="14" rx="7" fill="#e9efff" opacity=".5" />
            <rect y="28" width="112" height="14" rx="7" fill="#e9efff" opacity=".26" />
          </g>
          <g transform="translate(428 327)">
            <path d="M0 0h134" stroke="#cdd9ff" opacity=".25" />
            <text x="0" y="-12" fill="#eef3ff" fontSize="10" fontFamily="ui-monospace, 'SF Mono', Menlo, monospace" opacity=".55">
              HNSW · k=8 · 768d
            </text>
          </g>
        </g>
      );
    default:
      return <circle cx="320" cy="200" r="100" fill={gradientId} />;
  }
}

export function ProjectArtwork({
  project,
  className = "",
  compact = false,
}: ProjectArtworkProps) {
  const id = useId().replaceAll(":", "");
  const gradientId = `project-art-${id}`;

  return (
    <div
      className={`project-art project-art--${project.cover.motif} ${
        compact ? "is-compact" : ""
      } ${className}`}
      style={
        {
          "--project-art-from": project.cover.from,
          "--project-art-to": project.cover.to,
          "--project-art-ink": project.cover.ink,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={project.cover.from} />
            <stop offset="1" stopColor={project.cover.to} />
          </linearGradient>
          <radialGradient id={`${gradientId}-wash`} cx="20%" cy="0%" r="100%">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".28" />
            <stop offset=".6" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="640" height="400" fill={`url(#${gradientId})`} />
        <rect width="640" height="400" fill={`url(#${gradientId}-wash)`} />
        <g transform="translate(0 0)">
          <Motif project={project} gradientId={`url(#${gradientId})`} />
        </g>
        <rect
          x=".5"
          y=".5"
          width="639"
          height="399"
          fill="none"
          stroke="#ffffff"
          strokeOpacity=".12"
        />
      </svg>
      <div className="project-art__grain" />
    </div>
  );
}
