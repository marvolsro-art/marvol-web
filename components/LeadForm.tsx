import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { LeadRequestBody } from '@/pages/api/lead';
import {
  CheckIcon,
  ClockIcon,
  SunIcon,
  BatteryIcon,
  HeatPumpIcon,
  CarIcon,
  AlertCircleIcon,
} from '@/components/icons';

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
  prefillData?: Partial<LeadRequestBody>;
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
  prefillData,
  onSuccess,
  className = '',
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    city: string;
    service: string;
    message: string;
  }>({
    name: prefillData?.name || '',
    phone: prefillData?.phone || '',
    email: prefillData?.email || '',
    city: prefillData?.city || '',
    service: prefillData?.service || initialService,
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

  // Synchronize state dynamically when prefillData changes
  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        name: prefillData.name !== undefined ? prefillData.name : prev.name,
        phone: prefillData.phone !== undefined ? prefillData.phone : prev.phone,
        email: prefillData.email !== undefined ? prefillData.email : prev.email,
        city: prefillData.city !== undefined ? prefillData.city : prev.city,
        service:
          prefillData.service !== undefined
            ? prefillData.service
            : prev.service,
        message:
          prefillData.message !== undefined ? prefillData.message : prev.message,
      }));
    }
  }, [prefillData]);

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
          source: prefillData?.source || source,
          b_url: bUrl,
          // Prefill calculator telemetry
          propertyType: prefillData?.propertyType,
          monthlyBill: prefillData?.monthlyBill,
          hasBattery: prefillData?.hasBattery,
          hasHeatPump: prefillData?.hasHeatPump,
          hasEV: prefillData?.hasEV,
          recommendedKwp: prefillData?.recommendedKwp,
          estimatedSavings: prefillData?.estimatedSavings,
          netPrice: prefillData?.netPrice,
          subsidy: prefillData?.subsidy,
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
      name: prefillData?.name || '',
      phone: prefillData?.phone || '',
      email: prefillData?.email || '',
      city: prefillData?.city || '',
      service: prefillData?.service || initialService,
      message: initialMessage || '',
    });
    setBUrl('');
    setGdprConsent(false);
  };

  // Success State View
  if (successLeadId) {
    return (
      <div
        className={`bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-center ${className}`}
      >
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-8 h-8 text-emerald-400" strokeWidth={2.5} />
        </div>
        <span className="inline-block px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full mb-4">
          Dopyt úspešne prijatý
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Ďakujeme za váš záujem o riešenia Marvol!
        </h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto mb-4 leading-relaxed">
          Váš dopyt sme zaevidovali s referenčným kódom{' '}
          <span className="font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">{successLeadId}</span>.
        </p>
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 text-left space-y-2 mb-6 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <ClockIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Čo sa bude diať teraz?</span>
          </div>
          <p>
            1. Náš certifikovaný špecialista vás bude kontaktovať najneskôr do 24 hodín.
          </p>
          <p>
            2. Prejdeme si vaše požiadavky a navrhneme bezplatnú technickú obhliadku.
          </p>
          <p>
            3. Vypracujeme nezáväzný 3D návrh a kalkuláciu štátnej dotácie.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center min-h-[48px] py-2 px-3 text-xs text-slate-400 hover:text-amber-400 underline transition-colors cursor-pointer"
        >
          Odoslať ďalší dopyt alebo správu
        </button>
      </div>
    );
  }

  // Check if prefillData contains calculator outputs
  const hasCalculatorData = Boolean(
    prefillData &&
      (prefillData.recommendedKwp ||
        prefillData.monthlyBill ||
        prefillData.hasBattery ||
        prefillData.hasHeatPump ||
        prefillData.hasEV)
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-slate-900 border border-slate-800 rounded-2xl ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'} relative ${className}`}
    >
      {/* Title & Subtitle */}
      {(title || subtitle) && (
        <div className={`${compact ? 'mb-4' : 'mb-6'}`}>
          {title && (
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Calculator Prefill Context Strip */}
      {hasCalculatorData && prefillData && (
        <div className="mb-5 p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center justify-between text-amber-400 font-bold">
            <span className="flex items-center gap-1.5">
              <SunIcon className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Konfigurácia z kalkulačky</span>
            </span>
            {prefillData.subsidy !== undefined && prefillData.subsidy > 0 && (
              <span className="text-emerald-400 font-bold">
                Dotácia: {prefillData.subsidy.toLocaleString('sk-SK')} €
              </span>
            )}
          </div>
          <div className="text-xs text-slate-400 flex flex-wrap gap-x-3 gap-y-1 items-center">
            {prefillData.propertyType && (
              <span>
                Objekt:{' '}
                <strong className="text-slate-200">
                  {prefillData.propertyType === 'business' ? 'Firma' : 'Rodinný dom'}
                </strong>
              </span>
            )}
            {prefillData.monthlyBill && (
              <span>
                Účet:{' '}
                <strong className="text-slate-200">{prefillData.monthlyBill} €/mes.</strong>
              </span>
            )}
            {prefillData.recommendedKwp && (
              <span>
                Výkon:{' '}
                <strong className="text-slate-200">{prefillData.recommendedKwp} kWp</strong>
              </span>
            )}
            {prefillData.hasBattery && (
              <span className="inline-flex items-center gap-1 text-amber-300">
                <BatteryIcon className="w-3.5 h-3.5 text-amber-400" /> Batéria
              </span>
            )}
            {prefillData.hasHeatPump && (
              <span className="inline-flex items-center gap-1 text-emerald-300">
                <HeatPumpIcon className="w-3.5 h-3.5 text-emerald-400" /> Tepelné čerpadlo
              </span>
            )}
            {prefillData.hasEV && (
              <span className="inline-flex items-center gap-1 text-sky-300">
                <CarIcon className="w-3.5 h-3.5 text-sky-400" /> Wallbox
              </span>
            )}
            {prefillData.estimatedSavings && (
              <span>
                Úspora:{' '}
                <strong className="text-emerald-400 font-bold">
                  {prefillData.estimatedSavings} €/rok
                </strong>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Error alert */}
      {errorMsg && (
        <div
          role="alert"
          className="mb-5 bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-xl text-xs sm:text-sm text-rose-300 flex items-start gap-2.5"
        >
          <AlertCircleIcon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <span className="leading-snug">{errorMsg}</span>
        </div>
      )}

      {/* Honeypot anti-spam trap (invisible to human visitors) */}
      <div
        className="hidden"
        aria-hidden="true"
        style={{ display: 'none', position: 'absolute', left: '-9999px' }}
      >
        <label htmlFor="lead-b-url">Nechajte toto pole prázdne</label>
        <input
          id="lead-b-url"
          type="text"
          name="b_url"
          value={bUrl}
          onChange={(e) => setBUrl(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-4">
        {/* Row 1: Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="lead-name"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Meno a priezvisko <span className="text-amber-400">*</span>
            </label>
            <input
              id="lead-name"
              type="text"
              required
              autoComplete="name"
              placeholder="Ján Novák"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="lead-phone"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Telefónne číslo <span className="text-amber-400">*</span>
            </label>
            <input
              id="lead-phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+421 948 123 456"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Email and optional Location/City */}
        <div className={`grid grid-cols-1 ${showLocationField ? 'sm:grid-cols-2' : ''} gap-4`}>
          <div>
            <label
              htmlFor="lead-email"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              E-mailová adresa <span className="text-xs text-slate-500 font-normal">(nepovinné)</span>
            </label>
            <input
              id="lead-email"
              type="email"
              autoComplete="email"
              placeholder="jan.novak@priklad.sk"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
          </div>

          {showLocationField && (
            <div>
              <label
                htmlFor="lead-city"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Obec / Mesto realizácie <span className="text-xs text-slate-500 font-normal">(nepovinné)</span>
              </label>
              <input
                id="lead-city"
                type="text"
                autoComplete="address-level2"
                placeholder="napr. Martin, Žilina..."
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>
          )}
        </div>

        {/* Row 3: Service Selector */}
        <div>
          <label
            htmlFor="lead-service"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Požadované riešenie / služba <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <select
              id="lead-service"
              required
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors appearance-none pr-10 cursor-pointer"
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
              {/* Dynamic fallback option if custom service query is passed */}
              {!SERVICE_OPTIONS.some((opt) => opt.value === formData.service) && (
                <option value={formData.service}>{formData.service}</option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 4: Message textarea */}
        <div>
          <label
            htmlFor="lead-message"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Doplňujúce informácie alebo otázka <span className="text-xs text-slate-500 font-normal">(nepovinné)</span>
          </label>
          <textarea
            id="lead-message"
            rows={compact ? 2 : 3}
            placeholder="Typ strechy, ročná spotreba kWh, požiadavka na zálohu pri výpadku siete..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none"
          />
        </div>

        {/* Row 5: GDPR Consent Checkbox */}
        <div className="flex items-start gap-3 pt-1">
          <input
            id="lead-gdpr"
            type="checkbox"
            required
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-900 cursor-pointer shrink-0"
          />
          <label
            htmlFor="lead-gdpr"
            className="text-xs text-slate-400 leading-snug cursor-pointer select-none"
          >
            Súhlasím so spracovaním osobných údajov za účelom vypracovania bezplatnej cenovej ponuky spoločnosťou Marvol s.r.o. podľa{' '}
            <Link
              href="/ochrana-osobnych-udajov"
              target="_blank"
              className="text-amber-400 hover:text-amber-300 underline"
            >
              Zásad ochrany osobných údajov
            </Link>
            . <span className="text-amber-400">*</span>
          </label>
        </div>

        {/* Row 6: Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full min-h-[48px] py-4 px-6 rounded-xl font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Spracovávam dopyt...</span>
              </>
            ) : (
              <>
                <span>Odoslať nezáväzný dopyt</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Trust badge under button */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-1">
          <span className="flex items-center gap-1.5">
            <CheckIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={2.5} />
            <span>Bezplatná obhliadka</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={2.5} />
            <span>Dotácie Zelená domácnostiam</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={2.5} />
            <span>Odpoveď do 24h</span>
          </span>
        </div>
      </div>
    </form>
  );
};

export default LeadForm;
