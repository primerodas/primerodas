import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/primeRodasData';
import { BrandAsterisk } from './BrandAsterisk';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#E30613] tracking-widest uppercase mb-4">
            <BrandAsterisk size={12} />
            <span>TIRA-DÚVIDAS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white/[0.03] backdrop-blur-[18px] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-[#E30613] transition-colors cursor-pointer"
                >
                  <span>{item.question}</span>
                  <div className={`p-2 rounded-full bg-white/5 text-[#E30613] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#E30613] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-4 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
