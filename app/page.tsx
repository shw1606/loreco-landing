import ReconcileDemo from "@/components/ReconcileDemo";
import TraceDemo from "@/components/TraceDemo";
import MatchDemo from "@/components/MatchDemo";

const LINK_SEARCH = "https://search.loreco.app";
const MAIL = "contact@loreco.app";

const EQ = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.45, 0.65, 0.85, 0.4, 0.7, 0.95, 0.55, 0.8, 0.5,
  0.9, 0.6, 0.35, 0.75, 1, 0.5, 0.65, 0.4, 0.85, 0.6, 0.9, 0.45, 0.7];

function EqBars() {
  return (
    <div aria-hidden className="flex h-14 items-end gap-[5px] overflow-hidden">
      {EQ.map((h, i) => (
        <div
          key={i}
          className="eq-bar w-[5px] rounded-full"
          style={{
            height: `${Math.round(h * 56)}px`,
            animationDelay: `${(i * 0.09) % 1.1}s`,
            animationDuration: `${0.8 + (i % 5) * 0.14}s`,
          }}
        />
      ))}
    </div>
  );
}

function Module({
  id,
  eyebrow,
  title,
  desc,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-[var(--line)] py-16 scroll-mt-16">
      <p className="display text-[12px] font-semibold uppercase tracking-[0.25em] grad-text w-fit">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[26px] font-bold">{title}</h2>
      <p className="mt-3 max-w-xl leading-relaxed text-[16px] text-[var(--muted)]">{desc}</p>
      <div className="mt-7">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[#0b0b12]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
          <span className="display text-[19px] font-bold tracking-tight">
            Loreco<span className="grad-text">.</span>
          </span>
          <nav className="flex gap-4 text-[13px] font-medium text-[var(--muted)]">
            <a href="#reconcile" className="hover:text-[var(--text)]">정산 대사</a>
            <a href="#trace" className="hover:text-[var(--text)]">로열티 추적</a>
            <a href="#match" className="hover:text-[var(--text)]">권리자 매칭</a>
            <a href="#contact" className="hover:text-[var(--text)]">문의</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5">
        <section className="pb-16 pt-20">
          <p className="display text-[12px] font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Music Royalty Data Platform
          </p>
          <h1 className="mt-4 max-w-2xl text-[38px] font-bold leading-[1.22]">
            음원 수익 데이터를
            <br />
            <span className="grad-text">권리자별 분배까지</span> 잇습니다
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-[17px] text-[var(--muted)]">
            유통사마다 다른 정산서, 해외에 잠자는 로열티, 시스템마다 제각각인 권리자
            표기. Loreco는 음악 산업의 정산 데이터가 새는 세 지점을 AI로 풉니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#reconcile"
              className="btn-grad rounded-full px-6 py-2.5 text-[15px] font-semibold text-white"
            >
              데모 바로 보기
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[var(--line)] bg-white/5 px-6 py-2.5 text-[15px] font-medium"
            >
              문의하기
            </a>
          </div>
          <div className="mt-12">
            <EqBars />
          </div>
          <p className="mt-4 text-[13px] text-[var(--muted)]">
            아래 데모는 전부 이 페이지에서 바로 동작합니다.
          </p>
        </section>

        <Module
          id="reconcile"
          eyebrow="Reconcile"
          title="정산 대사"
          desc="유통사, 해외 리포트, 방송 사용료. 포맷이 전부 다른 정산서를 표준으로 읽어 곡을 하나로 맞추고, 권리자별 분배표까지 만듭니다. 합계가 맞는지 대사 로그로 증명합니다."
        >
          <ReconcileDemo />
          <p className="mt-3 text-[12px] text-[var(--muted)]">예시 데이터로 동작하는 데모입니다.</p>
        </Module>

        <Module
          id="trace"
          eyebrow="Trace"
          title="해외 로열티 추적"
          desc="한국 곡이 미국에서 재생되면 기계적 복제권 사용료는 MLC에 쌓입니다. 작품이 등록돼 있지 않거나 녹음이 연결돼 있지 않으면 그 몫은 주인을 찾지 못합니다. 해외 징수 기관의 공개 DB를 조회해 그 구멍을 찾아냅니다."
        >
          <TraceDemo />
        </Module>

        <Module
          id="match"
          eyebrow="Match"
          title="권리자 매칭"
          desc="같은 회사, 같은 사람이 시스템마다 다른 표기로 적혀 있습니다. 신탁 단체의 미매칭 로그, 유통사 메타데이터, 방송 큐시트가 서로 안 맞는 이유의 상당 부분이 표기 문제입니다. 표기를 정규화해 하나의 엔티티로 묶습니다."
        >
          <MatchDemo />
        </Module>

        <section className="border-t border-[var(--line)] py-16">
          <p className="display text-[12px] font-semibold uppercase tracking-[0.25em] grad-text w-fit">
            Technology
          </p>
          <h2 className="mt-2 text-[26px] font-bold">가사 100만 곡을 읽는 엔진 위에서</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-[16px] text-[var(--muted)]">
            Loreco는 가사 100만 곡을 요약하고 임베딩해서 이야기로 노래를 찾는 검색 엔진을
            직접 구축해 운영해 왔습니다. 흩어진 음악 데이터를 대규모로 읽고 연결하는 이
            기술이 위 세 제품의 기반입니다.
          </p>
          <p className="mt-6">
            <a
              href={LINK_SEARCH}
              className="inline-block rounded-full border border-[var(--line)] bg-white/5 px-6 py-2.5 text-[15px] font-medium"
            >
              Loreco Search 직접 써보기
            </a>
          </p>
        </section>

        <section id="contact" className="border-t border-[var(--line)] py-16 scroll-mt-16">
          <p className="display text-[12px] font-semibold uppercase tracking-[0.25em] grad-text w-fit">
            Contact
          </p>
          <h2 className="mt-2 text-[26px] font-bold">문의</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-[16px] text-[var(--muted)]">
            정산이나 권리 데이터 문제로 겪고 계신 일이 있다면 무엇이든 편하게 보내주세요.
            도입 문의, 데모 요청, 제휴 제안 모두 환영합니다. 하루 안에 답장드립니다.
          </p>
          <p className="mt-6">
            <a
              href={`mailto:${MAIL}`}
              className="btn-grad inline-block rounded-full px-6 py-2.5 text-[15px] font-semibold text-white"
            >
              메일 보내기
            </a>
          </p>
        </section>
      </main>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-[13px] text-[var(--muted)]">
          <span>Loreco | 대표 서현우</span>
          <a className="underline" href={`mailto:${MAIL}`}>{MAIL}</a>
        </div>
      </footer>
    </div>
  );
}
