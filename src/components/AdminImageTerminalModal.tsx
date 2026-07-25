import React, { useState } from 'react';
import { useSiteAssets, ASSETS_CATALOG, AssetKey } from '../context/SiteAssetsContext';
import { UnitInfo } from '../types';
import {
  X,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  Check,
  LogOut,
  Image as ImageIcon,
  Key,
  Store,
  CheckCircle2,
  AlertCircle,
  Save,
  Sparkles,
} from 'lucide-react';

interface AdminImageTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  units: UnitInfo[];
  onSaveUnits: (updated: UnitInfo[]) => void;
}

export const AdminImageTerminalModal: React.FC<AdminImageTerminalModalProps> = ({
  isOpen,
  onClose,
  units,
  onSaveUnits,
}) => {
  const {
    assets,
    updateAsset,
    resetAsset,
    resetAllAssets,
    masterUsername,
    logoutAdmin,
    changePassword,
  } = useSiteAssets();

  const [activeTab, setActiveTab] = useState<'images' | 'units' | 'security'>('images');
  
  // URL Input State per asset key
  const [urlInputs, setUrlInputs] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Security Form State
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Units state
  const [editedUnits, setEditedUnits] = useState<UnitInfo[]>(units);
  const [unitsSaved, setUnitsSaved] = useState(false);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Helper to read & compress image to base64 safely for mobile & desktop persistence
  const handleFileUpload = (key: AssetKey, file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;

      // Image canvas compression helper for mobile camera photos
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to lightweight 0.78 quality JPEG (~100KB), perfect for mobile 4G/5G
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.78);
          updateAsset(key, compressedDataUrl);
          showToast(`Imagem "${key}" atualizada e otimizada com sucesso!`);
        } else {
          updateAsset(key, result);
          showToast(`Imagem "${key}" atualizada com sucesso!`);
        }
      };

      img.onerror = () => {
        // Fallback to raw base64 if canvas drawing is unavailable
        updateAsset(key, result);
        showToast(`Imagem "${key}" atualizada com sucesso!`);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleUrlApply = (key: AssetKey) => {
    const url = urlInputs[key]?.trim();
    if (!url) return;
    updateAsset(key, url);
    setUrlInputs((prev) => ({ ...prev, [key]: '' }));
    showToast(`URL aplicada com sucesso para "${key}"!`);
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    if (newPwd !== confirmPwd) {
      setPwdMsg({ success: false, text: 'A nova senha e a confirmação não coincidem.' });
      return;
    }
    const res = changePassword(currentPwd, newPwd);
    setPwdMsg({ success: res.success, text: res.message });
    if (res.success) {
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
    }
  };

  const handleUnitsSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveUnits(editedUnits);
    setUnitsSaved(true);
    setTimeout(() => setUnitsSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#121212] border border-white/15 rounded-3xl my-auto text-left shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-white/10 bg-[#161616] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E30613] tracking-widest uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Painel do Administrador Master</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Terminal de Gerenciamento de Fotos & Conteúdo
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-semibold text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              Usuário: <strong className="text-white">{masterUsername || 'Admin'}</strong>
            </span>

            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-colors cursor-pointer"
              title="Sair do painel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Banner Toast */}
        {successMessage && (
          <div className="bg-green-500/20 border-b border-green-500/40 text-green-300 text-xs font-bold px-6 py-2.5 flex items-center justify-center gap-2 animate-fadeIn shrink-0">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Nav Tabs */}
        <div className="flex border-b border-white/10 bg-black/40 px-6 pt-3 gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'images'
                ? 'bg-[#181818] text-white border-t border-x border-white/15 shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#E30613]" />
            <span>Trocar Fotos do Site ({ASSETS_CATALOG.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('units')}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'units'
                ? 'bg-[#181818] text-white border-t border-x border-white/15 shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Store className="w-4 h-4 text-[#E30613]" />
            <span>Dados das Lojas (Unidades)</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-[#181818] text-white border-t border-x border-white/15 shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Key className="w-4 h-4 text-[#E30613]" />
            <span>Segurança / Alterar Senha</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: IMAGES MANAGER */}
          {activeTab === 'images' && (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Substituição de Imagens do Site
                  </h3>
                  <p className="text-xs text-gray-400">
                    Selecione arquivos do seu dispositivo ou cole um link de imagem. As alterações são aplicadas e salvas imediatamente no site.
                  </p>
                </div>

                <button
                  onClick={() => {
                    resetAllAssets();
                    showToast('Todas as fotos foram restauradas para os padrões originais!');
                  }}
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-300 border border-white/10 text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Fotos Originais</span>
                </button>
              </div>

              {/* Grid of Editable Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ASSETS_CATALOG.map((item) => {
                  const currentUrl = assets[item.key];
                  const isCustom = currentUrl !== item.defaultUrl;

                  return (
                    <div
                      key={item.key}
                      className={`bg-[#181818] border rounded-2xl p-5 flex flex-col justify-between transition-all ${
                        isCustom ? 'border-[#E30613]/60 shadow-[0_0_15px_rgba(227,6,19,0.15)]' : 'border-white/10'
                      }`}
                    >
                      <div>
                        {/* Item Badge & Label */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300 uppercase">
                            {item.category}
                          </span>
                          {isCustom ? (
                            <span className="px-2 py-0.5 rounded bg-[#E30613]/20 border border-[#E30613]/40 text-[#E30613] text-[10px] font-bold">
                              Foto Personalizada
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-gray-500/20 text-gray-400 text-[10px] font-medium">
                              Foto Padrão
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-extrabold text-white mb-1">
                          {item.label}
                        </h4>
                        <p className="text-[11px] text-gray-400 mb-4">
                          {item.description}
                        </p>

                        {/* Image Preview Box */}
                        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black/80 border border-white/10 mb-4 flex items-center justify-center group">
                          <img
                            src={currentUrl}
                            alt={item.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback if broken image URL
                              (e.target as HTMLImageElement).src = item.defaultUrl;
                            }}
                          />
                          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white">
                            Prévia Atual
                          </div>
                        </div>

                        {/* Upload Controls */}
                        <div className="space-y-3">
                          {/* File Upload Button */}
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                              1. Carregar Foto do Dispositivo (PC/Celular)
                            </label>
                            <label className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all cursor-pointer">
                              <Upload className="w-4 h-4 text-[#E30613]" />
                              <span>Escolher Arquivo de Imagem</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(item.key, file);
                                }}
                              />
                            </label>
                          </div>

                          {/* URL Paste Input */}
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                              2. Ou Cole a URL/Link da Foto
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="url"
                                value={urlInputs[item.key] || ''}
                                onChange={(e) =>
                                  setUrlInputs({ ...urlInputs, [item.key]: e.target.value })
                                }
                                placeholder="https://exemplo.com/foto.jpg"
                                className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E30613]"
                              />
                              <button
                                type="button"
                                onClick={() => handleUrlApply(item.key)}
                                className="bg-[#E30613] hover:bg-[#c00410] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <LinkIcon className="w-3.5 h-3.5" />
                                <span>Ok</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Item Footer Reset */}
                      {isCustom && (
                        <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              resetAsset(item.key);
                              showToast(`Foto de "${item.label}" restaurada para a original.`);
                            }}
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restaurar Original</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UNITS DATA MANAGER */}
          {activeTab === 'units' && (
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Editar Informações e Telefones das Lojas
                  </h3>
                  <p className="text-xs text-gray-400">
                    Altere endereços, telefones, links de mapa e horários das unidades Zona Sul e Mor Gouveia.
                  </p>
                </div>
              </div>

              {unitsSaved && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-bold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Dados das unidades atualizados com sucesso no site!</span>
                </div>
              )}

              <form onSubmit={handleUnitsSaveSubmit} className="space-y-6">
                {editedUnits.map((u, idx) => (
                  <div key={u.id} className="bg-[#181818] border border-white/10 rounded-2xl p-5 space-y-4">
                    <span className="inline-block px-2.5 py-1 rounded bg-[#E30613]/20 border border-[#E30613]/40 text-[#E30613] text-xs font-bold uppercase tracking-wider mb-2">
                      Unidade #{idx + 1}: {u.name}
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                          Nome da Unidade
                        </label>
                        <input
                          type="text"
                          value={u.name}
                          onChange={(e) => {
                            const updated = [...editedUnits];
                            updated[idx] = { ...updated[idx], name: e.target.value };
                            setEditedUnits(updated);
                          }}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                          Endereço Completo
                        </label>
                        <input
                          type="text"
                          value={u.address}
                          onChange={(e) => {
                            const updated = [...editedUnits];
                            updated[idx] = { ...updated[idx], address: e.target.value };
                            setEditedUnits(updated);
                          }}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                          Telefone de Contato
                        </label>
                        <input
                          type="text"
                          value={u.phone}
                          onChange={(e) => {
                            const updated = [...editedUnits];
                            updated[idx] = { ...updated[idx], phone: e.target.value };
                            setEditedUnits(updated);
                          }}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                          WhatsApp (Com DDD, só números)
                        </label>
                        <input
                          type="text"
                          value={u.whatsapp}
                          onChange={(e) => {
                            const updated = [...editedUnits];
                            updated[idx] = { ...updated[idx], whatsapp: e.target.value };
                            setEditedUnits(updated);
                          }}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                          Horário de Funcionamento
                        </label>
                        <input
                          type="text"
                          value={u.openingHours}
                          onChange={(e) => {
                            const updated = [...editedUnits];
                            updated[idx] = { ...updated[idx], openingHours: e.target.value };
                            setEditedUnits(updated);
                          }}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                          Link do Google Maps
                        </label>
                        <input
                          type="text"
                          value={u.mapsUrl}
                          onChange={(e) => {
                            const updated = [...editedUnits];
                            updated[idx] = { ...updated[idx], mapsUrl: e.target.value };
                            setEditedUnits(updated);
                          }}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#E30613] hover:bg-[#c00410] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all cursor-pointer text-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações das Lojas</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: SECURITY / CHANGE PASSWORD */}
          {activeTab === 'security' && (
            <div className="max-w-md mx-auto py-4">
              <div className="mb-6 pb-4 border-b border-white/10 text-center">
                <h3 className="text-base font-bold text-white mb-1">
                  Alterar Senha de Acesso Master
                </h3>
                <p className="text-xs text-gray-400">
                  Atualize suas credenciais de segurança do administrador.
                </p>
              </div>

              {pwdMsg && (
                <div
                  className={`mb-6 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    pwdMsg.success
                      ? 'bg-green-500/20 border border-green-500/40 text-green-300'
                      : 'bg-red-500/20 border border-red-500/40 text-red-300'
                  }`}
                >
                  {pwdMsg.success ? (
                    <Check className="w-4 h-4 shrink-0 text-green-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  )}
                  <span>{pwdMsg.text}</span>
                </div>
              )}

              <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1.5">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    placeholder="Sua senha atual"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E30613]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1.5">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="Mínimo de 4 caracteres"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E30613]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1.5">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    placeholder="Repita a nova senha"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E30613]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#c00410] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all cursor-pointer text-xs"
                >
                  <Key className="w-4 h-4" />
                  <span>Salvar Nova Senha</span>
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
