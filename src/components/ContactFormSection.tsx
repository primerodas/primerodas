import React, { useState } from 'react';
import { UnitInfo } from '../types';
import { BrandAsterisk } from './BrandAsterisk';
import { MessageCircle, Send, Check } from 'lucide-react';

interface ContactFormSectionProps {
  units: UnitInfo[];
  prefilledService?: string;
  prefilledUnitId?: string;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  units,
  prefilledService = 'Recuperação de rodas',
  prefilledUnitId = 'mor-gouveia',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState(prefilledUnitId);
  const [selectedService, setSelectedService] = useState(prefilledService);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [formError, setFormError] = useState('');

  const servicesList = [
    'Recuperação de rodas',
    'Desempeno de rodas',
    'Solda em rodas trincadas',
    'Pintura de rodas',
    'Diamantação e copiação',
    'Personalização de rodas',
    'Rodas de liga leve',
    'Pneus novos',
    'Pneus seminovos',
    'Montagem de pneus',
    'Alinhamento de direção',
    'Balanceamento',
    'Suspensão',
    'Freios',
    'Troca de óleo e filtros',
    'Manutenção preventiva',
    'Outro serviço'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Por favor, informe seu nome.');
      return;
    }
    if (!consent) {
      setFormError('Você precisa autorizar o contato para continuar.');
      return;
    }

    setFormError('');

    // Find selected unit object to get WhatsApp phone number
    const targetUnit = units.find((u) => u.id === selectedUnitId) || units[0];
    const unitName = targetUnit?.name || 'Prime Rodas Natal';
    const whatsappNum = targetUnit?.whatsapp ? targetUnit.whatsapp.replace(/\D/g, '') : '5584981621968';

    const textFormatted = `Olá! Meu nome é ${name.trim()}. Acessei o site da Prime Rodas e gostaria de atendimento na unidade ${unitName}.${vehicle ? ` Meu veículo é ${vehicle.trim()}` : ''} e tenho interesse no serviço de ${selectedService}.${message ? ` ${message.trim()}` : ''}`;

    const encodedText = encodeURIComponent(textFormatted);
    const waUrl = `https://wa.me/${whatsappNum}?text=${encodedText}`;

    window.open(waUrl, '_blank');
  };

  return (
    <section id="contato" className="relative py-24 bg-[#050505] overflow-hidden">
      
      {/* Background Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E30613]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Glass Card Container */}
        <div className="bg-white/[0.03] backdrop-blur-[24px] border border-white/12 rounded-[32px] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Vamos cuidar do seu carro?
            </h2>

            <p className="text-sm sm:text-base text-gray-300">
              Escolha uma unidade e informe o serviço que você procura.
            </p>
          </div>

          {formError && (
            <div className="mb-6 p-4 rounded-xl bg-[#E30613]/20 border border-[#E30613]/50 text-white text-xs font-semibold text-center animate-fadeIn">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Nome */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E30613] transition-colors"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(84) 99999-9999"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E30613] transition-colors"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Modelo do Veículo */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Modelo do Veículo
                </label>
                <input
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="Ex: Civic 2022 / Compass"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E30613] transition-colors"
                />
              </div>

              {/* Unidade */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Unidade Preferida *
                </label>
                <select
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E30613] transition-colors cursor-pointer"
                >
                  {units.map((u) => (
                    <option key={u.id} value={u.id} className="bg-[#151515] text-white">
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Serviço Desejado */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Serviço Desejado *
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E30613] transition-colors cursor-pointer"
                >
                  {servicesList.map((srv) => (
                    <option key={srv} value={srv} className="bg-[#151515] text-white">
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Mensagem */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Mensagem Adicional (Opcional)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Descreva detalhes como cor desejada, fotos da roda ou necessidade específica..."
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E30613] transition-colors"
              />
            </div>

            {/* Checkbox Consent */}
            <div className="flex items-start gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConsent(!consent)}
                className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                  consent
                    ? 'bg-[#E30613] border-[#E30613] text-white'
                    : 'bg-black/40 border-white/30 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-gray-300 leading-snug">
                Autorizo o contato da Prime Rodas para responder à minha solicitação via WhatsApp.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#E30613] hover:bg-[#c00410] text-white font-semibold text-base py-4 rounded-2xl shadow-[0_0_25px_rgba(227,6,19,0.4)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar pelo WhatsApp</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
