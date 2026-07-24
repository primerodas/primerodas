import React from 'react';

export const ServicesTicker: React.FC = () => {
  const items = [
    'Recuperação de rodas',
    'Desempeno',
    'Pintura',
    'Diamantação',
    'Pneus',
    'Alinhamento',
    'Balanceamento',
    'Suspensão',
    'Freios',
  ];

  // Continuous marquee list
  const tickerItems = [...items, ...items, ...items, ...items];

  return (
    <div
      id="servicos-faixa"
      className="relative h-16 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm flex items-center overflow-hidden select-none z-20"
    >
      {/* Subtle edge fades */}
      <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Marquee Animation Track */}
      <div className="flex items-center space-x-12 px-4 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-default">
        {tickerItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-12 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#B7B7B7]">
            <span className="hover:text-white transition-colors">{item}</span>
            <span className="text-[#E30613] text-sm font-black">*</span>
          </div>
        ))}
      </div>
    </div>
  );
};

