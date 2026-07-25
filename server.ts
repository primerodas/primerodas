import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// High limit JSON body parser to accept image uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Ensure data directory exists for server-side persistence
const DATA_DIR = path.join(process.cwd(), 'data_store');
const DATA_FILE = path.join(DATA_DIR, 'site_store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface SiteStoreData {
  masterUser: {
    username: string;
    passwordHash: string;
  } | null;
  assets: Record<string, string>;
  units: any[] | null;
}

function hashPassword(pwd: string): string {
  let hash = 0;
  for (let i = 0; i < pwd.length; i++) {
    const char = pwd.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'ph_' + Math.abs(hash).toString(36) + '_' + pwd.length;
}

function loadStore(): SiteStoreData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error('Error loading site store:', e);
  }
  return {
    masterUser: null,
    assets: {},
    units: null,
  };
}

function saveStore(data: SiteStoreData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving site store:', e);
  }
}

// Global server state
let currentStore = loadStore();

// --- API ROUTES ---

// 1. Get global site data (publicly available to ALL visitors)
app.get('/api/site-data', (req, res) => {
  res.json({
    assets: currentStore.assets || {},
    units: currentStore.units || null,
    isRegistered: !!currentStore.masterUser,
    masterUsername: currentStore.masterUser ? currentStore.masterUser.username : null,
  });
});

// 2. Register Master User (Once only)
app.post('/api/register-master', (req, res) => {
  if (currentStore.masterUser) {
    return res.status(400).json({ success: false, message: 'Usuário master já foi cadastrado anteriormente.' });
  }

  const { username, password } = req.body;
  if (!username || !password || password.length < 4) {
    return res.status(400).json({ success: false, message: 'Usuário ou senha inválidos (senha mínima 4 caracteres).' });
  }

  currentStore.masterUser = {
    username: username.trim(),
    passwordHash: hashPassword(password),
  };

  saveStore(currentStore);
  res.json({ success: true, masterUsername: currentStore.masterUser.username });
});

// 3. Login Admin
app.post('/api/login-admin', (req, res) => {
  if (!currentStore.masterUser) {
    return res.status(400).json({ success: false, message: 'Nenhum usuário master cadastrado ainda.' });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Preencha usuário e senha.' });
  }

  const isUserMatch = username.trim().toLowerCase() === currentStore.masterUser.username.toLowerCase();
  const isPassMatch = hashPassword(password) === currentStore.masterUser.passwordHash;

  if (isUserMatch && isPassMatch) {
    res.json({ success: true, masterUsername: currentStore.masterUser.username });
  } else {
    res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
  }
});

// 4. Update asset (Global photo upload for everyone)
app.post('/api/update-asset', (req, res) => {
  const { key, newUrl } = req.body;
  if (!key || !newUrl) {
    return res.status(400).json({ success: false, message: 'Parâmetros inválidos.' });
  }

  if (!currentStore.assets) {
    currentStore.assets = {};
  }

  currentStore.assets[key] = newUrl;
  saveStore(currentStore);

  res.json({ success: true, key, newUrl });
});

// 5. Reset single asset
app.post('/api/reset-asset', (req, res) => {
  const { key } = req.body;
  if (key && currentStore.assets) {
    delete currentStore.assets[key];
    saveStore(currentStore);
  }
  res.json({ success: true, key });
});

// 6. Reset all assets
app.post('/api/reset-all-assets', (req, res) => {
  currentStore.assets = {};
  saveStore(currentStore);
  res.json({ success: true });
});

// 7. Update store units data
app.post('/api/update-units', (req, res) => {
  const { units } = req.body;
  if (Array.isArray(units)) {
    currentStore.units = units;
    saveStore(currentStore);
  }
  res.json({ success: true });
});

// 8. Change Master Password
app.post('/api/change-password', (req, res) => {
  if (!currentStore.masterUser) {
    return res.status(400).json({ success: false, message: 'Usuário master não encontrado.' });
  }

  const { oldPassword, newPassword } = req.body;
  if (hashPassword(oldPassword) !== currentStore.masterUser.passwordHash) {
    return res.status(400).json({ success: false, message: 'Senha atual incorreta.' });
  }

  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ success: false, message: 'Nova senha deve ter no mínimo 4 caracteres.' });
  }

  currentStore.masterUser.passwordHash = hashPassword(newPassword);
  saveStore(currentStore);

  res.json({ success: true, message: 'Senha alterada com sucesso!' });
});

// --- VITE / STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
