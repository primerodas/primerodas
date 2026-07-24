import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, Phone, X, MapPin } from 'lucide-react';
import { UnitInfo } from '../types';

interface FloatingControlsProps {
  units: UnitInfo[];
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ units }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showUnitSelector, setShowUnitSelector] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWhatsAppUnit = (unit: UnitInfo) => {
    setShowUnitSelector(false);
    const waNum = unit.whatsapp ? unit.whatsapp.replace(/\D/g, '') : '5584981621968';
    const text = encodeURIComponent(`Olá! Vim pelo site da Prime Rodas e gostaria de falar com a unidade ${unit.name}.`);
    window.open(`https://wa.me/${waNum}?text=${text}`, '_blank');
  };

  const primaryPhone = units[0]?.phone ? units[0].phone.replace(/\D/g, '') : '5584981621968';

  return (
    <>
      {/* Floating Buttons Group - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* Back To Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg hover:bg-white/20 transition-all cursor-pointer animate-fadeIn"
            aria-label="Voltar ao Topo"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Call Button (Mobile Only) */}
        <a
          href={`tel:${primaryPhone}`}
          className="sm:hidden p-3.5 rounded-full bg-[#151515] border border-white/20 text-white backdrop-blur-md shadow-lg"
          aria-label="Ligar para Prime Rodas"
        >
          <Phone className="w-5 h-5 text-[#E30613]" />
        </a>

        {/* Main WhatsApp Floating Trigger Button */}
        <div className="relative group">
          <button
            onClick={() => setShowUnitSelector(!showUnitSelector)}
            className="relative flex items-center justify-center p-4 rounded-full bg-[#E30613] text-white shadow-[0_0_25px_rgba(227,6,19,0.5)] hover:shadow-[0_0_35px_rgba(227,6,19,0.8)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Falar com a Prime Rodas no WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#050505] animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#050505]" />
          </button>

          {/* Hover Tooltip Label */}
          <div className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#151515]/90 border border-white/15 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Falar com a Prime Rodas
          </div>
        </div>

      </div>

      {/* Floating Glass Modal Panel - Escolha uma Unidade */}
      {showUnitSelector && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm bg-[#151515] border border-white/15 rounded-3xl p-6 shadow-2xl text-left space-y-4">
            
            <button
              onClick={() => setShowUnitSelector(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E30613]/10 text-[#E30613] text-xs font-bold uppercase mb-2">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WHATSAPP DIRETO</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Escolha uma unidade
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Selecione a loja de sua preferência em Natal:
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {units.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => handleOpenWhatsAppUnit(unit)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#E30613]/50 hover:bg-white/[0.08] transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#E30613]/20 text-[#E30613] group-hover:bg-[#E30613] group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {unit.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1">
                        {unit.address}
                      </p>
                    </div>
                  </div>
                  <MessageCircle className="w-4 h-4 text-[#E30613] shrink-0" />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
