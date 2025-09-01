"use client";
import { useEffect, useState } from "react";
import "./results.css";

export default function Results() {
  const [posts, setPosts] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);

  useEffect(() => {
    const storedPosts = sessionStorage.getItem("generatedPosts");
    const storedSources = sessionStorage.getItem("searchSources");
    if (storedPosts) setPosts(JSON.parse(storedPosts));
    if (storedSources) setSources(JSON.parse(storedSources));
  }, []);

  return (
    <main className="results-page">
      <section className="hero">
        <h1>Your LinkedIn Posts</h1>
        <p>✨ Scroll through your generated posts below</p>
      </section>

      {/* Flashcards */}
      <section className="flashcards">
        {posts.map((p, i) => (
          <div className="flashcard" key={i}>
            <h2>Post #{i + 1}</h2>
            <div className="content-scroll">
              <p>{p.content}</p>
              {p.hashtags && <p className="hashtags">{p.hashtags}</p>}
              {p.cta && <p className="cta">{p.cta}</p>}
            </div>
            <button
              className="copy-btn"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${p.content}\n${p.hashtags || ""}\n${p.cta || ""}`
                )
              }
            >
              Copy Post
            </button>
          </div>
        ))}
      </section>

      {/* Sources */}
      {sources.length > 0 && (
        <section className="sources">
          <h2>🔎 Sources from Web Search</h2>
          <ul>
            {sources.map((s, i) => (
              <li key={i}>
                <a href={s.link} target="_blank" rel="noopener noreferrer">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer>
        <a href="/" className="back-btn">
          🔄 Generate More
        </a>
      </footer>
    </main>
  );
}
