import React, { createContext, useContext, useState, useEffect } from 'react';
import { ASSETS } from '../data/primeRodasData';
import { UnitInfo } from '../types';
import {
  subscribeToSiteConfig,
  updateSiteAssetInFirebase,
  resetSiteAssetInFirebase,
  resetAllSiteAssetsInFirebase,
  ensureDefaultMasterInFirebase,
} from '../lib/firebase';

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
    defaultUrl: ASSETS.storefront,
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

interface SiteAssetsContextType {
  assets: Record<AssetKey, string>;
  updateAsset: (key: AssetKey, newUrl: string) => void;
  resetAsset: (key: AssetKey) => void;
  resetAllAssets: () => void;
  
  // Auth state
  isRegistered: boolean;
  isLoggedIn: boolean;
  masterUsername: string | null;
  registerMasterUser: (username: string, password: string) => Promise<boolean>;
  loginAdmin: (username: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  saveUnitsServer: (units: UnitInfo[]) => Promise<boolean>;
  serverUnits: UnitInfo[] | null;
}

const STORAGE_ASSETS_KEY = 'prime_rodas_custom_assets_v2';

const SiteAssetsContext = createContext<SiteAssetsContextType | undefined>(undefined);

export const SiteAssetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local state initialized with defaults/cached
  const [customAssets, setCustomAssets] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ASSETS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [masterUsername, setMasterUsername] = useState<string | null>(null);
  const [serverUnits, setServerUnits] = useState<UnitInfo[] | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('prime_rodas_admin_session') === 'true';
  });

  // Subscribe to real-time Firestore updates & fetch initial data from server
  useEffect(() => {
    ensureDefaultMasterInFirebase();

    // 1. Subscribe to Firestore database for real-time changes across all browsers
    const unsubscribe = subscribeToSiteConfig((data) => {
      if (data.assets) {
        setCustomAssets(data.assets);
        try {
          localStorage.setItem(STORAGE_ASSETS_KEY, JSON.stringify(data.assets));
        } catch (e) {
          console.warn('LocalStorage sync warning:', e);
        }
      }
      if (data.masterUser) {
        setIsRegistered(true);
        setMasterUsername(data.masterUser.username);
      }
      if (data.units) {
        setServerUnits(data.units);
      }
    });

    // 2. Initial fetch from server API
    const fetchSiteData = async () => {
      try {
        const res = await fetch('/api/site-data');
        if (res.ok) {
          const data = await res.json();
          if (data.assets && Object.keys(data.assets).length > 0) {
            setCustomAssets((prev) => ({ ...prev, ...data.assets }));
          }
          if (data.isRegistered !== undefined) {
            setIsRegistered(data.isRegistered);
          }
          if (data.masterUsername) {
            setMasterUsername(data.masterUsername);
          }
          if (data.units) {
            setServerUnits(data.units);
          }
        }
      } catch (err) {
        console.warn('Could not fetch site-data from server backend:', err);
      }
    };

    fetchSiteData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Compute active assets with fallbacks to defaults
  const assets: Record<AssetKey, string> = {
    storefront: customAssets.storefront || ASSETS.storefront,
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

    // Persist to Firestore database
    updateSiteAssetInFirebase(key, newUrl);

    // Also persist to server endpoint for redundancy
    fetch('/api/update-asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, newUrl }),
    }).catch((err) => console.error('Failed to sync asset update to server:', err));
  };

  const resetAsset = (key: AssetKey) => {
    const updated = { ...customAssets };
    delete updated[key];
    setCustomAssets(updated);

    try {
      localStorage.setItem(STORAGE_ASSETS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage reset warning:', e);
    }

    resetSiteAssetInFirebase(key);

    fetch('/api/reset-asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    }).catch((err) => console.error('Failed to reset asset on server:', err));
  };

  const resetAllAssets = () => {
    setCustomAssets({});
    try {
      localStorage.removeItem(STORAGE_ASSETS_KEY);
    } catch (e) {
      console.warn('LocalStorage clear warning:', e);
    }

    resetAllSiteAssetsInFirebase();

    fetch('/api/reset-all-assets', {
      method: 'POST',
    }).catch((err) => console.error('Failed to reset all assets on server:', err));
  };

  const registerMasterUser = async (username: string, password: string): Promise<boolean> => {
    if (!username.trim() || !password.trim()) return false;
    try {
      const res = await fetch('/api/register-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsRegistered(true);
        setMasterUsername(username.trim());
        setIsLoggedIn(true);
        sessionStorage.setItem('prime_rodas_admin_session', 'true');
        return true;
      }
    } catch (e) {
      console.error('Error registering master user:', e);
    }
    return false;
  };

  const loginAdmin = async (username: string, password: string): Promise<boolean> => {
    const cleanUser = username.trim().toLowerCase();
    
    // Direct shortcut for default admin credentials
    if (cleanUser === 'admin' && password === 'admin@123') {
      setIsLoggedIn(true);
      setMasterUsername('admin');
      sessionStorage.setItem('prime_rodas_admin_session', 'true');
      fetch('/api/login-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      }).catch(() => {});
      return true;
    }

    try {
      const res = await fetch('/api/login-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        setMasterUsername(data.masterUsername || username.trim());
        sessionStorage.setItem('prime_rodas_admin_session', 'true');
        return true;
      }
    } catch (e) {
      console.error('Error logging in admin:', e);
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('prime_rodas_admin_session');
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      return { success: data.success, message: data.message };
    } catch (e) {
      return { success: false, message: 'Erro ao conectar ao servidor para alterar a senha.' };
    }
  };

  const saveUnitsServer = async (units: UnitInfo[]): Promise<boolean> => {
    try {
      const res = await fetch('/api/update-units', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ units }),
      });
      const data = await res.json();
      if (data.success) {
        setServerUnits(units);
        return true;
      }
    } catch (e) {
      console.error('Error saving units to server:', e);
    }
    return false;
  };

  return (
    <SiteAssetsContext.Provider
      value={{
        assets,
        updateAsset,
        resetAsset,
        resetAllAssets,
        isRegistered,
        isLoggedIn,
        masterUsername,
        registerMasterUser,
        loginAdmin,
        logoutAdmin,
        changePassword,
        saveUnitsServer,
        serverUnits,
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
