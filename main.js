const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

// Define isDev
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let mainWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false // Add this for security
    }
  })

  // Fix variable name and path
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    // Change 'out' to 'build' (or whatever your React build folder is called)
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }

  // Optional: Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
})

ipcMain.handle('open-preview-window', async (_, mawbNumber) => {
  const previewWin = new BrowserWindow({
    width: 1000,
    height: 800,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  })

  // This will only work in development
  if (isDev) {
    await previewWin.loadURL(`http://localhost:3000/pdf-preview?mawb=${mawbNumber}`)
  } else {
    // You'll need to handle this for production
    // Maybe load a local HTML file or disable this feature in production
  }
})

// Handle app activation (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})