const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true }
  });

  // load the file into the browser window
  mainWindow.loadFile("renderer/main.html");

  mainWindow.webContents.openDevTools();

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
