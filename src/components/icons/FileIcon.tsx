interface FileIconProps {
  size?: number;
  className?: string;
}

export function FolderIcon({ size = 48, className = "" }: FileIconProps) {
  return (
    <span
      className={`os-file-icon ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="os-file-icon__svg">
        <path
          d="M4.5 14.6A7.1 7.1 0 0 1 11.6 7.5h13.1l5.1 5.2h22.6a7.1 7.1 0 0 1 7.1 7.1v6H4.5Z"
          fill="url(#grad-folder-back)"
        />
        <path
          d="M4.5 20.1h55v28.2a7.7 7.7 0 0 1-7.6 7.7H12.1a7.7 7.7 0 0 1-7.6-7.7Z"
          fill="url(#grad-folder-front)"
        />
        <path
          d="M4.5 22.6h55"
          stroke="#c4eaff"
          strokeWidth="1.2"
          strokeOpacity=".65"
        />
        <path
          d="M4.5 20.1h55v8H4.5Z"
          fill="#ffffff"
          opacity=".09"
        />
        <path
          d="M11.8 8.7h12.4l4.4 4.5H11.8a5.9 5.9 0 0 0-4.6 2.2 5.9 5.9 0 0 1 4.6-6.7Z"
          fill="#ffffff"
          opacity=".18"
        />
        <rect
          x="4.5"
          y="7.5"
          width="55"
          height="48.5"
          rx="7.1"
          fill="none"
          stroke="#0a6bb8"
          strokeOpacity=".28"
        />
      </svg>
    </span>
  );
}

export function FileIcon({
  size = 48,
  variant = "pdf",
  className = "",
}: FileIconProps & { variant?: "pdf" | "text" }) {
  return (
    <span
      className={`os-file-icon ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="os-file-icon__svg">
        <path
          d="M12 3.5h29l11 11V56a4.5 4.5 0 0 1-4.5 4.5h-35A4.5 4.5 0 0 1 8 56V8a4.5 4.5 0 0 1 4-4.5Z"
          fill="url(#grad-paper)"
          stroke="#c8c8cd"
          strokeWidth=".9"
        />
        <path d="M41 3.5V14a1 1 0 0 0 1 1h10" fill="#e7e7eb" />
        <path
          d="M41 3.5V14a1 1 0 0 0 1 1h10"
          fill="none"
          stroke="#c2c2c8"
          strokeWidth=".9"
        />
        {variant === "pdf" ? (
          <>
            <path
              d="M22 33.5h20v15.8a3.7 3.7 0 0 1-3.7 3.7H25.7a3.7 3.7 0 0 1-3.7-3.7Z"
              fill="url(#grad-pdf)"
            />
            <text
              x="32"
              y="44.3"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              fontWeight="700"
              letterSpacing=".3"
            >
              PDF
            </text>
            <g stroke="#b9b9c0" strokeWidth="1.3" strokeLinecap="round" opacity=".9">
              <path d="M18 19h16M18 23.5h22M18 27.5h12" />
            </g>
          </>
        ) : (
          <g stroke="#b9b9c0" strokeWidth="1.4" strokeLinecap="round">
            <path d="M18 21h28M18 27h28M18 33h28M18 39h20M18 45h13" />
          </g>
        )}
      </svg>
    </span>
  );
}
