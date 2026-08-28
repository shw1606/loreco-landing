"use client";

import { useState } from "react";
import samples from "@/data/mlc_samples.json";

type Sample = {
  title: string;
  artist: string;
  year: number;
  stratum: string;
  verdict: "MLC_MATCHED" | "MLC_WORK_ONLY" | "MLC_UNMATCHED";
  iswc: boolean;
  isrc_linked: boolean;
  recordings_n: number;
};

const LIST = samples as Sample[];

const BADGE = {
  MLC_MATCHED: { label: "정상 연결", cls: "bg-emerald-400/15 text-emerald-300" },
  MLC_WORK_ONLY: { label: "원곡 녹음 미연결", cls: "bg-amber-400/15 text-amber-300" },
  MLC_UNMATCHED: { label: "작품 미등록", cls: "bg-red-400/15 text-red-300" },
} as const;

function Check({ ok, warn }: { ok: boolean; warn?: boolean }) {
  if (ok) return <span className="text-emerald-400 font-semibold">확인됨</span>;
  return <span className={warn ? "text-amber-300 font-semibold" : "text-red-400 font-semibold"}>확인 안 됨</span>;
}

const MLC_ROWS = [
  { label: "미국 곡", n: 52, pct: 84.6 },
  { label: "한국 주류", n: 109, pct: 59.6 },
  { label: "한국 OST", n: 30, pct: 40.0 },
  { label: "한국 인디", n: 30, pct: 16.7 },
];

export default function TraceDemo() {
  const [sel, setSel] = useState<Sample>(LIST[0]);
  const b = BADGE[sel.verdict];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4">
        <p className="text-[13px] font-medium text-[var(--muted)]">
          곡을 선택하면 미국 MLC 공개 DB 조회 결과를 보여줍니다
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {LIST.map((s) => (
            <button
              key={s.title + s.artist}
              onClick={() => setSel(s)}
              className={`rounded-full border px-3 py-1.5 text-[13px] ${
                sel === s
                  ? "border-transparent btn-grad text-white"
                  : "border-[var(--line)] bg-white/5 text-[var(--text)]"
              }`}
            >
              {s.title.length > 18 ? s.title.slice(0, 17) + "…" : s.title}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-[var(--line)] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-semibold">
              {sel.title} <span className="font-normal text-[var(--muted)]">{sel.artist} ({sel.year}, {sel.stratum})</span>
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${b.cls}`}>{b.label}</span>
          </div>
          <table className="mt-3 w-full text-[14px]">
            <tbody>
              <tr className="border-t border-[var(--line)]">
                <td className="py-2 text-[var(--muted)]">MLC 작품 등록</td>
                <td className="text-right"><Check ok={sel.verdict !== "MLC_UNMATCHED"} /></td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="py-2 text-[var(--muted)]">ISWC (국제 작품 코드)</td>
                <td className="text-right"><Check ok={sel.iswc} warn /></td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="py-2 text-[var(--muted)]">이 곡의 원곡 녹음(ISRC) 연결</td>
                <td className="text-right"><Check ok={sel.isrc_linked} /></td>
              </tr>
              {sel.recordings_n > 0 && (
                <tr className="border-t border-[var(--line)]">
                  <td className="py-2 text-[var(--muted)]">작품에 연결된 녹음 수</td>
                  <td className="text-right font-medium">{sel.recordings_n.toLocaleString()}건</td>
                </tr>
              )}
            </tbody>
          </table>
          {sel.verdict === "MLC_WORK_ONLY" && (
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">
              작품은 등록돼 있지만 원곡 녹음이 연결돼 있지 않습니다. 이 상태에서는 미국
              스트리밍에서 발생한 기계적 복제권 사용료가 권리자와 이어지지 못할 수 있습니다.
            </p>
          )}
          {sel.verdict === "MLC_UNMATCHED" && (
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">
              ISRC로도, 제목(로마자 표기 포함)으로도 MLC에서 작품을 찾지 못했습니다.
            </p>
          )}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">
          2026년 8월 MLC 공개 작품 검색을 직접 조회한 결과입니다. 조회 시점 이후 등록이나
          연결이 바뀌었을 수 있습니다.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4">
        <p className="text-[14px] font-medium">
          표본 221곡 조사: MLC에서 녹음 연결을 확인할 수 있었던 비율
        </p>
        <div className="mt-3 space-y-3">
          {MLC_ROWS.map((r) => (
            <div key={r.label}>
              <div className="flex items-baseline justify-between text-[13px]">
                <span>
                  {r.label} <span className="text-[var(--muted)]">({r.n}곡)</span>
                </span>
                <span className="font-semibold">{r.pct}%</span>
              </div>
              <div className="mt-1 h-2.5 rounded-full bg-white/10">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#e0447c]" style={{ width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">
          2026년 8월 자체 표본조사. 곡을 특정하지 못했거나 조회가 안 된 표본은 연결 확인으로
          치지 않았으므로 실제 연결률은 이보다 높을 수 있습니다. 그 차이 자체가 확인 비용의
          문제입니다.
        </p>
      </div>
    </div>
  );
}
