import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Loreco | Music Royalty Data Platform",
  description:
    "Statement reconciliation across formats, overseas royalty tracing, rightsholder matching. Loreco fixes the three places where music royalty data leaks, with AI.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
