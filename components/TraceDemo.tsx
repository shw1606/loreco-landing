"use client";

import { useState } from "react";
import samples from "@/data/mlc_samples.json";
import { COPY, type Locale } from "@/lib/copy";

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

const BADGE_CLS = {
  MLC_MATCHED: "bg-emerald-400/15 text-emerald-300",
  MLC_WORK_ONLY: "bg-amber-400/15 text-amber-300",
  MLC_UNMATCHED: "bg-red-400/15 text-red-300",
} as const;

const MLC_ROWS = [
  { key: "us", n: 52, pct: 84.6 },
  { key: "main", n: 109, pct: 59.6 },
  { key: "ost", n: 30, pct: 40.0 },
  { key: "indie", n: 30, pct: 16.7 },
] as const;

export default function TraceDemo({ locale }: { locale: Locale }) {
  const c = COPY[locale].trace;
  const [sel, setSel] = useState<Sample>(LIST[0]);

  const Check = ({ ok, warn }: { ok: boolean; warn?: boolean }) =>
    ok ? (
      <span className="text-emerald-400 font-semibold">{c.verified}</span>
    ) : (
      <span className={warn ? "text-amber-300 font-semibold" : "text-red-400 font-semibold"}>{c.notFound}</span>
    );

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4">
        <p className="text-[13px] font-medium text-[var(--muted)]">{c.pick}</p>
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
              {sel.title}{" "}
              <span className="font-normal text-[var(--muted)]">
                {sel.artist} ({sel.year}, {c.strata[sel.stratum as keyof typeof c.strata] ?? sel.stratum})
              </span>
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${BADGE_CLS[sel.verdict]}`}>
              {c.badges[sel.verdict]}
            </span>
          </div>
          <table className="mt-3 w-full text-[14px]">
            <tbody>
              <tr className="border-t border-[var(--line)]">
                <td className="py-2 text-[var(--muted)]">{c.rows.work}</td>
                <td className="text-right"><Check ok={sel.verdict !== "MLC_UNMATCHED"} /></td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="py-2 text-[var(--muted)]">{c.rows.iswc}</td>
                <td className="text-right"><Check ok={sel.iswc} warn /></td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="py-2 text-[var(--muted)]">{c.rows.isrc}</td>
                <td className="text-right"><Check ok={sel.isrc_linked} /></td>
              </tr>
              {sel.recordings_n > 0 && (
                <tr className="border-t border-[var(--line)]">
                  <td className="py-2 text-[var(--muted)]">{c.rows.recs}</td>
                  <td className="text-right font-medium">
                    {sel.recordings_n.toLocaleString()}
                    {c.recsUnit}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {sel.verdict === "MLC_WORK_ONLY" && (
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{c.workOnlyNote}</p>
          )}
          {sel.verdict === "MLC_UNMATCHED" && (
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{c.unmatchedNote}</p>
          )}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">{c.caveat}</p>
      </div>

      <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4">
        <p className="text-[14px] font-medium">{c.chartTitle}</p>
        <div className="mt-3 space-y-3">
          {MLC_ROWS.map((r) => (
            <div key={r.key}>
              <div className="flex items-baseline justify-between text-[13px]">
                <span>
                  {c.chartRows[r.key]}{" "}
                  <span className="text-[var(--muted)]">
                    ({r.n}
                    {c.songsUnit})
                  </span>
                </span>
                <span className="font-semibold">{r.pct}%</span>
              </div>
              <div className="mt-1 h-2.5 rounded-full bg-white/10">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#e0447c]"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">{c.chartCaveat}</p>
      </div>
    </div>
  );
}
