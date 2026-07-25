import React from 'react';
import { MessageCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { ASSETS } from '../data/primeRodasData';

interface HeroProps {
  onOpenConsultantModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultantModal }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-[#050505] text-white">
      
      {/* Abstract Background Lights */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E30613] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-white opacity-5 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Column Left: Copy & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Tag Badge */}
            <div className="inline-block py-1.5 px-4 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#B7B7B7] uppercase">
                PRIME RODAS • NATAL/RN
              </span>
            </div>
            
            {/* Immersive Typography Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black leading-[0.9] tracking-tighter font-sans">
              Seu carro.<br />
              Seu estilo.<br />
              <span className="text-[#E30613] drop-shadow-[0_0_25px_rgba(227,6,19,0.4)]">
                Nossa especialidade.
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#B7B7B7] max-w-md text-sm sm:text-base leading-relaxed">
              Especialistas em recuperação de rodas, pneus e serviços automotivos para deixar seu veículo mais seguro, confortável e valorizado.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#contato"
                className="px-8 py-4 bg-[#E30613] hover:bg-[#c00410] rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(227,6,19,0.35)] hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3 cursor-pointer text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar com um consultor</span>
              </a>

              <a
                href="#servicos"
                className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Conhecer os serviços</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>

            {/* Feature Dots */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#E30613] rounded-full" />
                <span className="text-[10px] uppercase tracking-wider text-[#B7B7B7] font-semibold">Atendimento Especializado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#E30613] rounded-full" />
                <span className="text-[10px] uppercase tracking-wider text-[#B7B7B7] font-semibold">Equipamentos Profissionais</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#E30613] rounded-full" />
                <span className="text-[10px] uppercase tracking-wider text-[#B7B7B7] font-semibold">Duas Unidades</span>
              </div>
            </div>

          </div>

          {/* Column Right: Storefront Photo & Glass Composition */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end h-full">
            
            <div className="relative w-full max-w-[480px] flex items-center justify-center">
              
              {/* Glass Backdrop Glow */}
              <div className="absolute inset-0 bg-[#E30613]/10 rounded-[32px] blur-2xl -z-10" />
              
              {/* Background Asterisk Symbol */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[260px] sm:text-[320px] text-white/5 font-bold select-none pointer-events-none -z-20">
                *
              </div>

              {/* Floating Glass Card - Top Left */}
              <div className="hidden sm:block absolute -top-4 -left-6 bg-[#0a0a0a]/90 backdrop-blur-lg border border-white/12 p-3.5 rounded-2xl w-48 shadow-2xl z-20">
                <div className="text-[10px] font-bold text-[#E30613] mb-1 tracking-widest uppercase">
                  NOSSA ESTRUTURA
                </div>
                <div className="text-[10px] text-[#B7B7B7] leading-tight">
                  Loja moderna com showroom completo de rodas e pneus.
                </div>
              </div>

              {/* Floating Glass Card - Bottom Right */}
              <div className="hidden sm:block absolute -bottom-4 -right-4 bg-[#0a0a0a]/90 backdrop-blur-lg border border-white/12 px-4 py-3 rounded-2xl shadow-2xl z-20">
                <div className="flex items-center gap-2.5 text-[10px] font-bold tracking-widest text-white">
                  <span>RODAS</span>
                  <span className="text-[#E30613] text-sm">*</span>
                  <span>PNEUS</span>
                  <span className="text-[#E30613] text-sm">*</span>
                  <span>SERVIÇOS</span>
                </div>
              </div>

              {/* Storefront Image Container */}
              <div className="relative z-10 w-full overflow-hidden rounded-[28px] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
                <img
                  src={ASSETS.storefront}
                  alt="Fachada e Loja Prime Rodas"
                  className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-medium">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px]">
                    primerodas.com.br
                  </span>
                  <span className="bg-[#E30613] text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                    Loja Física
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden lg:flex absolute bottom-12 left-12 flex-col items-center gap-3 z-20">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#B7B7B7] rotate-[-90deg] translate-y-[-20px] whitespace-nowrap">
          Role para conhecer
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#E30613] to-transparent" />
      </div>

    </section>
  );
};

