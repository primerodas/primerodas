import React from 'react';
import { ASSETS } from '../data/primeRodasData';
import { BrandAsterisk } from './BrandAsterisk';
import { PrimeRodasLogo } from './PrimeRodasLogo';
import { Lock } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-12 text-left relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        
        {/* Top Center Logo & Tagline */}
        <div className="flex flex-col items-center justify-center text-center pb-12 border-b border-white/10">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-4 flex items-center justify-center">
            <PrimeRodasLogo height={42} variant="white" />
          </div>
          <p className="text-sm font-semibold text-gray-300 tracking-wider flex items-center gap-2">
            <BrandAsterisk size={14} />
            <span>Rodas, pneus e serviços automotivos.</span>
          </p>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          
          {/* Column 1: Navegação */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <BrandAsterisk size={10} />
              <span>Navegação</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#hero" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#unidades" className="hover:text-white transition-colors">Unidades</a></li>
              <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Column 2: Serviços */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <BrandAsterisk size={10} />
              <span>Serviços</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#servicos" className="hover:text-white transition-colors">Recuperação de rodas</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Pintura e personalização</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Diamantação</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Pneus novos e seminovos</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Alinhamento e balanceamento</a></li>
            </ul>
          </div>

          {/* Column 3: Unidades */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <BrandAsterisk size={10} />
              <span>Unidades</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#unidades" className="hover:text-white transition-colors">Mor Gouveia</a></li>
              <li><a href="#unidades" className="hover:text-white transition-colors">Zona Sul (Candelária)</a></li>
            </ul>
          </div>

          {/* Column 4: Redes Sociais */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <BrandAsterisk size={10} />
              <span>Redes Sociais</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="https://instagram.com/primerodasrn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://youtube.com/@primerodasrn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} Prime Rodas. Todos os direitos reservados.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-gray-300 transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-gray-300 transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
            <button
              onClick={onOpenAdmin}
              className="hover:text-gray-300 text-gray-600 transition-colors cursor-pointer flex items-center gap-1 opacity-60 hover:opacity-100"
              title="Acesso Administrativo Master"
            >
              <Lock className="w-3 h-3" />
              <span>Área Restrita</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
