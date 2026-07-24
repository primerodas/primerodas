import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ASSETS } from '../data/primeRodasData';

interface HighlightBannerProps {
  onOpenEvaluationModal: () => void;
}

export const HighlightBanner: React.FC<HighlightBannerProps> = ({ onOpenEvaluationModal }) => {
  return (
    <section className="relative py-24 overflow-hidden my-8">
      
      {/* Dark Red Gradient Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-[#5a0207] via-[#220204] to-[#050505] border border-[#E30613]/30 p-8 sm:p-14 shadow-2xl">
          
          {/* Background Metallic Wheel Graphic */}
          <div className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 opacity-25 lg:opacity-35 pointer-events-none mix-blend-luminosity overflow-hidden">
            <img
              src={ASSETS.metallicWheel}
              alt="Roda metálica Prime Rodas"
              className="w-full h-full object-cover object-left filter contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#220204] via-transparent to-transparent" />
          </div>

          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-[#E30613]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Content Box */}
          <div className="relative z-10 max-w-2xl text-left space-y-6">
            
            <div className="inline-block py-1.5 px-4 bg-black/40 border border-[#E30613]/40 rounded-full backdrop-blur-md">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#B7B7B7] uppercase">
                AVALIAÇÃO TÉCNICA GRATUITA
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Rodas renovadas.<br />
              Carro valorizado.
            </h2>

            <p className="text-sm sm:text-base text-[#B7B7B7] leading-relaxed">
              Recupere o acabamento, corrija danos e transforme o visual das rodas do seu veículo.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenEvaluationModal}
                className="px-8 py-4 bg-[#E30613] hover:bg-[#c00410] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_25px_rgba(227,6,19,0.45)] transition-transform hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Solicitar uma avaliação</span>
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

