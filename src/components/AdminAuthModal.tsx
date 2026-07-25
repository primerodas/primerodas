import React, { useState } from 'react';
import { useSiteAssets } from '../context/SiteAssetsContext';
import { Lock, UserCheck, KeyRound, ShieldAlert, X, Check, ArrowRight } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
}) => {
  const { isRegistered, registerMasterUser, loginAdmin } = useSiteAssets();

  // Master register fields
  const [regUsername, setRegUsername] = useState('admin');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regError, setRegError] = useState('');

  // Login fields
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regUsername.trim()) {
      setRegError('Informe um nome de usuário válido.');
      return;
    }
    if (regPassword.length < 4) {
      setRegError('A senha deve conter no mínimo 4 caracteres.');
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError('As senhas digitadas não coincidem.');
      return;
    }

    const ok = registerMasterUser(regUsername, regPassword);
    if (ok) {
      onSuccessLogin();
    } else {
      setRegError('Erro ao cadastrar usuário master no dispositivo.');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginError('Preencha os campos de usuário e senha.');
      return;
    }

    const success = loginAdmin(loginUsername, loginPassword);
    if (success) {
      onSuccessLogin();
    } else {
      setLoginError('Usuário ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8 text-left shadow-2xl overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#E30613]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {!isRegistered ? (
          /* FIRST-TIME MASTER REGISTRATION FLOW */
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E30613]/20 border border-[#E30613]/40 text-[#E30613] text-xs font-bold uppercase tracking-wider mb-4">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Primeiro Acesso • Cadastro Master</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">
              Cadastrar Usuário Master
            </h3>

            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              Como este é o primeiro acesso ao sistema, crie seu <strong>Usuário e Senha de Administrador</strong>. Este processo é realizado apenas <strong>uma única vez</strong> e garante que somente você terá acesso ao terminal de troca de imagens.
            </p>

            {regError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Nome de Usuário Master
                </label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="Ex: admin"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E30613] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Senha do Administrador
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Crie sua senha secreta"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E30613] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  placeholder="Repita a senha digitada"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E30613] transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#c00410] text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_0_20px_rgba(227,6,19,0.4)] transition-all cursor-pointer text-sm"
              >
                <span>Cadastrar Master e Acessar Painel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* SUBSEQUENT LOGIN FLOW */
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Lock className="w-3.5 h-3.5 text-[#E30613]" />
              <span>Acesso Restrito ao Sistema</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">
              Login do Administrador
            </h3>

            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              Informe suas credenciais de usuário master para acessar o terminal de gerenciamento de fotos.
            </p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Usuário Master
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Seu usuário cadastrado"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E30613] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Senha
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Sua senha de acesso"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E30613] transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#c00410] text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_0_20px_rgba(227,6,19,0.4)] transition-all cursor-pointer text-sm"
              >
                <UserCheck className="w-4 h-4" />
                <span>Entrar no Painel</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
