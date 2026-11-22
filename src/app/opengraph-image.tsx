import { ImageResponse } from "next/og";

export const alt =
  "Furqan Khan, founder of FKodeLabs and full-stack developer. An interactive macOS and iPhone portfolio.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#0b111a",
          color: "#f8f5ee",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -140,
            width: 840,
            height: 840,
            display: "flex",
            borderRadius: 9999,
            background:
              "radial-gradient(circle at 42% 38%, rgba(255,225,186,0.85), rgba(205,117,100,0.28) 42%, rgba(20,35,45,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 270,
            display: "flex",
            background: "linear-gradient(180deg, rgba(8,17,22,0) 0%, #081116 90%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 690,
            height: "100%",
            padding: "54px 0 48px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#f1c18e",
              }}
            />
            <span
              style={{
                display: "flex",
                color: "#e2bd93",
                fontSize: 16,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Portfolio OS
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                display: "flex",
                color: "#f8f5ee",
                fontSize: 106,
                fontWeight: 600,
                letterSpacing: "-0.065em",
                lineHeight: 0.92,
              }}
            >
              Furqan Khan
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 25,
                color: "#b9c1c6",
                fontSize: 25,
                letterSpacing: "-0.015em",
                lineHeight: 1.3,
              }}
            >
              <span style={{ display: "flex" }}>Founder, FKodeLabs.</span>
              <span style={{ display: "flex" }}>
                Full-stack developer &amp; MCA.
              </span>
            </span>
            <span
              style={{
                display: "flex",
                marginTop: 23,
                color: "#f3cfab",
                fontSize: 18,
                letterSpacing: "0.01em",
              }}
            >
              An interactive macOS + iPhone portfolio.
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            {["#ff5f57", "#febc2e", "#28c840", "#0a84ff", "#b26bf2"].map(
              (color) => (
                <div
                  key={color}
                  style={{
                    display: "flex",
                    width: 11,
                    height: 11,
                    borderRadius: 9999,
                    background: color,
                  }}
                />
              ),
            )}
            <span
              style={{
                display: "flex",
                marginLeft: 7,
                color: "#7e8c95",
                fontSize: 15,
              }}
            >
              Finder, Safari, Notes, Terminal, and more
            </span>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: 448,
            height: 412,
            marginTop: 134,
            borderRadius: 15,
            border: "1px solid rgba(255,255,255,0.23)",
            overflow: "hidden",
            background: "rgba(240,240,243,0.95)",
            boxShadow: "0 28px 70px rgba(0,0,0,0.45)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 40,
              padding: "0 14px",
              background: "#e6e6e8",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
              <div
                key={color}
                style={{
                  display: "flex",
                  width: 10,
                  height: 10,
                  marginRight: 7,
                  borderRadius: 9999,
                  background: color,
                }}
              />
            ))}
            <span
              style={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "center",
                marginRight: 46,
                color: "#5f6368",
                fontSize: 12,
              }}
            >
              Portfolio
            </span>
          </div>
          <div style={{ display: "flex", flexGrow: 1 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 114,
                padding: "17px 12px",
                gap: 11,
                background: "#e9e9ec",
                borderRight: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              {["#1d6cd8", "#6f7178", "#6f7178", "#6f7178"].map(
                (color, index) => (
                  <div
                    key={`${color}-${index}`}
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: 9,
                        height: 9,
                        borderRadius: 2,
                        background: color,
                        opacity: index === 0 ? 1 : 0.26,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        width: index === 0 ? 56 : 46,
                        height: 5,
                        borderRadius: 3,
                        background: "#36383c",
                        opacity: index === 0 ? 0.7 : 0.22,
                      }}
                    />
                  </div>
                ),
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                padding: "16px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    color: "#33363a",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  All Work
                </span>
                <div
                  style={{
                    display: "flex",
                    width: 94,
                    height: 19,
                    borderRadius: 5,
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.11)",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { from: "#f4c76d", to: "#c96c3b", label: "#3b2417" },
                  { from: "#c5ebe5", to: "#3c8a8a", label: "#143c3c" },
                  { from: "#dfdcff", to: "#6d67bb", label: "#282354" },
                ].map((cover) => (
                  <div
                    key={cover.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      gap: 7,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        height: 85,
                        borderRadius: 6,
                        background: `linear-gradient(145deg, ${cover.from}, ${cover.to})`,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        width: "72%",
                        height: 6,
                        borderRadius: 3,
                        background: "#2a2c30",
                        opacity: 0.6,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        width: "48%",
                        height: 4,
                        borderRadius: 3,
                        background: "#3a3c40",
                        opacity: 0.25,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 19,
                  gap: 9,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: 46,
                    borderRadius: 7,
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: 46,
                    borderRadius: 7,
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
