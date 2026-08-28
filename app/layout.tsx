import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loreco | 음원 정산 데이터 플랫폼",
  description:
    "포맷이 다른 정산서 대사, 해외 미회수 로열티 추적, 권리자 표기 매칭. 음악 산업의 정산 데이터가 새는 세 지점을 AI로 풉니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
