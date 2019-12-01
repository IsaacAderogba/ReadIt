const { app, BrowserWindow } = require("electron");
const windowStateKeeper = require("electron-window-state");

let mainWindow;

function createWindow() {
  // configure state keeper
  let mainWindowState = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650
  });

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 350,
    maxWidth: 500,
    minHeight: 300,
    webPreferences: { nodeIntegration: true }
  });

  // tell window state keeper which state to manage
  mainWindowState.manage(mainWindow)

  // load the file into the browser window
  mainWindow.loadFile("renderer/main.html");

  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
