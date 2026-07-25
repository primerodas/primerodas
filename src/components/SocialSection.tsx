import React from 'react';
import { BrandAsterisk } from './BrandAsterisk';
import { Instagram, Youtube } from 'lucide-react';

export const SocialSection: React.FC = () => {
  return (
    <section id="redes-sociais" className="relative py-20 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#E30613] tracking-widest uppercase mb-4">
            <BrandAsterisk size={12} />
            <span>REDES SOCIAIS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-8">
            Siga a Prime Rodas.
          </h2>

          {/* Social Icons & Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a
              href="https://instagram.com/primerodasrn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-[#E30613] text-white text-sm font-bold px-7 py-4 rounded-2xl border border-white/12 backdrop-blur-md transition-all duration-300 shadow-xl group hover:scale-105"
            >
              <Instagram className="w-5 h-5 text-[#E30613] group-hover:text-white transition-colors" />
              <span>Instagram</span>
            </a>

            <a
              href="https://youtube.com/@primerodasrn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-[#E30613] text-white text-sm font-bold px-7 py-4 rounded-2xl border border-white/12 backdrop-blur-md transition-all duration-300 shadow-xl group hover:scale-105"
            >
              <Youtube className="w-5 h-5 text-[#E30613] group-hover:text-white transition-colors" />
              <span>YouTube</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

