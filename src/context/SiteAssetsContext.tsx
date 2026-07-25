import React, { createContext, useContext, useState, useEffect } from 'react';
import { ASSETS } from '../data/primeRodasData';

export type AssetKey =
  | 'storefront'
  | 'logo'
  | 'mascot'
  | 'metallicWheel'
  | 'beforeWheel'
  | 'afterWheel'
  | 'consultantAkson'
  | 'consultantNeto';

export interface AssetInfo {
  key: AssetKey;
  label: string;
  category: string;
  description: string;
  defaultUrl: string;
}

export const ASSETS_CATALOG: AssetInfo[] = [
  {
    key: 'storefront',
    label: 'Fachada da Loja (Hero)',
    category: 'Página Inicial',
    description: 'Imagem principal da loja exibida no destaque inicial do site.',
    defaultUrl: '/images/fachada-prime-rodas.png',
  },
  {
    key: 'mascot',
    label: 'Mascote Prime Rodas',
    category: 'Identidade Visual',
    description: 'Ilustração/foto do mascote oficial da Prime Rodas.',
    defaultUrl: ASSETS.mascot,
  },
  {
    key: 'logo',
    label: 'Logo Oficial',
    category: 'Identidade Visual',
    description: 'Logomarca Prime Rodas exibida no topo e rodapé.',
    defaultUrl: ASSETS.logo,
  },
  {
    key: 'metallicWheel',
    label: 'Roda Metálica (Sobre Nós)',
    category: 'Institucional',
    description: 'Imagem de fundo da seção Sobre a Prime Rodas.',
    defaultUrl: ASSETS.metallicWheel,
  },
  {
    key: 'beforeWheel',
    label: 'Roda Danificada (Antes)',
    category: 'Antes & Depois',
    description: 'Foto da roda danificada no comparador de restauração.',
    defaultUrl: ASSETS.beforeWheel,
  },
  {
    key: 'afterWheel',
    label: 'Roda Restaurada (Depois)',
    category: 'Antes & Depois',
    description: 'Foto da roda restaurada e diamantada no comparador.',
    defaultUrl: ASSETS.afterWheel,
  },
  {
    key: 'consultantAkson',
    label: 'Foto do Consultor Akson',
    category: 'Atendimento & Lojas',
    description: 'Foto do consultor da unidade Zona Sul.',
    defaultUrl: ASSETS.consultantAkson,
  },
  {
    key: 'consultantNeto',
    label: 'Foto do Consultor Neto',
    category: 'Atendimento & Lojas',
    description: 'Foto do consultor da unidade Mor Gouveia.',
    defaultUrl: ASSETS.consultantNeto,
  },
];

interface MasterCredentials {
  username: string;
  passwordHash: string;
}

interface SiteAssetsContextType {
  assets: Record<AssetKey, string>;
  updateAsset: (key: AssetKey, newUrl: string) => void;
  resetAsset: (key: AssetKey) => void;
  resetAllAssets: () => void;
  
  // Auth state
  isRegistered: boolean;
  isLoggedIn: boolean;
  masterUsername: string | null;
  registerMasterUser: (username: string, password: string) => boolean;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
  changePassword: (oldPassword: string, newPassword: string) => { success: boolean; message: string };
}

const STORAGE_ASSETS_KEY = 'prime_rodas_custom_assets_v1';
const STORAGE_MASTER_KEY = 'prime_rodas_master_auth_v1';

// Basic string hashing for simple storage comparison
function hashPassword(pwd: string): string {
  let hash = 0;
  for (let i = 0; i < pwd.length; i++) {
    const char = pwd.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'ph_' + Math.abs(hash).toString(36) + '_' + pwd.length;
}

const SiteAssetsContext = createContext<SiteAssetsContextType | undefined>(undefined);

export const SiteAssetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load custom assets from localStorage
  const [customAssets, setCustomAssets] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ASSETS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Load master user credentials
  const [masterCreds, setMasterCreds] = useState<MasterCredentials | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MASTER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('prime_rodas_admin_session') === 'true';
  });

  // Calculate current active assets
  const assets: Record<AssetKey, string> = {
    storefront: customAssets.storefront || '/images/fachada-prime-rodas.png',
    logo: customAssets.logo || ASSETS.logo,
    mascot: customAssets.mascot || ASSETS.mascot,
    metallicWheel: customAssets.metallicWheel || ASSETS.metallicWheel,
    beforeWheel: customAssets.beforeWheel || ASSETS.beforeWheel,
    afterWheel: customAssets.afterWheel || ASSETS.afterWheel,
    consultantAkson: customAssets.consultantAkson || ASSETS.consultantAkson,
    consultantNeto: customAssets.consultantNeto || ASSETS.consultantNeto,
  };

  const updateAsset = (key: AssetKey, newUrl: string) => {
    const updated = { ...customAssets, [key]: newUrl };
    setCustomAssets(updated);
    try {
      localStorage.setItem(STORAGE_ASSETS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }
  };

  const resetAsset = (key: AssetKey) => {
    const updated = { ...customAssets };
    delete updated[key];
    setCustomAssets(updated);
    try {
      localStorage.setItem(STORAGE_ASSETS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }
  };

  const resetAllAssets = () => {
    setCustomAssets({});
    try {
      localStorage.removeItem(STORAGE_ASSETS_KEY);
    } catch (e) {
      console.warn('LocalStorage remove warning:', e);
    }
  };

  const registerMasterUser = (username: string, password: string): boolean => {
    if (!username.trim() || !password.trim()) return false;
    const creds: MasterCredentials = {
      username: username.trim(),
      passwordHash: hashPassword(password),
    };
    try {
      localStorage.setItem(STORAGE_MASTER_KEY, JSON.stringify(creds));
      setMasterCreds(creds);
      setIsLoggedIn(true);
      sessionStorage.setItem('prime_rodas_admin_session', 'true');
      return true;
    } catch {
      return false;
    }
  };

  const loginAdmin = (username: string, password: string): boolean => {
    if (!masterCreds) return false;
    const inputHash = hashPassword(password);
    if (
      username.trim().toLowerCase() === masterCreds.username.toLowerCase() &&
      inputHash === masterCreds.passwordHash
    ) {
      setIsLoggedIn(true);
      sessionStorage.setItem('prime_rodas_admin_session', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('prime_rodas_admin_session');
  };

  const changePassword = (oldPassword: string, newPassword: string) => {
    if (!masterCreds) return { success: false, message: 'Usuário master não encontrado.' };
    if (hashPassword(oldPassword) !== masterCreds.passwordHash) {
      return { success: false, message: 'Senha atual incorreta.' };
    }
    if (newPassword.length < 4) {
      return { success: false, message: 'A nova senha deve ter no mínimo 4 caracteres.' };
    }
    const updatedCreds = { ...masterCreds, passwordHash: hashPassword(newPassword) };
    try {
      localStorage.setItem(STORAGE_MASTER_KEY, JSON.stringify(updatedCreds));
      setMasterCreds(updatedCreds);
      return { success: true, message: 'Senha alterada com sucesso!' };
    } catch {
      return { success: false, message: 'Erro ao salvar nova senha no dispositivo.' };
    }
  };

  return (
    <SiteAssetsContext.Provider
      value={{
        assets,
        updateAsset,
        resetAsset,
        resetAllAssets,
        isRegistered: !!masterCreds,
        isLoggedIn,
        masterUsername: masterCreds ? masterCreds.username : null,
        registerMasterUser,
        loginAdmin,
        logoutAdmin,
        changePassword,
      }}
    >
      {children}
    </SiteAssetsContext.Provider>
  );
};

export const useSiteAssets = () => {
  const context = useContext(SiteAssetsContext);
  if (!context) {
    throw new Error('useSiteAssets must be used within a SiteAssetsProvider');
  }
  return context;
};
