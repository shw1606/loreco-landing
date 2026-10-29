import type { Metadata } from "next";
import ReconcileDemo from "@/components/ReconcileDemo";
import TraceDemo from "@/components/TraceDemo";
import MatchDemo from "@/components/MatchDemo";
import { COPY, resolveLocale, type Locale } from "@/lib/copy";

const LINK_SEARCH = "https://search.loreco.app";
const MAIL = "contact@loreco.app";

type Search = Promise<{ locale?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const locale = resolveLocale((await searchParams).locale);
  if (locale === "en") {
    return {
      title: "Loreco | Music Royalty Data Platform",
      description:
        "Statement reconciliation across formats, overseas royalty tracing, rightsholder matching. Loreco fixes the three places where music royalty data leaks, with AI.",
    };
  }
  return {
    title: "Loreco | 음원 정산 데이터 플랫폼",
    description:
      "포맷이 다른 정산서 대사, 해외 미회수 로열티 추적, 권리자 표기 매칭. 음악 산업의 정산 데이터가 새는 세 지점을 AI로 풉니다.",
  };
}

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

function LocaleSwitch({ locale }: { locale: Locale }) {
  const base = "rounded-full px-2 py-0.5";
  return (
    <span className="ml-2 flex items-center gap-1 border-l border-[var(--line)] pl-3 text-[12px] font-semibold">
      <a href="/?locale=ko" className={`${base} ${locale === "ko" ? "bg-white/10 text-[var(--text)]" : "text-[var(--muted)]"}`}>
        KO
      </a>
      <a
        href="/"
        className={`${base} ${locale === "en" ? "bg-white/10 text-[var(--text)]" : "text-[var(--muted)]"}`}
      >
        EN
      </a>
    </span>
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

export default async function Home({ searchParams }: { searchParams: Search }) {
  const locale = resolveLocale((await searchParams).locale);
  const c = COPY[locale];

  return (
    <div>
      <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[#0b0b12]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-y-1 px-5 py-3.5">
          <span className="display text-[19px] font-bold tracking-tight">
            Loreco<span className="grad-text">.</span>
          </span>
          <nav className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-[var(--muted)]">
            <a href="#reconcile" className="hover:text-[var(--text)]">{c.nav.reconcile}</a>
            <a href="#trace" className="hover:text-[var(--text)]">{c.nav.trace}</a>
            <a href="#match" className="hover:text-[var(--text)]">{c.nav.match}</a>
            <a href="#contact" className="hover:text-[var(--text)]">{c.nav.contact}</a>
            <LocaleSwitch locale={locale} />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5">
        <section className="pb-16 pt-20">
          <p className="display text-[12px] font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            {c.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-[38px] font-bold leading-[1.22]">
            {c.hero.h1a}
            <br />
            <span className="grad-text">{c.hero.h1grad}</span>
            {c.hero.h1b}
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-[17px] text-[var(--muted)]">{c.hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#reconcile" className="btn-grad rounded-full px-6 py-2.5 text-[15px] font-semibold text-white">
              {c.hero.ctaDemo}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[var(--line)] bg-white/5 px-6 py-2.5 text-[15px] font-medium"
            >
              {c.hero.ctaContact}
            </a>
          </div>
          <div className="mt-12">
            <EqBars />
          </div>
          <p className="mt-4 text-[13px] text-[var(--muted)]">{c.hero.note}</p>
        </section>

        <Module id="reconcile" eyebrow="Reconcile" title={c.reconcile.title} desc={c.reconcile.desc}>
          <ReconcileDemo locale={locale} />
          <p className="mt-3 text-[12px] text-[var(--muted)]">{c.reconcile.caption}</p>
        </Module>

        <Module id="trace" eyebrow="Trace" title={c.trace.title} desc={c.trace.desc}>
          <TraceDemo locale={locale} />
        </Module>

        <Module id="match" eyebrow="Match" title={c.match.title} desc={c.match.desc}>
          <MatchDemo locale={locale} />
        </Module>

        <section className="border-t border-[var(--line)] py-16">
          <p className="display text-[12px] font-semibold uppercase tracking-[0.25em] grad-text w-fit">
            Technology
          </p>
          <h2 className="mt-2 text-[26px] font-bold">{c.tech.title}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-[16px] text-[var(--muted)]">{c.tech.desc}</p>
          <p className="mt-6">
            <a
              href={LINK_SEARCH}
              className="inline-block rounded-full border border-[var(--line)] bg-white/5 px-6 py-2.5 text-[15px] font-medium"
            >
              {c.tech.cta}
            </a>
          </p>
        </section>

        <section id="contact" className="border-t border-[var(--line)] py-16 scroll-mt-16">
          <p className="display text-[12px] font-semibold uppercase tracking-[0.25em] grad-text w-fit">
            Contact
          </p>
          <h2 className="mt-2 text-[26px] font-bold">{c.contact.title}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-[16px] text-[var(--muted)]">{c.contact.desc}</p>
          <p className="mt-6">
            <a
              href={`mailto:${MAIL}`}
              className="btn-grad inline-block rounded-full px-6 py-2.5 text-[15px] font-semibold text-white"
            >
              {c.contact.cta}
            </a>
          </p>
        </section>
      </main>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-[13px] text-[var(--muted)]">
          <span>{c.footer}</span>
          <a className="underline" href={`mailto:${MAIL}`}>{MAIL}</a>
        </div>
      </footer>
    </div>
  );
}
