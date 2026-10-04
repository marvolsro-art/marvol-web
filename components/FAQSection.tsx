import React, { useState } from 'react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Ako dlho trvá návratnosť investície do fotovoltiky?',
      a: 'Návratnosť rodinného fotovoltického systému sa pri súčasných cenách elektrickej energie a s využitím štátnej dotácie pohybuje obvykle od 3,5 do 6 rokov. Pri životnosti panelov 25-30 rokov vám tak systém prináša desiatky rokov bezplatnej energie.'
    },
    {
      q: 'Akú výšku dotácie môžem získať pre svoj rodinný dom?',
      a: 'Z programu Zelená domácnostiam môžete na fotovoltiku získať štátny príspevok v sadzbe 575 € na 1 kW (podporovaný výkon do 2 kW, teda maximálne 1 150 €). Pri tepelných čerpadlách je dotácia až 4 600 € (460 €/kW). Nízkopríjmové domácnosti v programe Zelená solidarita môžu získať podporu až do 90 % oprávnených nákladov. Spoločnosť Marvol s.r.o. ako registrovaný zhotoviteľ SIEA zabezpečí kompletnú online rezerváciu prostriedkov aj administráciu bezplatne za vás.'
    },
    {
      q: 'Čo sa stane s vyrobenou elektrinou, ktorú momentálne nespotrebujem?',
      a: 'Pokiaľ máte hybridný systém s batériou, prebytky energie sa uložia do vašej batérie na večer. V prípade využitia služby Virtuálna batéria (dodávateľ elektriny) posielate prebytky do siete a neskôr si ich čerpáte späť za zvýhodnené poplatky.'
    },
    {
      q: 'Funguje fotovoltický systém aj v zime a počas zamračených dní?',
      a: 'Áno. Solárne fotovoltické panely vyrábajú elektrinu z denného svetla (difúzneho žiarenia), nie iba zo priameho slnečného svitu. Hoci je zimný výkon nižší ako v lete, systém naďalej aktívne znižuje vaše účty za elektrinu.'
    },
    {
      q: 'Aký je rozdiel medzi On-Grid, Hybridným a Off-Grid systémom?',
      a: 'On-Grid systém vyrába elektrinu len vtedy, keď funguje verejná sieť. Hybridný systém má vlastné batériové úložisko a funguje aj ako záložný zdroj pri výpadku siete. Off-Grid je plne ostrovný systém pre objekty bez prípojky elektriny.'
    },
    {
      q: 'Vybaví Marvol s.r.o. zapojenie u distribučnej spoločnosti (SSD, ZSD, VSD)?',
      a: 'Áno, kompletne! Pripravíme žiadosť o pripojenie do distribučnej sústavy, projektovú dokumentáciu, odbornú revíznu správu aj finálne odovzdanie pre distribučnú spoločnosť.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-900 text-white relative border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            Otázky a Odpovede
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Často kladené otázky (FAQ)
          </h2>
          <p className="text-slate-400 text-base">
            Máte otázky ohľadom fotovoltiky, dotácií alebo montáže? Tu nájdete najčastejšie odpovede.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left font-bold text-base text-white flex items-center justify-between gap-4 hover:text-amber-400 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className={`w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 font-bold shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-900/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Banner at FAQ bottom */}
        <div className="mt-12 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-sky-500/10 border border-amber-500/20 rounded-2xl p-6 text-center space-y-3">
          <h3 className="text-lg font-bold text-white">Nenašli ste odpoveď na vašu otázku?</h3>
          <p className="text-xs text-slate-300">Naši energetickí poradcovia vám radi bezplatne odpovedia na akúkoľvek otázku.</p>
          <a
            href="tel:+421948123456"
            className="inline-flex items-center justify-center gap-2 bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-amber-300 transition-colors shadow-md min-h-[44px]"
          >
            📞 Zavolať expertovi: +421 948 123 456
          </a>
        </div>

      </div>
    </section>
  );
};
