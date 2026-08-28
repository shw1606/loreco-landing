"use client";

import { useState } from "react";
import { COPY, type Locale } from "@/lib/copy";

const FX = 1350;

type RowA = { song: string; service: number; plays: number; amount: number };
type RowB = { isrc: string; track: string; territory: string; qty: number; net: number };
type RowC = { song: string; kind: number; amount: number };

const SVC = { ko: ["스트리밍", "다운로드"], en: ["Streaming", "Download"] };
const KIND = { ko: ["방송", "공연"], en: ["Broadcast", "Live"] };

const SRC_A: RowA[] = [
  { song: "밤의 도시", service: 0, plays: 412_300, amount: 1_237_000 },
  { song: "여름 끝", service: 0, plays: 158_900, amount: 476_000 },
  { song: "밤의 도시", service: 1, plays: 820, amount: 41_000 },
];

const SRC_B: RowB[] = [
  { isrc: "KRZ012400001", track: "Neon Night", territory: "US", qty: 88_400, net: 310.2 },
  { isrc: "KRZ012400001", track: "Neon Night", territory: "JP", qty: 21_050, net: 88.4 },
  { isrc: "KRZ012400007", track: "First Light", territory: "US", qty: 12_700, net: 45.1 },
];

const SRC_C: RowC[] = [
  { song: "밤의 도시", kind: 0, amount: 152_000 },
  { song: "여름 끝", kind: 1, amount: 38_000 },
];

// 밤의 도시(=Neon Night, KRZ012400001)의 소스별 표기가 전부 다르다는 것이 이 데모의 핵심
const SPLITS: Record<string, { holder: string; role: "compose" | "lyrics" | "arrange"; share: number }[]> = {
  "밤의 도시": [
    { holder: "김하늘", role: "compose", share: 0.5 },
    { holder: "이서준", role: "lyrics", share: 0.3 },
    { holder: "박도윤", role: "arrange", share: 0.2 },
  ],
  "여름 끝": [
    { holder: "김하늘", role: "compose", share: 0.6 },
    { holder: "최유나", role: "lyrics", share: 0.4 },
  ],
  "First Light": [{ holder: "Sarah Kim", role: "compose", share: 1.0 }],
};

const won = (n: number) => "₩" + Math.round(n).toLocaleString("ko-KR");

function totalBySong() {
  const t: Record<string, number> = {};
  for (const r of SRC_A) t[r.song] = (t[r.song] ?? 0) + r.amount;
  for (const r of SRC_B) {
    const song = r.isrc === "KRZ012400001" ? "밤의 도시" : "First Light";
    t[song] = (t[song] ?? 0) + r.net * FX;
  }
  for (const r of SRC_C) t[r.song] = (t[r.song] ?? 0) + r.amount;
  return t;
}

export default function ReconcileDemo({ locale }: { locale: Locale }) {
  const c = COPY[locale].reconcile;
  const [tab, setTab] = useState(0);
  const [merged, setMerged] = useState(false);

  const totals = totalBySong();
  const incomeSum = Object.values(totals).reduce((a, b) => a + b, 0);
  const rows = Object.entries(totals).flatMap(([song, amt]) =>
    (SPLITS[song] ?? []).map((s) => ({ ...s, song, pay: amt * s.share })),
  );
  const paySum = rows.reduce((a, r) => a + r.pay, 0);

  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] overflow-hidden">
      <div className="flex border-b border-[var(--line)] text-[13px]">
        {c.tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-3 py-2.5 font-medium ${
              i === tab ? "text-[var(--text)] border-b-2 border-[var(--pink)]" : "text-[var(--muted)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto p-4 text-[13px]">
        {tab === 0 && (
          <table className="w-full min-w-[420px]">
            <thead className="text-left text-[var(--muted)]">
              <tr><th className="pb-2">{c.headA[0]}</th><th>{c.headA[1]}</th><th className="text-right">{c.headA[2]}</th><th className="text-right">{c.headA[3]}</th></tr>
            </thead>
            <tbody>
              {SRC_A.map((r, i) => (
                <tr key={i} className="border-t border-[var(--line)]">
                  <td className="py-2">{r.song}</td><td>{SVC[locale][r.service]}</td>
                  <td className="text-right">{r.plays.toLocaleString()}</td>
                  <td className="text-right">{won(r.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === 1 && (
          <table className="w-full min-w-[420px]">
            <thead className="text-left text-[var(--muted)]">
              <tr><th className="pb-2">ISRC</th><th>Track Title</th><th>Territory</th><th className="text-right">Quantity</th><th className="text-right">Net (USD)</th></tr>
            </thead>
            <tbody>
              {SRC_B.map((r, i) => (
                <tr key={i} className="border-t border-[var(--line)]">
                  <td className="py-2 font-mono text-[12px]">{r.isrc}</td><td>{r.track}</td><td>{r.territory}</td>
                  <td className="text-right">{r.qty.toLocaleString()}</td>
                  <td className="text-right">${r.net.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === 2 && (
          <table className="w-full min-w-[320px]">
            <thead className="text-left text-[var(--muted)]">
              <tr><th className="pb-2">{c.headC[0]}</th><th>{c.headC[1]}</th><th className="text-right">{c.headC[2]}</th></tr>
            </thead>
            <tbody>
              {SRC_C.map((r, i) => (
                <tr key={i} className="border-t border-[var(--line)]">
                  <td className="py-2">{r.song}</td><td>{KIND[locale][r.kind]}</td>
                  <td className="text-right">{won(r.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="border-t border-[var(--line)] p-4">
        {!merged ? (
          <button
            onClick={() => setMerged(true)}
            className="btn-grad rounded-full px-5 py-2 text-[14px] font-semibold text-white"
          >
            {c.generate}
          </button>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px] text-[13px]">
                <thead className="text-left text-[var(--muted)]">
                  <tr><th className="pb-2">{c.headR[0]}</th><th>{c.headR[1]}</th><th>{c.headR[2]}</th><th className="text-right">{c.headR[3]}</th><th className="text-right">{c.headR[4]}</th></tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t border-[var(--line)]">
                      <td className="py-2 font-medium">{r.holder}</td><td>{c.roles[r.role]}</td><td>{r.song}</td>
                      <td className="text-right">{Math.round(r.share * 100)}%</td>
                      <td className="text-right">{won(r.pay)}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-[var(--line)] font-semibold">
                    <td className="py-2" colSpan={4}>{c.total}</td>
                    <td className="text-right">{won(paySum)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="mt-4 space-y-1.5 text-[13px] text-[var(--muted)]">
              <li>{c.logMerge}</li>
              <li>{c.logFx}</li>
              <li>{c.logRecon(won(incomeSum), won(paySum))}</li>
            </ul>
            <button onClick={() => setMerged(false)} className="mt-4 text-[13px] font-medium text-[#a78bfa] underline">
              {c.back}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
