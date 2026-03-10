import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "tailbus — The communication plane for agents across runtimes, machines, and teams.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          tailbus
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#9ca3af",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          The communication plane for agents across runtimes, machines, and
          teams.
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
          }}
        >
          {["Identity", "Routing", "Rooms", "Observability"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "1px solid #1f2937",
                color: "#60a5fa",
                fontSize: 20,
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 20,
            color: "#4b5563",
          }}
        >
          tailbus.co
        </div>
      </div>
    ),
    { ...size }
  );
}
