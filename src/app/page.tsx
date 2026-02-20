"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCheck,
  FaUsers,
  FaChartLine,
  FaFileInvoiceDollar,
  FaBuilding,
  FaMoneyBillWave,
  FaBullseye,
  FaEye,
  FaHandshake,
  FaArrowRight,
  FaInstagram,
  FaFacebook,
  FaFileAlt,
  FaKey,
  FaStethoscope,
  FaStar,
} from "react-icons/fa";
import NewsCarousel from "@/components/news";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SobreCarousel from "@/components/sobreCarousel";

/* ─── Scroll Reveal Hook ─── */
function useReveal<T extends HTMLElement>(
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px"
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible } as const;
}

/* ─── Counter animado ─── */
function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setInView(true); obs.disconnect(); }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView]);
  return { ref, inView } as const;
}

function Counter({
  end, duration = 1400, prefix = "+", suffix = "", className = "",
}: {
  end: number; duration?: number; prefix?: string; suffix?: string; className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      setValue(Math.round(end * easeOutCubic(progress)));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, duration, end]);
  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

/* ─── Componente Reveal ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const cls =
    direction === "left" ? "reveal-left" :
    direction === "right" ? "reveal-right" :
    direction === "scale" ? "reveal-scale" : "reveal";
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${cls} ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Membros da equipe ─── */
const teamMembers = [
  { foto: 1, nome: "" },
  { foto: 2, nome: "" },
  { foto: 3, nome: "" },
  { foto: 4, nome: "" },
  { foto: 5, nome: "" },
  { foto: 6, nome: "" },
  { foto: 7, nome: "" },
  { foto: 8, nome: "" },
  { foto: 9, nome: "" },
  { foto: 10, nome: "" },
  { foto: 11, nome: "" },
  { foto: 12, nome: "" },
  { foto: 13, nome: "" },
  { foto: 14, nome: "" },
  { foto: 15, nome: "" },
];

/* ─── Serviços ─── */
const services = [
  { title: "Contabilidade Completa", desc: "Escrituração, apurações e demonstrações contábeis.", icon: FaChartLine },
  { title: "Folha de Pagamento", desc: "RH, pró-labore, eSocial e obrigações trabalhistas.", icon: FaUsers },
  { title: "Impostos e Obrigações", desc: "Apurações, guias e cumprimento fiscal com planejamento tributário.", icon: FaFileInvoiceDollar },
  { title: "Abertura e Regularização", desc: "Planejamento tributário, abertura, alterações e baixa de empresas.", icon: FaBuilding },
  { title: "BPO Financeiro", desc: "Contas a pagar/receber, conciliações e DRE gerencial em tempo real.", icon: FaMoneyBillWave },
  { title: "Consultoria Estratégica", desc: "Indicadores, metas e apoio à tomada de decisão baseada em dados.", icon: FaBullseye },
  { title: "Imposto de Renda PF", desc: "Declarações completas, revisão de pendências e otimização tributária.", icon: FaFileAlt },
  { title: "Gestão Receita Saúde", desc: "Emissão, conciliação e regularização de receitas médicas junto ao SNGPC.", icon: FaStethoscope },
  { title: "Certificados Digitais", desc: "Emissão e renovação de e-CPF e e-CNPJ com segurança e praticidade.", icon: FaKey },
];

/* ═══════════════════════════════════════════════════════ */
export default function Home() {
  /* Scroll reveal global */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section id="inicio" className="relative overflow-hidden min-h-screen flex items-center">
        {/* imagem de fundo */}
        <div className="absolute inset-0">
          <Image src="/hero1.jpg" alt="Hero background" fill priority className="object-cover object-center" />
        </div>
        {/* overlay — mais leve na direita para ver a equipe */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* linha decorativa esquerda */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-pink-500/70 to-transparent hidden lg:block" />

        {/* orb decorativo */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-pink-500/8 blur-[100px] animate-float pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-28 pb-20">
          <div className="max-w-2xl">
            {/* pill animado */}
            <div className="animate-fade-in-down inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 text-white rounded-full text-xs sm:text-sm font-semibold mb-7 backdrop-blur-md border border-white/20 shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500" />
              </span>
              Contabilidade + BPO Financeiro
            </div>

            <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl xl:text-[4rem] font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Transforme sua
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                contabilidade
              </span>
              {" "}em vantagem
              <br />competitiva
            </h1>

            <p className="animate-fade-in-up delay-200 text-base sm:text-lg lg:text-xl text-white/80 mb-9 leading-relaxed max-w-xl">
              Da abertura da empresa à gestão financeira completa. A Consultec cuida da sua contabilidade e do seu fluxo de caixa para você focar no crescimento do seu negócio.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-pink-500/30 hover:-translate-y-1 hover:shadow-pink-500/50 transition-all text-sm sm:text-base"
              >
                <FaPhone /> Agende uma reunião gratuita
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 hover:-translate-y-1 transition-all text-sm sm:text-base"
              >
                Conheça os serviços <FaArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* checkboxes */}
            <div className="animate-fade-in delay-500 flex flex-wrap gap-3">
              {[
                "Obrigações fiscais em dia",
                "Fluxo de caixa otimizado",
                "Relatórios gerenciais",
                "Consultoria estratégica",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/15 rounded-xl px-3.5 py-2">
                  <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-pink-500/30">
                    <FaCheck className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/90 font-medium whitespace-nowrap">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 opacity-50">
          <span className="text-white text-xs tracking-widest uppercase">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* ── NÚMEROS ── */}
      <section id="numeros" className="section-padding bg-white relative overflow-hidden">
        {/* faixa gradiente top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
              Nossos Números
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Confiança construída com <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">resultados</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { end: 40, suffix: " anos", label: "de experiência de mercado", delay: 0 },
              { end: 75, suffix: " mil", label: "empreendedores atendidos", delay: 150 },
              { end: 20, suffix: " mil", label: "empresas clientes / abertas", delay: 300 },
            ].map((stat) => (
              <Reveal key={stat.label} delay={stat.delay} direction="scale">
                <div className="group rounded-2xl bg-white p-8 sm:p-10 shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-3">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <SobreCarousel />

      {/* ── NOTÍCIAS ── */}
      <section id="noticias" className="section-padding bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
              Últimas notícias
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Acompanhe nossas atualizações</h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">Conteúdos e novidades relevantes para o seu negócio.</p>
          </Reveal>
          <NewsCarousel />
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section id="servicos" className="section-padding relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-pink-100 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-14 sm:mb-18">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
              Nossos Serviços
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Soluções completas para <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">seu negócio</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos serviços de contabilidade e BPO financeiro integrados para empresas de todos os portes.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 60} direction="up">
                <div className="group relative card-shadow rounded-2xl bg-white p-6 sm:p-8 h-full overflow-hidden border border-gray-100 hover:border-pink-200 transition-colors">
                  {/* barra gradiente hover */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base flex-1">{service.desc}</p>
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <a href="#contato" className="text-pink-600 font-medium hover:text-pink-700 transition-colors text-sm sm:text-base inline-flex items-center gap-1 group/link">
                      Saiba mais
                      <FaArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS / MISSÃO VISÃO VALORES ── */}
      <section id="diferenciais" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fdf4ff 0%, #f0f4ff 50%, #f0f9ff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-100/60 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-14 sm:mb-18">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-pink-100/80 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm ring-1 ring-pink-200">
              <span className="w-2 h-2 bg-pink-600 rounded-full mr-2" />
              Nossa essência
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Missão, Visão e{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Valores</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">O que nos move no dia a dia e para onde estamos indo.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: FaBullseye, label: "Missão", delay: 0,
                content: (
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Ajudar profissionais de saúde e empreendedores a crescer com segurança, oferecendo contabilidade estratégica e BPO financeiro que transformam números em decisões inteligentes.
                  </p>
                ),
              },
              {
                icon: FaEye, label: "Visão", delay: 120,
                content: (
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Fornecer informações financeiras e patrimoniais precisas e completas para auxiliar na tomada de decisões, tanto internas quanto externas, com o intuito de maximizar o resultado da empresa.
                  </p>
                ),
              },
              {
                icon: FaHandshake, label: "Valores", delay: 240,
                content: (
                  <ul className="space-y-2 text-sm sm:text-base">
                    {[
                      ["Transparência", "relações claras e dados acessíveis."],
                      ["Excelência", "rigor técnico e melhoria contínua."],
                      ["Parceria", "proximidade e compromisso com resultados."],
                      ["Segurança", "cuidado com informações e conformidade."],
                    ].map(([bold, rest]) => (
                      <li key={bold} className="flex items-start gap-2">
                        <FaStar className="w-3.5 h-3.5 text-pink-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><strong className="text-gray-800">{bold}:</strong> {rest}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ].map((item) => (
              <Reveal key={item.label} delay={item.delay} direction="up">
                <div className="group relative overflow-hidden rounded-2xl bg-white p-7 sm:p-9 shadow-sm ring-1 ring-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
                  <div className="mx-auto mb-5 sm:mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 text-center tracking-wide">
                    {item.label}
                  </h3>
                  {item.content}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-black/20" />
        {/* partículas decorativas */}
        <div className="absolute top-8 left-12 w-3 h-3 bg-white/30 rounded-full animate-float" />
        <div className="absolute top-20 right-20 w-2 h-2 bg-white/20 rounded-full animate-float delay-200" />
        <div className="absolute bottom-12 left-1/3 w-4 h-4 bg-white/20 rounded-full animate-float delay-400" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal direction="left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 sm:mb-6 leading-tight">
                Foque em crescer.<br />
                <span className="text-pink-200">Nós cuidamos do restante.</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 sm:mb-10 leading-relaxed">
                Contabilidade completa + BPO financeiro para sua operação rodar redonda e com dados precisos para tomada de decisão.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contato" className="bg-white text-pink-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 hover:-translate-y-1 hover:shadow-xl transition-all text-center text-sm sm:text-base">
                  <FaPhone className="inline mr-2" /> Entre em contato
                </a>
                <a href="#servicos" className="border-2 border-white/70 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 hover:-translate-y-1 transition-all text-center text-sm sm:text-base">
                  Ver todos os serviços
                </a>
              </div>
            </Reveal>
            <Reveal direction="right" delay={150}>
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl bg-white/10 blur-sm" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
                    alt="Equipe trabalhando"
                    className="w-full h-[300px] sm:h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section id="contato" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0a1628 100%)" }}>
        {/* orbs de fundo */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] pointer-events-none" style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-15 blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full opacity-10 blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        {/* grade sutil */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5 border" style={{ background: "rgba(139,92,246,0.15)", borderColor: "rgba(139,92,246,0.3)", color: "#c4b5fd" }}>
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
              Entre em Contato
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Vamos conversar sobre
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">seu negócio</span>
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto">
              Fale com a nossa equipe e receba uma proposta personalizada em até 24h úteis.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Card Contato */}
            <Reveal direction="left">
              <div className="relative overflow-hidden rounded-3xl p-7 sm:p-9 h-full" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {/* linha topo gradiente */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 rounded-t-3xl" />

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">Informações de Contato</h3>
                <div className="space-y-3">
                  {[
                    { href: "tel:+5524993263370", icon: FaPhone, label: "Telefone", value: "+55 24 99326-3370", action: "Ligar agora", from: "#ec4899", to: "#8b5cf6" },
                    { href: "mailto:faleconosco@consulteconline.com.br", icon: FaEnvelope, label: "E-mail", value: "faleconosco@consulteconline.com.br", action: "Enviar e-mail", from: "#8b5cf6", to: "#3b82f6" },
                    { href: "https://wa.me/5524993263370", icon: FaWhatsapp, label: "WhatsApp", value: "+55 24 99326-3370", action: "Abrir WhatsApp", from: "#22c55e", to: "#16a34a" },
                  ].map((c) => (
                    <a key={c.label} href={c.href} target={c.label === "WhatsApp" ? "_blank" : undefined} rel="noreferrer"
                      className="group flex items-center justify-between rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-0.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform"
                          style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
                          <c.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{c.label}</p>
                          <p className="text-white/45 text-xs sm:text-sm mt-0.5 truncate max-w-[200px]">{c.value}</p>
                        </div>
                      </div>
                      <FaArrowRight className="text-white/30 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>

                <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-white/35 text-xs sm:text-sm leading-relaxed">🌐 Atendimento 100% online para todo o Brasil. Presencial sob agendamento em nossa sede.</p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a href="https://wa.me/5524993263370" target="_blank" rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-white text-sm font-bold shadow-lg hover:-translate-y-0.5 hover:shadow-green-500/30 transition-all"
                    style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
                    <FaWhatsapp className="w-4 h-4" /> WhatsApp
                  </a>
                  <a href="mailto:faleconosco@consulteconline.com.br"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-white text-sm font-bold hover:-translate-y-0.5 transition-all"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <FaEnvelope className="w-4 h-4" /> Enviar e-mail
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Card Redes Sociais */}
            <Reveal direction="right" delay={100}>
              <div className="relative overflow-hidden rounded-3xl p-7 sm:p-9 h-full flex flex-col" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 rounded-t-3xl" />

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">Redes Sociais</h3>
                <div className="space-y-3">
                  {[
                    { href: "https://www.instagram.com/consultecconsultoria?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", icon: FaInstagram, label: "Instagram", value: "@consultecconsultoria", from: "#ec4899", to: "#8b5cf6" },
                    { href: "https://www.facebook.com/consultecvr/", icon: FaFacebook, label: "Facebook", value: "@consultecvr", from: "#3b82f6", to: "#1d4ed8" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                      className="group flex items-center justify-between rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-0.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform"
                          style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
                          <s.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{s.label}</p>
                          <p className="text-white/45 text-xs sm:text-sm mt-0.5">{s.value}</p>
                        </div>
                      </div>
                      <FaArrowRight className="text-white/30 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>

                {/* card de destaque */}
                <div className="mt-6 rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.15))", border: "1px solid rgba(236,72,153,0.2)" }}>
                  <p className="text-white/80 text-sm font-semibold mb-1">📣 Siga nossas redes</p>
                  <p className="text-white/40 text-xs leading-relaxed">Dicas, novidades fiscais e conteúdo exclusivo sobre gestão financeira todo dia.</p>
                </div>

                {/* botões empurrados para baixo com mt-auto */}
                <div className="mt-auto pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://www.instagram.com/consultecconsultoria?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-white text-sm font-bold shadow-lg hover:-translate-y-0.5 transition-all"
                      style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}>
                      <FaInstagram className="w-4 h-4" /> Instagram
                    </a>
                    <a href="https://www.facebook.com/consultecvr/" target="_blank" rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-white text-sm font-bold hover:-translate-y-0.5 transition-all"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                      <FaFacebook className="w-4 h-4" /> Facebook
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── LOCALIZAÇÃO + MAPA ── */}
      <section className="section-padding bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-900 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-pink-600 rounded-full mr-2" />
              Nossa Localização
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Venha nos visitar</h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Estamos prontos para receber você em nosso escritório.
            </p>
          </Reveal>
          <Reveal direction="scale">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.952453973999!2d-44.094101800000004!3d-22.505967000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9ea2a999aeb95f%3A0x607f2b93014a4efc!2sAv.%20Lucas%20Evangelista%20de%20Oliveira%20Franco%2C%20610%20-%20Aterrado%2C%20Volta%20Redonda%20-%20RJ%2C%2027215-630!5e0!3m2!1spt-BR!2sbr!4v1758046823913!5m2!1spt-BR!2sbr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── NOSSO TIME ── */}
      <section id="time" className="section-padding bg-gray-900 relative overflow-hidden">
        {/* fundo sutil */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/40 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-14 sm:mb-18">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-pink-600 rounded-full mr-2" />
              Nosso Time
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Conheça quem{" "}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">faz tudo acontecer</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">Uma equipe dedicada ao crescimento dos nossos clientes.</p>
          </Reveal>

          {/* Mobile: carrossel horizontal */}
          <div className="flex sm:hidden overflow-x-auto gap-4 snap-x snap-mandatory pb-4 -mx-4 px-4">
            {teamMembers.map((m, i) => (
              <div key={i} className="min-w-[72%] snap-center flex-shrink-0">
                <div className="team-card">
                  <div className="team-avatar w-full">
                    <div className="team-avatar-inner">
                      <Image
                        src={`/time/foto-${m.foto}.webp`}
                        alt={m.nome || `Membro ${m.foto}`}
                        fill
                        sizes="72vw"
                        className="object-cover object-top"
                      />
                      <div className="team-overlay" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-7">
            {teamMembers.map((m, i) => (
              <Reveal key={i} delay={i * 45} direction="scale">
                <div className="team-card">
                  <div className="team-avatar">
                    <div className="team-avatar-inner">
                      <Image
                        src={`/time/foto-${m.foto}.webp`}
                        alt={m.nome || `Membro ${m.foto}`}
                        fill
                        sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover object-top"
                      />
                      <div className="team-overlay" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}