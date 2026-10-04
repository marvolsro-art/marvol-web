import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface NavDropdownItem {
  title: string;
  subtitle: string;
  href: string;
  badge?: string;
  badgeColor?: 'emerald' | 'sky' | 'amber' | 'purple';
  icon: 'home' | 'building' | 'battery' | 'blueprint' | 'wrench' | 'chat' | 'shield' | 'document';
}

export const FOTOVOLTIKA_ITEMS: NavDropdownItem[] = [
  {
    title: 'Pre domácnosti',
    subtitle: 'Rodinné domy, úspora až 80% & dotácia SIEA do 1 150 € (TČ do 4 600 €)',
    href: '/fotovoltika-pre-domacnosti',
    badge: 'Dotácia SIEA',
    badgeColor: 'emerald',
    icon: 'home',
  },
  {
    title: 'Pre firmy & priemysel',
    subtitle: 'Komerčné FVE, ochrana pred volatilitou & Zelená podnikom',
    href: '/fotovoltika-pre-firmy',
    badge: 'B2B riešenia',
    badgeColor: 'sky',
    icon: 'building',
  },
  {
    title: 'Batériové úložiská BESS & EV Wallboxy',
    subtitle: 'LiFePO4 úložiská, UPS záloha & inteligentné solárne nabíjanie',
    href: '/bateriove-uloziska-bess',
    badge: 'Sebestačnosť',
    badgeColor: 'purple',
    icon: 'battery',
  },
];

export const SLUZBY_ITEMS: NavDropdownItem[] = [
  {
    title: 'Návrh projektu & Projektovanie',
    subtitle: '3D analýza tienenia, autorizovaný projekt & prepočet návratnosti',
    href: '/sluzby/navrh-projektu',
    badge: 'Inžiniering',
    badgeColor: 'sky',
    icon: 'blueprint',
  },
  {
    title: 'Montáž a inštalácia na kľúč',
    subtitle: 'Certifikovaná inštalácia panelov, striedačov & zapojenie do rozvádzača',
    href: '/sluzby/instalacia-montaz',
    badge: 'Na kľúč',
    badgeColor: 'amber',
    icon: 'wrench',
  },
  {
    title: 'Konzultácie a energetické poradenstvo',
    subtitle: 'Odborné posúdenie spotreby, optimalizácia taríf & nezávislý audit',
    href: '/sluzby/konzultacie-poradenstvo',
    badge: 'Bezplatne',
    badgeColor: 'emerald',
    icon: 'chat',
  },
  {
    title: 'Protipožiarna ochrana & Bezpečné napätie',
    subtitle: 'Rapid Shutdown, AFDD ochrana pred oblúkom, safe DC <120V & STN normy',
    href: '/sluzby/protipoziarna-ochrana-bezpecne-napatie',
    badge: 'Bezpečnosť STN',
    badgeColor: 'purple',
    icon: 'shield',
  },
  {
    title: 'Revízie, servis & Dotácie SIEA',
    subtitle: 'Východiskové OPOS revízie, záručný servis & rezervácia dotácií SIEA',
    href: '/sluzby/revizie-dotacie',
    badge: 'Úradné revízie',
    badgeColor: 'emerald',
    icon: 'document',
  },
];

export const Header: React.FC = () => {
  const router = useRouter();
  const isHome = router.pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown state supporting backward-compatible 'riesenia' alias for tests
  const [activeDropdown, setActiveDropdown] = useState<'riesenia' | 'sluzby' | null>(null);

  // Mobile drawer accordion toggle states
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active route detection for desktop navigation highlighting
  const isFotovoltikaActive = [
    '/fotovoltika-pre-domacnosti',
    '/fotovoltika-pre-firmy',
    '/bateriove-uloziska-bess',
  ].includes(router.pathname);

  const isSluzbyActive =
    router.pathname.startsWith('/sluzby') ||
    ['/tepelne-cerpadla', '/elektroinstalacie-revizie'].includes(router.pathname);

  const isEshopActive = router.pathname === '/eshop';
  const isKontaktActive = router.pathname === '/kontakt';

  // Scroll detection for navbar background styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Route change listener to auto-close drawer and dropdowns
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    };
    if (router.events) {
      router.events.on('routeChangeStart', handleRouteChange);
      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
      };
    }
  }, [router]);

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Keyboard accessibility: Escape key closes menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener to dismiss desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Desktop Hover Bridge handlers (180ms delay to prevent flicker)
  const handleMouseEnter = (menu: 'riesenia' | 'sluzby') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Route-aware helper for hash links
  const getHashHref = (hash: string) => {
    return isHome ? hash : `/${hash}`;
  };

  // Smooth scroll handler for anchor links when on homepage
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHome && hash.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', hash);
      }
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Helper for badge styles
  const getBadgeClasses = (color?: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'sky':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'purple':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600/30';
    }
  };

  // Render SVG icons with 24x24 viewBox
  const renderIcon = (icon: NavDropdownItem['icon']) => {
    switch (icon) {
      case 'home':
        return (
          <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'building':
        return (
          <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'battery':
        return (
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'blueprint':
        return (
          <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'wrench':
        return (
          <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        );
      case 'chat':
        return (
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <a
              href="tel:+421948123456"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors min-h-[48px] sm:min-h-0"
            >
              <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-semibold text-white">Infolinka &amp; Servis:</span> +421 948 123 456
            </a>
            <a
              href="mailto:info@marvol.sk"
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors min-h-[48px] sm:min-h-0"
            >
              <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@marvol.sk</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Dotácie Zelená solidarita &amp; Zelená podnikom otvorené
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-xl py-3 border-b border-slate-800'
            : 'bg-slate-900/80 backdrop-blur-sm py-4 border-b border-slate-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logos/logo-marvol.svg"
              alt="Marvol s.r.o. Logo"
              className="h-11 sm:h-12 w-auto max-w-[190px] object-contain group-hover:scale-105 transition-transform drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-sm font-medium">
            {/* 1. "Fotovoltika" Hover Dropdown (Backward-compatible test alias: riesenia / dropdown-riesenia) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('riesenia')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'riesenia' ? null : 'riesenia')}
                className={`flex items-center gap-1.5 py-2 transition-colors font-medium text-sm focus:outline-none cursor-pointer ${
                  isFotovoltikaActive ? 'text-amber-400 font-bold' : 'text-slate-200 hover:text-amber-400'
                }`}
                aria-expanded={activeDropdown === 'riesenia'}
                aria-haspopup="true"
                aria-controls="dropdown-riesenia"
                data-testid="dropdown-fotovoltika"
              >
                <span>Fotovoltika</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'riesenia' ? 'rotate-180 text-amber-400' : 'text-slate-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Flyout Menu Container with 8px Hover Bridge */}
              <div
                id="dropdown-riesenia"
                className={`absolute top-full left-0 pt-2 w-[400px] transition-all duration-200 ease-out z-50 ${
                  activeDropdown === 'riesenia'
                    ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                    : 'opacity-0 invisible translate-y-2 pointer-events-none'
                }`}
                role="menu"
                aria-orientation="vertical"
              >
                <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-2.5 shadow-2xl shadow-black/80 space-y-1">
                  {FOTOVOLTIKA_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-800/80 transition-all duration-150"
                      role="menuitem"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-amber-400/40 group-hover:bg-slate-800 transition-all">
                        {renderIcon(item.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${getBadgeClasses(
                                item.badgeColor
                              )}`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 group-hover:text-slate-300">
                          {item.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* Quick sector reference: Samosprávy */}
                  <div className="mt-2 pt-2 border-t border-slate-800/80 px-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Riešenia pre verejný sektor:</span>
                    <Link
                      href={isHome ? '#target-groups' : '/#target-groups'}
                      onClick={(e) => {
                        if (isHome) handleNavClick(e, '#target-groups');
                        else setActiveDropdown(null);
                      }}
                      className="text-amber-400 hover:text-amber-300 transition-colors font-medium flex items-center gap-1"
                      role="menuitem"
                    >
                      <span>Obce a samosprávy</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. "Služby" Hover Dropdown (5 specialized subpages + tech links) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('sluzby')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'sluzby' ? null : 'sluzby')}
                className={`flex items-center gap-1.5 py-2 transition-colors font-medium text-sm focus:outline-none cursor-pointer ${
                  isSluzbyActive ? 'text-amber-400 font-bold' : 'text-slate-200 hover:text-amber-400'
                }`}
                aria-expanded={activeDropdown === 'sluzby'}
                aria-haspopup="true"
                aria-controls="dropdown-sluzby"
              >
                <span>Služby</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'sluzby' ? 'rotate-180 text-amber-400' : 'text-slate-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Flyout Menu Container with 8px Hover Bridge */}
              <div
                id="dropdown-sluzby"
                className={`absolute top-full left-0 pt-2 w-[420px] transition-all duration-200 ease-out z-50 ${
                  activeDropdown === 'sluzby'
                    ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                    : 'opacity-0 invisible translate-y-2 pointer-events-none'
                }`}
                role="menu"
                aria-orientation="vertical"
              >
                <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-2.5 shadow-2xl shadow-black/80 space-y-1">
                  {SLUZBY_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-800/80 transition-all duration-150"
                      role="menuitem"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-amber-400/40 group-hover:bg-slate-800 transition-all">
                        {renderIcon(item.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${getBadgeClasses(
                                item.badgeColor
                              )}`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 group-hover:text-slate-300">
                          {item.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* Preserved auxiliary service destinations for full multi-sphere compatibility */}
                  <div className="mt-2 pt-2 border-t border-slate-800/80 px-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Ďalšie technológie:</span>
                    <div className="flex items-center gap-3">
                      <Link
                        href="/tepelne-cerpadla"
                        onClick={() => setActiveDropdown(null)}
                        className="hover:text-amber-400 transition-colors"
                        role="menuitem"
                      >
                        Tepelné čerpadlá
                      </Link>
                      <span>•</span>
                      <Link
                        href="/elektroinstalacie-revizie"
                        onClick={() => setActiveDropdown(null)}
                        className="hover:text-amber-400 transition-colors"
                        role="menuitem"
                      >
                        Elektroinštalácie
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. E-shop Link */}
            <Link
              href="/eshop"
              className={`transition-colors flex items-center gap-1.5 font-medium text-sm ${
                isEshopActive ? 'text-amber-400 font-bold' : 'text-slate-200 hover:text-amber-400'
              }`}
            >
              <span>E-shop</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                B2B &amp; B2C
              </span>
            </Link>

            {/* 4. Kalkulačka úspory */}
            <Link
              href={getHashHref('#kalkulacka')}
              onClick={(e) => handleNavClick(e, '#kalkulacka')}
              className="text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1.5 font-medium text-sm"
            >
              <span>Kalkulačka úspory</span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                Nové
              </span>
            </Link>

            {/* 5. Kontakt */}
            <Link
              href="/kontakt"
              className={`transition-colors font-medium text-sm ${
                isKontaktActive ? 'text-amber-400 font-bold' : 'text-slate-200 hover:text-amber-400'
              }`}
            >
              Kontakt
            </Link>
          </div>

          {/* Header Action Button (Desktop CTA) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={getHashHref('#kalkulacka')}
              onClick={(e) => handleNavClick(e, '#kalkulacka')}
              className="relative group overflow-hidden rounded-xl px-5 py-2.5 font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_auto] hover:bg-[position:100%_0] transition-all duration-300 shadow-lg shadow-amber-500/25 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Nezáväzný návrh zdarma</span>
            </Link>
          </div>

          {/* Mobile menu trigger hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none min-h-[44px] min-w-[44px] min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer"
            aria-label="Otvoriť navigáciu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Over Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-Over Drawer Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobilné navigačné menu"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
            <img
              src="/logos/logo-marvol.svg"
              alt="Marvol s.r.o. Logo"
              className="h-9 w-auto max-w-[160px] object-contain drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 min-h-[44px] min-w-[44px] min-h-[48px] min-w-[48px] flex items-center justify-center focus:outline-none cursor-pointer"
            aria-label="Zatvoriť navigáciu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Body (Scrollable with strict >= 48px touch targets) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {/* Accordion 1: Fotovoltika (Riešenia) */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
            <button
              type="button"
              onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-white hover:text-amber-400 focus:outline-none min-h-[48px] cursor-pointer"
              aria-expanded={mobileSolutionsOpen}
            >
              <span className="flex items-center gap-2">
                <span className="text-amber-400">☀️</span>
                <span>Fotovoltika</span>
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  mobileSolutionsOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileSolutionsOpen && (
              <div className="px-3 pb-3 space-y-1.5 border-t border-slate-800/60 pt-2.5">
                {FOTOVOLTIKA_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors min-h-[44px]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white">{item.title}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${getBadgeClasses(
                            item.badgeColor
                          )}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.subtitle}</div>
                  </Link>
                ))}
                <div className="pt-1.5 px-1 border-t border-slate-800/40">
                  <Link
                    href={isHome ? '#target-groups' : '/#target-groups'}
                    onClick={(e) => {
                      if (isHome) handleNavClick(e, '#target-groups');
                      else setMobileMenuOpen(false);
                    }}
                    className="block p-2 rounded-lg text-xs font-medium text-amber-400/90 hover:text-amber-300 transition-colors"
                  >
                    🏛️ Pre obce a verejný sektor →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Služby */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-white hover:text-amber-400 focus:outline-none min-h-[48px] cursor-pointer"
              aria-expanded={mobileServicesOpen}
            >
              <span className="flex items-center gap-2">
                <span className="text-amber-400">⚙️</span>
                <span>Odborné služby</span>
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  mobileServicesOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="px-3 pb-3 space-y-1.5 border-t border-slate-800/60 pt-2.5">
                {SLUZBY_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors min-h-[44px]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white">{item.title}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${getBadgeClasses(
                            item.badgeColor
                          )}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.subtitle}</div>
                  </Link>
                ))}
                <div className="pt-2 px-1 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/40">
                  <Link
                    href="/tepelne-cerpadla"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-amber-400 transition-colors py-2"
                  >
                    Tepelné čerpadlá
                  </Link>
                  <span>•</span>
                  <Link
                    href="/elektroinstalacie-revizie"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-amber-400 transition-colors py-2"
                  >
                    Elektroinštalácie &amp; Revízie
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Standalone Direct Link 1: E-shop */}
          <Link
            href="/eshop"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors min-h-[44px] min-h-[48px]"
          >
            <span className="flex items-center gap-2.5">
              <span>🛒</span>
              <span>E-shop komponentov</span>
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
              B2B &amp; B2C
            </span>
          </Link>

          {/* Standalone Direct Link 2: Kalkulačka úspory */}
          <Link
            href={getHashHref('#kalkulacka')}
            onClick={(e) => handleNavClick(e, '#kalkulacka')}
            className="flex items-center justify-between p-3.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors min-h-[44px] min-h-[48px]"
          >
            <span className="flex items-center gap-2.5">
              <span>⚡</span>
              <span>Kalkulačka úspory</span>
            </span>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
              Nové
            </span>
          </Link>

          {/* Standalone Direct Link 3: Kontakt */}
          <Link
            href="/kontakt"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center p-3.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors min-h-[44px] min-h-[48px]"
          >
            <span className="flex items-center gap-2.5">
              <span>📍</span>
              <span>Kontakt &amp; Sídlo spoločnosti</span>
            </span>
          </Link>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3">
          <Link
            href={getHashHref('#kalkulacka')}
            onClick={(e) => handleNavClick(e, '#kalkulacka')}
            className="w-full text-center py-3.5 px-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 shadow-xl shadow-amber-500/20 min-h-[48px] flex items-center justify-center active:scale-[0.98] transition-transform cursor-pointer"
          >
            Nezáväzný návrh ZDARMA
          </Link>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-1">
            <a
              href="tel:+421948123456"
              className="text-amber-400 font-bold hover:underline flex items-center gap-1.5 min-h-[44px] min-h-[48px]"
            >
              <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>+421 948 123 456</span>
            </a>
            <a href="mailto:info@marvol.sk" className="hover:text-white flex items-center gap-1.5 min-h-[44px] min-h-[48px]">
              <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>info@marvol.sk</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
