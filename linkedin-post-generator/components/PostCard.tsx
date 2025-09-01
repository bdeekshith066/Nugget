"use client";
import { Clipboard } from "lucide-react";

export default function PostCard({
  content,
  hashtags,
  cta,
  index,
}: {
  content: string;
  hashtags: string;
  cta: string;
  index: number;
}) {
  function copyToClipboard() {
    navigator.clipboard.writeText(`${content}\n\n${hashtags}\n\n${cta}`);
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-1">
      <h2 className="text-xl font-bold text-sky-600 mb-3">
        LinkedIn Post {index}
      </h2>
      <p className="whitespace-pre-line text-gray-800 leading-relaxed">
        {content}
      </p>
      {hashtags && (
        <p className="mt-2 text-sm text-blue-600 font-medium">{hashtags}</p>
      )}
      <p className="mt-3 font-semibold text-gray-700">{cta}</p>

      <button
        onClick={copyToClipboard}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        <Clipboard size={18} />
        Copy Post
      </button>
    </div>
  );
}
