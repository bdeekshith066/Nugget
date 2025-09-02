"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./results.css";

export default function Results() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);

  // utility: remove markdown **
  function cleanMarkdown(text: string) {
    return text.replace(/\*\*/g, ""); // strip all **
  }

  useEffect(() => {
    const savedPosts = sessionStorage.getItem("generatedPosts");
    const savedSources = sessionStorage.getItem("searchSources");
    if (savedPosts) {
      const parsed = JSON.parse(savedPosts);
      const cleaned = parsed.map((p: any) => ({
        ...p,
        content: cleanMarkdown(p.content),
        hashtags: cleanMarkdown(p.hashtags),
        cta: cleanMarkdown(p.cta),
      }));
      setPosts(cleaned);
    }
    if (savedSources) setSources(JSON.parse(savedSources));
  }, []);

  return (
    <main className="results-page">
      {/* Hero Title */}
      <section className="results-hero">
        <h1>Your LinkedIn Posts</h1>
      </section>

      {/* Posts Grid */}
      <div className="results-grid">
        {posts.map((post, i) => (
          <div className="result-card" key={i}>
            <div className="card-header">
              <h2>Post #{i + 1}</h2>
              <button
                className="copy-btn"
                onClick={() =>
                  navigator.clipboard.writeText(
                    post.content + "\n\n" + post.hashtags + "\n" + post.cta
                  )
                }
              >
                📋 Copy
              </button>
            </div>
            <p className="content">{post.content}</p>
            {post.hashtags && <p className="hashtags">{post.hashtags}</p>}
            <p className="cta">{post.cta}</p>
          </div>
        ))}
      </div>

      {/* Sources Section */}
      {sources.length > 0 && (
        <div className="sources">
          <h2>🔍 Sources from Web Search</h2>
          <ul>
            {sources.map((s, i) => (
              <li key={i}>
                <a href={s.link} target="_blank" rel="noopener noreferrer">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA Button */}
      <div className="results-cta">
        <button className="results-btn" onClick={() => router.push("/")}>
          🔄 Generate Again
        </button>
      </div>
    </main>
  );
}
