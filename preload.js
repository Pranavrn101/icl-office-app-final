const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  printToPDF: (filePath) => ipcRenderer.invoke('print-to-pdf', filePath),
})
