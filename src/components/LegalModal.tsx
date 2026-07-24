import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-[#151515] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left text-gray-300 space-y-4">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-extrabold text-white">
          {isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'}
        </h3>

        {isPrivacy ? (
          <div className="text-sm space-y-3 leading-relaxed">
            <p>
              A <strong>Prime Rodas Natal</strong> respeita a sua privacidade. Esta política descreve como tratamos as informações fornecidas ativamente pelos clientes em nossos canais digitais.
            </p>
            <p>
              <strong>1. Coleta de Dados:</strong> Coletamos apenas informações fornecidas diretamente por você através do nosso formulário de atendimento no WhatsApp (Nome, Telefone, Modelo do Veículo e Unidade de Interesse).
            </p>
            <p>
              <strong>2. Uso das Informações:</strong> Seus dados são utilizados exclusivamente para responder às suas solicitações de orçamento, agendamento de serviços e suporte ao cliente.
            </p>
            <p>
              <strong>3. Compartilhamento:</strong> Não vendemos ou compartilhamos dados com terceiros para fins de marketing.
            </p>
            <p>
              <strong>4. Contato:</strong> Em caso de dúvidas sobre o tratamento de dados, entre em contato diretamente através de nossas lojas físicas em Natal/RN.
            </p>
          </div>
        ) : (
          <div className="text-sm space-y-3 leading-relaxed">
            <p>
              Ao utilizar este site, você concorda com os presentes Termos de Uso.
            </p>
            <p>
              <strong>1. Serviços e Orçamentos:</strong> As informações contidas neste site possuem caráter informativo. Valores, prazos e condições técnicas finais dependem de avaliação presencial do veículo por nossos profissionais.
            </p>
            <p>
              <strong>2. Propriedade Intelectual:</strong> Todos os logotipos, marcas, textos e imagens oficiais da Prime Rodas são de propriedade exclusiva.
            </p>
            <p>
              <strong>3. Atendimento:</strong> A confirmação de agendamentos deve ser validada diretamente com a equipe técnica da unidade selecionada.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#E30613] text-white font-semibold px-6 py-2.5 rounded-xl text-sm"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
