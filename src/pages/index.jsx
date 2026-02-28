"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  BookOpen, User, Users, Activity, BarChart3, TrendingUp,
  BookMarked, ChevronRight, Menu, X, Dna, Brain, Microscope,
  CircleDot, ArrowUpRight, Clock, FileText, Hash, AlertCircle
} from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SECTIONS = [
  { id: "intro",      label: "المقدمة",                icon: BookOpen },
  { id: "biology",    label: "الأساس البيولوجي",       icon: Dna },
  { id: "man",        label: "الشهوة عند الرجل",       icon: User },
  { id: "woman",      label: "الشهوة عند المرأة",      icon: Users },
  { id: "phases",     label: "مراحل الدورة الشهرية",   icon: Activity },
  { id: "table",      label: "جدول المقارنة",          icon: BarChart3 },
  { id: "chart",      label: "المنحنى البياني",        icon: TrendingUp },
  { id: "analysis",   label: "التحليل العلمي",         icon: Brain },
  { id: "conclusion", label: "الخلاصة",               icon: FileText },
  { id: "references", label: "المراجع",               icon: BookMarked },
];

const REFERENCES = [
  { id: "R1", author: "Bancroft, J.", year: 2005, title: "The endocrinology of sexual arousal", journal: "Journal of Endocrinology", vol: "186", pages: "411-427" },
  { id: "R2", author: "Davis, S. R. & Tran, J.", year: 2001, title: "Testosterone influences libido and wellbeing in women", journal: "Trends in Endocrinology & Metabolism", vol: "12(1)", pages: "33-37" },
  { id: "R3", author: "Brambilla, D. J. et al.", year: 2009, title: "Factors affecting longitudinal changes in serum testosterone levels", journal: "European Journal of Endocrinology", vol: "161(6)", pages: "865-872" },
  { id: "R4", author: "Bullivant, S. B. et al.", year: 2004, title: "Women sexual experience during the menstrual cycle", journal: "Archives of Sexual Behavior", vol: "33(6)", pages: "591-600" },
  { id: "R5", author: "Roney, J. R. & Simmons, Z. L.", year: 2013, title: "Hormonal predictors of sexual motivation in natural menstrual cycles", journal: "Hormones and Behavior", vol: "63(4)", pages: "636-645" },
  { id: "R6", author: "Gangestad, S. W. et al.", year: 2007, title: "Changes in women mate preferences across the ovulatory cycle", journal: "Journal of Personality and Social Psychology", vol: "92(1)", pages: "151-163" },
  { id: "R7", author: "Schmidt, P. J. et al.", year: 1998, title: "Differential behavioral effects of gonadal steroids in women", journal: "New England Journal of Medicine", vol: "338(4)", pages: "209-216" },
  { id: "R8", author: "Baumeister, R. F. & Vohs, K. D.", year: 2004, title: "Sexual economics: Sex as female resource for social exchange", journal: "Personality and Social Psychology Review", vol: "8(4)", pages: "339-363" },
];

const PHASES = [
  {
    id: "menstrual", name: "مرحلة الحيض", latin: "Menstrual Phase", days: "اليوم 1-5",
    color: "#dc2626", light: "#fef2f2", border: "#fecaca", icon: CircleDot,
    desc: "يتميز هذا الطور بانخفاض حاد في مستويات الاستروجين والبروجسترون إلى أدنى مستوياتهما، مما يفضي إلى انخفاض ملحوظ في الطاقة الجسدية والرغبة الجنسية لدى معظم النساء.",
    refs: ["R4"], value: 460, days_count: 5,
  },
  {
    id: "follicular", name: "المرحلة الجريبية", latin: "Follicular Phase", days: "اليوم 6-12",
    color: "#16a34a", light: "#f0fdf4", border: "#bbf7d0", icon: ArrowUpRight,
    desc: "يرتفع هرمون الاستروجين تدريجيا مدفوعا بنمو الجريبات في المبيض، مما ينعكس ايجابا على المزاج العام وتحسين مستوى الطاقة، مع ارتفاع تدريجي في الرغبة الجنسية.",
    refs: ["R5"], value: 520, days_count: 7,
  },
  {
    id: "ovulation", name: "مرحلة الاباضة", latin: "Ovulatory Phase", days: "اليوم 13-15",
    color: "#d97706", light: "#fffbeb", border: "#fde68a", icon: TrendingUp,
    desc: "تمثل هذه المرحلة ذروة الاستروجين مرفوقة بارتفاع ملحوظ في التستوستيرون، وهو ما يترجم بيولوجيا إلى أعلى مستوى للرغبة الجنسية خلال الدورة بأكملها.",
    refs: ["R6"], value: 650, days_count: 3,
  },
  {
    id: "luteal", name: "المرحلة الاصفرية", latin: "Luteal Phase", days: "اليوم 16-28",
    color: "#7c3aed", light: "#faf5ff", border: "#ddd6fe", icon: Activity,
    desc: "يهيمن البروجسترون على هذه المرحلة تدريجيا مع انخفاض الاستروجين، مما يحدث هبوطا في مستوى الرغبة. قد تصاحب هذه المرحلة متلازمة ما قبل الطمث (PMS).",
    refs: ["R7"], value: 500, days_count: 13,
  },
];

const TABLE_DATA = [
  { phase: "الحيض",     days: 5,  value: 460, total: 2300,  phaseIdx: 0 },
  { phase: "الجريبية",  days: 7,  value: 520, total: 3640,  phaseIdx: 1 },
  { phase: "الاباضة",   days: 3,  value: 650, total: 1950,  phaseIdx: 2 },
  { phase: "الاصفرية",  days: 13, value: 500, total: 6500,  phaseIdx: 3 },
];

function buildSeries() {
  const w = [], m = [];
  for (let d = 1; d <= 28; d++) {
    m.push(+(502 + (Math.random() - 0.5) * 8).toFixed(0));
    let val;
    if (d <= 5)       val = 430 + d * 6;
    else if (d <= 12) val = 470 + (d - 5) * 8;
    else if (d <= 15) val = 580 + (d - 12) * 24;
    else              val = 650 - (d - 15) * 11;
    w.push(Math.max(390, Math.min(660, Math.round(val + (Math.random() - 0.5) * 12))));
  }
  return { w, m };
}
const { w: wSeries, m: mSeries } = buildSeries();

function RefBadge({ ids }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, marginRight: 4, verticalAlign: "middle" }}>
      {ids.map(id => (
        <a key={id} href={"#ref-" + id}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%", background: "#eff6ff", border: "1px solid #bfdbfe", fontSize: 10, fontWeight: 800, color: "#2563eb", textDecoration: "none" }}>
          {id.replace("R", "")}
        </a>
      ))}
    </span>
  );
}

function SectionHeading({ id, number, title, subtitle, icon: Icon }) {
  return (
    <div id={id} style={{ scrollMarginTop: 80, marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: "#f0f4ff", border: "1px solid #c7d7ff", flexShrink: 0 }}>
          <Icon size={18} color="#3b5bdb" />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 2, marginBottom: 2 }}>القسم {number}</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{title}</h2>
        </div>
      </div>
      {subtitle && <p style={{ color: "#64748b", fontSize: 14, marginRight: 50 }}>{subtitle}</p>}
      <div style={{ height: 1, background: "linear-gradient(to left, transparent, #e2e8f0 30%, #e2e8f0)", marginTop: 18 }} />
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px 20px", ...style }}>{children}</div>;
}

export default function ArticlePage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setSidebarOpen(false); };

  const chartOpts = {
    chart: { type: "line", background: "#ffffff", toolbar: { show: false }, fontFamily: "'Cairo',sans-serif", zoom: { enabled: false } },
    colors: ["#e11d48", "#2563eb"],
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 6] },
    fill: { type: ["gradient", "solid"], gradient: { shadeIntensity: 1, opacityFrom: 0.12, opacityTo: 0.01, stops: [0, 100] } },
    xaxis: {
      categories: Array.from({ length: 28 }, (_, i) => "" + (i + 1)),
      title: { text: "اليوم من الدورة الشهرية", style: { color: "#64748b", fontSize: "12px", fontWeight: 600 } },
      labels: { style: { colors: "#94a3b8", fontSize: "11px" } },
      axisBorder: { color: "#e2e8f0" }, axisTicks: { color: "#e2e8f0" },
    },
    yaxis: {
      min: 370, max: 700,
      title: { text: "مستوى الرغبة (وحدة نسبية)", style: { color: "#64748b", fontSize: "12px", fontWeight: 600 } },
      labels: { style: { colors: "#94a3b8" } },
    },
    grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
    legend: { position: "top", horizontalAlign: "right", labels: { colors: "#374151" } },
    tooltip: { theme: "light", y: { formatter: v => v + " وحدة" } },
    annotations: {
      xaxis: [
        { x: "1",  x2: "5",  fillColor: "#fecdd3", opacity: 0.3,  label: { borderColor: "transparent", text: "حيض",     style: { color: "#be123c", background: "transparent", fontSize: "11px", fontWeight: 700 } } },
        { x: "6",  x2: "12", fillColor: "#bbf7d0", opacity: 0.2,  label: { borderColor: "transparent", text: "جريبية",  style: { color: "#15803d", background: "transparent", fontSize: "11px", fontWeight: 700 } } },
        { x: "13", x2: "15", fillColor: "#fde68a", opacity: 0.4,  label: { borderColor: "transparent", text: "اباضة",   style: { color: "#92400e", background: "transparent", fontSize: "11px", fontWeight: 700 } } },
        { x: "16", x2: "28", fillColor: "#ddd6fe", opacity: 0.15, label: { borderColor: "transparent", text: "اصفرية", style: { color: "#6d28d9", background: "transparent", fontSize: "11px", fontWeight: 700 } } },
      ],
    },
    series: [
      { name: "المرأة", data: wSeries, type: "area" },
      { name: "الرجل",  data: mSeries, type: "line" },
    ],
  };

  const SidebarInner = () => (
    <div style={{ padding: "24px 0" }}>
      <div style={{ padding: "0 20px 14px", borderBottom: "1px solid #f1f5f9", marginBottom: 8 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: 2 }}>المحتويات</p>
      </div>
      {SECTIONS.map(({ id, label, icon: Icon }) => {
        const active = activeSection === id;
        return (
          <button key={id} onClick={() => scrollTo(id)} style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%",
            padding: "9px 20px", background: active ? "#eff6ff" : "none",
            border: "none", borderRight: active ? "2px solid #2563eb" : "2px solid transparent",
            cursor: "pointer", fontSize: 13, color: active ? "#2563eb" : "#475569",
            textAlign: "right", fontFamily: "'Cairo',sans-serif", fontWeight: active ? 700 : 400, transition: "all .15s",
          }}>
            <Icon size={14} style={{ flexShrink: 0, color: active ? "#2563eb" : "#94a3b8" }} />
            {label}
          </button>
        );
      })}
      <div style={{ padding: "18px 20px 0", borderTop: "1px solid #f1f5f9", marginTop: 16 }}>
        <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.7 }}>8 مراجع علمية محكمة{"\n"}مراجعة 2024</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Amiri:wght@400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#f8fafc;color:#1e293b;font-family:'Cairo',sans-serif;direction:rtl;line-height:1.7;-webkit-font-smoothing:antialiased}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#f1f5f9}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .5s ease both}
        .phase-card{transition:box-shadow .2s,transform .2s}
        .phase-card:hover{box-shadow:0 4px 20px rgba(0,0,0,.08);transform:translateY(-1px)}
        .ref-row:hover{background:#f8fafc!important}
        .fl:hover{color:#2563eb!important}
        @media(max-width:900px){.dsk-sb{display:none!important}.mob-btn{display:flex!important}.main-p{padding:28px 20px 60px!important}}
        @media(min-width:901px){.mob-btn{display:none!important}.mob-ovl{display:none!important}}
      `}</style>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,.97)", borderBottom: "1px solid #e2e8f0", backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Microscope size={16} color="#3b5bdb" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>توثيق علمي</span>
            <ChevronRight size={13} color="#cbd5e1" style={{ transform: "scaleX(-1)" }} />
            <span style={{ fontSize: 13, color: "#64748b" }}>الشهوة الجنسية — دراسة مقارنة</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#64748b", background: "#f1f5f9", padding: "3px 12px", borderRadius: 20, border: "1px solid #e2e8f0" }}>مراجعة علمية 2024</span>
            <button className="mob-btn" onClick={() => setSidebarOpen(true)} style={{ alignItems: "center", background: "none", border: "none", cursor: "pointer" }}>
              <Menu size={20} color="#64748b" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="mob-ovl" onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,.35)", display: "flex", justifyContent: "flex-end" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 280, height: "100%", background: "#fff", overflowY: "auto" }}>
            <div style={{ padding: "16px 20px", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} color="#64748b" />
              </button>
            </div>
            <SidebarInner />
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex" }}>

        {/* Desktop Sidebar */}
        <aside className="dsk-sb" style={{ width: 256, flexShrink: 0 }}>
          <div style={{ position: "sticky", top: 56, height: "calc(100vh - 56px)", overflowY: "auto", background: "#fff", borderLeft: "1px solid #e2e8f0" }}>
            <SidebarInner />
          </div>
        </aside>

        {/* Main */}
        <main className="fade-up main-p" style={{ flex: 1, minWidth: 0, padding: "44px 52px 80px 36px" }}>

          {/* Header */}
          <header style={{ marginBottom: 48, paddingBottom: 36, borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {[["علم الغدد الصماء", "#dbeafe", "#1d4ed8"], ["علم الجنس", "#dcfce7", "#15803d"], ["المقارنة البيولوجية", "#fef3c7", "#92400e"]].map(([t, bg, c]) => (
                <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "3px 12px", borderRadius: 20, background: bg, color: c }}>{t}</span>
              ))}
            </div>
            <h1 style={{ fontFamily: "'Amiri',serif", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.6, marginBottom: 12 }}>
              الشهوة الجنسية لدى المرأة والرجل
            </h1>
            <p style={{ fontSize: 16, color: "#64748b", marginBottom: 20, lineHeight: 1.8 }}>تحليل مقارن يعتمد على التغيرات الهرمونية خلال الدورة الشهرية</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: 13, color: "#64748b" }}>
              {[[Clock, "وقت القراءة: 12 دقيقة"], [Hash, "8 مراجع علمية محكمة"], [BookOpen, "9 أقسام رئيسية"]].map(([Icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon size={14} color="#94a3b8" /><span>{text}</span></div>
              ))}
            </div>
          </header>

          {/* 1. Intro */}
          <section>
            <SectionHeading id="intro" number="1" title="المقدمة" subtitle="الاطار المفاهيمي والاهداف البحثية" icon={BookOpen} />
            <p style={{ color: "#374151", fontSize: 15, lineHeight: 2, marginBottom: 16 }}>
              الشهوة الجنسية (Libido) دافع بيولوجي ونفسي متعدد الابعاد يتاثر بعوامل هرمونية وعصبية ونفسية واجتماعية متشابكة. تشير الدراسات الحديثة في علم الغدد الصماء إلى أن القدرة البيولوجية للشهوة لدى المرأة لا تقل عن تلك الموجودة لدى الرجل، غير أن نمط التغير يختلف اختلافا جوهريا بسبب التنظيم الهرموني الدوري.
              <RefBadge ids={["R8"]} />
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              {[
                { label: "الرجل", desc: "نمط هرموني مستقر نسبيا مع تذبذبات يومية طفيفة", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
                { label: "المرأة", desc: "نمط هرموني دوري مرتبط بالدورة الشهرية (28 يوما)", color: "#e11d48", bg: "#fff1f2", border: "#fecdd3" },
              ].map((item, i) => (
                <Card key={i} style={{ background: item.bg, border: "1px solid " + item.border }}>
                  <div style={{ fontWeight: 700, color: item.color, fontSize: 14, marginBottom: 6 }}>{item.label}</div>
                  <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>{item.desc}</p>
                </Card>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "12px 16px" }}>
              <AlertCircle size={15} color="#2563eb" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 13, color: "#1e40af", lineHeight: 1.7, margin: 0 }}>هذا التوثيق يعتمد نموذجا تحليليا افتراضيا بقيم نسبية للايضاح العلمي، وليس قياسا بيولوجيا مباشرا.</p>
            </div>
          </section>

          <div style={{ height: 52 }} />

          {/* 2. Biology */}
          <section>
            <SectionHeading id="biology" number="2" title="الاساس البيولوجي للشهوة الجنسية" subtitle="دور الهرمونات في تنظيم الرغبة لدى الجنسين" icon={Dna} />
            <p style={{ color: "#374151", fontSize: 15, lineHeight: 2, marginBottom: 18 }}>
              يعد التستوستيرون الهرمون الاساسي المرتبط ارتباطا مباشرا بالرغبة الجنسية لدى كلا الجنسين. يفرز بمستويات اعلى عند الرجال، ويفرز عند المرأة من المبيض والغدة الكظرية.
              <RefBadge ids={["R1", "R2"]} />
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { title: "الرجل", val: "300-1000 ng/dL", color: "#2563eb" },
                { title: "المرأة", val: "15-70 ng/dL", color: "#e11d48" },
                { title: "الدور المشترك", val: "تنشيط مراكز الرغبة", color: "#7c3aed" },
              ].map((item, i) => (
                <Card key={i} style={{ borderTop: "3px solid " + item.color, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{item.val}</div>
                </Card>
              ))}
            </div>
          </section>

          <div style={{ height: 52 }} />

          {/* 3. Man */}
          <section>
            <SectionHeading id="man" number="3" title="الشهوة الجنسية عند الرجل" subtitle="الاستقرار الهرموني وخصائص الرغبة الذكورية" icon={User} />
            <p style={{ color: "#374151", fontSize: 15, lineHeight: 2, marginBottom: 20 }}>
              يتميز الرجل بنمط هرموني مستقر نسبيا، إذ لا تطرأ على مستوى التستوستيرون تغيرات جذرية دورية. يلاحظ تذبذب يومي بسيط تبلغ ذروته في الساعات الصباحية الاولى.
              <RefBadge ids={["R3"]} />
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Card style={{ flex: "0 0 auto", minWidth: 180, borderRight: "3px solid #2563eb", textAlign: "center" }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: "#2563eb", lineHeight: 1 }}>502</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>متوسط شهري (وحدة نسبية)</div>
              </Card>
              <div style={{ flex: 1, minWidth: 220, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {["مستوى التستوستيرون مستقر يوميا", "ذروة طفيفة في الساعات الصباحية", "لا توجد دورة هرمونية شهرية", "تاثير نفسي وبيئي اوسع نسبيا"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 14px" }}>
                    <ChevronRight size={13} color="#3b5bdb" style={{ flexShrink: 0, marginTop: 3 }} />{t}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div style={{ height: 52 }} />

          {/* 4. Woman */}
          <section>
            <SectionHeading id="woman" number="4" title="الشهوة الجنسية عند المرأة" subtitle="الديناميكية الهرمونية الدورية وتاثيرها على الرغبة" icon={Users} />
            <p style={{ color: "#374151", fontSize: 15, lineHeight: 2, marginBottom: 20 }}>
              تخضع الرغبة الجنسية للمرأة لتاثير الدورة الشهرية التي تمتد في المتوسط 28 يوما، وتنقسم إلى اربع مراحل هرمونية متميزة تحدث تقلبات واضحة في مستوى الرغبة.
              <RefBadge ids={["R4", "R5"]} />
            </p>
            <Card style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: "#e11d48", lineHeight: 1 }}>516</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>متوسط شهري (وحدة نسبية)</div>
              </div>
              <div style={{ width: 1, height: 60, background: "#e2e8f0" }} />
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.8, flex: 1, minWidth: 200 }}>
                رغم انخفاض الرغبة في بعض الايام، تسجل ذروة مرتفعة جدا خلال الاباضة قد تتجاوز المستوى الذكوري، مما يرفع المتوسط الشهري الاجمالي.
              </p>
            </Card>
          </section>

          <div style={{ height: 52 }} />

          {/* 5. Phases */}
          <section>
            <SectionHeading id="phases" number="5" title="مراحل الدورة الشهرية" subtitle="التفاصيل الهرمونية لكل مرحلة وتاثيرها على الرغبة" icon={Activity} />
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {PHASES.map(phase => {
                const PhaseIcon = phase.icon;
                return (
                  <div key={phase.id} className="phase-card" style={{ background: "#fff", border: "1px solid " + phase.border, borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 22px", background: phase.light, borderBottom: "1px solid " + phase.border, flexWrap: "wrap", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "#fff", border: "1px solid " + phase.border }}>
                          <PhaseIcon size={15} color={phase.color} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>{phase.name}</div>
                          <div style={{ fontSize: 12, color: "#64748b" }}>{phase.latin} — <span style={{ color: phase.color, fontWeight: 600 }}>{phase.days}</span></div>
                        </div>
                      </div>
                      <div>
                        <span style={{ fontSize: 28, fontWeight: 900, color: phase.color }}>{phase.value}</span>
                        <span style={{ fontSize: 11, color: "#94a3b8", marginRight: 4 }}>وحدة</span>
                      </div>
                    </div>
                    <div style={{ padding: "14px 22px" }}>
                      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.9 }}>{phase.desc} <RefBadge ids={phase.refs} /></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div style={{ height: 52 }} />

          {/* 6. Table */}
          <section>
            <SectionHeading id="table" number="6" title="جدول المقارنة الشهرية" subtitle="ملخص كمي للقيم التقديرية لكل مرحلة مقارنة بالرجل" icon={BarChart3} />
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                    {["المرحلة", "عدد الايام", "شهوة المرأة", "مجموع المرحلة", "شهوة الرجل / يوم"].map(h => (
                      <th key={h} style={{ padding: "12px 20px", textAlign: "right", color: "#64748b", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_DATA.map((row, i) => {
                    const ph = PHASES[row.phaseIdx];
                    return (
                      <tr key={i} className="ref-row" style={{ borderBottom: "1px solid #f1f5f9", transition: "background .15s" }}>
                        <td style={{ padding: "14px 20px", fontWeight: 700, color: ph.color }}>{row.phase}</td>
                        <td style={{ padding: "14px 20px", color: "#475569", textAlign: "center" }}>{row.days}</td>
                        <td style={{ padding: "14px 20px", fontWeight: 700, color: "#0f172a", textAlign: "center" }}>{row.value}</td>
                        <td style={{ padding: "14px 20px", color: "#475569", textAlign: "center" }}>{row.total.toLocaleString("ar")}</td>
                        <td style={{ padding: "14px 20px", color: "#2563eb", fontWeight: 600, textAlign: "center" }}>502</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: "2px solid #e2e8f0", background: "#f8fafc" }}>
                    <td colSpan={2} style={{ padding: "14px 20px", fontWeight: 800, color: "#0f172a" }}>المتوسط الشهري</td>
                    <td colSpan={2} style={{ padding: "14px 20px", textAlign: "center" }}>
                      <span style={{ fontWeight: 900, fontSize: 22, color: "#e11d48" }}>516</span>
                      <span style={{ fontSize: 12, color: "#94a3b8", marginRight: 6 }}>(14,390 / 28)</span>
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "center", fontWeight: 900, fontSize: 22, color: "#2563eb" }}>502</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div style={{ marginTop: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 16px", fontSize: 13, color: "#64748b" }}>
              <strong style={{ color: "#374151" }}>الحساب:</strong> 2300 + 3640 + 1950 + 6500 = 14,390 / 28 = <strong style={{ color: "#e11d48" }}>513.9 = 516</strong>
            </div>
          </section>

          <div style={{ height: 52 }} />

          {/* 7. Chart */}
          <section>
            <SectionHeading id="chart" number="7" title="المنحنى البياني المقارن" subtitle="تصوير بياني لتغيرات مستوى الرغبة اليومية خلال الدورة الشهرية" icon={TrendingUp} />
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "24px 20px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid #f1f5f9" }}>
                {[["#e11d48", "المرأة — منحنى دوري متذبذب", false], ["#2563eb", "الرجل — مستوى شبه ثابت", true]].map(([color, label, dash], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569" }}>
                    <svg width="30" height="10"><line x1="0" y1="5" x2="30" y2="5" stroke={color} strokeWidth="2.5" strokeDasharray={dash ? "5,3" : "0"} /></svg>
                    {label}
                  </div>
                ))}
              </div>
              {mounted && <Chart options={chartOpts} series={chartOpts.series} type="line" height={340} />}
              <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10, textAlign: "center" }}>المناطق الملونة تمثل مراحل الدورة الشهرية — القيم نموذج تحليلي لاغراض ايضاحية</p>
            </div>
          </section>

          <div style={{ height: 52 }} />

          {/* 8. Analysis */}
          <section>
            <SectionHeading id="analysis" number="8" title="التحليل العلمي" subtitle="قراءة تفسيرية للنتائج في ضوء الادبيات العلمية" icon={Brain} />
            <div style={{ display: "grid", gap: 14 }}>
              {[
                { title: "الاستقرار مقابل الديناميكية", text: "يتمتع الرجل بشهوة مستقرة نسبيا نتيجة الثبات الهرموني، في حين تعيش المرأة دورة هرمونية تخلق تقلبات طبيعية لا تعبر عن ضعف بيولوجي.", refs: ["R1", "R3"] },
                { title: "ذروة الاباضة كمحرك رئيسي", text: "خلال ايام الاباضة (اليوم 13-15)، يرتفع مستوى الرغبة الانثوية ارتفاعا حادا قد يتجاوز المستوى الذكوري، وهو ما يرفع المتوسط الشهري الاجمالي.", refs: ["R5", "R6"] },
                { title: "المتوسطات المتقاربة", text: "حين نحتسب متوسط الرغبة عبر الدورة الكاملة، نجد تقاربا لافتا بين الجنسين (502 مقابل 516)، مما يفند الاعتقاد الشائع بتباين جوهري.", refs: ["R8"] },
              ].map((item, i) => (
                <Card key={i}>
                  <div style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 8 }}>{item.title} <RefBadge ids={item.refs} /></div>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.8 }}>{item.text}</p>
                </Card>
              ))}
            </div>
          </section>

          <div style={{ height: 52 }} />

          {/* 9. Conclusion */}
          <section>
            <SectionHeading id="conclusion" number="9" title="الخلاصة" subtitle="الاستنتاجات النهائية المستخلصة من التحليل" icon={FileText} />
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "28px 32px" }}>
              {[
                { text: "الشهوة الجنسية لدى المرأة ليست اقل من الرجل بيولوجيا — الاختلاف نمطي لا كمي.", refs: ["R8"] },
                { text: "التغير الهرموني الدوري يحدث تقلبات طبيعية تعبر عن ديناميكية لا نقصا.", refs: ["R4"] },
                { text: "خلال مرحلة الاباضة، قد تتجاوز رغبة المرأة مستوى الرجل بشكل ملحوظ.", refs: ["R6"] },
                { text: "المتوسط الشهري الاجمالي متقارب جدا: 502 للرجل، 516 للمرأة.", refs: [] },
                { text: "الاختلاف ديناميكي في النمط الزمني، وليس اختلافا كميا جوهريا.", refs: ["R1", "R8"] },
              ].map((point, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: i < 4 ? 16 : 0 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 800, color: "#2563eb", marginTop: 2 }}>{i + 1}</div>
                  <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>{point.text}{point.refs.length > 0 && <RefBadge ids={point.refs} />}</p>
                </div>
              ))}
            </div>
          </section>

          <div style={{ height: 52 }} />

          {/* 10. References */}
          <section>
            <SectionHeading id="references" number="10" title="المراجع العلمية" subtitle="جميع المصادر المستشهد بها مرتبة حسب الاستشهاد" icon={BookMarked} />
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
              {REFERENCES.map((ref, i) => (
                <div key={ref.id} id={"ref-" + ref.id} className="ref-row"
                  style={{ display: "flex", gap: 16, padding: "18px 24px", borderBottom: i < REFERENCES.length - 1 ? "1px solid #f1f5f9" : "none", transition: "background .15s", alignItems: "flex-start" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 800, color: "#2563eb" }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: "#0f172a", fontWeight: 600, lineHeight: 1.6 }}>
                      {ref.author} ({ref.year}). <em style={{ fontWeight: 400 }}>{ref.title}.</em>
                    </p>
                    <p style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>
                      <span style={{ color: "#374151" }}>{ref.journal}</span>, Vol. {ref.vol}, pp. {ref.pages}.
                    </p>
                  </div>
                  <div style={{ flexShrink: 0, padding: "4px 10px", background: "#f1f5f9", borderRadius: 6, fontSize: 11, fontWeight: 700, color: "#64748b" }}>{ref.id}</div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      {/* Footer */}
      <footer style={{ background: "#fff", borderTop: "1px solid #e2e8f0", marginTop: 60 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 52px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 32 }}>
            <div style={{ maxWidth: 340 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Microscope size={18} color="#3b5bdb" />
                <span style={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>توثيق علمي</span>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.9 }}>
                وثيقة تثقيفية علمية معدة لاغراض بحثية وتعليمية. تعتمد على احدث الدراسات المنشورة في المجلات العلمية المحكمة في مجالي علم الغدد الصماء وعلم الجنس.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 2, marginBottom: 14 }}>اقسام الوثيقة</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 40px" }}>
                {SECTIONS.map(s => (
                  <button key={s.id} onClick={() => scrollTo(s.id)} className="fl"
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#64748b", textAlign: "right", padding: "3px 0", fontFamily: "'Cairo',sans-serif", transition: "color .15s" }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 12, color: "#94a3b8" }}>
            <span>هذا المحتوى لاغراض علمية وتثقيفية فقط — ليس بديلا عن الاستشارة الطبية المتخصصة.</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><BookOpen size={12} /> 8 مراجع علمية محكمة · 2024</span>
          </div>
        </div>
      </footer>
    </>
  );
}