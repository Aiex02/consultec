'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (mobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileOpen]);

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 50) {
        // scrolling down
        setVisible(false);
      } else {
        // scrolling up
        setVisible(true);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${visible ? 'translate-y-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Consultec" width={35} height={35} />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Consultec
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/#inicio"
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              Início
            </Link>
            <Link
              href="/#sobre"
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              Sobre
            </Link>
            <Link
              href="/#servicos"
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              Serviços
            </Link>
            <Link
              href="/#diferenciais"
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              Diferenciais
            </Link>
            <Link
              href="/#contato"
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              Contato
            </Link>
            <Link
              href="/agenda-tributaria"
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              Agenda Tributária
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
          >
            {mobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>

          {/* Desktop CTA Button */}
          <Link
            href="https://econtador.alterdata.com.br"
            className="btn-primary hidden lg:inline-flex"
          >
            Área do cliente
          </Link>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          aria-hidden={!mobileOpen}
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        />
        {/* Panel */}
        <nav
          className={`fixed top-[64px] left-0 right-0 z-50 mx-4 rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 overflow-hidden transition-all duration-300 ease-out ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}`}
        >
          <ul className="divide-y divide-gray-100">
            {[
              { href: '/#inicio', label: 'Início' },
              { href: '/#sobre', label: 'Sobre' },
              { href: '/#servicos', label: 'Serviços' },
              { href: '/#diferenciais', label: 'Diferenciais' },
              { href: '/#contato', label: 'Contato' },
              { href: '/agenda-tributaria', label: 'Agenda Tributária' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-5 py-4 text-gray-700 font-medium hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4">
            <a
              href="https://econtador.alterdata.com.br"
              className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 px-5 py-3 text-white font-semibold shadow hover:opacity-95"
              onClick={() => setMobileOpen(false)}
            >
              Área do cliente
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
