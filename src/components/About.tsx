import React from 'react';
import { ASSETS } from '../data/primeRodasData';
import { useSiteAssets } from '../context/SiteAssetsContext';
import { Disc, UserCheck, Car, MapPin } from 'lucide-react';

export const About: React.FC = () => {
  const { assets } = useSiteAssets();

  const highlights = [
    {
      title: 'Especialistas em rodas',
      desc: 'Recuperação técnica, pintura e diamantação com acabamento fino.',
      icon: Disc,
    },
    {
      title: 'Atendimento personalizado',
      desc: 'Consultores prontos para indicar a melhor solução técnica.',
      icon: UserCheck,
    },
    {
      title: 'Serviços automotivos',
      desc: 'Pneus, alinhamento 3D, suspensão e freios para seu veículo.',
      icon: Car,
    },
    {
      title: 'Duas unidades em Natal',
      desc: 'Lojas estruturadas em Mor Gouveia e Zona Sul.',
      icon: MapPin,
    },
  ];

  return (
    <section id="sobre" className="relative py-24 bg-[#050505] overflow-hidden text-white">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-[#E30613]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="inline-block py-1.5 px-4 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#B7B7B7] uppercase">
                SOBRE A PRIME RODAS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Cuidado técnico com <br className="hidden sm:inline" />
              <span className="text-[#E30613]">
                acabamento premium.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#B7B7B7] leading-relaxed max-w-2xl">
              A Prime Rodas oferece soluções especializadas para recuperação, personalização e manutenção de rodas, além de pneus e serviços automotivos. Cada atendimento é realizado com atenção aos detalhes, equipamentos adequados e compromisso com a segurança do veículo.
            </p>
          </div>

          {/* Right Metallic Wheel Presentation */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-[36px] overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-[24px] p-4 shadow-2xl group">
              
              <div className="relative w-full h-full rounded-[28px] overflow-hidden">
                <img
                  src={assets.metallicWheel}
                  alt="Acabamento metálico em rodas de liga leve"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = ASSETS.metallicWheel;
                  }}
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#E30613]/20 via-transparent to-transparent opacity-50 pointer-events-none" />

                {/* Center Glass Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#050505]/85 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#E30613] text-white flex items-center justify-center text-sm font-bold shadow-[0_0_15px_rgba(227,6,19,0.5)]">
                      *
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Qualidade Certificada
                      </h4>
                      <p className="text-[11px] text-[#B7B7B7]">
                        Tecnologia de ponta e equipe especializada em Natal
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/[0.03] backdrop-blur-[20px] border border-white/10 rounded-2xl p-6 hover:border-[#E30613]/50 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E30613] mb-4 group-hover:bg-[#E30613] group-hover:text-white transition-all shadow-md">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 tracking-wide uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-[#B7B7B7] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

