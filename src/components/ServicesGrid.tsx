import React, { useState } from 'react';
import { ServiceCategory, ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/primeRodasData';
import { ServiceModal } from './ServiceModal';
import {
  Sparkles,
  Compass,
  Flame,
  Palette,
  Gem,
  Sliders,
  Disc,
  CircleDot,
  CheckCircle2,
  Wrench,
  Target,
  Gauge,
  Activity,
  ShieldAlert,
  Droplet,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface ServicesGridProps {
  onSelectServiceWhatsApp: (serviceTitle: string) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  Compass,
  Flame,
  Palette,
  Gem,
  Sliders,
  Disc,
  CircleDot,
  CheckCircle2,
  Wrench,
  Target,
  Gauge,
  Activity,
  ShieldAlert,
  Droplet,
  ShieldCheck,
};

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceWhatsApp }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Todos');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories: ServiceCategory[] = ['Todos', 'Rodas', 'Pneus', 'Centro automotivo'];

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (activeCategory === 'Todos') return true;
    return service.category === activeCategory;
  });

  return (
    <section id="servicos" className="relative py-24 bg-[#050505] overflow-hidden text-white">
      
      {/* Background Red Glow */}
      <div className="absolute top-1/3 right-[-5%] w-[500px] h-[500px] bg-[#E30613]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block py-1.5 px-4 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#B7B7B7] uppercase">
              NOSSOS SERVIÇOS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Tudo o que o seu carro precisa em um só lugar.
          </h2>

          <p className="text-sm sm:text-base text-[#B7B7B7]">
            Soluções completas com excelência técnica para rodas, pneus e centro automotivo em Natal/RN.
          </p>
        </div>

        {/* Category Filters Pill Group */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#E30613] text-white shadow-[0_0_20px_rgba(227,6,19,0.35)] scale-[1.03]'
                  : 'bg-white/5 text-[#B7B7B7] border border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComp = iconMap[service.iconName] || Wrench;
            return (
              <div
                key={service.id}
                className="group relative bg-white/[0.03] backdrop-blur-[24px] border border-white/10 rounded-[28px] p-7 flex flex-col justify-between hover:border-[#E30613]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(227,6,19,0.15)] overflow-hidden"
              >
                {/* Subtle Red Illumination on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E30613]/0 group-hover:bg-[#E30613]/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xl font-mono font-bold text-gray-500 group-hover:text-[#E30613] transition-colors">
                      {service.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E30613] group-hover:bg-[#E30613] group-hover:text-white transition-all duration-300 shadow-md">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#B7B7B7] group-hover:text-[#E30613] transition-colors cursor-pointer"
                  >
                    <span>Saiba mais</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onSelectServiceWhatsApp(service.title)}
                    className="text-[11px] font-bold text-[#B7B7B7] hover:text-white uppercase tracking-wider underline cursor-pointer"
                  >
                    Orçar
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectWhatsApp={onSelectServiceWhatsApp}
      />

    </section>
  );
};

