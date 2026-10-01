import React from 'react';
import Link from 'next/link';
import { COMPANY_DETAILS } from '@/constants/company';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Statutory (lg:col-span-2 per § 3a Obch. zák. & § 4 zákona o DPH) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-block">
                <img
                  src="/logos/logo%20marvol.svg"
                  alt="Marvol s.r.o."
                  className="h-10 w-auto max-w-[180px] object-contain filter brightness-110 drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]"
                />
              </Link>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Certifikovaný špecialista na fotovoltické elektrárne na kľúč, batériové úložiská BESS, veľkoobchodný e-shop a kompletné inžinierske služby s úradnými revíziami po celom Slovensku.
            </p>

            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-300">
                {COMPANY_DETAILS.legalName} | {COMPANY_DETAILS.seat.fullAddress}
              </p>
              <p>
                IČO: {COMPANY_DETAILS.tax.ico} | DIČ: {COMPANY_DETAILS.tax.dic} | IČ DPH: {COMPANY_DETAILS.tax.icDph}
              </p>
              <p>
                {COMPANY_DETAILS.registry.legalNotice}
              </p>
              <p className="pt-1 text-slate-600">
                © {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. Všetky práva vyhradené.
              </p>
            </div>
          </div>

          {/* Col 2: Fotovoltika & E-shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fotovoltika &amp; E-shop</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/fotovoltika-pre-domacnosti" className="hover:text-amber-400 transition-colors">
                  Fotovoltika pre rodinné domy
                </Link>
              </li>
              <li>
                <Link href="/fotovoltika-pre-firmy" className="hover:text-amber-400 transition-colors">
                  Komerčná fotovoltika pre firmy
                </Link>
              </li>
              <li>
                <Link href="/bateriove-uloziska-bess" className="hover:text-amber-400 transition-colors">
                  Batériové úložiská BESS &amp; Wallbox
                </Link>
              </li>
              <li>
                <Link href="/eshop" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>E-shop solárnych komponentov</span>
                  <span className="bg-amber-400/20 text-amber-300 text-[9px] px-1 rounded uppercase font-bold">Nové</span>
                </Link>
              </li>
              <li>
                <Link href="/tepelne-cerpadla" className="hover:text-amber-400 transition-colors">
                  Tepelné čerpadlá (A+++)
                </Link>
              </li>
              <li>
                <Link href="/#kalkulacka" className="hover:text-amber-400 transition-colors">
                  Kalkulačka úspory
                </Link>
              </li>
              <li>
                <Link href="/#referencie" className="hover:text-amber-400 transition-colors">
                  Referencie realizácií
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Odborné služby */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Odborné služby</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/sluzby/navrh-projektu" className="hover:text-amber-400 transition-colors">
                  Návrh projektu &amp; Projektovanie
                </Link>
              </li>
              <li>
                <Link href="/sluzby/instalacia-montaz" className="hover:text-amber-400 transition-colors">
                  Montáž a inštalácia na kľúč
                </Link>
              </li>
              <li>
                <Link href="/sluzby/konzultacie-poradenstvo" className="hover:text-amber-400 transition-colors">
                  Konzultácie &amp; Energetický audit
                </Link>
              </li>
              <li>
                <Link href="/sluzby/protipoziarna-ochrana-bezpecne-napatie" className="hover:text-amber-400 transition-colors">
                  Protipožiarna ochrana &amp; Safe DC
                </Link>
              </li>
              <li>
                <Link href="/sluzby/revizie-dotacie" className="hover:text-amber-400 transition-colors">
                  Revízie OPOS &amp; Dotácie SIEA
                </Link>
              </li>
              <li>
                <Link href="/elektroinstalacie-revizie" className="hover:text-amber-400 transition-colors">
                  Elektroinštalácie &amp; Revízie
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontakt & Certifikácie */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Kontakt &amp; Právne info</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="text-white font-bold hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-400">📞</span>
                  <span>{COMPANY_DETAILS.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_DETAILS.contact.email}`}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-400">✉️</span>
                  <span>{COMPANY_DETAILS.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_DETAILS.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>💬</span>
                  <span>WhatsApp konzultácia</span>
                </a>
              </li>
              <li className="pt-1">
                <Link
                  href="/kontakt"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-400">📍</span>
                  <span>Kontakt &amp; Sídlo spoločnosti</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/ochrana-osobnych-udajov" className="text-amber-400 hover:underline">
                  🔒 Ochrana osobných údajov (GDPR)
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span>✓</span>
                <span>Zelená domácnostiam (SIEA oprávnený zhotoviteľ)</span>
              </li>
              <li className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span>✓</span>
                <span>Zelená podnikom (SIEA dotácie pre firmy)</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
