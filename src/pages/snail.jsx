import Head from "next/head";
import Image from "next/image";

const META = {
  category: "دراسات الفولكلور",
  readTime: "٧ دقائق قراءة",
  date: "١٢ يوليو ٢٠٢٦",
  author: "قسم التحرير الثقافي",
};

const TOC = [
  { id: "intro", label: "١. المدخل" },
  { id: "origin", label: "٢. البنية السردية للحكاية" },
  { id: "motif-pursuit", label: "٣. زمن التوقّع: تحليل موتيف الملاحقة" },
  { id: "transformation", label: "٤. لحظة التحوّل ودلالتها" },
  { id: "signs", label: "٥. الأعراض المُفترَضة بعد التحوّل" },
  { id: "ritual", label: "٦. طقس الفكّ وبنيته الرمزية" },
  { id: "reading", label: "٧. قراءة أنثروبولوجية" },
  { id: "conclusion", label: "٨. خلاصة" },
];

const QUICK_FACTS = [
  { label: "التصنيف", value: "أسطورة شعبية شفهية" },
  { label: "الكائن المركزي", value: "جنّي متشكّل في هيئة حلزون" },
  { label: "شرط التحوّل", value: "الدوس غير المقصود من الفتاة" },
  { label: "الأساس العلمي", value: "غير موثَّق — خرافة متوارثة" },
];

function SectionNumber({ n }) {
  return <span className="section-number">{n}</span>;
}

export default function SnailLegendArticle() {
  return (
    <>
      <Head>
        <title>سحر الحلزون: قراءة تحليلية في أسطورة شعبية متوارثة</title>
        <meta
          name="description"
          content="مقالة تحليلية تتناول أسطورة سحر الحلزون الشعبية من زاوية أنثروبولوجية: بنيتها السردية، رموزها، ووظيفتها الثقافية."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div dir="rtl" lang="ar" className="page">
        <div className="masthead">
          <div className="masthead-inner">
            <span className="masthead-title">أرشيف الفولكلور</span>
            <span className="masthead-sub">قسم دراسات الحكاية الشعبية</span>
          </div>
        </div>

        <main className="wrapper">
          <header className="article-header">
            <p className="kicker">{META.category}</p>
            <h1>سحر الحلزون: قراءة تحليلية في أسطورة شعبية متوارثة</h1>
            <p className="dek">
              كيف تحوّل التقاء عابر بين خطوة إنسانية ومخلوق زاحف صغير إلى
              أسطورة متكاملة الأركان، تُروى منذ أجيال ضمن التراث الشفهي؟
            </p>
            <div className="byline">
              <span>{META.author}</span>
              <span className="dot">•</span>
              <span>{META.date}</span>
              <span className="dot">•</span>
              <span>{META.readTime}</span>
            </div>
          </header>

          <figure className="hero-figure">
            <Image
              src="/1.jpg"
              alt="حلزون يزحف على تربة رطبة في حديقة"
              width={1280}
              height={720}
              className="hero-image"
              priority
            />
            <figcaption>
              حلزون الحديقة العادي — الكائن الذي تدور حوله تفاصيل الأسطورة
              المتناقلة شفهيًا. تصوير: أرشيف المجلة.
            </figcaption>
          </figure>

          <div className="layout">
            <aside className="sidebar">
              <nav className="toc" aria-label="محتويات المقالة">
                <p className="toc-title">المحتويات</p>
                <ul>
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="quick-facts">
                <p className="qf-title">معلومات سريعة</p>
                <dl>
                  {QUICK_FACTS.map((f) => (
                    <div className="qf-row" key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>

            <article className="content">
              <section id="intro">
                <h2><SectionNumber n="01" />المدخل</h2>
                <p className="lead">
                  تتداول بعض الأوساط الشعبية حكاية تحمل اسم «سحر الحلزون»،
                  وهي أسطورة تُنسب فيها لبعض الجنّ القدرة على التشكّل في هيئة
                  حلزون صغير يزحف على الأرض دون أن يثير انتباه أحد. تستحق هذه
                  الحكاية وقفة تحليلية لا لصحّتها الواقعية — وهي غير موثّقة
                  علميًا — بل لبنيتها السردية المحكمة ولوظيفتها داخل المتخيَّل
                  الشعبي.
                </p>
                <p>
                  تنتمي هذه الحكاية إلى صنف أوسع من الأساطير التي تُبنى على
                  مبدأ «التخفّي في كائن بريء»، حيث يتقنّع كائن خارق في هيئة
                  حيوان صغير أو حشرة لا تلفت الشبهة، تمهيدًا لحدث تحوّل لاحق.
                </p>
              </section>

              <figure className="inline-figure">
                <Image
                  src="/2.jpg"
                  alt="حديقة ليلية تحت ضوء القمر"
                  width={1200}
                  height={700}
                  className="inline-image"
                />
                <figcaption>
                  المشهد الليلي حاضر بقوة في أغلب روايات الحكاية، إذ يُنسب
                  للجن نشاط أكبر في ساعات العتمة.
                </figcaption>
              </figure>

              <section id="origin">
                <h2><SectionNumber n="02" />البنية السردية للحكاية</h2>
                <p>
                  تسير الرواية وفق تسلسل ثابت يتكرر في أغلب النسخ المتداولة:
                  كائن متخفٍّ، حدث عابر يُفعّل التحوّل، ثم نتائج تمتد في حياة
                  الشخصية الرئيسية. هذا التسلسل الثلاثي يمنح الحكاية تماسكًا
                  يسهّل تناقلها شفهيًا دون أن تفقد عناصرها الأساسية.
                </p>
                <p>
                  ما يميّز «سحر الحلزون» عن أساطير التخفّي المشابهة هو اختيار
                  الحلزون بالذات: كائن بطيء، صامت، لا يُنظر إليه عادة كتهديد،
                  ما يجعل فكرة التخفّي فيه أكثر إقناعًا داخل المنطق الداخلي
                  للحكاية.
                </p>
              </section>

              <section id="motif-pursuit">
                <h2><SectionNumber n="03" />زمن التوقّع: تحليل موتيف الملاحقة</h2>
                <p>
                  تضيف بعض الروايات تفصيلاً سرديًا لافتًا: قبل اكتمال السحر،
                  يُوصف الكائن المتخفّي بإصرار شديد على تحقيق التحوّل، فيزحف
                  باستمرار محاولًا الوصول إلى الموضع الذي ستضع فيه الفتاة
                  قدمها، وكأنه يتوقّع خطواتها القادمة.
                </p>
                <p>
                  وإذا غيّرت اتجاهها، أو جاءت خطوتها مخالفة لتوقّعه، يعاود
                  الزحف من جديد ليقف في موضع آخر من مسارها، ويكرّر المحاولة
                  مرات عديدة حتى يحين إتمامه لهدفه. وظيفيًا، يمنح هذا التفصيل
                  الحكاية بُعدًا دراميًا: فالحدث الذي يبدو عرَضيًا يتحوّل إلى
                  غاية مقصودة من طرف واحد، ما يرفع التوتر السردي قبل نقطة
                  التحوّل.
                </p>
              </section>

              <section id="transformation">
                <h2><SectionNumber n="04" />لحظة التحوّل ودلالتها</h2>
                <p>
                  بحسب الرواية، يكتمل السحر في اللحظة التي تدوس فيها الفتاة
                  على الحلزون دون قصد، فيعود الكائن إلى هيئته الأصلية بوصفه
                  «جنّيًا عاشقًا» متعلقًا بها. هذا الشرط — أي أن يكون الفعل
                  غير مقصود من طرف الإنسان — نمط متكرر في حكايات التحوّل
                  الشعبية، إذ يُراد منه نفي المسؤولية عن الشخصية البشرية
                  وتحميل الحدث بُعدًا قدَريًا لا إراديًا.
                </p>
              </section>

              <figure className="inline-figure">
                <Image
                  src="/3.jpg"
                  alt="أثر زحف حلزون على تربة رطبة"
                  width={1200}
                  height={700}
                  className="inline-image"
                />
                <figcaption>
                  الأثر اللزج الذي يتركه الحلزون خلفه استُثمر رمزيًا في بعض
                  روايات الحكاية كعلامة على مروره.
                </figcaption>
              </figure>

              <section id="signs">
                <h2><SectionNumber n="05" />الأعراض المُفترَضة بعد التحوّل</h2>
                <p>
                  تصف بعض الروايات ما يعقب التحوّل بأنه ملاحقة خفية للفتاة،
                  تترجَم في تفاصيل يومية مبهمة، من أبرزها:
                </p>
                <ul>
                  <li>أحلام مزعجة تتكرر دون سبب واضح.</li>
                  <li>إحساس دائم بأنّ أحدًا يراقبها.</li>
                  <li>أحداث متفرقة لا تجد لها تفسيرًا مقنعًا.</li>
                </ul>
                <p className="muted">
                  تتفاوت هذه التفاصيل بشكل واضح بين رواية وأخرى، وهو ما
                  يعكس طبيعة النقل الشفهي للحكايات الشعبية، حيث يضيف كل راوٍ
                  لمسته الخاصة.
                </p>
              </section>

              <section id="ritual">
                <h2><SectionNumber n="06" />طقس الفكّ وبنيته الرمزية</h2>
                <p>
                  تصف بعض نسخ الحكاية طريقة للتخلّص مما يُسمّى «سحر الحلزون»:
                  تبحث الفتاة عن مكان تتجمّع فيه أعداد كبيرة من الحلزونات
                  العادية، ثم تمشي فيه ذهابًا وإيابًا دون النظر إلى الأرض حتى
                  تدوس عليها جميعًا، ثم تكرّر المرور فوق المكان للتأكد من
                  اكتمال الأثر.
                </p>
                <p>
                  هذا الطقس المُتخيَّل يتّبع نمطًا شائعًا في حكايات فكّ
                  السحر الشعبية: فعل مضاعَف ومتعمَّد يُقابل الفعل الأول غير
                  المقصود، وكأن الحكاية تصحّح اختلالها الداخلي بإعادة إنتاج
                  الحدث نفسه على نطاق أوسع وبإرادة واعية هذه المرة.
                </p>
              </section>

              <blockquote className="pull-quote">
                القيمة الحقيقية لهذه الحكاية لا تكمن في وقائعها، بل في ما
                تكشفه عن آليات اشتغال الخيال الشعبي وتحويله لتفاصيل الحياة
                اليومية إلى أحداث ذات معنى.
              </blockquote>

              <section id="reading">
                <h2><SectionNumber n="07" />قراءة أنثروبولوجية</h2>
                <p>
                  يمكن قراءة «سحر الحلزون» ضمن سياق أوسع من الحكايات التي
                  تُفسّر من خلالها الجماعات الشعبية أحداثًا غامضة أو مشاعر
                  غير مبرَّرة — كالقلق أو الأرق أو الشعور بالمراقبة — عبر
                  إسنادها إلى كائن خارق. هذا النمط من التفسير الرمزي يمنح
                  الفرد إطارًا مفهومًا للتعامل مع تجارب صعبة التفسير، وإن لم
                  يكن يستند إلى أساس واقعي أو علمي.
                </p>
                <p>
                  كما تعكس الحكاية، من زاوية اجتماعية، حساسية ثقافية تجاه
                  فكرة «العين» أو «اللمسة العابرة» التي تُحدث أثرًا كبيرًا،
                  وهو موتيف متكرر في أساطير كثيرة تتناول التماس البسيط بين
                  الإنسان وكائنات مفترَضة أخرى.
                </p>
              </section>

              <section id="conclusion" className="conclusion">
                <h2><SectionNumber n="08" />خلاصة</h2>
                <p>
                  «سحر الحلزون» حكاية من التراث الشفهي الشعبي، تُصنَّف ضمن
                  الأساطير والخرافات المتوارثة، ولا تستند إلى أي أساس علمي أو
                  ديني موثّق. قيمتها التحليلية تكمن في بنيتها السردية وفي ما
                  تعكسه من آليات التفكير الرمزي داخل الثقافة الشعبية، لا في
                  كونها وصفًا لواقعة حقيقية.
                </p>
              </section>

              <div className="sources">
                <p className="sources-title">مصدر المادة</p>
                <p>
                  رواية شفهية متداولة ضمن التراث الشعبي، جُمعت ونُظّمت لأغراض
                  التوثيق الثقافي والتحليل الأنثروبولوجي.
                </p>
              </div>
            </article>
          </div>
        </main>

        <footer className="site-footer">
          <p>أرشيف الفولكلور — قسم دراسات الحكاية الشعبية</p>
        </footer>
      </div>

      <style jsx>{`
        .page {
          --paper: #eef1e8;
          --paper-card: #fbfaf4;
          --ink: #1f2b1f;
          --ink-soft: #444f3d;
          --muted: #7a8370;
          --accent: #3f6b5c;
          --rule-gold: #a68a54;
          --line: #d9dcc9;
          background: var(--paper);
          color: var(--ink);
          font-family: "IBM Plex Sans Arabic", sans-serif;
          min-height: 100vh;
        }

        .masthead {
          border-bottom: 1px solid var(--line);
          background: var(--paper-card);
        }
        .masthead-inner {
          max-width: 980px;
          margin: 0 auto;
          padding: 0.9rem 1.5rem;
          display: flex;
          align-items: baseline;
          gap: 0.9rem;
        }
        .masthead-title {
          font-family: "Amiri", serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--ink);
        }
        .masthead-sub {
          font-size: 0.82rem;
          color: var(--muted);
        }

        .wrapper {
          max-width: 980px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 1rem;
        }

        .article-header {
          max-width: 760px;
          margin: 0 auto 2rem;
          text-align: center;
        }
        .kicker {
          color: var(--accent);
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.03em;
          margin: 0 0 0.6rem;
        }
        h1 {
          font-family: "Amiri", serif;
          font-size: clamp(1.9rem, 4vw, 2.6rem);
          line-height: 1.4;
          margin: 0 0 0.9rem;
          color: var(--ink);
        }
        .dek {
          font-size: 1.08rem;
          color: var(--ink-soft);
          line-height: 1.9;
          margin: 0 0 1.1rem;
        }
        .byline {
          font-size: 0.85rem;
          color: var(--muted);
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }
        .dot {
          color: var(--line);
        }

        .hero-figure {
          margin: 0 0 2.5rem;
        }
        .hero-image {
          width: 100%;
          height: auto;
          border-radius: 2px;
          display: block;
        }
        figcaption {
          font-size: 0.82rem;
          color: var(--muted);
          margin-top: 0.6rem;
          text-align: center;
          border-top: 1px solid var(--line);
          padding-top: 0.5rem;
        }

        .layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        .sidebar {
          position: sticky;
          top: 1.5rem;
        }
        .toc {
          border-top: 2px solid var(--rule-gold);
          padding-top: 0.8rem;
          margin-bottom: 1.8rem;
        }
        .toc-title,
        .qf-title {
          font-weight: 700;
          font-size: 0.8rem;
          color: var(--ink);
          margin: 0 0 0.6rem;
        }
        .toc ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .toc li {
          margin-bottom: 0.5rem;
        }
        .toc a {
          color: var(--ink-soft);
          text-decoration: none;
          font-size: 0.85rem;
          line-height: 1.5;
        }
        .toc a:hover {
          color: var(--accent);
        }

        .quick-facts {
          background: var(--paper-card);
          border: 1px solid var(--line);
          padding: 1rem;
          border-radius: 2px;
        }
        .qf-row {
          padding: 0.5rem 0;
          border-bottom: 1px dashed var(--line);
        }
        .qf-row:last-child {
          border-bottom: none;
        }
        .qf-row dt {
          font-size: 0.72rem;
          color: var(--muted);
          margin: 0 0 0.15rem;
        }
        .qf-row dd {
          font-size: 0.88rem;
          margin: 0;
          color: var(--ink);
          font-weight: 500;
        }

        .content {
          max-width: 680px;
        }
        .content section {
          margin-bottom: 2.2rem;
        }
        .content h2 {
          font-family: "Amiri", serif;
          font-size: 1.4rem;
          color: var(--ink);
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          margin: 0 0 0.9rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--line);
        }
        .section-number {
          font-family: "IBM Plex Sans Arabic", sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent);
        }
        .content p {
          line-height: 2;
          font-size: 1.02rem;
          color: var(--ink-soft);
          margin: 0 0 1rem;
        }
        .content p.lead {
          font-size: 1.12rem;
          color: var(--ink);
        }
        .content p.muted {
          font-size: 0.9rem;
          color: var(--muted);
        }
        .content ul {
          margin: 0 0 1rem;
          padding-inline-start: 1.3rem;
          line-height: 1.9;
        }
        .content ul li {
          margin-bottom: 0.35rem;
          color: var(--ink-soft);
        }
        .content ul li::marker {
          color: var(--accent);
        }

        .inline-figure {
          margin: 1.6rem 0 2.2rem;
        }
        .inline-image {
          width: 100%;
          height: auto;
          border-radius: 2px;
          display: block;
        }

        .pull-quote {
          font-family: "Amiri", serif;
          font-size: 1.35rem;
          line-height: 1.8;
          color: var(--accent);
          border-right: 3px solid var(--rule-gold);
          padding: 0.3rem 1.2rem;
          margin: 2rem 0;
        }

        .conclusion {
          background: var(--paper-card);
          border: 1px solid var(--line);
          padding: 1.4rem;
          border-radius: 2px;
        }

        .sources {
          border-top: 1px solid var(--line);
          padding-top: 1rem;
          margin-top: 1.5rem;
        }
        .sources-title {
          font-weight: 700;
          font-size: 0.85rem;
          margin: 0 0 0.3rem;
        }
        .sources p:last-child {
          font-size: 0.88rem;
          color: var(--muted);
        }

        .site-footer {
          text-align: center;
          padding: 2rem 1.5rem;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 0.82rem;
        }

        @media (max-width: 820px) {
          .layout {
            grid-template-columns: 1fr;
          }
          .sidebar {
            position: static;
            order: 2;
          }
          .content {
            order: 1;
            max-width: none;
          }
        }
      `}</style>
    </>
  );
}
