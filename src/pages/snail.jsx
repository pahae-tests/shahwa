import Head from "next/head";
import Image from "next/image";

const META = {
  category: "حكايات وأساطير شعبية",
  date: "١٢ يوليو ٢٠٢٦",
  readTime: "٤ دقائق قراءة",
};

export default function SnailLegendArticle() {
  return (
    <>
      <Head>
        <title>سحر الحلزون.. أسطورة الجني الذي يتخفى في هيئة حلزون</title>
        <meta
          name="description"
          content="سحر الحلزون.. أسطورة الجني الذي يتخفى في هيئة حلزون"
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
            <span className="masthead-sub">قسم الحكايات والأساطير الشعبية</span>
          </div>
        </div>

        <main className="wrapper">
          <header className="article-header">
            <p className="kicker">{META.category}</p>
            <h1>سحر الحلزون.. أسطورة الجني الذي يتخفى في هيئة حلزون</h1>
            <div className="byline">
              <span>{META.date}</span>
              <span className="dot">•</span>
              <span>{META.readTime}</span>
            </div>
          </header>

          <figure className="hero-figure">
            <Image
              src="/1.jpg"
              alt="سحر الحلزون.. أسطورة الجني الذي يتخفى في هيئة حلزون"
              width={1280}
              height={720}
              className="hero-image"
              priority
            />
          </figure>

          <article className="content">
            <p className="lead">
              يُحكى في بعض الأساطير الشعبية عن قصة غامضة تُعرف باسم
              "سحر الحلزون".
            </p>

            <p>
              وتروي الأسطورة أن بعض الجن يمتلكون القدرة على التشكل في
              هيئة حلزون صغير يزحف على الأرض دون أن يثير انتباه أحد.
              فإذا صادف أن داست فتاة على ذلك الحلزون بقدمها من غير
              قصد، فإن السحر يكتمل، ويعود ذلك الكائن إلى هيئته
              الحقيقية، ويصبح - بحسب الحكاية - جنيًا عاشقًا متعلقًا
              بها.
            </p>

            <figure className="inline-figure">
              <Image
                src="/2.jpg"
                alt="سحر الحلزون.. أسطورة الجني الذي يتخفى في هيئة حلزون"
                width={1200}
                height={700}
                className="inline-image"
              />
            </figure>

            <p>
              وتضيف الرواية أن الجني، قبل أن تنجح الفتاة في الدوس
              عليه، يكون شديد الإصرار على تحقيق ذلك. فيزحف باستمرار
              محاولًا الوصول إلى الموضع الذي ستضع فيه قدمها، وكأنه
              يتوقع خطواتها القادمة. فإذا غيرت اتجاهها أو أخطأت
              توقعاته، يعاود الزحف مرة أخرى ليقف في مكان آخر من
              مسارها، ويكرر المحاولة مرات عديدة حتى ينجح في أن تدهسه
              دون أن تشعر. وتعتبر الأسطورة أن هذه اللحظة هي الشرط
              الذي يجعله يتحول إلى "جني عاشق" يرتبط بها.
            </p>

            <p>
              وبعد ذلك، تزعم الحكايات الشعبية أنه يبدأ بملاحقتها،
              فتشعر بوجود أمور غريبة في حياتها، مثل الأحلام المزعجة،
              أو الإحساس بأن أحدًا يراقبها، أو وقوع أحداث لا تجد لها
              تفسيرًا، وهي أوصاف تختلف من رواية إلى أخرى.
            </p>

            <figure className="inline-figure">
              <Image
                src="/3.jpg"
                alt="سحر الحلزون.. أسطورة الجني الذي يتخفى في هيئة حلزون"
                width={1200}
                height={700}
                className="inline-image"
              />
            </figure>

            <p>
              وتذكر بعض النسخ من هذه الأسطورة أن التخلص مما يسمى
              "سحر الحلزون" يكون بطريقة غريبة؛ إذ يُقال إن الفتاة
              تبحث عن مكان تتجمع فيه أعداد كبيرة من الحلزونات
              العادية، ثم تمشي في ذلك المكان ذهابًا وإيابًا دون أن
              تنظر إلى الأرض، حتى تدوس على جميع الحلزونات الموجودة،
              ثم تعيد المرور فوق المكان مرة أخرى للتأكد - بحسب
              الرواية - من أن جميعها قد سُحق، وعندها يزول أثر الجني
              العاشق. وهذه التفاصيل جزء من الحكاية نفسها، وتختلف من
              منطقة إلى أخرى، ولا تستند إلى أي أساس موثق.
            </p>
          </article>
        </main>

        <footer className="site-footer">
          <p>أرشيف الفولكلور — قسم الحكايات والأساطير الشعبية</p>
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
          max-width: 760px;
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
          max-width: 760px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 1rem;
        }

        .article-header {
          text-align: center;
          margin-bottom: 2rem;
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
          font-size: clamp(1.7rem, 4vw, 2.4rem);
          line-height: 1.5;
          margin: 0 0 0.9rem;
          color: var(--ink);
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
          margin: 0 0 2rem;
        }
        .hero-image {
          width: 100%;
          height: auto;
          border-radius: 2px;
          display: block;
        }

        .content p {
          line-height: 2;
          font-size: 1.05rem;
          color: var(--ink-soft);
          margin: 0 0 1.3rem;
        }
        .content p.lead {
          font-size: 1.18rem;
          color: var(--ink);
        }

        .inline-figure {
          margin: 1.6rem 0 2rem;
        }
        .inline-image {
          width: 100%;
          height: auto;
          border-radius: 2px;
          display: block;
        }

        .site-footer {
          text-align: center;
          padding: 2rem 1.5rem;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 0.82rem;
          margin-top: 1.5rem;
        }
      `}</style>
    </>
  );
}
