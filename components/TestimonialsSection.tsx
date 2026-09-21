import React from 'react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Roman Belánik',
      date: '26. August 2026',
      rating: 5,
      text: 'Profesionálna práca, celá realizácia v dohodnutom termíne, kvalite, zabezpečenie inžinierskej činnosti tj. žiadosti na SEIA, energetického auditu, dotácie z programu Zelená podnikom, vrátane porealizačného servisu. Absolútna spokojnosť.'
    },
    {
      name: 'Tomáš Pospíšil',
      date: '18. Júl 2026',
      rating: 5,
      text: 'Realizácia fotovoltaických panelov na rodinný dom prebehla profesionálne od obhliadky až po revíznu správu. Tím z Marvol s.r.o. ma previedol celým procesom až po aktiváciu virtuálnej batérie a zdieľania elektriny vrátane navigácie na distribučné firmy.'
    },
    {
      name: 'Ivan Macalák',
      date: '17. Júl 2026',
      rating: 5,
      text: 'So službami spoločnosti Marvol s.r.o. som bol maximálne spokojný. Dodávka a montáž fotovoltického systému prebehli presne podľa dohodnutých podmienok, cenovej ponuky a v stanovenom termíne. Odporúčam.'
    },
    {
      name: 'Pavol Varga',
      date: '16. Jún 2026',
      rating: 5,
      text: 'Špičková kvalita a individuálny prístup. Technologický návrh s komponentmi Deye a zapojením inteligentných wallboxov prispôsobili chodu našej domácnosti. Integrácia batériového úložiska vykazuje vysokú efektivitu.'
    },
    {
      name: 'Michal Chovanec',
      date: '17. Júl 2026',
      rating: 5,
      text: 'Profesionálny prístup a perfektná realizácia. Všetko po sebe upratali do čista. Nevidí sa často takáto kvalita nákupu a montáže. Ďakujem.'
    },
    {
      name: 'Peter Ordoš',
      date: '10. August 2026',
      rating: 5,
      text: 'Práce vykonali profesionálne a dôkladne, dokonca poopravovali aj nedorobky po predošlej firme. Firmu jednoznačne odporúčam, patria k tomu najlepšiemu čo na Slovensku máme.'
    }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            Skúsenosti klientov
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Čo o nás hovoria naši zákazníci?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Vaša spokojnosť je pre nás prvoradá. Prečítajte si recenzie od klientov, ktorým sme priniesli energetickú nezávislosť.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="text-xs text-slate-500 font-semibold ml-2">Overená recenzia</span>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm">{rev.name}</p>
                  <p className="text-[10px] text-slate-500">{rev.date}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">
                  G
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
