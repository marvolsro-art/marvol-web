import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <a href="tel:+421948123456" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-semibold text-white">Infolinka & Servis:</span> +421 948 123 456
            </a>
            <a href="mailto:info@marvol.sk" className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@marvol.sk</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Dotácie Zelená solidarita & Zelená podnikom otvorené
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl py-3 border-b border-slate-800' : 'bg-slate-900/80 backdrop-blur-sm py-4 border-b border-slate-800/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logos/logo%20marvol.svg"
              alt="Marvol s.r.o. Logo"
              className="h-11 w-auto max-w-[180px] object-contain group-hover:scale-105 transition-transform filter brightness-110 drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <a href="#fotovoltika" className="text-slate-200 hover:text-amber-400 transition-colors">
              Fotovoltika
            </a>
            <a href="#target-groups" className="text-slate-200 hover:text-amber-400 transition-colors">
              Pre koho
            </a>
            <a href="#sluzby" className="text-slate-200 hover:text-amber-400 transition-colors">
              Služby
            </a>
            <a href="#kalkulacka" className="text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1">
              <span>Kalkulačka úspory</span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Nové</span>
            </a>
            <a href="#referencie" className="text-slate-200 hover:text-amber-400 transition-colors">
              Referencie
            </a>
            <a href="#faq" className="text-slate-200 hover:text-amber-400 transition-colors">
              FAQ
            </a>
            <a href="#kontakt" className="text-slate-200 hover:text-amber-400 transition-colors">
              Kontakt
            </a>
          </div>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#kalkulacka"
              className="relative group overflow-hidden rounded-xl px-5 py-2.5 font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_auto] hover:bg-[position:100%_0] transition-all duration-300 shadow-lg shadow-amber-500/25 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Nezáväzný návrh zdarma
              </span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 mt-3">
            <a
              href="#fotovoltika"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400"
            >
              Fotovoltika
            </a>
            <a
              href="#target-groups"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400"
            >
              Pre kategórie (Dom / Firma / Obec)
            </a>
            <a
              href="#sluzby"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400"
            >
              Všetky služby
            </a>
            <a
              href="#kalkulacka"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-amber-400 hover:bg-slate-800"
            >
              ⚡ Kalkulačka úspory
            </a>
            <a
              href="#referencie"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400"
            >
              Referencie
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400"
            >
              Často kladené otázky
            </a>
            <a
              href="#kontakt"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400"
            >
              Kontakt
            </a>
            <div className="pt-2">
              <a
                href="#kalkulacka"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center rounded-xl py-3 px-4 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md"
              >
                Nezáväzný návrh ZDARMA
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
