import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nugget | LinkedIn Post Generator",
  description: "Turn any idea into LinkedIn Gold ✨",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-sky-50 via-white to-sky-100">
        {children}
      </body>
    </html>
  );
}
