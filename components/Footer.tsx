import React from 'react';
import Link from 'next/link';
import { COMPANY_DETAILS } from '@/constants/company';
import { PhoneIcon, MailIcon, MapPinIcon, CheckIcon, LockClosedIcon } from '@/components/icons';

export const Footer: React.FC = () => {
  return (
    <footer data-ui="footer" className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Statutory (lg:col-span-2 per § 3a Obch. zák. & § 4 zákona o DPH) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-block">
                <img
                  src="/logos/logo-marvol.svg"
                  alt="Marvol s.r.o."
                  className="h-10 sm:h-11 w-auto max-w-[190px] object-contain"
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
            <h4 className="text-xs font-bold uppercase text-white">Fotovoltika &amp; E-shop</h4>
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
              <li>
                <Link href="/#partneri" className="hover:text-amber-400 transition-colors">
                  Technologickí partneri
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Odborné služby */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-white">Odborné služby</h4>
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
            <h4 className="text-xs font-bold uppercase text-white">Kontakt &amp; Právne info</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="text-white font-bold hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <PhoneIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{COMPANY_DETAILS.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_DETAILS.contact.email}`}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <MailIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
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
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>WhatsApp konzultácia</span>
                </a>
              </li>
              <li className="pt-1">
                <Link
                  href="/kontakt"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <MapPinIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Kontakt &amp; Sídlo spoločnosti</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/ochrana-osobnych-udajov" className="text-amber-400 hover:underline flex items-center gap-1.5">
                  <LockClosedIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Ochrana osobných údajov (GDPR)</span>
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckIcon className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Zelená domácnostiam (SIEA oprávnený zhotoviteľ)</span>
              </li>
              <li className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckIcon className="w-3 h-3 text-emerald-400 shrink-0" />
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
