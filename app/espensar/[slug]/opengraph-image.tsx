import { ImageResponse } from "next/og";
import { getContentCollection } from "@/lib/content/loader";

export const dynamic = "force-static";
export const alt = "Artículo de Alexendros · Es pensar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  const articles = await getContentCollection("espensar");
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
  const articles = await getContentCollection("espensar");
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function EsPensarArticleOG({ params }: { params: { slug: string } }) {
  const articles = await getContentCollection("espensar");
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
          background: "#17130f",
          color: "#fefcf6",
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
        background: "#17130f",
        color: "#fefcf6",
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
          color: "#d9b267",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            padding: "4px 12px",
            border: "1px solid #d9b267",
            borderRadius: "999px",
          }}
        >
          Es pensar
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
            color: "#fefcf6",
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
              color: "#a8a093",
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
          color: "#a8a093",
        }}
      >
        <span>alexendros.me/espensar</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {tags.slice(0, 3).map((t) => (
            <span key={t} style={{ color: "#d9b267" }}>
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
