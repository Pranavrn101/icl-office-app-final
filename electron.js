// electron.js

import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ...........................................................
// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//     },
//   });

//   // THE FIX: Use Electron's built-in `app.isPackaged` property.
//   // This is the standard, reliable way to check for production.
//   const startUrl = app.isPackaged
//     ? // If the app is packaged, load the file from the 'out' directory
//       url.format({
//         pathname: path.join(__dirname, 'out/index.html'),
//         protocol: 'file:',
//         slashes: true,
//       })
//     : // In development, load the Next.js dev server
//       'http://localhost:3000';

//   console.log('LOADING URL:', startUrl); // This will now show the correct file:// path

//   win.loadURL(startUrl);

//   // You can keep this for one last test, then remove it for the final build.
//   win.webContents.openDevTools();
// }
// ...................................................................
// ===================================================================
// THE FIX: Add this line to disable GPU hardware acceleration.
app.disableHardwareAcceleration();
// ===================================================================
//Test html
function createWindow() {
  const win = new BrowserWindow({ /* ... your options ... */ });

  // --- TEMPORARY CHANGE: Force it to load the simple test file ---
  const testUrl = url.format({
    pathname: path.join(__dirname, 'test.html'), // Point to test.html
    protocol: 'file:',
    slashes: true,
  });

  console.log('LOADING TEST URL:', testUrl);
  win.loadURL(testUrl);
  win.webContents.openDevTools();
}
//test html


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});