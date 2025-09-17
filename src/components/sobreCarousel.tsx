"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import { FaCheck, FaUsers } from "react-icons/fa";

const segmentos = [
  {
    titulo: "Todos os Ramos",
    descricao:
      "Atendemos empresas de todos os segmentos, oferecendo contabilidade e BPO financeiro com transparência e eficiência.",
    imagem:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop",
    cards: [
      {
        icon: FaCheck,
        titulo: "Abrangência total",
        desc: "Soluções para empresas de diferentes setores.",
        bg: "from-pink-500 to-purple-600",
      },
      {
        icon: FaUsers,
        titulo: "Atendimento consultivo",
        desc: "Relatórios e reuniões periódicas para decisões assertivas.",
        bg: "from-purple-500 to-blue-600",
      },
    ],
    cta: {
      titulo: "Avaliação gratuita",
      subtitulo: "Descubra como otimizar sua contabilidade e finanças",
    },
  },
  {
    titulo: "Profissionais da Saúde",
    descricao:
      "Somos especialistas em clínicas médicas e profissionais da saúde, oferecendo gestão financeira e contábil completa.",
    imagem:
      "https://images.unsplash.com/photo-1554774853-b415df9eeb92?q=80&w=1600&auto=format&fit=crop",
    cards: [
      {
        icon: FaCheck,
        titulo: "Especialistas em Saúde",
        desc: "Clínicas médicas, consultórios, odontologia e mais.",
        bg: "from-pink-500 to-purple-600",
      },
      {
        icon: FaUsers,
        titulo: "Atendimento consultivo",
        desc: "Relatórios personalizados para cada especialidade.",
        bg: "from-purple-500 to-blue-600",
      },
    ],
    cta: {
      titulo: "Diagnóstico contábil gratuito",
      subtitulo: "Especial para médicos e clínicas",
    },
  },
  {
    titulo: "Postos de Gasolina",
    descricao:
      "Gestão contábil e financeira especializada para postos de combustíveis, garantindo clareza em tributos e fluxo de caixa.",
    imagem:
      "https://images.unsplash.com/photo-1644246905181-c3753e9a82bd?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cards: [
      {
        icon: FaCheck,
        titulo: "Controle fiscal",
        desc: "Cumprimento das exigências do setor de combustíveis.",
        bg: "from-pink-500 to-purple-600",
      },
      {
        icon: FaUsers,
        titulo: "Fluxo de caixa",
        desc: "Acompanhamento e organização financeira sob medida.",
        bg: "from-purple-500 to-blue-600",
      },
    ],
    cta: {
      titulo: "Consultoria sem custo",
      subtitulo: "Veja como simplificar sua gestão tributária",
    },
  },
  {
    titulo: "Terceiro Setor",
    descricao:
      "Auxiliamos ONGs, associações e fundações a manterem transparência contábil e relatórios claros para prestação de contas.",
    imagem:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop",
    cards: [
      {
        icon: FaCheck,
        titulo: "Transparência",
        desc: "Contabilidade clara para prestação de contas.",
        bg: "from-pink-500 to-purple-600",
      },
      {
        icon: FaUsers,
        titulo: "Relatórios acessíveis",
        desc: "Indicadores fáceis para diretoria e associados.",
        bg: "from-purple-500 to-blue-600",
      },
    ],
    cta: {
      titulo: "Primeira reunião gratuita",
      subtitulo: "Planeje sua entidade com mais segurança",
    },
  },
  {
    titulo: "Cooperativas",
    descricao:
      "Soluções contábeis e financeiras que respeitam as particularidades das cooperativas, fortalecendo a governança.",
    imagem:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop",
    cards: [
      {
        icon: FaCheck,
        titulo: "Gestão cooperativa",
        desc: "Contabilidade pensada para cooperados.",
        bg: "from-pink-500 to-purple-600",
      },
      {
        icon: FaUsers,
        titulo: "Governança fortalecida",
        desc: "Apoio estratégico para decisões em conjunto.",
        bg: "from-purple-500 to-blue-600",
      },
    ],
    cta: {
      titulo: "Avaliação personalizada",
      subtitulo: "Atendimento exclusivo para cooperativas",
    },
  },

];

export default function SobreCarousel() {
  return (
    <section id="sobre" className="w-full bg-white flex items-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="w-full"
      >
        {segmentos.map((seg, index) => (
          <SwiperSlide key={index}>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen w-full px-4 sm:px-10">
              {/* Texto */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center px-3 py-2 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-4">
                  Sobre a Consultec
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {seg.titulo}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                  {seg.descricao}
                </p>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {seg.cards.map((card, i) => (
                    <div
                      key={i}
                      className="card-shadow rounded-xl p-4 sm:p-6 bg-white"
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${card.bg} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}
                      >
                        <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                        {card.titulo}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Imagem */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative order-1 lg:order-2"
              >
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl h-full">
                  <img
                    src={seg.imagem}
                    alt={seg.titulo}
                    className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] object-cover object-center transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-lg shadow-xl p-4 sm:p-6 ring-1 ring-pink-200">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-1">
                      {seg.cta.titulo}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {seg.cta.subtitulo}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}