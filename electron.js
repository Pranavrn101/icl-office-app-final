const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:3000"); // dev server
  } else {
    win.loadFile(path.join(__dirname, "out/index.html")); // after export
  }
}

app.whenReady().then(createWindow);
