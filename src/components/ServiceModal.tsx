import React from 'react';
import { X, MessageCircle, CheckCircle2, Shield } from 'lucide-react';
import { ServiceItem } from '../types';
import { BrandAsterisk } from './BrandAsterisk';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectWhatsApp: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectWhatsApp,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#151515] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden">
        
        {/* Background Red Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#E30613]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge & Number */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-mono font-bold text-[#E30613] bg-[#E30613]/10 px-3 py-1 rounded-lg border border-[#E30613]/30">
            #{service.number}
          </span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <BrandAsterisk size={12} />
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-extrabold text-white mb-3">
          {service.title}
        </h3>

        {/* Detailed Explanation */}
        <p className="text-sm text-gray-300 leading-relaxed mb-6 font-normal">
          {service.detailedInfo}
        </p>

        {/* Key Features List */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-200">
            <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0" />
            <span>Executado por técnicos especializados em Natal</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-200">
            <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0" />
            <span>Equipamentos de alta precisão e produtos homologados</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-200">
            <Shield className="w-4 h-4 text-[#E30613] shrink-0" />
            <span>Garantia do serviço prestado na Prime Rodas</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onSelectWhatsApp(service.title);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#c00410] text-white font-semibold py-3.5 px-6 rounded-2xl shadow-[0_0_20px_rgba(227,6,19,0.4)] transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Solicitar Orçamento no WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
