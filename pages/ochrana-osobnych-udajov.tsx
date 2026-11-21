import React from 'react';
import { Layout } from '@/components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout
      title="Zásady ochrany osobných údajov (GDPR) | Marvol s.r.o."
      description="Informácie o spracúvaní a ochrane osobných údajov podľa nariadenia GDPR a zákona č. 18/2018 Z. z. v spoločnosti Marvol s.r.o."
      canonicalPath="/ochrana-osobnych-udajov"
      isSubpage={true}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-300 space-y-8 w-full">
        <h1 className="text-3xl sm:text-4xl font-black text-white pb-4">
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
            <p>E-mail: marvolsro@gmail.com | Telefón: +421 908 403 042</p>
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
            V prípade akýchkoľvek otázok alebo uplatnenia práv ma môžete kontaktovať e-mailom na{' '}
            <a href="mailto:marvolsro@gmail.com" className="text-amber-400 underline font-semibold">
              marvolsro@gmail.com
            </a>{' '}
            alebo písomne na adrese sídla prevádzkovateľa: Marvol s. r. o., Chotárna 3394/6, 038 61 Vrútky.
          </p>
        </div>

        <div className="space-y-5 text-sm leading-relaxed border-t border-slate-800 pt-8">
          <h2 className="text-xl font-bold text-white">6. Súbory cookies a zásady ich používania</h2>
          <p>
            Tento web využíva súbory cookies a technológie lokálneho úložiska (Local Storage) na zabezpečenie základných technických funkcií webu a s vaším predchádzajúcim, dobrovoľným a výslovným súhlasom aj na anonymnú analýzu návštevnosti a optimalizáciu výkonu webu.
          </p>
          <p>
            Spracúvanie podlieha požiadavkám <strong>Nariadenia GDPR (EÚ) 2016/679</strong> a <strong>§ 109 ods. 8 zákona č. 452/2021 Z. z. o elektronických komunikáciách</strong>, podľa ktorého je prevádzkovateľ povinný získať preukázateľný predchádzajúci súhlas (opt-in) pred aktiváciou akýchkoľvek neesenciálnych analytických alebo marketingových nástrojov.
          </p>

          <h3 className="text-base font-bold text-white pt-2">Kategórie súborov cookies:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-white">1. Nevyhnutné (Technické) cookies:</strong> Sú potrebné na technické zabezpečenie webu, ochranu pred botmi a zaznamenanie vašej voľby súhlasu. Tieto cookies sú aktívne vždy a nemožno ich vypnúť (právny základ: oprávnený záujem a plnenie zákonnej povinnosti).
            </li>
            <li>
              <strong className="text-white">2. Preferenčné (Funkčné) cookies:</strong> Umožňujú zapamätať si vaše voľby a priebežné parametre vo fotovoltickej kalkulačke pri prehliadaní rôznych podstránok nášho webu.
            </li>
            <li>
              <strong className="text-white">3. Analytické (Štatistické) cookies:</strong> Zhromažďujú anonymné agregované štatistiky (napr. cez Google Analytics 4 v prísnom režime Google Consent Mode v2) o tom, ako návštevníci web používajú, bez identifikácie konkrétnej osoby.
            </li>
            <li>
              <strong className="text-white">4. Marketingové cookies:</strong> Slúžia na vyhodnocovanie efektivity vzdelávacích a propagačných kampaní o štátnych dotáciách a fotovoltike.
            </li>
          </ul>

          <h3 className="text-base font-bold text-white pt-2">Detailný zoznam používaných cookies:</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900 text-slate-300 font-bold">
                  <th className="p-3">Názov</th>
                  <th className="p-3">Poskytovateľ</th>
                  <th className="p-3">Kategória</th>
                  <th className="p-3">Účel</th>
                  <th className="p-3">Expirácia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">marvol_cookie_consent</td>
                  <td className="p-3">Marvol s.r.o.</td>
                  <td className="p-3 font-semibold text-emerald-400">Nevyhnutné</td>
                  <td className="p-3">Uloženie voľby súhlasu a Consent ID pre preukázateľnosť podľa GDPR</td>
                  <td className="p-3 whitespace-nowrap">12 mesiacov</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">marvol_calc_state</td>
                  <td className="p-3">Marvol s.r.o.</td>
                  <td className="p-3 font-semibold text-sky-400">Preferenčné</td>
                  <td className="p-3">Uchovanie rozpracovaných výpočtov v solárnej kalkulačke</td>
                  <td className="p-3 whitespace-nowrap">Relácia (Session)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">_ga</td>
                  <td className="p-3">Google LLC (GA4)</td>
                  <td className="p-3 font-semibold text-amber-400">Analytické</td>
                  <td className="p-3">Rozlíšenie relácií pre agregované anonymné štatistiky návštevnosti</td>
                  <td className="p-3 whitespace-nowrap">2 roky</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">_ga_YH051CYNV3</td>
                  <td className="p-3">Google LLC (GA4)</td>
                  <td className="p-3 font-semibold text-amber-400">Analytické</td>
                  <td className="p-3">Udržiavanie stavu relácie pre meranie stability a rýchlosti načítania</td>
                  <td className="p-3 whitespace-nowrap">2 roky</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-amber-300">_gcl_au</td>
                  <td className="p-3">Google LLC</td>
                  <td className="p-3 font-semibold text-purple-400">Marketingové</td>
                  <td className="p-3">Voliteľné anonymné konverzné meranie efektívnosti kampaní</td>
                  <td className="p-3 whitespace-nowrap">90 dní</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-bold text-white pt-2">Správa, zmena a odvolanie súhlasu:</h3>
          <p>
            Svoj súhlas môžete kedykoľvek jednoducho a bezplatne zmeniť, obmedziť alebo úplne odvolať kliknutím na tlačidlo nižšie, prípadne cez trvalý odkaz „Nastavenia cookies“ v pätičke nášho webu:
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('openCookieSettings'));
                }
              }}
              className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              🍪 Otvoriť nastavenia cookies a odvolať súhlas
            </button>
          </div>
          <p className="text-xs text-slate-400 pt-2">
            Súbory cookies môžete kedykoľvek odstrániť alebo zablokovať aj priamo v nastaveniach svojho internetového prehliadača (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge). V prípade zablokovania nevyhnutných cookies však web nemusí fungovať korektne.
          </p>
        </div>
      </div>
    </Layout>
  );
}
