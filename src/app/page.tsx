import Image from "next/image";
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
  FaArrowRight, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Consultec" width={35} height={35}/>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Consultec
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Início</a>
            <a href="#sobre" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Sobre</a>
            <a href="#servicos" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Serviços</a>
            <a href="#diferenciais" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Diferenciais</a>
            <a href="#contato" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Contato</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors">
            <FaBars className="w-5 h-5" />
          </button>
          
          {/* Desktop CTA Button */}
          <a href="#contato" className="btn-primary hidden lg:inline-flex">
            Fale Conosco
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-slide-in-left text-center lg:text-left">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
                Contabilidade Inteligente + BPO Financeiro
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                Transforme sua
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"> contabilidade</span>
                em vantagem competitiva
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Da abertura da empresa à gestão financeira completa. A Consultec cuida da sua contabilidade e do seu fluxo de caixa para você focar no crescimento do seu negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <a href="#contato" className="btn-primary text-center text-sm sm:text-base">
                  <FaPhone className="inline mr-2" />
                  Agende uma reunião gratuita
                </a>
                <a href="#servicos" className="btn-secondary text-center text-sm sm:text-base">
                  Conheça nossos serviços
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">Obrigações fiscais em dia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">Fluxo de caixa otimizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">Relatórios gerenciais</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">Consultoria estratégica</span>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="relative z-10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop"
                    alt="Equipe analisando finanças no escritório"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
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
                Expertise técnica + Tecnologia = Resultados
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Somos uma contabilidade moderna que une <span className="font-semibold text-gray-900">expertise técnica</span> e
                <span className="font-semibold text-gray-900"> tecnologia de ponta</span> para simplificar rotinas fiscais e
                profissionalizar a gestão financeira por meio do BPO. Transparência, previsibilidade e
                decisões baseadas em dados para o seu negócio crescer de forma sustentável.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="card-shadow rounded-xl p-4 sm:p-6 bg-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <FaCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">+10 setores atendidos</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Comércio, serviços, saúde, indústria e muito mais.</p>
                </div>
                <div className="card-shadow rounded-xl p-4 sm:p-6 bg-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <FaUsers className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Atendimento consultivo</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Reuniões periódicas e relatórios gerenciais personalizados.</p>
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
                    <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-1">98%</div>
                    <div className="text-xs sm:text-sm text-gray-600">Satisfação dos clientes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="section-padding bg-gray-50">
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
              Oferecemos serviços de contabilidade e BPO financeiro integrados para empresas de todos os portes.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Contabilidade Completa',
                desc: 'Escrituração, apurações e demonstrações contábeis com tecnologia de ponta.',
                icon: FaChartLine,
                color: 'blue'
              },
              {
                title: 'Folha de Pagamento',
                desc: 'RH, pró‑labore, eSocial e obrigações trabalhistas em conformidade.',
                icon: FaUsers,
                color: 'green'
              },
              {
                title: 'Impostos e Obrigações',
                desc: 'Apurações, guias e cumprimento fiscal em dia com planejamento tributário.',
                icon: FaFileInvoiceDollar,
                color: 'purple'
              },
              {
                title: 'Abertura e Regularização',
                desc: 'Planejamento tributário, abertura, alterações e baixa de empresas.',
                icon: FaBuilding,
                color: 'orange'
              },
              {
                title: 'BPO Financeiro',
                desc: 'Contas a pagar/receber, conciliações e DRE gerencial em tempo real.',
                icon: FaMoneyBillWave,
                color: 'green'
              },
                              {
                  title: 'Consultoria Estratégica',
                  desc: 'Indicadores, metas e apoio à tomada de decisão baseada em dados.',
                  icon: FaBullseye,
                  color: 'blue'
                }
            ].map((service, index) => (
              <div key={service.title} className="card-shadow rounded-xl sm:rounded-2xl bg-white p-6 sm:p-8 hover-lift group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 group-hover:text-pink-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{service.desc}</p>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <a href="#contato" className="text-pink-600 font-medium hover:text-pink-700 transition-colors text-sm sm:text-base inline-flex items-center">
                    Saiba mais <FaArrowRight className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
              Por que escolher a Consultec?
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Nossos diferenciais
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça o que nos torna únicos no mercado de contabilidade e BPO financeiro.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[
              {
                title: 'Transparência e Previsibilidade',
                desc: 'Relatórios claros, indicadores em tempo real e reuniões de acompanhamento mensais.',
                icon: FaSearch,
                stats: '100% transparente'
              },
              {
                title: 'Tecnologia e Segurança',
                desc: 'Processos digitais, backups automáticos e controle rigoroso de acessos.',
                icon: FaShieldAlt,
                stats: '99.9% disponibilidade'
              },
              {
                title: 'Time Especialista',
                desc: 'Atendimento consultivo personalizado focado no crescimento do seu negócio.',
                icon: FaUserTie,
                stats: 'Especialistas certificados'
              }
            ].map((diferencial) => (
              <div key={diferencial.title} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <diferencial.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{diferencial.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">{diferencial.desc}</p>
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium">
                  {diferencial.stats}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#contato" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              <FaPhone className="inline mr-2" />
              Quero falar com a Consultec
            </a>
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
                Contabilidade completa + BPO financeiro para sua operação rodar redonda e com dados precisos para tomada de decisão.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="#contato" className="bg-white text-pink-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center text-sm sm:text-base">
                  <FaPhone className="inline mr-2" />
                  Entre em contato
                </a>
                <a href="#servicos" className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-700 transition-colors text-center text-sm sm:text-base">
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
      <section id="contato" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
              Entre em Contato
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Vamos conversar sobre seu negócio
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Fale com a nossa equipe e receba uma proposta personalizada em até 24h úteis.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="card-shadow rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-white">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Informações de Contato</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <FaPhone className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Telefone</p>
                    <p className="text-gray-600 text-sm sm:text-base">(21) 99999‑9999</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">E-mail</p>
                    <p className="text-gray-600 text-sm sm:text-base">contato@consultec.com.br</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FaWhatsapp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">WhatsApp</p>
                    <a href="https://wa.me/" target="_blank" className="text-pink-600 hover:text-pink-700 underline text-sm sm:text-base">
                      Clique para conversar
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Atendimento</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Atendimento 100% online para todo o Brasil. Presencial sob agendamento em nossa sede.
                </p>
              </div>
            </div>

            <div className="card-shadow rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-white">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Solicite um contato</h3>
              <form className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                    <input 
                      type="text" 
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                    <input 
                      type="email" 
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone/WhatsApp</label>
                  <input 
                    type="tel" 
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                    placeholder="(21) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sobre sua empresa</label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base"
                    placeholder="Conte um pouco sobre sua empresa, setor de atuação e principais necessidades..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full btn-primary text-base sm:text-lg py-3 sm:py-4"
                >
                  <FaEnvelope className="inline mr-2" />
                  Enviar solicitação
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Ao enviar, você concorda em ser contatado pela nossa equipe comercial.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 gradient-logo rounded-lg flex items-center justify-center">
                 <Image src="/logo.png" alt="Consultec" width={35} height={35}/>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white">Consultec</span>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
                Contabilidade inteligente e BPO Financeiro para empresas de todos os portes. 
                Transformamos dados em insights para o crescimento do seu negócio.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#inicio" className="hover:text-white transition-colors text-sm sm:text-base">Início</a></li>
                <li><a href="#sobre" className="hover:text-white transition-colors text-sm sm:text-base">Sobre</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors text-sm sm:text-base">Serviços</a></li>
                <li><a href="#diferenciais" className="hover:text-white transition-colors text-sm sm:text-base">Diferenciais</a></li>
                <li><a href="#contato" className="hover:text-white transition-colors text-sm sm:text-base">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Contato</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-center space-x-2">
                  <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span>(21) 99999‑9999</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span>contato@consultec.com.br</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span>Rio de Janeiro, RJ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm text-gray-400">
            © {new Date().getFullYear()} Consultec. Todos os direitos reservados. | 
            Desenvolvido com ❤️ para o sucesso do seu negócio.
          </div>
        </div>
      </footer>
    </div>
  );
}
