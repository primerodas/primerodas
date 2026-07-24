import React, { useState, useRef, useCallback } from 'react';
import { ASSETS } from '../data/primeRodasData';
import { BrandAsterisk } from './BrandAsterisk';
import { SlidersHorizontal, Info } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let pos = (x / rect.width) * 100;
      if (pos < 0) pos = 0;
      if (pos > 100) pos = 100;
      setSliderPos(pos);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#E30613] tracking-widest uppercase mb-4">
            <BrandAsterisk size={12} />
            <span>RESULTADOS REAIS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Veja a transformação.
          </h2>

          <p className="text-base text-gray-300 font-normal">
            Arraste o controle e confira o resultado de uma roda revitalizada.
          </p>
        </div>

        {/* Interactive Before/After Comparison Container */}
        <div className="max-w-4xl mx-auto">
          
          {/* Admin Notice Banner */}
          <div className="mb-4 bg-white/5 border border-white/10 rounded-xl py-2 px-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Info className="w-4 h-4 text-[#E30613] shrink-0" />
            <span>
              Nota administrativa: Substitua estas imagens por fotografias reais de serviços realizados pela Prime Rodas.
            </span>
          </div>

          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/15 shadow-2xl select-none cursor-ew-resize bg-[#151515]"
          >
            {/* After Image (Full Base) */}
            <img
              src={ASSETS.afterWheel}
              alt="Roda Restaurada - Depois"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-[#151515]/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-white tracking-wider z-10">
              DEPOIS (Restauração)
            </div>

            {/* Before Image (Clipped Layer) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={ASSETS.beforeWheel}
                alt="Roda Danificada - Antes"
                className="absolute inset-0 max-w-none h-full object-cover"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#E30613] tracking-wider z-10">
                ANTES (Danificada)
              </div>
            </div>

            {/* Slider Drag Divider Bar */}
            <div
              className="absolute inset-y-0 w-1 bg-[#E30613] shadow-[0_0_15px_#E30613] cursor-ew-resize z-20 flex items-center justify-center"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-[#E30613] text-white border-2 border-white shadow-xl flex items-center justify-center text-xs -ml-0.5">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
