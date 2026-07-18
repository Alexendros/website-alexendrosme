import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Alexendros — Espacio personal libre de dinero";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function HomeOG() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#17130f",
        color: "#fefcf6",
        padding: "80px 100px",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle at 70% 30%, #d9b26722 0%, transparent 60%)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontFamily: "ui-monospace, Menlo, monospace",
          fontSize: "20px",
          letterSpacing: "0.1em",
          color: "#d9b267",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#d9b267",
          }}
        />
        alexendros.me
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "auto",
          gap: "32px",
        }}
      >
        <div
          style={{
            fontSize: "92px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            maxWidth: "1000px",
            color: "#fefcf6",
          }}
        >
          Grandes soluciones
          <br />
          de un ingenio no previsto.
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#a8a093",
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          Espacio libre de dinero. Soberanía digital, crítica tecnológica, software ético.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "60px",
          fontFamily: "ui-monospace, Menlo, monospace",
          fontSize: "20px",
          color: "#a8a093",
        }}
      >
        <span>Valencia, ES</span>
        <span style={{ color: "#d9b267" }}>v0.5.0</span>
      </div>
    </div>,
    { ...size },
  );
}
