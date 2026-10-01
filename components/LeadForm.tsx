import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export type ServiceType =
  | 'fotovoltika-dom'
  | 'fotovoltika-firma'
  | 'baterie'
  | 'cerpadlo'
  | 'elektro'
  | 'vseobecny-kontakt';

export interface LeadFormProps {
  initialService?: ServiceType | string;
  initialMessage?: string;
  source?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  showLocationField?: boolean;
  onSuccess?: (leadId: string) => void;
  className?: string;
}

export const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: 'fotovoltika-dom', label: 'Fotovoltika pre rodinný dom' },
  { value: 'fotovoltika-firma', label: 'Fotovoltika pre firmu / objekt' },
  { value: 'baterie', label: 'Batériové úložisko BESS & Wallbox' },
  { value: 'cerpadlo', label: 'Tepelné čerpadlo' },
  { value: 'elektro', label: 'Elektroinštalácie & Revízie' },
  { value: 'vseobecny-kontakt', label: 'Všeobecný dopyt / Iné' },
];

const PHONE_REGEX = /^[+0-9\s-]{9,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LeadForm: React.FC<LeadFormProps> = ({
  initialService = 'fotovoltika-dom',
  initialMessage,
  source = 'lead_form',
  title = 'Nezáväzný dopyt & konzultácia',
  subtitle = 'Vyplňte krátky formulár a pripravíme vám bezplatný technický návrh na mieru.',
  compact = false,
  showLocationField = false,
  onSuccess,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: initialService,
    message: initialMessage || '',
  });

  // Honeypot field for bot trapping (invisible to real users)
  const [bUrl, setBUrl] = useState('');

  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successLeadId, setSuccessLeadId] = useState<string | null>(null);

  // Synchronize state dynamically when initialService or initialMessage props update
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        service: initialService,
      }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage !== undefined) {
      setFormData((prev) => ({
        ...prev,
        message: initialMessage,
      }));
    }
  }, [initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side validation
    const trimmedName = formData.name.trim();
    if (trimmedName.length < 2) {
      setErrorMsg('Prosím, zadajte vaše platné meno a priezvisko (aspoň 2 znaky).');
      return;
    }

    const trimmedPhone = formData.phone.trim();
    if (!PHONE_REGEX.test(trimmedPhone)) {
      setErrorMsg('Prosím, zadajte platné telefónne číslo (napr. +421 948 123 456).');
      return;
    }

    const trimmedEmail = formData.email.trim();
    if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
      setErrorMsg('Prosím, zadajte platnú e-mailovú adresu (napr. meno@domena.sk).');
      return;
    }

    if (!gdprConsent) {
      setErrorMsg('Pre odoslanie dopytu musíte potvrdiť súhlas so spracovaním osobných údajov.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          email: trimmedEmail || undefined,
          city: formData.city.trim() || undefined,
          service: formData.service,
          message: formData.message.trim() || undefined,
          source,
          b_url: bUrl,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const id = data.leadId || `LEAD-${Date.now()}`;
        setSuccessLeadId(id);
        if (onSuccess) {
          onSuccess(id);
        }
      } else {
        setErrorMsg(
          data.message || 'Nepodarilo sa odoslať dopyt. Skontrolujte prosím zadané údaje a skúste to znova.'
        );
      }
    } catch (err) {
      console.error('Lead submission network error:', err);
      setErrorMsg('Došlo k chybe spojenia so serverom. Skontrolujte internetové pripojenie alebo nás kontaktujte telefonicky.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessLeadId(null);
    setErrorMsg(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      service: initialService,
      message: initialMessage || '',
    });
    setBUrl('');
    setGdprConsent(false);
  };

  // Reassuring Success State
  if (successLeadId) {
    return (
      <div
        className={`bg-slate-900/95 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 backdrop-blur-xl text-center shadow-2xl ${className}`}
      >
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          ✓
        </div>
        <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
          Dopyt úspešne prijatý
        </span>
        <h3 className="text-2xl font-black text-white mb-2">Ďakujeme za váš záujem!</h3>
        <p className="text-slate-300 text-sm max-w-md mx-auto mb-4 leading-relaxed">
          Váš dopyt bol zaevidovaný pod referenčným kódom{' '}
          <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            {successLeadId}
          </span>
          .
        </p>
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 text-left space-y-2 mb-6 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <span>⏱️</span>
            <span>Čo sa bude diať teraz?</span>
          </div>
          <p>
            1. Náš certifikovaný technik posúdi vašu lokalitu a technické špecifikácie.
          </p>
          <p>
            2. Budeme vás kontaktovať na čísle <strong className="text-white">{formData.phone}</strong> najneskôr do 24 hodín s bezplatnou kalkuláciou a termínom obhliadky.
          </p>
          <p>
            3. Vypracovanie technického návrhu aj obhliadka sú 100% nezáväzné a zadarmo.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-amber-400 underline transition-colors"
        >
          Odoslať ďalší dopyt alebo správu
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-slate-900/90 border border-slate-800 rounded-2xl ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      } backdrop-blur-xl shadow-2xl relative ${className}`}
      noValidate
    >
      {/* Header text */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className={`${compact ? 'text-xl' : 'text-2xl'} font-black text-white tracking-tight`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Error alert */}
      {errorMsg && (
        <div
          role="alert"
          className="mb-5 bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-xl text-xs sm:text-sm text-rose-300 flex items-start gap-2.5"
        >
          <span className="text-base leading-none text-rose-400 mt-0.5">⚠️</span>
          <span className="leading-snug">{errorMsg}</span>
        </div>
      )}

      {/* Invisible Honeypot Spam Bot Trap */}
      <div
        className="hidden"
        aria-hidden="true"
        style={{ display: 'none', position: 'absolute', left: '-9999px' }}
      >
        <label htmlFor="b_url">Website URL (leave blank)</label>
        <input
          id="b_url"
          type="text"
          name="b_url"
          tabIndex={-1}
          autoComplete="off"
          value={bUrl}
          onChange={(e) => setBUrl(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {/* Name and Phone inputs */}
        <div className={`grid grid-cols-1 ${compact ? 'gap-3.5' : 'sm:grid-cols-2 gap-4'}`}>
          <div>
            <label
              htmlFor="lead-name"
              className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5"
            >
              Meno a Priezvisko <span className="text-amber-400">*</span>
            </label>
            <input
              id="lead-name"
              type="text"
              required
              disabled={submitting}
              placeholder="Ján Novák"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="lead-phone"
              className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5"
            >
              Telefónne číslo <span className="text-amber-400">*</span>
            </label>
            <input
              id="lead-phone"
              type="tel"
              required
              disabled={submitting}
              placeholder="+421 948 123 456"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {/* Email and Service inputs */}
        <div className={`grid grid-cols-1 ${compact ? 'gap-3.5' : 'sm:grid-cols-2 gap-4'}`}>
          <div>
            <label
              htmlFor="lead-email"
              className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5"
            >
              E-mailová adresa
            </label>
            <input
              id="lead-email"
              type="email"
              disabled={submitting}
              placeholder="jan.novak@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="lead-service"
              className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5"
            >
              Požadovaná služba
            </label>
            <select
              id="lead-service"
              disabled={submitting}
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors disabled:opacity-50"
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
              {/* Fallback option if a custom initialService was provided */}
              {!SERVICE_OPTIONS.some((o) => o.value === formData.service) && (
                <option value={formData.service}>{formData.service}</option>
              )}
            </select>
          </div>
        </div>

        {/* Optional Location field */}
        {showLocationField && (
          <div>
            <label
              htmlFor="lead-city"
              className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5"
            >
              Mesto / Obec realizácie
            </label>
            <input
              id="lead-city"
              type="text"
              disabled={submitting}
              placeholder="Napr. Martin, Žilina, Bratislava..."
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors disabled:opacity-50"
            />
          </div>
        )}

        {/* Message / Details */}
        <div>
          <label
            htmlFor="lead-message"
            className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5"
          >
            Poznámka / Detaily nehnuteľnosti
          </label>
          <textarea
            id="lead-message"
            rows={compact ? 3 : 4}
            disabled={submitting}
            placeholder="Uveďte typ strechy, ročnú spotrebu elektriny alebo lokalitu montáže..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors disabled:opacity-50 resize-y"
          />
        </div>

        {/* GDPR consent checkbox */}
        <div className="flex items-start gap-3 pt-1">
          <input
            type="checkbox"
            id="gdpr-lead-consent"
            required
            disabled={submitting}
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            className="w-4 h-4 mt-0.5 accent-amber-400 rounded cursor-pointer shrink-0"
          />
          <label
            htmlFor="gdpr-lead-consent"
            className="text-[11px] sm:text-xs text-slate-400 leading-snug cursor-pointer select-none"
          >
            Súhlasím so spracovaním osobných údajov spoločnosťou Marvol s.r.o. podľa{' '}
            <Link
              href="/ochrana-osobnych-udajov"
              target="_blank"
              className="text-amber-400 hover:text-amber-300 underline font-medium"
            >
              Zásad ochrany osobných údajov (GDPR)
            </Link>{' '}
            za účelom vypracovania nezáväznej cenovej ponuky. <span className="text-amber-400">*</span>
          </label>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:opacity-95 active:scale-[0.99] transition-all text-base shadow-xl shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-slate-950"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Odosielam dopyt...</span>
              </>
            ) : (
              <span>Odoslať dopyt na obhliadku zdarma</span>
            )}
          </button>
        </div>

        {/* Trust badge under button */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <span className="text-emerald-400">✓</span> Bezplatná obhliadka
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-400">✓</span> Dotácia do 4 025 €
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-400">✓</span> Odpoveď do 24h
          </span>
        </div>
      </div>
    </form>
  );
};

export default LeadForm;
