import React, { useState } from 'react';
import { UnitInfo } from '../types';
import { X, Save, AlertTriangle, Check, RefreshCw } from 'lucide-react';

interface AdminPanelDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  units: UnitInfo[];
  onSaveUnits: (updated: UnitInfo[]) => void;
}

export const AdminPanelDrawer: React.FC<AdminPanelDrawerProps> = ({
  isOpen,
  onClose,
  units,
  onSaveUnits,
}) => {
  const [editedUnits, setEditedUnits] = useState<UnitInfo[]>(units);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (index: number, field: keyof UnitInfo, value: string) => {
    const updated = [...editedUnits];
    updated[index] = { ...updated[index], [field]: value };
    setEditedUnits(updated);
  };

  const handleSave = () => {
    onSaveUnits(editedUnits);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-[#151515] border-l border-white/15 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between text-left shadow-2xl">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2 text-white">
              <AlertTriangle className="w-5 h-5 text-[#E30613]" />
              <h3 className="text-xl font-extrabold">
                Painel do Administrador • Campos Pendentes
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed mb-6">
            Conforme solicitado, todos os dados de contato, telefones, endereços e horários das unidades que ainda necessitam de confirmação final podem ser editados diretamente abaixo para publicação imediata:
          </p>

          {savedSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-300 text-xs font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Dados das unidades atualizados com sucesso no site!</span>
            </div>
          )}

          {/* Units Form */}
          <div className="space-y-8">
            {editedUnits.map((u, idx) => (
              <div key={u.id} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-[#E30613] uppercase tracking-wider">
                    Unidade #{idx + 1}: {u.name}
                  </span>
                  {(!u.address || u.phone.includes('CONFIRMAR')) && (
                    <span className="px-2 py-0.5 rounded bg-[#E30613]/20 text-[#E30613] text-[10px] font-bold">
                      Pendências
                    </span>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                    Nome da Unidade
                  </label>
                  <input
                    type="text"
                    value={u.name}
                    onChange={(e) => handleChange(idx, 'name', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                    Endereço Completo
                  </label>
                  <input
                    type="text"
                    value={u.address}
                    onChange={(e) => handleChange(idx, 'address', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                      Telefone Fixo / Celular
                    </label>
                    <input
                      type="text"
                      value={u.phone}
                      onChange={(e) => handleChange(idx, 'phone', e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                      WhatsApp (Apenas Números)
                    </label>
                    <input
                      type="text"
                      value={u.whatsapp}
                      onChange={(e) => handleChange(idx, 'whatsapp', e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Opening Hours */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                    Horário de Funcionamento
                  </label>
                  <input
                    type="text"
                    value={u.openingHours}
                    onChange={(e) => handleChange(idx, 'openingHours', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Maps URL */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                    Link Google Maps
                  </label>
                  <input
                    type="text"
                    value={u.mapsUrl}
                    onChange={(e) => handleChange(idx, 'mapsUrl', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 mt-6">
          <button
            onClick={() => setEditedUnits(units)}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#E30613] hover:bg-[#c00410] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações</span>
          </button>
        </div>

      </div>
    </div>
  );
};
