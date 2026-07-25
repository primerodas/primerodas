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
