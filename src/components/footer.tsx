import Image from "next/image";
import { FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
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
                  <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="https://www.facebook.com/consultecvr/" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="https://www.instagram.com/consultecconsultoria?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
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
                  <span>(24) 99326‑3370</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span>faleconosco@consulteconline.com.br</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span>Volta Redonda, RJ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm text-gray-400">
            © {new Date().getFullYear()} Consultec. Todos os direitos reservados.
          </div>
        </div>
      </footer>
  );
}