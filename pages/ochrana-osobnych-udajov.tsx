import React from 'react';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden w-full flex flex-col">
      <Head>
        <title>Zásady ochrany osobných údajov (GDPR) | Marvol s.r.o.</title>
        <meta name="description" content="Informácie o spracúvaní osobných údajov podľa nariadenia GDPR a zákona č. 18/2018 Z. z. v spoločnosti Marvol s.r.o." />
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 text-slate-300 space-y-8 flex-1 w-full overflow-x-hidden">
        <h1 className="text-3xl sm:text-4xl font-black text-white border-b border-slate-800 pb-4">
          Zásady ochrany osobných údajov (GDPR)
        </h1>

        <div className="space-y-4 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">1. Prevádzkovateľ osobných údajov</h2>
          <p>
            Prevádzkovateľom osobných údajov v zmysle Nariadenia Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a zákona č. 18/2018 Z. z. o ochrane osobných údajov je:
          </p>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs space-y-1 text-slate-200">
            <p className="font-bold text-white">Marvol s. r. o.</p>
            <p>Sídlo: Chotárna 3394/6, 038 61 Vrútky</p>
            <p>IČO: 53 060 091 | DIČ: 2121255961 | IČ DPH: SK2121255961</p>
            <p>Zapísaná v Obchodnom registri Okresného súdu Žilina, oddiel: Sro, vložka č. 74765/L</p>
            <p>E-mail: info@marvol.sk | Telefón: +421 948 123 456</p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">2. Účel a právny základ spracúvania</h2>
          <p>Spracúvame Vaše osobné údaje (meno, priezvisko, telefónne číslo, e-mailová adresa, adresa nehnuteľnosti, technické parametre objektu) za účelom:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vypracovania nezáväznej cenovej ponuky a výpočtu návratnosti fotovoltického systému.</li>
            <li>Dohodnutia obhliadky nehnuteľnosti technickým poradcom.</li>
            <li>Prípravy projektovej dokumentácie a podkladov pre štátne dotácie (Zelená domácnostiam & Zelená podnikom).</li>
            <li>Plnenia zmluvných povinností v prípade realizácie diela.</li>
          </ul>
          <p>
            Právnym základom spracúvania je vykonanie opatrení pred uzatvorením zmluvy na žiadosť dotknutej osoby (čl. 6 ods. 1 písm. b GDPR) a Váš výslovný súhlas (čl. 6 ods. 1 písm. a GDPR).
          </p>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">3. Doba uchovávania údajov</h2>
          <p>
            Osobné údaje spracúvame po dobu trvania predzmluvných rokovaní a realizácie projektu, najviac však po dobu 5 rokov od ich poskytnutia, pokiaľ nevznikne zmluvný vzťah alebo zákonná povinnosť archivácie.
          </p>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">4. Práva dotknutej osoby</h2>
          <p>Ako dotknutá osoba máte právo:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Požadovať prístup k svojim osobným údajom.</li>
            <li>Požadovať opravu alebo vymazanie osobných údajov.</li>
            <li>Požadovať obmedzenie spracúvania alebo namietať proti spracúvaniu.</li>
            <li>Právo na prenosnosť údajov.</li>
            <li>Právo kedykoľvek odvolať svoj súhlas.</li>
            <li>Právo podať sťažnosť na Úrad na ochranu osobných údajov SR.</li>
          </ul>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white">5. Kontakt pre uplatnenie práv</h2>
          <p>
            V prípade akýchkoľvek otázok alebo uplatnenia práv ma môžete kontaktovať e-mailom na <a href="mailto:info@marvol.sk" className="text-amber-400 underline">info@marvol.sk</a> alebo písomne na adrese sídla prevádzkovateľa.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
