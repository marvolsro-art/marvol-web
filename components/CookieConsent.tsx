import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CookieIcon, ShieldIcon, CheckIcon } from '@/components/icons';
import { updateGtagConsent } from '@/lib/gtag';

export interface CookiePreferences {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  consentId: string;
  version: string;
  updatedAt: string;
}

export interface CookieDeclaration {
  name: string;
  provider: string;
  category: 'necessary' | 'preferences' | 'analytics' | 'marketing';
  categoryLabel: string;
  purpose: string;
  duration: string;
  type: 'Local Storage' | 'HTTP Cookie';
}

export const COOKIE_DECLARATIONS: CookieDeclaration[] = [
  {
    name: 'marvol_cookie_consent',
    provider: 'Marvol s.r.o. (marvol.sk)',
    category: 'necessary',
    categoryLabel: 'Nevyhnutné',
    purpose: 'Ukladá stav a voľbu súhlasu používateľa so súbormi cookies podľa GDPR a Zákona o elektronických komunikáciách.',
    duration: '12 mesiacov',
    type: 'Local Storage',
  },
  {
    name: 'marvol_calc_state',
    provider: 'Marvol s.r.o. (marvol.sk)',
    category: 'preferences',
    categoryLabel: 'Preferenčné',
    purpose: 'Uchováva navolené parametre vo fotovoltickej kalkulačke pri prechádzaní podstránkami.',
    duration: 'Relácia (Session)',
    type: 'Local Storage',
  },
  {
    name: '_ga',
    provider: 'Google LLC (Google Analytics 4)',
    category: 'analytics',
    categoryLabel: 'Analytické',
    purpose: 'Rozlíšenie jedinečných používateľov a anonymných relácií pre štatistiky návštevnosti webu.',
    duration: '2 roky',
    type: 'HTTP Cookie',
  },
  {
    name: '_ga_YH051CYNV3',
    provider: 'Google LLC (Google Analytics 4)',
    category: 'analytics',
    categoryLabel: 'Analytické',
    purpose: 'Udržiava stav a reláciu návštevníka pre anonymné meranie stability a rýchlosti webu.',
    duration: '2 roky',
    type: 'HTTP Cookie',
  },
  {
    name: '_gcl_au',
    provider: 'Google LLC (Google Ads)',
    category: 'marketing',
    categoryLabel: 'Marketingové',
    purpose: 'Používa sa na voliteľné vyhodnotenie efektívnosti marketingových a vzdelávacích kampaní.',
    duration: '90 dní',
    type: 'HTTP Cookie',
  },
];

const STORAGE_KEY = 'marvol_cookie_consent';
const POLICY_VERSION = 'v2.0';

function generateConsentId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'marvol-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now().toString(36);
}

const sendConsentAudit = async (
  consentId: string,
  action: 'accept_all' | 'reject_all' | 'custom' | 'revoke',
  prefs: { necessary: boolean; preferences: boolean; analytics: boolean; marketing: boolean }
) => {
  try {
    await fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        consentId,
        action,
        version: POLICY_VERSION,
        preferences: prefs,
      }),
    });
  } catch {
    // Non-blocking for offline / network issues
  }
};

export const CookieConsent: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showCookieTable, setShowCookieTable] = useState(false);

  // Preference state
  const [preferences, setPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [currentConsentId, setCurrentConsentId] = useState<string>('');
  const [currentUpdatedAt, setCurrentUpdatedAt] = useState<string>('');

  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CookiePreferences = JSON.parse(stored);
        const allowPreferences = Boolean(parsed.preferences);
        const allowAnalytics = Boolean(parsed.analytics);
        const allowMarketing = Boolean(parsed.marketing);

        setPreferences(allowPreferences);
        setAnalytics(allowAnalytics);
        setMarketing(allowMarketing);
        setCurrentConsentId(parsed.consentId || '');
        setCurrentUpdatedAt(parsed.updatedAt || '');

        updateGtagConsent({
          preferences: allowPreferences,
          analytics: allowAnalytics,
          marketing: allowMarketing,
        });
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

  const savePreferences = (
    allowPreferences: boolean,
    allowAnalytics: boolean,
    allowMarketing: boolean,
    action: 'accept_all' | 'reject_all' | 'custom'
  ) => {
    const consentId = currentConsentId || generateConsentId();
    const updatedAt = new Date().toISOString();

    const newPreferences: CookiePreferences = {
      necessary: true,
      preferences: allowPreferences,
      analytics: allowAnalytics,
      marketing: allowMarketing,
      consentId,
      version: POLICY_VERSION,
      updatedAt,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
      updateGtagConsent({
        preferences: allowPreferences,
        analytics: allowAnalytics,
        marketing: allowMarketing,
      });
      window.dispatchEvent(
        new CustomEvent('marvolCookieConsentUpdated', { detail: newPreferences })
      );
    } catch (e) {
      console.warn('Nepodarilo sa uložiť nastavenia cookies do localStorage', e);
    }

    setPreferences(allowPreferences);
    setAnalytics(allowAnalytics);
    setMarketing(allowMarketing);
    setCurrentConsentId(consentId);
    setCurrentUpdatedAt(updatedAt);
    setIsOpen(false);
    setShowDetails(false);

    // Send audit log for telecommunication and GDPR compliance proof
    sendConsentAudit(consentId, action, {
      necessary: true,
      preferences: allowPreferences,
      analytics: allowAnalytics,
      marketing: allowMarketing,
    });
  };

  const handleAcceptAll = () => {
    savePreferences(true, true, true, 'accept_all');
  };

  const handleRejectAll = () => {
    savePreferences(false, false, false, 'reject_all');
  };

  const handleSaveCustom = () => {
    savePreferences(preferences, analytics, marketing, 'custom');
  };

  const handleRevokeConsent = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      // Deny everything in Google Consent Mode
      updateGtagConsent({
        preferences: false,
        analytics: false,
        marketing: false,
      });
      window.dispatchEvent(new CustomEvent('marvolCookieConsentRevoked'));
    } catch (e) {
      console.warn('Chyba pri vymazaní cookies:', e);
    }

    const revokedConsentId = currentConsentId || generateConsentId();
    sendConsentAudit(revokedConsentId, 'revoke', {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });

    setPreferences(false);
    setAnalytics(false);
    setMarketing(false);
    setCurrentConsentId('');
    setCurrentUpdatedAt('');
    setShowDetails(false);
    setIsOpen(true);
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
          className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700/90 flex items-center gap-2 text-xs font-semibold transition-colors duration-200 cursor-pointer group"
          title="Upraviť nastavenia cookies a súhlasov"
          aria-label="Nastavenia cookies"
        >
          <div className="w-5 h-5 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform">
            <CookieIcon className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline">Nastavenia cookies</span>
        </button>
      )}

      {/* 2. Main Cookie Consent Dialog / Banner */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          className="fixed bottom-16 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-lg md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div data-ui="dialog" className="bg-slate-900 border border-slate-700/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-left text-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start gap-3.5 mb-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <CookieIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 id="cookie-banner-title" className="text-sm sm:text-base font-black text-white">
                  Nastavenia súborov cookies &amp; GDPR
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Tento web používa nevyhnutné súbory cookies na zabezpečenie funkčnosti a bezpečnosti. S vaším slobodným súhlasom využívame aj analytické a preferenčné cookies v súlade s § 109 ods. 8 Zákona o elektronických komunikáciách č. 452/2021 Z. z.
                </p>
              </div>
            </div>

            {/* Detailed Categories and Cookie List (When expanded) */}
            {showDetails && (
              <div className="space-y-3.5 pt-3 pb-2 border-t border-slate-800 text-xs"> {/* taste-skill-ignore */}
                
                {/* 1. Necessary (Always on) */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <ShieldIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>1. Nevyhnutné cookies (Technické)</span>
                      <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-extrabold ml-1 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        Vždy aktívne
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Potrebné pre bezpečný chod webu, ochranu pred botmi a uloženie voľby súhlasu. Tieto cookies nemožno vypnúť.
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

                {/* 2. Preferences */}
                <label className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">2. Preferenčné cookies (Funkčné)</span>
                    <p className="text-[11px] text-slate-400">
                      Umožňujú zapamätať si vaše zvolené hodnoty a prepočty v solárnej kalkulačke pri prechádzaní webom.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences}
                    onChange={(e) => setPreferences(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400 bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </label>

                {/* 3. Analytics */}
                <label className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">3. Analytické cookies (Štatistické)</span>
                    <p className="text-[11px] text-slate-400">
                      Anonymné meranie návštevnosti (GA4) bez sledovania identity, slúžiace na zrýchlenie a skvalitnenie obsahu webu.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400 bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </label>

                {/* 4. Marketing */}
                <label className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">4. Marketingové cookies</span>
                    <p className="text-[11px] text-slate-400">
                      Umožňujú vyhodnotiť efektivitu online kampaní a zobraziť relevantné informácie o dotáciách.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400 bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </label>

                {/* Expandable Table of Specific Cookies */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowCookieTable(!showCookieTable)}
                    className="w-full text-left text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center justify-between py-2 px-3 bg-slate-950/60 rounded-xl border border-slate-800 transition-colors cursor-pointer"
                  >
                    <span>Zobraziť detailný zoznam konkrétnych cookies ({COOKIE_DECLARATIONS.length} položiek)</span>
                    <span className="text-xs">{showCookieTable ? '▲ Skryť' : '▼ Rozbaliť'}</span>
                  </button>

                  {showCookieTable && (
                    <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-1">
                      {COOKIE_DECLARATIONS.map((cookie) => (
                        <div key={cookie.name} className="p-2.5 rounded-lg bg-slate-950/90 border border-slate-800/80 text-[11px] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-amber-300">{cookie.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                              {cookie.categoryLabel}
                            </span>
                          </div>
                          <p className="text-slate-400 leading-snug">{cookie.purpose}</p>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                            <span>Poskytovateľ: {cookie.provider}</span>
                            <span>Expirácia: {cookie.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Consent Audit ID Display for Verification */}
                {currentConsentId && (
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-[10px] text-slate-400 space-y-0.5">
                    <p className="truncate">
                      <span className="font-semibold text-slate-300">ID vášho súhlasu:</span> {currentConsentId}
                    </p>
                    {currentUpdatedAt && (
                      <p>
                        <span className="font-semibold text-slate-300">Dátum zaznamenania:</span>{' '}
                        {new Date(currentUpdatedAt).toLocaleString('sk-SK')} (verzia {POLICY_VERSION})
                      </p>
                    )}
                  </div>
                )}

                <div className="text-[11px] text-slate-400 pt-1">
                  Kompletné informácie nájdete v{' '}
                  <Link
                    href="/ochrana-osobnych-udajov"
                    className="text-amber-400 hover:underline font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Zásadách ochrany osobných údajov a cookies
                  </Link>.
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800/80"> {/* taste-skill-ignore */}
              
              {!showDetails ? (
                /* Primary Equal-Weight Decision Layout (Strict Anti-Dark Pattern) */
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={handleRejectAll}
                      className="min-h-[44px] py-2.5 px-3 sm:px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold border border-slate-700 transition-colors flex items-center justify-center text-center cursor-pointer active:scale-[0.98]"
                    >
                      Odmietnuť všetky
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="min-h-[44px] py-2.5 px-3 sm:px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black border border-amber-400 transition-colors flex items-center justify-center text-center cursor-pointer active:scale-[0.98]"
                    >
                      Prijať všetky
                    </button>
                  </div>

                  <div className="text-center pt-0.5">
                    <button
                      type="button"
                      onClick={() => setShowDetails(true)}
                      className="text-xs text-slate-400 hover:text-amber-400 font-semibold underline underline-offset-4 py-1 px-2 cursor-pointer transition-colors"
                    >
                      Prispôsobiť nastavenia a zobraziť zoznam cookies →
                    </button>
                  </div>
                </div>
              ) : (
                /* Detailed Category Management Action Bar */
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowDetails(false)}
                      className="text-xs text-slate-400 hover:text-white font-semibold py-2 px-2.5 rounded-lg border border-slate-800 bg-slate-950 cursor-pointer"
                    >
                      ← Návrat
                    </button>
                    {currentConsentId && (
                      <button
                        type="button"
                        onClick={handleRevokeConsent}
                        className="text-xs text-rose-400 hover:text-rose-300 font-semibold py-2 px-2.5 rounded-lg border border-rose-900/40 bg-rose-950/20 hover:bg-rose-950/40 cursor-pointer transition-colors"
                        title="Vymaže uložený súhlas z prehliadača"
                      >
                        Odvolať súhlas
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveCustom}
                      className="flex-1 sm:flex-none min-h-[40px] py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                    >
                      Uložiť vybrané
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="flex-1 sm:flex-none min-h-[40px] py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black border border-amber-400 transition-colors cursor-pointer"
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
