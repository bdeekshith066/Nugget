"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./page.css";

export default function Home() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [audience, setAudience] = useState("General");
  const [length, setLength] = useState("Medium");
  const [postCount, setPostCount] = useState(3);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone, audience, length, postCount }),
      });

      const data = await res.json();

      // Save posts + sources to sessionStorage
      sessionStorage.setItem("generatedPosts", JSON.stringify(data.posts || []));
      if (data.sources) {
        sessionStorage.setItem("searchSources", JSON.stringify(data.sources));
      }

      router.push("/results");
    } catch (err) {
      console.error("Error generating posts:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Transform Ideas into <span>Engaging <br/> LinkedIn Posts</span>
          </h1>
          <p className="typing-text">
          <span className="line line1">
            Generate LinkedIn-ready posts from any topic in seconds..
          </span>
          <br />
        </p>


          {/* Features */}
          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">🤖</span>
              <h2>AI-Powered</h2>
              <br/>
              <p><b>Generate content instantly with Gemini AI + SerpAPI insights.</b></p>
            </div>
            <div className="feature">
              <span className="feature-icon">🌟</span>
              <h2>Multiple Variations</h2>
              <br/>
              <p><b>Get Minimum 3 unique post drafts per topic, ready to copy & share.</b></p>
            </div>
            <div className="feature">
              <span className="feature-icon">🚀</span>
              <h2>LinkedIn Ready</h2>
              <br/>
              <p><b>Optimized formatting with hashtags & CTAs to boost reach.</b></p>
            </div>
            <div className="feature">
              <span className="feature-icon">#️⃣</span>
              <h2>Smart Hashtags & CTAs</h2>
              <br/>
              <p><b>Get optimized hashtags and call-to-actions to maximize engagement</b></p>
            </div>
          </div>
          <p> </p>
          {/* CTA */}
          <div className="features-cta">
            <a href="#form" className="cta-btn">🚀 Start Generating</a>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="form-section">
        <div className="form-card">
          <h2>Create Your Posts</h2>
          <form onSubmit={handleSubmit}>
            <label>Topic *</label>
              <textarea
                placeholder="e.g., AI in healthcare, Leadership tips..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="topic-textarea"
              />
            <div className="grid">
              <div>
                <label>Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)}>
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Storytelling</option>
                </select>
              </div>
              <div>
                <label>Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                >
                  <option>General</option>
                  <option>Students</option>
                  <option>Recruiters</option>
                  <option>Founders</option>
                </select>
              </div>
              <div>
                <label>Length</label>
                <select value={length} onChange={(e) => setLength(e.target.value)}>
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Long</option>
                </select>
              </div>
              <div>
                <label>Post Count</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={postCount}
                  onChange={(e) => setPostCount(parseInt(e.target.value))}
                />
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "⚡ Generating..." : "🚀 Generate LinkedIn Posts"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
  <div className="footer-grid">
    <div>
      <p>Internship Assignment</p>
      <p><strong>AI LinkedIn Post Generator</strong></p>
    </div>
    <div>
      <p>
        Built by <strong>Deekshith B</strong>
      </p>
      <p>
        <a
          href="https://www.linkedin.com/in/deekshith2912/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href="https://github.com/deekshith2912"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          GitHub
        </a>
      </p>
    </div>
    <div>
      <p>Powered by</p>
      <p> Next.js • Gemini AI • SerpAPI</p>
    </div>
  </div>
</footer>


    </main>
  );
}
