import React from 'react';
import { UnitInfo } from '../types';
import { BrandAsterisk } from './BrandAsterisk';
import { MapPin, Phone, Clock, Navigation, MessageCircle } from 'lucide-react';

interface UnitsSectionProps {
  units: UnitInfo[];
  onSelectUnitWhatsApp: (unit: UnitInfo) => void;
}

export const UnitsSection: React.FC<UnitsSectionProps> = ({ units, onSelectUnitWhatsApp }) => {
  return (
    <section id="unidades" className="relative py-24 bg-[#050505] overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#E30613]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#E30613] tracking-widest uppercase mb-4">
            <BrandAsterisk size={12} />
            <span>NOSSAS LOJAS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Escolha a unidade mais próxima.
          </h2>
        </div>

        {/* 2 Large Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="bg-white/[0.03] backdrop-blur-[18px] border border-white/12 rounded-3xl p-8 flex flex-col justify-between hover:border-[#E30613]/50 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              {/* Subtle Red Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E30613]/10 rounded-full blur-2xl group-hover:bg-[#E30613]/20 transition-all pointer-events-none" />

              <div>
                {/* Header Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white mb-6 uppercase tracking-wider">
                  <BrandAsterisk size={12} glow />
                  <span>{unit.name}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-2">
                  {unit.name}
                </h3>

                {unit.consultantName && (
                  <p className="text-sm font-bold text-[#E30613] mb-6 flex items-center gap-1.5">
                    <span>Consultor responsável:</span>
                    <span className="text-white underline decoration-[#E30613]">{unit.consultantName}</span>
                  </p>
                )}

                {/* Info List */}
                <div className="space-y-4 mb-8 text-sm text-gray-300">
                  
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Endereço
                      </span>
                      <p className="text-sm font-medium text-white">
                        {unit.address || 'Endereço a confirmar'}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Telefone
                      </span>
                      <p className="text-sm font-medium text-white">
                        {unit.phone || 'Telefone a confirmar'}
                      </p>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Horário de Atendimento
                      </span>
                      <p className="text-sm font-medium text-white">
                        {unit.openingHours || 'Horário a confirmar'}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Unit Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/10">
                <button
                  onClick={() => onSelectUnitWhatsApp(unit)}
                  className="inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#c00410] text-white font-semibold py-3 px-5 rounded-2xl shadow-[0_0_20px_rgba(227,6,19,0.3)] transition-all cursor-pointer text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar com esta unidade</span>
                </button>

                <a
                  href={unit.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-5 rounded-2xl border border-white/12 backdrop-blur-md transition-all text-xs sm:text-sm"
                >
                  <Navigation className="w-4 h-4 text-gray-400" />
                  <span>Como chegar</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
