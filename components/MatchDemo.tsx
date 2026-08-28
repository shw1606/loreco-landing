"use client";

import { useState } from "react";

const PRESET = `(주)지니뮤직
KT지니뮤직
Genie Music Corp.
케이티지니뮤직
주식회사 플럭서스
Fluxus Inc.
플럭서스뮤직
소니뮤직엔터테인먼트코리아
Sony Music Entertainment Korea Inc.
쏘니뮤직 코리아`;

const ALIAS: [RegExp, string][] = [
  [/케이티|kt/g, "kt"],
  [/지니\s*뮤직|genie\s*music/g, "geniemusic"],
  [/플럭서스|fluxus/g, "fluxus"],
  [/[소쏘]니\s*뮤직|sony\s*music/g, "sonymusic"],
  [/엔터테인먼트|entertainment/g, ""],
  [/코리아|korea/g, ""],
  [/뮤직|music/g, "music"],
];

function normalize(raw: string): string {
  let s = raw.toLowerCase();
  s = s.replace(/㈜|\(주\)|주식회사|company|co\.?|ltd\.?|inc\.?|corp(oration)?\.?/g, "");
  for (const [re, to] of ALIAS) s = s.replace(re, to);
  s = s.replace(/[\s.,()\-·]/g, "");
  return s;
}

function keyOf(norm: string): string {
  // 접두 포함 관계면 같은 엔티티로 본다 (kt + geniemusic vs geniemusic)
  for (const canon of ["geniemusic", "fluxus", "sonymusic"]) {
    if (norm.includes(canon)) return canon;
  }
  return norm;
}

export default function MatchDemo() {
  const [text, setText] = useState(PRESET);
  const [groups, setGroups] = useState<Record<string, string[]> | null>(null);

  function run() {
    const g: Record<string, string[]> = {};
    for (const line of text.split("\n")) {
      const name = line.trim();
      if (!name) continue;
      const k = keyOf(normalize(name)) || name;
      (g[k] ??= []).push(name);
    }
    setGroups(g);
  }

  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4">
      <p className="text-[13px] font-medium text-[var(--muted)]">
        시스템마다 다르게 적힌 권리자 표기를 넣어 보세요 (예시가 채워져 있습니다)
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={7}
        className="mt-3 w-full rounded-lg border border-[var(--line)] bg-black/30 p-3 font-mono text-[13px] leading-relaxed text-[var(--text)]"
      />
      <button
        onClick={run}
        className="btn-grad mt-3 rounded-full px-5 py-2 text-[14px] font-semibold text-white"
      >
        같은 권리자끼리 묶기
      </button>

      {groups && (
        <div className="mt-4 space-y-3">
          {Object.entries(groups).map(([k, names]) => (
            <div key={k} className="rounded-lg border border-[var(--line)] bg-white/5 p-3">
              <p className="text-[13px] font-semibold text-[#a78bfa]">
                엔티티 {names.length}건 병합
              </p>
              <ul className="mt-1.5 space-y-0.5 text-[14px]">
                {names.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-[12px] leading-relaxed text-[var(--muted)]">
            법인 접미어 제거, 한영 표기 정규화, 포함 관계 병합을 거친 결과입니다. 예시
            데이터로 동작하는 데모이며, 실제 처리는 더 넓은 사전과 검증 단계를 씁니다.
          </p>
        </div>
      )}
    </div>
  );
}
