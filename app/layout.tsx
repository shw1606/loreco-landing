import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Loreco | 음원 정산 데이터 플랫폼",
  description:
    "포맷이 다른 정산서 대사, 해외 미회수 로열티 추적, 권리자 표기 매칭. 음악 산업의 정산 데이터가 새는 세 지점을 AI로 풉니다.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={display.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
