const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  mainWindow.loadURL('http://localhost:3002') // or load local file after build
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

  await previewWin.loadURL(`http://localhost:3000/pdf-preview?mawb=${mawbNumber}`)
})

