import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

export const SITE_CONFIG_DOC = doc(db, 'site_config', 'main');

export interface SiteConfigDoc {
  masterUser?: {
    username: string;
    passwordHash: string;
  } | null;
  assets?: Record<string, string>;
  units?: any[] | null;
}

export function hashPasswordClient(pwd: string): string {
  let hash = 0;
  for (let i = 0; i < pwd.length; i++) {
    const char = pwd.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'ph_' + Math.abs(hash).toString(36) + '_' + pwd.length;
}

export async function ensureDefaultMasterInFirebase(): Promise<void> {
  try {
    const snap = await getDoc(SITE_CONFIG_DOC);
    if (!snap.exists() || !snap.data()?.masterUser) {
      await setDoc(
        SITE_CONFIG_DOC,
        {
          masterUser: {
            username: 'admin',
            passwordHash: hashPasswordClient('admin@123'),
          },
        },
        { merge: true }
      );
    }
  } catch (e) {
    console.warn('Firebase default master check:', e);
  }
}

export async function saveMasterUserToFirebase(username: string, passwordHash: string): Promise<void> {
  try {
    await setDoc(
      SITE_CONFIG_DOC,
      {
        masterUser: {
          username: username.trim(),
          passwordHash,
        },
      },
      { merge: true }
    );
  } catch (e) {
    console.error('Firebase save master user error:', e);
  }
}

export async function fetchSiteConfigFromFirebase(): Promise<SiteConfigDoc | null> {
  try {
    const snap = await getDoc(SITE_CONFIG_DOC);
    if (snap.exists()) {
      return snap.data() as SiteConfigDoc;
    }
  } catch (err) {
    console.error('Firestore fetch error:', err);
  }
  return null;
}

export async function updateSiteAssetInFirebase(key: string, newUrl: string): Promise<void> {
  try {
    const snap = await getDoc(SITE_CONFIG_DOC);
    const currentData = snap.exists() ? snap.data() : {};
    const currentAssets = currentData.assets || {};
    
    await setDoc(
      SITE_CONFIG_DOC,
      {
        assets: {
          ...currentAssets,
          [key]: newUrl,
        },
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Firestore asset update error:', err);
  }
}

export async function resetSiteAssetInFirebase(key: string): Promise<void> {
  try {
    const snap = await getDoc(SITE_CONFIG_DOC);
    if (snap.exists()) {
      const data = snap.data();
      const assets = { ...(data.assets || {}) };
      delete assets[key];
      await setDoc(SITE_CONFIG_DOC, { assets }, { merge: true });
    }
  } catch (err) {
    console.error('Firestore asset reset error:', err);
  }
}

export async function resetAllSiteAssetsInFirebase(): Promise<void> {
  try {
    await setDoc(SITE_CONFIG_DOC, { assets: {} }, { merge: true });
  } catch (err) {
    console.error('Firestore reset all assets error:', err);
  }
}

export function subscribeToSiteConfig(callback: (data: SiteConfigDoc) => void) {
  return onSnapshot(SITE_CONFIG_DOC, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as SiteConfigDoc);
    }
  }, (error) => {
    console.warn('Firestore snapshot listener error:', error);
  });
}
