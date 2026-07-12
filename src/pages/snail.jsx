pages/snail.jsx
import Head from "next/head";
import { useEffect, useRef } from "react";

const SECTIONS = [
  { id: "intro", label: "المقدمة" },
  { id: "legend", label: "الأسطورة" },
  { id: "pursuit", label: "الزحف والترقب" },
  { id: "signs", label: "علامات التعلّق" },
  { id: "cure", label: "طريقة الفكاك" },
  { id: "note", label: "ملاحظة" },
];

function SnailMark({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 70c-8-2-13-10-10-19 3-10 14-15 24-12"
        stroke="var(--trail)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M46 66C30 66 22 54 28 42c5-10 18-14 27-8 8 5 9 16 2 22-5 5-14 4-16-3-2-6 3-11 8-9"
        stroke="var(--brass)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M46 66c10 4 22 2 29-6 5-6 6-14 2-20"
        stroke="var(--moss)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="79" cy="38" r="3" fill="var(--brass)" />
      <path d="M79 38c2-6 1-12-3-16" stroke="var(--brass)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="74" cy="20" r="2.2" fill="var(--brass)" />
      <path d="M72 40c3-5 3-10 0-14" stroke="var(--brass)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="70" cy="24" r="2.2" fill="var(--brass)" />
    </svg>
  );
}

function MoonGarden() {
  return (
    <svg
      viewBox="0 0 600 260"
      className="hero-art"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="حديقة ليلية تحت ضوء القمر يزحف فيها حلزون"
    >
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4ecd8" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#e7dcb8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e7dcb8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141a2b" />
          <stop offset="100%" stopColor="#0d1119" />
        </linearGradient>
      </defs>
      <rect width="600" height="260" fill="url(#skyFade)" />
      <circle cx="470" cy="70" r="90" fill="url(#moonGlow)" />
      <circle cx="470" cy="70" r="34" fill="#efe6cd" opacity="0.9" />
      {Array.from({ length: 26 }).map((_, i) => (
        <circle
          key={i}
          cx={(i * 137) % 600}
          cy={(i * 53) % 150}
          r={i % 5 === 0 ? 1.6 : 0.9}
          fill="#e9e4d3"
          opacity={0.3 + (i % 4) * 0.15}
        />
      ))}
      <path
        d="M0 220C 60 205, 100 230, 160 218 S 260 200, 320 216 S 430 232, 500 214 S 580 202, 600 214 V260 H0 Z"
        fill="#1c2416"
      />
      <path
        d="M0 236C 70 222, 120 244, 190 232 S 300 214, 360 230 S 470 246, 540 228 S 600 220, 600 228 V260 H0 Z"
        fill="#141b0f"
      />
      <path
        d="M40 230 C 90 226, 130 214, 150 190 C 168 168, 158 150, 178 134"
        stroke="var(--trail-soft)"
        strokeWidth="2"
        strokeDasharray="1 7"
        strokeLinecap="round"
        fill="none"
      />
      <g transform="translate(150,150) scale(1.15)">
        <path
          d="M0 40c-6-1-9-7-7-13 2-7 10-10 17-8"
          stroke="var(--trail)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M18 37C7 37 1 28 6 19c4-7 13-10 19-5 6 4 6 11 1 15-4 4-10 3-11-2-1-4 2-7 6-6"
          stroke="var(--brass)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M18 37c7 3 15 1 20-4 4-4 4-10 1-14" stroke="var(--moss)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="41" cy="17" r="2" fill="var(--brass)" />
        <path d="M41 17c1-4 0-8-2-11" stroke="var(--brass)" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <g opacity="0.5">
        <path d="M480 200c10-30 30-40 30-70" stroke="#3a4a2c" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M486 178c8-6 18-6 24 0" stroke="#3a4a2c" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ id, eyebrow, title, children }) {
  const ref = useReveal();
  return (
    <section id={id} className="reveal" ref={ref}>
      <div className="section-mark">
        <SnailMark className="mark-icon" />
        <span className="mark-line" />
      </div>
      <div className="section-body">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="prose">{children}</div>
      </div>
    </section>
  );
}

export default function SnailLegendPage() {
  return (
    <>
      <Head>
        <title>سحر الحلزون — أسطورة الجني المتخفي</title>
        <meta
          name="description"
          content="قراءة موثقة لأسطورة شعبية تُعرف بسحر الحلزون: حكاية الجني الذي يتخفى في هيئة حلزون صغير."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main dir="rtl" lang="ar" className="page">
        <header className="hero">
          <MoonGarden />
          <div className="hero-text">
            <p className="kicker">حكايات وأساطير شعبية</p>
            <h1>سحر الحلزون</h1>
            <p className="subtitle">أسطورة الجنّي الذي يتخفّى في هيئة حلزون</p>
            <p className="lede">
              من الحكايات الشعبية المتداولة في الذاكرة الجمعية، تُروى قصة غامضة
              تحمل اسم «سحر الحلزون». حكاية تمزج بين عالم الجن وتفاصيل يومية
              بسيطة كخطوة فتاة في طريقها، لتتحول إلى أسطورة تُروى جيلًا بعد جيل.
            </p>
          </div>
        </header>

        <nav className="toc" aria-label="محتويات المقال">
          {SECTIONS.map((s, i) => (
            <a key={s.id} href={`#${s.id}`}>
              <span className="toc-dot" />
              {s.label}
            </a>
          ))}
        </nav>

        <div className="spine" aria-hidden="true" />

        <article className="content">
          <Section id="intro" eyebrow="مدخل الحكاية" title="حين يتّخذ الجنّي هيئة حلزون">
            <p>
              تتحدّث بعض الأساطير الشعبية عن جنّ يملكون القدرة على التشكّل في
              هيئة حلزون صغير، يزحف على الأرض بهدوء شديد دون أن يثير انتباه
              أحد. مخلوق صغير عابر، لا يلفت نظرًا، وهذا بالضبط ما يمنحه —
              بحسب الرواية — قدرته على الاقتراب دون أن يُكتشف أمره.
            </p>
          </Section>

          <Section id="legend" eyebrow="جوهر الأسطورة" title="لحظة اكتمال السحر">
            <p>
              تقول الحكاية إنه إذا صادف أن داست فتاة على ذلك الحلزون بقدمها
              من غير قصد، فإنّ السحر يكتمل في تلك اللحظة بالذات، ويعود الكائن
              إلى هيئته الحقيقية. عندها فقط، وبحسب ما تتناقله الرواية، يصبح
              جنّيًا عاشقًا متعلقًا بها.
            </p>
            <p>
              اللافت في هذه النسخة من الحكاية أنّ الشرط ليس السحر نفسه بقدر
              ما هو ذلك التقاطع العابر بين خطوة إنسانية عادية ومخلوق يترقّبها.
            </p>
          </Section>

          <Section id="pursuit" eyebrow="ما قبل التحوّل" title="الزحف والترقّب">
            <p>
              تضيف الرواية تفصيلاً أكثر غرابة: فقبل أن تنجح الفتاة في الدوس
              عليه، يكون الجنّي المتخفي شديد الإصرار على تحقيق ذلك، فيزحف
              باستمرار محاولًا الوصول إلى الموضع الذي ستضع فيه قدمها، وكأنه
              يتوقّع خطواتها القادمة.
            </p>
            <p>
              وإذا غيّرت الفتاة اتجاهها، أو جاءت خطوتها مخالفة لتوقعاته، يعاود
              الزحف من جديد ليقف في موضع آخر من مسارها، ويكرّر المحاولة مرات
              عديدة، حتى ينجح أخيرًا في أن تدوسه دون أن تشعر. تلك اللحظة، كما
              تصفها الأسطورة، هي الشرط الذي يجعله يتحوّل إلى «جنّي عاشق»
              يرتبط بها.
            </p>
          </Section>

          <Section id="signs" eyebrow="بعد التحوّل" title="علامات التعلّق">
            <p>
              بعد اكتمال السحر، تزعم الحكايات الشعبية أن الجنّي يبدأ بملاحقة
              الفتاة، فتشعر بوجود أمور غريبة تتسلل إلى حياتها اليومية:
            </p>
            <ul className="signs-list">
              <li>أحلام مزعجة تتكرر دون سبب واضح.</li>
              <li>إحساس دائم بأنّ أحدًا يراقبها.</li>
              <li>أحداث متفرقة لا تجد لها تفسيرًا مقنعًا.</li>
            </ul>
            <p className="muted">
              وتختلف هذه الأوصاف من رواية إلى أخرى بحسب المنطقة والراوي، وهو
              أمر معتاد في الحكايات الشعبية المتناقلة شفهيًا.
            </p>
          </Section>

          <Section id="cure" eyebrow="فكّ الأثر" title="طريقة التخلّص من سحر الحلزون">
            <p>
              تذكر بعض نسخ الأسطورة طريقة غريبة للتخلص مما يُسمّى «سحر
              الحلزون». يُقال إنّ الفتاة تبحث عن مكان تتجمّع فيه أعداد كبيرة
              من الحلزونات العادية، ثم تمشي فيه ذهابًا وإيابًا دون أن تنظر
              إلى الأرض، حتى تدوس على جميع الحلزونات الموجودة.
            </p>
            <p>
              بعد ذلك، تعيد المرور فوق المكان نفسه مرة أخرى للتأكد — بحسب
              الرواية — من أنّ جميعها قد سُحق. وعندها فقط، كما تختم الحكاية،
              يزول أثر الجنّي العاشق.
            </p>
          </Section>

          <Section id="note" eyebrow="بين الحكاية والواقع" title="ملاحظة أخيرة">
            <p>
              «سحر الحلزون» حكاية من التراث الشفهي الشعبي، تُصنَّف ضمن
              الأساطير والخرافات المتوارثة، ولا تستند إلى أي أساس علمي أو
              ديني موثّق. قيمتها تكمن في كونها جزءًا من الخيال الجمعي وأسلوب
              الرواية الشفهية، لا في كونها وصفًا لواقعة حقيقية.
            </p>
          </Section>
        </article>

        <footer className="footer">
          <SnailMark className="footer-mark" />
          <p>حكاية شعبية متوارثة — تُروى للتسلية والتوثيق الثقافي فقط.</p>
        </footer>
      </main>

      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }
        .page {
          --ink: #12151f;
          --panel: #171b28;
          --parchment: #ece6d6;
          --moss: #6f8a52;
          --brass: #c79a5b;
          --trail: #9fb3a6;
          --trail-soft: #5c6a5c;
          --text: #d9dccd;
          --text-dim: #a8ad9b;
          background: var(--ink);
          color: var(--text);
          font-family: "Tajawal", sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .hero {
          position: relative;
          padding: 0 0 3rem;
          text-align: center;
        }
        .hero-art {
          width: 100%;
          height: auto;
          display: block;
          max-height: 340px;
          object-fit: cover;
        }
        .hero-text {
          max-width: 640px;
          margin: -3.5rem auto 0;
          padding: 0 1.5rem;
          position: relative;
          z-index: 2;
        }
        .kicker {
          font-family: "Tajawal", sans-serif;
          letter-spacing: 0.08em;
          color: var(--brass);
          font-size: 0.85rem;
          margin-bottom: 0.4rem;
        }
        h1 {
          font-family: "Aref Ruqaa", serif;
          font-size: clamp(2.6rem, 6vw, 4.2rem);
          font-weight: 700;
          margin: 0.2rem 0;
          color: var(--parchment);
          text-shadow: 0 0 24px rgba(199, 154, 91, 0.25);
        }
        .subtitle {
          font-family: "Aref Ruqaa", serif;
          font-size: 1.3rem;
          color: var(--trail);
          margin: 0 0 1.2rem;
        }
        .lede {
          color: var(--text-dim);
          line-height: 2;
          font-size: 1.02rem;
        }

        .toc {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem 1.4rem;
          max-width: 760px;
          margin: 0 auto 2.5rem;
          padding: 0 1.5rem;
        }
        .toc a {
          color: var(--text-dim);
          text-decoration: none;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.2s ease;
        }
        .toc a:hover {
          color: var(--brass);
        }
        .toc-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--moss);
          display: inline-block;
        }

        .content {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 1.5rem 2rem;
          position: relative;
        }

        section {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 1rem;
          margin-bottom: 2.6rem;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-mark {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mark-icon {
          width: 40px;
          height: 32px;
          flex-shrink: 0;
        }
        .mark-line {
          flex: 1;
          width: 1px;
          background: linear-gradient(
            to bottom,
            var(--trail-soft),
            transparent
          );
          margin-top: 0.4rem;
        }

        .eyebrow {
          color: var(--brass);
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          margin: 0 0 0.3rem;
        }
        h2 {
          font-family: "Aref Ruqaa", serif;
          font-size: 1.7rem;
          color: var(--parchment);
          margin: 0 0 0.9rem;
        }
        .prose p {
          line-height: 2.1;
          color: var(--text);
          margin: 0 0 1rem;
          font-size: 1.02rem;
        }
        .prose p.muted {
          color: var(--text-dim);
          font-size: 0.92rem;
        }
        .signs-list {
          margin: 0 0 1rem;
          padding-inline-start: 1.3rem;
          line-height: 2;
        }
        .signs-list li {
          margin-bottom: 0.3rem;
        }
        .signs-list li::marker {
          color: var(--moss);
        }

        .footer {
          text-align: center;
          padding: 2.5rem 1.5rem 3.5rem;
          color: var(--text-dim);
          font-size: 0.9rem;
          border-top: 1px solid rgba(159, 179, 166, 0.15);
          margin-top: 1rem;
        }
        .footer-mark {
          width: 46px;
          height: 36px;
          opacity: 0.7;
          margin-bottom: 0.6rem;
        }

        @media (max-width: 560px) {
          section {
            grid-template-columns: 30px 1fr;
          }
          .mark-icon {
            width: 26px;
            height: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          section {
            transition: none;
            opacity: 1;
            transform: none;
          }
          :global(html) {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </>
  );
}
