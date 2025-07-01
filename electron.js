import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const isDev = !app.isPackaged;

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "out/index.html"));
  }
}

app.whenReady().then(createWindow);
