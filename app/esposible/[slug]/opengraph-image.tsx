import { ImageResponse } from "next/og";
import { getContentCollection } from "@/lib/content/loader";

export const dynamic = "force-static";
export const alt = "Artículo de Alexendros · Es posible";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  const articles = await getContentCollection("esposible");
  const article = articles.find((a) => a.slug === params.slug);
  return [
    {
      id: params.slug,
      alt: article?.frontmatter.title ?? "Artículo",
      size,
      contentType,
    },
  ];
}

export async function generateStaticParams() {
  const articles = await getContentCollection("esposible");
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function EsPosibleArticleOG({ params }: { params: { slug: string } }) {
  const articles = await getContentCollection("esposible");
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1a14",
          color: "#e8f4ec",
          fontSize: "60px",
        }}
      >
        Alexendros
      </div>,
      { ...size },
    );
  }

  const { title, description, tags, date } = article.frontmatter;
  const dateStr = new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0f1a14",
        color: "#e8f4ec",
        padding: "80px 100px",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontFamily: "ui-monospace, Menlo, monospace",
          fontSize: "18px",
          letterSpacing: "0.1em",
          color: "#7ec998",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            padding: "4px 12px",
            border: "1px solid #7ec998",
            borderRadius: "999px",
          }}
        >
          Es posible
        </span>
        <span>{dateStr}</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "auto",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            maxWidth: "1000px",
            color: "#e8f4ec",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: "24px",
              color: "#9cb5a5",
              lineHeight: 1.4,
              maxWidth: "900px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "60px",
          fontFamily: "ui-monospace, Menlo, monospace",
          fontSize: "18px",
          color: "#9cb5a5",
        }}
      >
        <span>alexendros.me/esposible</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {tags.slice(0, 3).map((t) => (
            <span key={t} style={{ color: "#7ec998" }}>
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
