// electron.js

import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

// This handles the __dirname equivalent in ES Modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we are in development or production
const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the correct URL for dev vs. prod
  const startUrl = isDev
    ? 'http://localhost:3000' // Your Next.js dev server
    : url.format({
        pathname: path.join(__dirname, 'out/index.html'), // The static file
        protocol: 'file:',
        slashes: true,
      });

  console.log(`Loading URL: ${startUrl}`);
  win.loadURL(startUrl);

  // Open DevTools automatically if in development
  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

// Standard macOS and Windows app lifecycle handlers
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});