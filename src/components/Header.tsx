import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, ChevronRight } from 'lucide-react';
import { ASSETS } from '../data/primeRodasData';
import { PrimeRodasLogo } from './PrimeRodasLogo';

interface HeaderProps {
  onOpenWhatsAppModal: () => void;
  onOpenAdminPanel?: () => void;
  hasPendingFields?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWhatsAppModal,
  onOpenAdminPanel,
  hasPendingFields = true
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinksLeft = [
    { name: 'Início', href: '#hero' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Unidades', href: '#unidades' },
  ];

  const navLinksRight = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <>
      {/* Optional Pending Fields Admin Bar */}
      {hasPendingFields && onOpenAdminPanel && (
        <div className="bg-[#E30613] text-white text-xs font-semibold py-1.5 px-4 text-center fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 shadow-md">
          <span>⚠️ Existem campos pendentes de confirmação (Telefones / Endereço).</span>
          <button
            onClick={onOpenAdminPanel}
            className="underline hover:text-white font-bold ml-1 cursor-pointer"
          >
            Editar no Painel
          </button>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          hasPendingFields ? 'top-[32px]' : 'top-0'
        } ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl h-20'
            : 'bg-transparent border-b border-white/5 h-20'
        } flex items-center`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 w-full flex items-center justify-between">
          
          {/* Desktop Left Nav */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-medium tracking-[0.1em] text-[#B7B7B7] uppercase">
            {navLinksLeft.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Centered Logo */}
          <div className="flex items-center">
            <a href="#hero" className="flex flex-col items-center group cursor-pointer hover:opacity-90 transition-opacity">
              <PrimeRodasLogo height={36} variant="white" />
            </a>
          </div>

          {/* Desktop Right Nav & CTA */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-8 text-[11px] font-medium tracking-[0.1em] text-[#B7B7B7] uppercase">
              {navLinksRight.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <button
              onClick={onOpenWhatsAppModal}
              className="px-6 py-2.5 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#E30613] hover:border-[#E30613] transition-all duration-300 shadow-[0_0_15px_rgba(227,6,19,0.2)] hover:shadow-[0_0_25px_rgba(227,6,19,0.5)] cursor-pointer"
            >
              Falar no WhatsApp
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onOpenWhatsAppModal}
              className="bg-[#E30613] text-white p-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(227,6,19,0.4)]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white backdrop-blur-md"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-4 top-24 z-50 bg-[#050505]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 shadow-2xl animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {[...navLinksLeft, ...navLinksRight].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-200 hover:text-[#E30613] py-2 border-b border-white/5"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>
              ))}

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWhatsAppModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#E30613] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-full shadow-[0_0_20px_rgba(227,6,19,0.4)]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

