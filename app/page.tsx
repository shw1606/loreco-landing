import Image from "next/image";
import ReconcileDemo from "@/components/ReconcileDemo";
import TraceDemo from "@/components/TraceDemo";
import MatchDemo from "@/components/MatchDemo";

const LINK_SEARCH = "https://search.loreco.app";
const MAIL = "contact@loreco.app";

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
    <section id={id} className="border-t border-[var(--line)] py-14 scroll-mt-16">
      <p className="text-[13px] font-semibold tracking-wide text-[var(--accent)]">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-bold">{title}</h2>
      <p className="mt-3 max-w-xl leading-relaxed text-[16px]">{desc}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--paper)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <Image src="/brand/loreco-lockup.svg" alt="Loreco" width={112} height={31} priority />
          <nav className="flex gap-4 text-[13px] font-medium text-[var(--muted)]">
            <a href="#reconcile" className="hover:text-[var(--ink)]">정산 대사</a>
            <a href="#trace" className="hover:text-[var(--ink)]">로열티 추적</a>
            <a href="#match" className="hover:text-[var(--ink)]">권리자 매칭</a>
            <a href="#contact" className="hover:text-[var(--ink)]">문의</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5">
        <section className="py-16">
          <h1 className="max-w-2xl text-[34px] font-bold leading-[1.25]">
            음원 수익 데이터를
            <br />
            권리자별 분배까지 잇습니다
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-[17px]">
            유통사마다 다른 정산서, 해외에 잠자는 로열티, 시스템마다 제각각인 권리자
            표기. Loreco는 음악 산업의 정산 데이터가 새는 세 지점을 AI로 풉니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#reconcile"
              className="rounded-md bg-[var(--accent)] px-5 py-2.5 text-[15px] font-medium text-white"
            >
              데모 바로 보기
            </a>
            <a
              href="#contact"
              className="rounded-md border border-[var(--line)] bg-white px-5 py-2.5 text-[15px] font-medium"
            >
              미팅 요청
            </a>
          </div>
          <p className="mt-5 text-[13px] text-[var(--muted)]">
            아래 데모는 전부 이 페이지에서 바로 동작합니다.
          </p>
        </section>

        <Module
          id="reconcile"
          eyebrow="RECONCILE"
          title="정산 대사"
          desc="유통사, 해외 리포트, 방송 사용료. 포맷이 전부 다른 정산서를 표준으로 읽어 곡을 하나로 맞추고, 권리자별 분배표까지 만듭니다. 합계가 맞는지 대사 로그로 증명합니다."
        >
          <ReconcileDemo />
          <p className="mt-3 text-[12px] text-[var(--muted)]">예시 데이터로 동작하는 데모입니다.</p>
        </Module>

        <Module
          id="trace"
          eyebrow="TRACE"
          title="해외 로열티 추적"
          desc="한국 곡이 미국에서 재생되면 기계적 복제권 사용료는 MLC에 쌓입니다. 작품이 등록돼 있지 않거나 녹음이 연결돼 있지 않으면 그 몫은 주인을 찾지 못합니다. 해외 징수 기관의 공개 DB를 조회해 그 구멍을 찾아냅니다."
        >
          <TraceDemo />
        </Module>

        <Module
          id="match"
          eyebrow="MATCH"
          title="권리자 매칭"
          desc="같은 회사, 같은 사람이 시스템마다 다른 표기로 적혀 있습니다. 신탁 단체의 미매칭 로그, 유통사 메타데이터, 방송 큐시트가 서로 안 맞는 이유의 상당 부분이 표기 문제입니다. 표기를 정규화해 하나의 엔티티로 묶습니다."
        >
          <MatchDemo />
        </Module>

        <section className="border-t border-[var(--line)] py-14">
          <p className="text-[13px] font-semibold tracking-wide text-[var(--accent)]">TECHNOLOGY</p>
          <h2 className="mt-1 text-2xl font-bold">가사 100만 곡을 읽는 엔진 위에서</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-[16px]">
            Loreco는 가사 100만 곡을 요약하고 임베딩해서 이야기로 노래를 찾는 검색 엔진을
            직접 구축해 운영해 왔습니다. 흩어진 음악 데이터를 대규모로 읽고 연결하는 이
            기술이 위 세 제품의 기반입니다.
          </p>
          <p className="mt-5">
            <a
              href={LINK_SEARCH}
              className="inline-block rounded-md border border-[var(--accent)] px-4 py-2 text-[15px] font-medium text-[var(--accent)]"
            >
              Loreco Search 직접 써보기
            </a>
          </p>
        </section>

        <section id="contact" className="border-t border-[var(--line)] py-14 scroll-mt-16">
          <h2 className="text-2xl font-bold">만나서 이야기해요</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-[16px]">
            9월 2일부터 4일까지 MU:CON 2026 비즈매칭(상암 CUBE)에 참가합니다. 정산과
            데이터 문제로 겪고 계신 일을 들려주시면 15분 안에 저희가 무엇을 할 수 있는지
            보여드리겠습니다.
          </p>
          <p className="mt-5">
            <a
              href={`mailto:${MAIL}`}
              className="inline-block rounded-md bg-[var(--accent)] px-5 py-2.5 text-[15px] font-medium text-white"
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
