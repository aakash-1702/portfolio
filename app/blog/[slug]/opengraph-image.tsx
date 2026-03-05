import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = "Blog post preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  const title = post?.meta.title ?? "Blog Post";
  const date = post?.meta.date ?? "";
  const category = post?.meta.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "#030303",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top: branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "#c4a482",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              color: "#888",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_CONFIG.name}
          </span>
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 50 ? "48px" : "56px",
              fontWeight: 700,
              color: "#ededed",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom: meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "16px",
            color: "#666",
          }}
        >
          {date && <span>{date}</span>}
          {category && (
            <>
              <span style={{ color: "#444" }}>·</span>
              <span style={{ color: "#c4a482" }}>{category}</span>
            </>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
