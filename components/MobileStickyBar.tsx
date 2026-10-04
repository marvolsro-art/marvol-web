import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { COMPANY_DETAILS } from '@/constants/company';

export const MobileStickyBar: React.FC = () => {
  const router = useRouter();

  // If on minimalist test-2 page, it already renders its own custom configurator bar
  if (router.pathname === '/test-2') {
    return null;
  }

  // Determine the primary CTA button label and target based on active page
  let ctaHref = '#dopyt';
  let ctaLabel = '⚡ Získať návrh';

  if (router.pathname === '/') {
    ctaHref = '#kalkulacka';
    ctaLabel = '⚡ Kalkulačka úspory';
  } else if (router.pathname === '/eshop') {
    ctaHref = '#katalog';
    ctaLabel = '🛒 Katalóg dielov';
  } else if (router.pathname === '/kontakt') {
    ctaHref = '#dopyt';
    ctaLabel = '📝 Odoslať dopyt';
  }

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaHref.startsWith('#')) {
      const id = ctaHref.slice(1);
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside
      aria-label="Rýchly mobilný kontakt a dopyt"
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-3.5 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between gap-2.5 sm:hidden shadow-[0_-10px_25px_rgba(0,0,0,0.5)]"
    >
      {/* 1. Quick Direct Call Button */}
      <a
        href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
        className="flex-1 py-3 px-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform min-h-[48px] shadow-sm"
        aria-label={`Zavolať do spoločnosti Marvol: ${COMPANY_DETAILS.contact.phone}`}
      >
        <svg
          className="w-4 h-4 text-emerald-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span className="truncate">Zavolať</span>
      </a>

      {/* 2. Action / Calculator / Inquiry Button */}
      <Link
        href={ctaHref}
        onClick={handleCtaClick}
        className="flex-[1.3] py-3 px-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25 active:scale-95 transition-transform min-h-[48px] text-center"
      >
        <span className="truncate">{ctaLabel}</span>
      </Link>
    </aside>
  );
};

export default MobileStickyBar;
