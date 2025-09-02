import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { getJson } from "serpapi";

type Source = {
  title: string;
  link: string;
};

type Post = {
  id: number;
  content: string;
  hashtags: string;
  cta: string;
};

function cleanText(text: string): string {
  const banned = ["badword1", "badword2"];
  let cleaned = text;
  for (const word of banned) {
    const regex = new RegExp(word, "gi");
    cleaned = cleaned.replace(regex, "****");
  }
  return cleaned;
}

export async function POST(req: Request) {
  const { topic, tone, audience, length, postCount } = await req.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  try {
    // --- Step 1: Web Search ---
    let searchInsights = "";
    let sources: Source[] = [];
    try {
      const searchRes: any = await getJson({
        engine: "google",
        q: topic,
        api_key: process.env.SERP_API_KEY,
        num: 3,
      });

      if (Array.isArray(searchRes.organic_results)) {
        sources = searchRes.organic_results.map(
          (r: { title?: string; link?: string }): Source => ({
            title: r.title ?? "Untitled",
            link: r.link ?? "#",
          })
        );

        searchInsights =
          "Recent insights:\n" +
          sources.map((r) => `- ${r.title} (${r.link})`).join("\n");
      }
    } catch (err) {
      console.warn("SerpAPI search failed, continuing without search", err);
    }

    // --- Step 2: Planning ---
    const planPrompt = `Plan ${postCount} LinkedIn posts on "${topic}".
Tone: ${tone}, Audience: ${audience}, Length: ${length}.
Incorporate any relevant search insights:\n${searchInsights}
Give only short outlines/headlines.`;

    const planResult = await model.generateContent(planPrompt);
    const plans = planResult.response.text();

    // --- Step 3: Drafting ---
    const draftPrompt = `Expand these outlines into full LinkedIn posts:\n${plans}
Requirements:
- Match tone: ${tone}
- Target audience: ${audience}
- Keep length: ${length}
- End each post with a Call-to-Action
- Suggest hashtags separately under "Hashtags:"`;

    const draftResult = await model.generateContent(draftPrompt);
    const text = draftResult.response.text();

    // --- Step 4: Parse Posts ---
    const rawPosts = text.split(/\*\*?Post\s*\d+:?/i).filter((p) => p.trim());
    const posts: Post[] = rawPosts.map((p, i) => {
      const [content, hashtagsBlock] = p.split("Hashtags:");
      return {
        id: i + 1,
        content: cleanText(content.trim()),
        hashtags: hashtagsBlock ? cleanText(hashtagsBlock.trim()) : "",
        cta: content.includes("?")
          ? "👉 Share your thoughts in the comments!"
          : "🚀 Let’s connect and discuss!",
      };
    });

    return NextResponse.json({ posts, sources });
  } catch (err) {
    console.error("Agent error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
