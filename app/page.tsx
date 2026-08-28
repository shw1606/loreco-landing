const LINK_SEARCH = "https://search.loreco.app";
const MAIL = "contact@loreco.app";

function Section({
  no,
  title,
  children,
  cta,
}: {
  no: string;
  title: string;
  children: React.ReactNode;
  cta: string;
}) {
  return (
    <section className="border-t border-[var(--line)] py-12">
      <p className="text-sm font-medium text-[var(--accent)]">{no}</p>
      <h2 className="mt-1 text-2xl font-bold">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-[17px]">{children}</div>
      <p className="mt-6 font-medium text-[var(--accent)]">{cta}</p>
    </section>
  );
}

function DemoSlot({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--line)] bg-white/60 p-5 text-[15px] text-[var(--muted)]">
      {children}
    </div>
  );
}

const MLC_ROWS = [
  { label: "미국 곡", n: 52, pct: 84.6 },
  { label: "한국 주류", n: 109, pct: 59.6 },
  { label: "한국 OST", n: 30, pct: 40.0 },
  { label: "한국 인디", n: 30, pct: 16.7 },
];

function MlcChart() {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5">
      <p className="text-[15px] font-medium">
        MLC 공개 DB에서 곡의 녹음(ISRC) 연결을 확인할 수 있었던 비율
      </p>
      <div className="mt-4 space-y-3">
        {MLC_ROWS.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between text-[14px]">
              <span>
                {r.label} <span className="text-[var(--muted)]">({r.n}곡)</span>
              </span>
              <span className="font-semibold">{r.pct}%</span>
            </div>
            <div className="mt-1 h-2.5 rounded-full bg-[var(--paper)]">
              <div
                className="h-2.5 rounded-full bg-[var(--accent)]"
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-[var(--muted)]">
        표본 221곡, 2026년 8월, MLC 공개 작품 검색을 직접 조회한 결과입니다. 곡을
        특정하지 못했거나 조회가 안 된 표본은 연결 확인으로 치지 않았으므로, 실제
        연결률은 이보다 높을 수 있습니다. 그 차이 자체가 확인 비용의 문제입니다.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <header>
        <h1 className="text-3xl font-bold">안녕하세요, 서현우입니다.</h1>
        <p className="mt-5 leading-relaxed text-[17px]">
          혼자 일하는 AI 엔지니어입니다. 가사 100만 곡을 요약하고 임베딩해서, 이야기로
          노래를 찾는 검색을 만들어 운영했습니다. 지금은 음악 산업의 정산과 데이터 문제를
          공부하고 있습니다.
        </p>
        <p className="mt-4">
          <a
            href={LINK_SEARCH}
            className="inline-block rounded-md bg-[var(--accent)] px-4 py-2 text-[15px] font-medium text-white"
          >
            100만 곡 검색 실물 보기
          </a>
        </p>
      </header>

      <p className="mt-12 rounded-lg bg-white p-5 text-[15px] leading-relaxed text-[var(--muted)] border border-[var(--line)]">
        아래는 요즘 들여다보고 있는 세 가지 문제입니다. 데모는 전부 예시 데이터로 만든
        것입니다. 제품이 아니라, 이런 것을 만들 수 있다는 증거로 봐 주시면 됩니다.
      </p>

      <div className="mt-12">
        <Section
          no="문제 1"
          title="정산서 대사와 분배"
          cta="이 일을 실제로 어떻게 하고 계신지 듣고 싶습니다."
        >
          <p>
            유통사와 플랫폼마다 정산서 포맷이 다릅니다. 여러 소스에서 오는 수익 데이터를
            권리자별 분배 문서로 바꾸는 일은 지금도 사람이 엑셀로 합니다. 소스가 늘수록
            마감 때 일이 몰리고, 실수는 권리자와의 신뢰 문제가 됩니다.
          </p>
          <DemoSlot>
            서로 다른 포맷의 정산서 세 장이 권리자별 분배표 하나로 합쳐지는 데모를 준비하고
            있습니다.
          </DemoSlot>
        </Section>

        <Section
          no="문제 2"
          title="해외에 걷히지 않는 로열티"
          cta="해외 정산 내역을 어떻게 확인하고 계신지 듣고 싶습니다."
        >
          <p>
            한국 곡이 미국에서 재생되면 기계적 복제권 사용료는 MLC라는 기관에 쌓입니다.
            곡이 등록되어 있지 않으면 그 몫은 주인을 찾지 못한 채 남습니다. 공개 DB라서
            누구나 조회할 수 있어서, 한국 곡을 표본으로 직접 조회해 봤습니다.
          </p>
          <MlcChart />
        </Section>

        <Section
          no="문제 3"
          title="권리자 이름 매칭"
          cta="미매칭 건을 실제로 어떻게 처리하고 계신지 듣고 싶습니다."
        >
          <p>
            같은 회사, 같은 사람이 시스템마다 다른 표기로 적혀 있습니다. 신탁 단체의
            미매칭 로그, 유통사의 메타데이터, 방송 큐시트가 서로 안 맞는 이유의 상당
            부분이 표기 문제입니다.
          </p>
          <DemoSlot>
            표기가 제각각인 이름들이 하나로 묶이는 매칭 데모를 준비하고 있습니다.
          </DemoSlot>
        </Section>
      </div>

      <footer className="border-t border-[var(--line)] py-12">
        <p className="leading-relaxed text-[17px]">
          9월 2일부터 4일까지 MU:CON 비즈매칭에 있습니다. 15분이면 충분합니다.
        </p>
        <p className="mt-3 text-[15px] text-[var(--muted)]">
          메일 <a className="underline" href={`mailto:${MAIL}`}>{MAIL}</a>
        </p>
      </footer>
    </main>
  );
}
