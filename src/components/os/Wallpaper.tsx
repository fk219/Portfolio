import type { WallpaperId } from "@/lib/types";

function Hunza() {
  return (
    <svg
      className="wallpaper__svg wallpaper__svg--hunza"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hunza-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c1220" />
          <stop offset=".34" stopColor="#273249" />
          <stop offset=".58" stopColor="#5c555f" />
          <stop offset=".74" stopColor="#bc7f72" />
          <stop offset=".86" stopColor="#efb88d" />
          <stop offset="1" stopColor="#f7d8ae" />
        </linearGradient>
        <radialGradient id="hunza-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff6d8" stopOpacity=".98" />
          <stop offset=".44" stopColor="#ffdca3" stopOpacity=".78" />
          <stop offset="1" stopColor="#ffc890" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hunza-haze" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd7ae" stopOpacity=".38" />
          <stop offset="1" stopColor="#ffd7ae" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hunza-back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6f7e8d" />
          <stop offset=".5" stopColor="#3c5667" />
          <stop offset="1" stopColor="#263d4b" />
        </linearGradient>
        <linearGradient id="hunza-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#243d49" />
          <stop offset="1" stopColor="#132a33" />
        </linearGradient>
        <linearGradient id="hunza-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#13242c" />
          <stop offset="1" stopColor="#091217" />
        </linearGradient>
        <linearGradient id="hunza-snow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3dd" stopOpacity=".72" />
          <stop offset="1" stopColor="#fff3dd" stopOpacity="0" />
        </linearGradient>
        <filter id="hunza-blur-xl" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="42" />
        </filter>
        <filter id="hunza-blur-sm" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <linearGradient id="hunza-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#05080d" stopOpacity=".38" />
          <stop offset=".42" stopColor="#05080d" stopOpacity="0" />
          <stop offset="1" stopColor="#05080d" stopOpacity=".48" />
        </linearGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#hunza-sky)" />

      <g className="wallpaper__slow-drift">
        <circle cx="1080" cy="606" r="220" fill="url(#hunza-haze)" filter="url(#hunza-blur-xl)" />
        <circle cx="1080" cy="584" r="94" fill="url(#hunza-sun)" />
        <ellipse cx="568" cy="582" rx="480" ry="76" fill="#ffd9ba" opacity=".09" filter="url(#hunza-blur-xl)" />
      </g>

      <g fill="#f8ead9" opacity=".45">
        <circle cx="196" cy="148" r="1.1" />
        <circle cx="282" cy="96" r=".9" />
        <circle cx="388" cy="184" r="1.5" />
        <circle cx="513" cy="118" r="1" />
        <circle cx="638" cy="62" r=".8" />
        <circle cx="744" cy="156" r="1.2" />
        <circle cx="880" cy="90" r=".9" />
        <circle cx="1214" cy="138" r="1.3" />
        <circle cx="1348" cy="64" r="1" />
        <circle cx="1440" cy="184" r=".8" />
        <circle cx="1058" cy="232" r=".75" />
      </g>

      <g opacity=".62" filter="url(#hunza-blur-sm)">
        <path
          d="M-40 612c189-37 315-15 467 21 154 36 289 56 429 14 163-49 300-38 471 3 108 26 209 28 321 5v140H-40Z"
          fill="#efc5a0"
          opacity=".22"
        />
      </g>

      <path
        d="M-30 722 106 604l102 72 130-166 104 110 96-78 142 132 116-106 126 110 102-73 126 85 102-40 147 98 124-62 120 76v328H-30Z"
        fill="url(#hunza-back)"
        opacity=".82"
      />
      <path
        d="m208 676 130-166 104 110-43 8-46 42-48-32-45 48Zm432-22 116-106 126 110-59-8-38 39-41-36-51 30Z"
        fill="url(#hunza-snow)"
        opacity=".46"
      />

      <path
        d="M-20 782 126 684l124 64 96-96 144 94 80-87 122 77 102-112 126 134 98-87 146 91 112-76 158 92 88-54 96 62v288H-20Z"
        fill="url(#hunza-mid)"
      />

      <g opacity=".66" filter="url(#hunza-blur-sm)">
        <ellipse cx="812" cy="756" rx="600" ry="36" fill="#d7c3b2" opacity=".2" />
      </g>

      <path
        d="M-30 884 172 806l132 60 144-82 178 80 154-84 128 78 182-96 134 88 160-54 146 70v198H-30Z"
        fill="url(#hunza-front)"
      />
      <path
        d="M230 812c75 11 144 17 218 32 91 19 160 35 258 35 92 0 188-22 271-42 87-20 185-33 274-23"
        fill="none"
        stroke="#f0cba0"
        strokeOpacity=".1"
        strokeWidth="1.4"
      />
      <rect width="1600" height="1000" fill="url(#hunza-vignette)" />
    </svg>
  );
}

function Sonoma() {
  return (
    <svg
      className="wallpaper__svg wallpaper__svg--sonoma"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sonoma-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#150d17" />
          <stop offset=".46" stopColor="#321728" />
          <stop offset="1" stopColor="#121522" />
        </linearGradient>
        <linearGradient id="sonoma-ribbon-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff9a62" stopOpacity="0" />
          <stop offset=".34" stopColor="#ff9d68" stopOpacity=".92" />
          <stop offset=".64" stopColor="#ffcf91" stopOpacity=".96" />
          <stop offset="1" stopColor="#e9596e" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sonoma-ribbon-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ec4b8c" stopOpacity="0" />
          <stop offset=".42" stopColor="#b769cd" stopOpacity=".7" />
          <stop offset=".72" stopColor="#5d6cd5" stopOpacity=".7" />
          <stop offset="1" stopColor="#2d4b91" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sonoma-ribbon-c" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffbf8a" stopOpacity="0" />
          <stop offset=".5" stopColor="#ffd9ae" stopOpacity=".66" />
          <stop offset="1" stopColor="#ff8c8e" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="sonoma-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffb487" stopOpacity=".4" />
          <stop offset=".55" stopColor="#d4698a" stopOpacity=".16" />
          <stop offset="1" stopColor="#38152f" stopOpacity="0" />
        </radialGradient>
        <filter id="sonoma-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="sonoma-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <linearGradient id="sonoma-top-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#08080d" stopOpacity=".5" />
          <stop offset=".4" stopColor="#08080d" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#sonoma-base)" />
      <ellipse cx="1080" cy="470" rx="680" ry="500" fill="url(#sonoma-glow)" />

      <g className="wallpaper__slow-drift">
        <g filter="url(#sonoma-blur)" opacity=".95">
          <path
            d="M-200 736c210-183 390-236 592-174 195 60 323 141 504 108 168-31 305-162 522-126 114 19 202 62 302 44v344c-139 23-230-20-370-37-195-24-337 117-525 128-202 12-319-115-501-94-182 21-319 119-524 54Z"
            fill="url(#sonoma-ribbon-a)"
          />
          <path
            d="M-260 520c180-127 393-202 594-121 189 77 267 204 443 220 196 18 291-138 462-143 112-4 210 47 381 37v273c-149 38-245-13-376-17-183-5-292 97-459 108-203 13-292-117-455-118-184-2-318 70-590-18Z"
            fill="url(#sonoma-ribbon-b)"
            opacity=".78"
          />
          <path
            d="M-300 862c222-78 435-34 609-76 217-51 311-176 519-168 223 8 352 157 592 94 88-24 156-58 248-55"
            fill="none"
            stroke="url(#sonoma-ribbon-c)"
            strokeWidth="118"
            opacity=".6"
          />
        </g>

        <g filter="url(#sonoma-soft)" opacity=".8">
          <path
            d="M200 640c150-91 302-99 437-57 145 45 258 117 422 72 127-35 219-134 406-123"
            fill="none"
            stroke="#ffdfb2"
            strokeWidth="7"
            strokeOpacity=".42"
          />
          <path
            d="M82 296c188 15 340 79 509 184 159 99 323 179 510 168 145-9 263-65 414-55"
            fill="none"
            stroke="#ff9d8f"
            strokeWidth="2.4"
            strokeOpacity=".24"
          />
        </g>
      </g>

      <path
        d="M180 218c178-70 336-52 488 21M992 750c128-42 260-41 388-8"
        fill="none"
        stroke="#fff4e6"
        strokeOpacity=".09"
        strokeWidth="1.2"
      />
      <rect width="1600" height="1000" fill="url(#sonoma-top-shade)" />
    </svg>
  );
}

function Lagoon() {
  return (
    <svg
      className="wallpaper__svg wallpaper__svg--lagoon"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="lagoon-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#071b25" />
          <stop offset=".45" stopColor="#0c3440" />
          <stop offset=".7" stopColor="#1c5c60" />
          <stop offset="1" stopColor="#6a8b77" />
        </linearGradient>
        <radialGradient id="lagoon-moon" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fdffe8" />
          <stop offset=".25" stopColor="#f2f7d8" stopOpacity=".9" />
          <stop offset=".55" stopColor="#c9e5d4" stopOpacity=".22" />
          <stop offset="1" stopColor="#b5dbcc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lagoon-wave-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7daf9b" stopOpacity="0" />
          <stop offset=".4" stopColor="#9ed0b6" stopOpacity=".42" />
          <stop offset=".7" stopColor="#d6e9c7" stopOpacity=".28" />
          <stop offset="1" stopColor="#7daf9b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lagoon-wave-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4c8c8f" stopOpacity="0" />
          <stop offset=".45" stopColor="#d3ece1" stopOpacity=".34" />
          <stop offset="1" stopColor="#4c8c8f" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lagoon-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c2b31" />
          <stop offset="1" stopColor="#041217" />
        </linearGradient>
        <filter id="lagoon-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="lagoon-blur-sm" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <linearGradient id="lagoon-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#020b0f" stopOpacity=".45" />
          <stop offset=".3" stopColor="#020b0f" stopOpacity="0" />
          <stop offset="1" stopColor="#031117" stopOpacity=".55" />
        </linearGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#lagoon-sky)" />
      <circle cx="1182" cy="337" r="218" fill="url(#lagoon-moon)" />
      <circle cx="1182" cy="337" r="42" fill="#f5f8de" opacity=".86" />

      <g className="wallpaper__slow-drift">
        <g filter="url(#lagoon-blur)" opacity=".72">
          <path
            d="M-100 648c210-48 384-20 553 32 167 51 314 72 477 5 181-74 319-77 491-17 92 33 183 50 290 29v300H-100Z"
            fill="#76b9b0"
            opacity=".12"
          />
          <path
            d="M-120 760c202-58 395-27 572 11 183 40 331 35 473-15 192-67 347-48 511 4 87 29 168 36 272 25v248H-120Z"
            fill="#a9d7c2"
            opacity=".08"
          />
        </g>

        <g fill="none" strokeLinecap="round">
          <path
            d="M-80 714c226-71 389-45 571 8 171 50 332 73 506 5 159-62 303-55 496-10 78 18 154 23 247 11"
            stroke="url(#lagoon-wave-a)"
            strokeWidth="2.4"
          />
          <path
            d="M-110 790c207-52 394-36 583 16 171 47 340 54 513-4 166-56 314-45 491-7 82 17 145 18 253 7"
            stroke="url(#lagoon-wave-b)"
            strokeWidth="1.4"
          />
          <path
            d="M-80 866c231-53 409-31 601 22 165 46 334 49 507-3 171-51 305-49 479-13 85 18 160 18 249 3"
            stroke="url(#lagoon-wave-a)"
            strokeWidth="1"
            opacity=".7"
          />
        </g>
      </g>

      <g opacity=".55" filter="url(#lagoon-blur-sm)">
        <path
          d="M-30 724c144-61 252-75 378-38 125 36 196 8 288-21 89-28 163-28 239 1 108 42 172 55 289 33 107-20 195-59 297-50 98 8 172 44 285 25v144c-159 14-256-16-374-28-141-14-224 28-351 43-155 19-236-4-393-15-175-12-247 34-410 37-110 2-206-23-338-24Z"
          fill="#c1e0ce"
          opacity=".07"
        />
      </g>

      <path
        d="M-40 916c160-58 279-27 423 5 152 34 269 28 406-14 151-46 288-34 434 4 143 37 259 37 417-4v123H-40Z"
        fill="url(#lagoon-front)"
      />
      <g stroke="#c5dfcf" strokeOpacity=".12">
        <path d="M70 948c194-23 360 2 546 8M339 970c204-18 392-8 594 5M921 944c190-24 362-12 566 8" />
      </g>
      <rect width="1600" height="1000" fill="url(#lagoon-shade)" />
    </svg>
  );
}

function Graphite() {
  return (
    <svg
      className="wallpaper__svg wallpaper__svg--graphite"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="graphite-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#08090c" />
          <stop offset=".5" stopColor="#15171c" />
          <stop offset="1" stopColor="#07080b" />
        </linearGradient>
        <radialGradient id="graphite-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#c4cad5" stopOpacity=".2" />
          <stop offset=".5" stopColor="#7c8492" stopOpacity=".07" />
          <stop offset="1" stopColor="#2f333b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="graphite-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#dce2eb" stopOpacity="0" />
          <stop offset=".4" stopColor="#dce2eb" stopOpacity=".58" />
          <stop offset=".7" stopColor="#89909c" stopOpacity=".34" />
          <stop offset="1" stopColor="#7e8590" stopOpacity="0" />
        </linearGradient>
        <filter id="graphite-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="36" />
        </filter>
        <filter id="graphite-grain">
          <feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".24" />
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="1600" height="1000" fill="url(#graphite-base)" />
      <ellipse cx="1080" cy="460" rx="750" ry="500" fill="url(#graphite-glow)" filter="url(#graphite-blur)" />

      <g className="wallpaper__slow-drift">
        <g fill="none" stroke="url(#graphite-line)" opacity=".9">
          <ellipse cx="1072" cy="500" rx="626" ry="378" transform="rotate(-17 1072 500)" strokeWidth="1.1" />
          <ellipse cx="1072" cy="500" rx="536" ry="312" transform="rotate(-17 1072 500)" strokeWidth=".8" opacity=".7" />
          <ellipse cx="1072" cy="500" rx="444" ry="250" transform="rotate(-17 1072 500)" strokeWidth=".6" opacity=".5" />
          <ellipse cx="1072" cy="500" rx="354" ry="192" transform="rotate(-17 1072 500)" strokeWidth=".5" opacity=".35" />
          <ellipse cx="1072" cy="500" rx="268" ry="140" transform="rotate(-17 1072 500)" strokeWidth=".4" opacity=".24" />
        </g>
        <path
          d="M-80 770c254-166 474-276 720-289 262-14 473 108 658 250 116 89 205 160 382 190"
          fill="none"
          stroke="#c6ccd7"
          strokeOpacity=".15"
          strokeWidth="1"
        />
        <path
          d="M-60 862c249-175 474-294 742-276 239 16 434 152 607 263 103 66 190 105 331 121"
          fill="none"
          stroke="#c6ccd7"
          strokeOpacity=".08"
          strokeWidth=".8"
        />
      </g>

      <g transform="translate(210 190)">
        <path d="M0 0h220" stroke="#d7dce4" strokeOpacity=".18" />
        <path d="M0 22h140" stroke="#d7dce4" strokeOpacity=".07" />
        <circle cx="0" cy="0" r="3" fill="#e5e9ef" opacity=".5" />
      </g>

      <rect width="1600" height="1000" filter="url(#graphite-grain)" opacity=".17" />
      <linearGradient id="graphite-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity=".45" />
        <stop offset=".35" stopColor="#000" stopOpacity="0" />
      </linearGradient>
      <rect width="1600" height="1000" fill="url(#graphite-top)" />
    </svg>
  );
}

function Blueprint() {
  return (
    <svg
      className="wallpaper__svg wallpaper__svg--blueprint"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="blueprint-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#050b08" />
          <stop offset=".48" stopColor="#091a12" />
          <stop offset="1" stopColor="#040907" />
        </linearGradient>
        <radialGradient id="blueprint-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#b8f25c" stopOpacity=".2" />
          <stop offset=".45" stopColor="#6ee7b7" stopOpacity=".08" />
          <stop offset="1" stopColor="#06120c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="blueprint-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b8f25c" stopOpacity="0" />
          <stop offset=".4" stopColor="#b8f25c" stopOpacity=".52" />
          <stop offset=".7" stopColor="#6ee7b7" stopOpacity=".3" />
          <stop offset="1" stopColor="#6ee7b7" stopOpacity="0" />
        </linearGradient>
        <pattern id="blueprint-grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M42 0H0v42" fill="none" stroke="#8af0c0" strokeOpacity=".055" strokeWidth=".7" />
        </pattern>
        <pattern id="blueprint-grid-major" width="210" height="210" patternUnits="userSpaceOnUse">
          <path d="M210 0H0v210" fill="none" stroke="#8af0c0" strokeOpacity=".075" strokeWidth=".9" />
        </pattern>
        <filter id="blueprint-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="32" />
        </filter>
        <linearGradient id="blueprint-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#010403" stopOpacity=".55" />
          <stop offset=".3" stopColor="#010403" stopOpacity="0" />
          <stop offset="1" stopColor="#010403" stopOpacity=".5" />
        </linearGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#blueprint-base)" />
      <rect width="1600" height="1000" fill="url(#blueprint-grid)" />
      <rect width="1600" height="1000" fill="url(#blueprint-grid-major)" />
      <ellipse cx="1120" cy="430" rx="620" ry="470" fill="url(#blueprint-glow)" filter="url(#blueprint-blur)" />

      <g className="wallpaper__slow-drift">
        <g fill="none" stroke="#8af0c0" opacity=".48">
          <circle cx="1118" cy="420" r="304" strokeWidth=".9" strokeDasharray="2 9" />
          <circle cx="1118" cy="420" r="238" strokeWidth=".8" strokeOpacity=".7" />
          <circle cx="1118" cy="420" r="172" strokeWidth=".6" strokeOpacity=".5" />
          <circle cx="1118" cy="420" r="106" strokeWidth=".5" strokeOpacity=".35" />
        </g>
        <g fill="#b8f25c">
          {[
            [1118, 116],
            [1422, 420],
            [1118, 724],
            [814, 420],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" opacity=".62" />
          ))}
        </g>
        <g fill="none" stroke="url(#blueprint-line)" strokeWidth="1.1">
          <path d="M-40 806H264l58-58h246l54 58h268l62-72h420l64 54h480" />
          <path d="M-30 856H192l72 56h354l54-56h310l66 52h396l58-52h180" opacity=".55" />
          <path d="M92 176h280l44 44h214" opacity=".4" />
        </g>
        <g fill="#b8f25c">
          {[
            [264, 806],
            [568, 748],
            [622, 806],
            [890, 806],
            [952, 734],
            [1372, 788],
            [372, 176],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="3.2" opacity=".8" />
              <circle cx={cx} cy={cy} r="10" fill="none" stroke="#b8f25c" strokeOpacity=".24" />
            </g>
          ))}
        </g>
        <g opacity=".38" stroke="#8af0c0" strokeWidth="1">
          {Array.from({ length: 13 }).map((_, index) => (
            <path key={index} d={`M${1118 + 318 * Math.cos((index / 13) * Math.PI * 2)} ${420 + 318 * Math.sin((index / 13) * Math.PI * 2)}l${4 * Math.cos((index / 13) * Math.PI * 2)} ${4 * Math.sin((index / 13) * Math.PI * 2)}`} />
          ))}
        </g>
      </g>

      <g fill="#8af0c0" opacity=".3" fontFamily="ui-monospace, 'SF Mono', Menlo, monospace" fontSize="10" letterSpacing="2">
        <text x="86" y="94">PORTFOLIO OS / BLUEPRINT</text>
        <text x="1280" y="924">BUILD 1.0.0</text>
        <text x="86" y="924">27°C · DUBAI</text>
      </g>
      <g stroke="#8af0c0" strokeOpacity=".2">
        <path d="M86 106h64M86 106v16M1514 106h-64M1514 106v16M86 894h64M86 894v-16M1514 894h-64M1514 894v-16" />
      </g>

      <rect width="1600" height="1000" fill="url(#blueprint-shade)" />
    </svg>
  );
}

const wallpapers: Record<WallpaperId, () => React.JSX.Element> = {
  hunza: Hunza,
  sonoma: Sonoma,
  lagoon: Lagoon,
  graphite: Graphite,
  blueprint: Blueprint,
};

export function Wallpaper({ id }: { id: WallpaperId }) {
  const Artwork = wallpapers[id];
  return (
    <div className={`wallpaper wallpaper--${id}`} aria-hidden="true">
      <Artwork />
      <div className="wallpaper__ambient" />
      <div className="wallpaper__grain" />
      <div className="wallpaper__vignette" />
    </div>
  );
}
