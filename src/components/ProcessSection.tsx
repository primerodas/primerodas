import React from 'react';
import { MessageSquare, Search, Wrench, CheckCircle } from 'lucide-react';
import { BrandAsterisk } from './BrandAsterisk';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Atendimento',
      desc: 'O cliente entra em contato e informa o serviço desejado.',
      icon: MessageSquare,
    },
    {
      num: '02',
      title: 'Avaliação técnica',
      desc: 'A equipe verifica as condições do veículo ou das rodas.',
      icon: Search,
    },
    {
      num: '03',
      title: 'Execução',
      desc: 'O serviço é realizado com equipamentos e técnicas adequadas.',
      icon: Wrench,
    },
    {
      num: '04',
      title: 'Conferência e entrega',
      desc: 'O resultado é revisado antes da entrega ao cliente.',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E30613]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#E30613] tracking-widest uppercase mb-4">
            <BrandAsterisk size={12} />
            <span>METODOLOGIA PRIME</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Um processo simples e profissional.
          </h2>
        </div>

        {/* Steps Grid with Connecting Track Line */}
        <div className="relative">
          
          {/* Wheel Contour Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-white/10 via-[#E30613]/50 to-white/10 -translate-y-1/2 rounded-full pointer-events-none z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/[0.03] backdrop-blur-[18px] border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:border-[#E30613]/50 transition-all duration-300 group"
                >
                  {/* Step Header Badge & Icon */}
                  <div className="w-full flex items-center justify-between mb-6">
                    <span className="text-3xl font-mono font-extrabold text-[#E30613]">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#E30613] transition-colors shadow-md">
                      <StepIcon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
