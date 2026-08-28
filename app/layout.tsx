import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "서현우 | 음악 산업 문제 노트",
  description:
    "정산서 대사, 해외에 걷히지 않는 로열티, 권리자 이름 매칭. 음악 산업의 세 가지 데이터 문제를 공부하고 있는 AI 엔지니어의 노트입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
