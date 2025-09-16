"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
  FaSearch,
  FaShieldAlt,
  FaUserTie,
  FaEye,
  FaHandshake,
  FaArrowRight,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaFacebook,
  FaFileAlt,
  FaKey,
  FaStethoscope,
} from "react-icons/fa";
import NewsCarousel from "@/components/news";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  source_url: string;
  created_at: string;
};

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
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
  end,
  duration = 1200,
  prefix = "+",
  suffix = "",
  className = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const startVal = 0;
    const endVal = end;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      const eased = easeOutCubic(progress);
      const current = Math.round(startVal + (endVal - startVal) * eased);
      setValue(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, duration, end]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      {/* Hero Section - com imagem de fundo e overlay escuro */}
      <section
        id="inicio"
        className="relative pt-24 sm:pt-28 pb-20 sm:pb-24 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-fixed"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2400&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/10 text-white rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Contabilidade Inteligente + BPO Financeiro
            </div>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Transforme sua
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                contabilidade
              </span>{" "}
              em vantagem competitiva
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
              Da abertura da empresa à gestão financeira completa. A Consultec
              cuida da sua contabilidade e do seu fluxo de caixa para você focar
              no crescimento do seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10">
              <a
                href="#contato"
                className="btn-primary text-center text-sm sm:text-base"
              >
                <FaPhone className="inline mr-2" />
                Agende uma reunião gratuita
              </a>
              <a
                href="#servicos"
                className="btn-secondary text-center text-sm sm:text-base border-white text-white hover:text-white"
                style={{ borderColor: "rgba(255,255,255,0.85)" }}
              >
                Conheça nossos serviços
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-white/90">
                  Obrigações fiscais em dia
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-white/90">
                  Fluxo de caixa otimizado
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-white/90">
                  Relatórios gerenciais
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-white/90">
                  Consultoria estratégica
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Números */}
      <section id="numeros" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
              Nossos Números
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Confiança construída com resultados
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Anos de mercado */}
            <div
              className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border text-center hover:shadow-md transition-shadow transition-transform duration-700 will-change-transform hover:-translate-y-0.5"
              style={{ transitionDelay: "0ms" }}
            >
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                <Counter end={40} prefix="+" className="align-baseline" />{" "}
                <span className="text-xl sm:text-2xl font-bold align-top">
                  anos
                </span>
              </div>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                de experiência de mercado
              </p>
            </div>

            {/* Empreendedores atendidos */}
            <div
              className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border text-center hover:shadow-md transition-shadow transition-transform duration-700 will-change-transform hover:-translate-y-0.5"
              style={{ transitionDelay: "100ms" }}
            >
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                <Counter
                  end={75}
                  prefix="+"
                  suffix=" mil"
                  className="align-baseline"
                />
              </div>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                empreendedores atendidos
              </p>
            </div>

            {/* Empresas clientes / abertas */}
            <div
              className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border text-center hover:shadow-md transition-shadow transition-transform duration-700 will-change-transform hover:-translate-y-0.5"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                <Counter
                  end={20}
                  prefix="+"
                  suffix=" mil"
                  className="align-baseline"
                />
              </div>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                empresas clientes / abertas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="animate-fade-in-up order-2 lg:order-1">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
                Sobre a Consultec
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Especialistas em gestão da saúde / clinicas medicas + Gestão
                financeira
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Somos especialistas em atender{" "}
                <span className="font-semibold text-gray-900">
                  clínicas médicas
                </span>{" "}
                e
                <span className="font-semibold text-gray-900">
                  {" "}
                  profissionais da saúde
                </span>
                . Simplificamos rotinas fiscais, garantimos conformidade e
                fortalecemos a gestão financeira por meio do BPO. Atuamos com
                transparência, previsibilidade e informações claras, oferecendo
                segurança e eficiência para o crescimento de sua clínica ou
                empresa.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="card-shadow rounded-xl p-4 sm:p-6 bg-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <FaCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                    Especialistas em Saúde
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Clínicas médicas, consultórios, odontologia, estética e
                    mais.
                  </p>
                </div>
                <div className="card-shadow rounded-xl p-4 sm:p-6 bg-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <FaUsers className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                    Atendimento consultivo
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Reuniões periódicas e relatórios gerenciais personalizados.
                  </p>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-up order-1 lg:order-2">
              <div className="relative">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1554774853-b415df9eeb92?q=80&w=1600&auto=format&fit=crop"
                    alt="Profissional de contabilidade revisando documentos"
                    className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-1">
                      Avaliação gratuita
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Descubra como otimizar sua contabilidade e finanças
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notícias */}
      <section id="noticias" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
              Últimas notícias
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Acompanhe nossas atualizações
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Conteúdos e novidades relevantes para o seu negócio.
            </p>
          </div>

          <NewsCarousel />
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
              Nossos Serviços
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Soluções completas para seu negócio
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos serviços de contabilidade e BPO financeiro integrados
              para empresas de todos os portes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Contabilidade Completa",
                desc: "Escrituração, apurações e demonstrações contábeis.",
                icon: FaChartLine,
              },
              {
                title: "Folha de Pagamento",
                desc: "RH, pró-labore, eSocial e obrigações trabalhistas em conformidade.",
                icon: FaUsers,
              },
              {
                title: "Impostos e Obrigações",
                desc: "Apurações, guias e cumprimento fiscal em dia com planejamento tributário.",
                icon: FaFileInvoiceDollar,
              },
              {
                title: "Abertura e Regularização",
                desc: "Planejamento tributário, abertura, alterações e baixa de empresas.",
                icon: FaBuilding,
              },
              {
                title: "BPO Financeiro",
                desc: "Contas a pagar/receber, conciliações e DRE gerencial em tempo real.",
                icon: FaMoneyBillWave,
              },
              {
                title: "Consultoria Estratégica",
                desc: "Indicadores, metas e apoio à tomada de decisão baseada em dados.",
                icon: FaBullseye,
              },
              {
                title: "Imposto de Renda PF",
                desc: "Declarações completas, revisão de pendências e otimização tributária.",
                icon: FaFileAlt, // ícone de documento
              },
              {
                title: "Gestão Receita Saúde",
                desc: "Emissão, conciliação e regularização de receitas médicas junto ao SNGPC.",
                icon: FaStethoscope, // ícone ligado à saúde
              },
              {
                title: "Certificados Digitais",
                desc: "Emissão e renovação de e-CPF e e-CNPJ com segurança e praticidade.",
                icon: FaKey, // ícone de chave
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className="card-shadow rounded-xl sm:rounded-2xl bg-white p-6 sm:p-8 hover-lift group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 group-hover:text-pink-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {service.desc}
                </p>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <a
                    href="#contato"
                    className="text-pink-600 font-medium hover:text-pink-700 transition-colors text-sm sm:text-base inline-flex items-center"
                  >
                    Saiba mais <FaArrowRight className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section
        id="diferenciais"
        className="section-padding relative bg-gray-50"
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.15] " />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-pink-100/80 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm ring-1 ring-pink-200">
              <span className="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
              Nossa essência
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Missão, Visão e Valores
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              O que nos move no dia a dia e para onde estamos indo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Missão */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
              <div className="mx-auto mb-5 sm:mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white shadow-md ring-4 ring-white">
                <FaBullseye className="h-8 w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center justify-center after:ml-3 after:h-px after:flex-1 after:bg-gray-200 before:mr-3 before:h-px before:flex-1 before:bg-gray-200">
                Missão
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Ajudar profissionais de saúde e empreendedores a crescer com
                segurança, oferecendo contabilidade estratégica e BPO financeiro
                que transformam números em decisões inteligentes.
              </p>
            </div>

            {/* Visão */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
              <div className="mx-auto mb-5 sm:mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white shadow-md ring-4 ring-white">
                <FaEye className="h-8 w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center justify-center after:ml-3 after:h-px after:flex-1 after:bg-gray-200 before:mr-3 before:h-px before:flex-1 before:bg-gray-200">
                Visão
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Fornecer informações financeiras e patrimoniais precisas e
                completas para auxiliar na tomada de decisões, tanto internas
                quanto externas com intuito de maximizar o resultado da empresa.
              </p>
            </div>

            {/* Valores */}
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
              <div className="mx-auto mb-5 sm:mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white shadow-md ring-4 ring-white">
                <FaHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center justify-center after:ml-3 after:h-px after:flex-1 after:bg-gray-200 before:mr-3 before:h-px before:flex-1 before:bg-gray-200">
                Visão
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                <span className="font-bold">Transparencia: </span>relações
                claras e dados acessíveis.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                <span className="font-bold">Excelência: </span>rigor técnico e
                melhoria contínua.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                <span className="font-bold">Parceria: </span>proximidade e
                compromisso com resultados.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                <span className="font-bold">Segurança: </span>cuidado com
                informações e conformidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Foque em crescer. Nós cuidamos do restante.
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-pink-100 mb-6 sm:mb-8 leading-relaxed">
                Contabilidade completa + BPO financeiro para sua operação rodar
                redonda e com dados precisos para tomada de decisão.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#contato"
                  className="bg-white text-pink-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center text-sm sm:text-base"
                >
                  <FaPhone className="inline mr-2" />
                  Entre em contato
                </a>
                <a
                  href="#servicos"
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-700 transition-colors text-center text-sm sm:text-base"
                >
                  Ver todos os serviços
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
                  alt="Equipe trabalhando com gráficos e indicadores"
                  className="w-full h-[300px] sm:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="section-padding relative bg-gray-50">
        {/* subtle background accents */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.12] bg-[radial-gradient(45rem_30rem_at_20%_0%,#ec4899,transparent),radial-gradient(35rem_25rem_at_100%_100%,#3b82f6,transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm ring-1 ring-purple-200">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
              Entre em Contato
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Vamos conversar sobre seu negócio
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Fale com a nossa equipe e receba uma proposta personalizada em até
              24h úteis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-lg">
              {/* gradient top bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />

              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">
                Informações de Contato
              </h3>

              <div className="space-y-5 sm:space-y-6">
                {/* Telefone */}
                <a
                  href="tel:+5524993263370"
                  className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 sm:p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center ring-4 ring-white shadow">
                      <FaPhone className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        Telefone
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        +55 24 99326-3370
                      </p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ligar agora
                  </span>
                </a>

                {/* E-mail */}
                <a
                  href="mailto:faleconosco@consulteconline.com.br"
                  className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 sm:p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center ring-4 ring-white shadow">
                      <FaEnvelope className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        E-mail
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        faleconosco@consulteconline.com.br
                      </p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Enviar e-mail
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/5524993263370"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 sm:p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center ring-4 ring-white shadow">
                      <FaWhatsapp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        WhatsApp
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        +55 24 99326-3370
                      </p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Abrir WhatsApp
                  </span>
                </a>
              </div>

              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                  Atendimento
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Atendimento 100% online para todo o Brasil. Presencial sob
                  agendamento em nossa sede.
                </p>
              </div>

              {/* Quick actions */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="https://wa.me/5524993263370"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 px-5 py-3 text-white text-sm sm:text-base font-semibold shadow hover:opacity-95"
                >
                  <FaWhatsapp className="mr-2" /> WhatsApp
                </a>
                <a
                  href="mailto:faleconosco@consulteconline.com.br"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 px-5 py-3 text-sm sm:text-base font-semibold hover:bg-gray-50"
                >
                  <FaEnvelope className="mr-2" /> Enviar e-mail
                </a>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-lg">
              {/* gradient top bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />

              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">
                Redes Sociais
              </h3>

              <div className="space-y-5 sm:space-y-6">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/consultecconsultoria?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 sm:p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center ring-4 ring-white shadow">
                      <FaInstagram className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        Instagram
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        @consultecconsultoria
                      </p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver perfil
                  </span>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/consultecvr/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 sm:p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center ring-4 ring-white shadow">
                      <FaFacebook className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        Facebook
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        @consultecvr
                      </p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Acessar página
                  </span>
                </a>
              </div>

              <div className="mt-8 sm:mt-38 pt-6 sm:pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                  Conecte-se conosco
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Acompanhe novidades, conteúdos e dicas nas nossas redes
                  sociais.
                </p>
              </div>

              {/* Quick actions */}
              <div className="mt-6 sm:mt-13 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="https://www.instagram.com/consultecconsultoria?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 px-5 py-3 text-white text-sm sm:text-base font-semibold shadow hover:opacity-95"
                >
                  <FaInstagram className="mr-2" /> Instagram
                </a>
                <a
                  href="https://www.facebook.com/consultecvr/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 px-5 py-3 text-sm sm:text-base font-semibold hover:bg-gray-50"
                >
                  <FaFacebook className="mr-2" /> Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
     <section className="section-padding bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-pink-600 rounded-full mr-2 "></span>
              Nossa Localização
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white sm:mb-6">
              Venha nos visitar
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
              Estamos prontos para receber você em nosso escritório. Confira
              abaixo nossa localização no mapa e a fachada do espaço.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Google Maps */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.952453973999!2d-44.094101800000004!3d-22.505967000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9ea2a999aeb95f%3A0x607f2b93014a4efc!2sAv.%20Lucas%20Evangelista%20de%20Oliveira%20Franco%2C%20610%20-%20Aterrado%2C%20Volta%20Redonda%20-%20RJ%2C%2027215-630!5e0!3m2!1spt-BR!2sbr!4v1758046823913!5m2!1spt-BR!2sbr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Foto da fachada */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg"
                alt="Fachada do escritório Consultec"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
