import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CookieIcon, ShieldIcon, CheckIcon } from '@/components/icons';

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'marvol_cookie_consent';

export const CookieConsent: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Preference state
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CookiePreferences = JSON.parse(stored);
        setAnalytics(Boolean(parsed.analytics));
        setMarketing(Boolean(parsed.marketing));
        setIsOpen(false);
      } else {
        // No consent recorded yet -> open banner
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }

    const handleOpen = () => {
      setIsOpen(true);
      setShowDetails(true);
    };

    window.addEventListener('openCookieSettings', handleOpen);
    return () => window.removeEventListener('openCookieSettings', handleOpen);
  }, []);

  const savePreferences = (allowAnalytics: boolean, allowMarketing: boolean) => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: allowAnalytics,
      marketing: allowMarketing,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      window.dispatchEvent(
        new CustomEvent('marvolCookieConsentUpdated', { detail: preferences })
      );
    } catch (e) {
      console.warn('Nepodarilo sa uložiť nastavenia cookies do localStorage', e);
    }

    setAnalytics(allowAnalytics);
    setMarketing(allowMarketing);
    setIsOpen(false);
    setShowDetails(false);
  };

  const handleAcceptAll = () => {
    savePreferences(true, true);
  };

  const handleRejectOptional = () => {
    savePreferences(false, false);
  };

  const handleSaveCustom = () => {
    savePreferences(analytics, marketing);
  };

  if (!mounted) return null;

  return (
    <>
      {/* 1. Persistent Floating Re-open Button (Visible when banner is closed) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setShowDetails(true);
            setIsOpen(true);
          }}
          className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 p-2.5 sm:px-3 sm:py-2 rounded-full bg-slate-900/95 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group"
          title="Upraviť nastavenia cookies"
          aria-label="Nastavenia cookies"
        >
          <div className="w-5 h-5 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform">
            <CookieIcon className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline">Cookies</span>
        </button>
      )}

      {/* 2. Main Cookie Consent Dialog / Banner */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md md:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="bg-slate-900/98 border border-slate-700/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/80 backdrop-blur-2xl text-left text-slate-200">
            
            {/* Header */}
            <div className="flex items-start gap-3.5 mb-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <CookieIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 id="cookie-banner-title" className="text-sm sm:text-base font-black text-white">
                  Nastavenia súborov cookies
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Používame nevyhnutné súbory cookies na zabezpečenie funkčnosti webu a s vaším súhlasom aj analytické cookies pre zlepšenie našich služieb.
                </p>
              </div>
            </div>

            {/* Detailed Toggles (When expanded) */}
            {showDetails && (
              <div className="space-y-3 pt-3 pb-2 border-t border-slate-800 text-xs">
                
                {/* 1. Necessary (Always on) */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <ShieldIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Nevyhnutné cookies</span>
                      <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-extrabold ml-1 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        Vždy aktívne
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Potrebné pre bezpečný chod webu, kalkulačky a ukladanie preferencií.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    aria-label="Nevyhnutné cookies sú vždy aktívne"
                    className="w-4 h-4 rounded text-amber-400 bg-slate-800 border-slate-700 opacity-60 cursor-not-allowed"
                  />
                </div>

                {/* 2. Analytics */}
                <label className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">Analytické cookies</span>
                    <p className="text-[11px] text-slate-400">
                      Anonymné štatistiky návštevnosti pre optimalizáciu rýchlosti a obsahu webu.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400 bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </label>

                {/* 3. Marketing */}
                <label className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">Marketingové cookies</span>
                    <p className="text-[11px] text-slate-400">
                      Umožňujú zobrazenie relevantných energetických kalkulácií a ponúk.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400 bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </label>

                <div className="text-[11px] text-slate-400 pt-1">
                  Viac informácií nájdete v{' '}
                  <Link
                    href="/ochrana-osobnych-udajov"
                    className="text-amber-400 hover:underline font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Zásadách ochrany osobných údajov
                  </Link>.
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              
              {!showDetails ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShowDetails(true)}
                    className="text-xs text-slate-400 hover:text-white font-semibold underline underline-offset-4 py-2 px-1 text-center sm:text-left cursor-pointer"
                  >
                    Prispôsobiť nastavenia
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRejectOptional}
                      className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Iba nevyhnutné
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-colors shadow-lg shadow-amber-400/20 cursor-pointer"
                    >
                      Prijať všetky
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDetails(false)}
                    className="text-xs text-slate-400 hover:text-white font-semibold py-2 px-2 cursor-pointer"
                  >
                    Späť
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveCustom}
                      className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Uložiť výber
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-colors shadow-lg shadow-amber-400/20 cursor-pointer"
                    >
                      Prijať všetky
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
