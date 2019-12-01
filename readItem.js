const { BrowserWindow } = require("electron");
// create offscreen renderer
let offscreenWindow;

// load the item url
module.exports = (url, callback) => {
  // node integration has to be false, because wide
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true,
      nodeIntegration: false
    }
  });

  // load item URL into renderer
  offscreenWindow.loadURL(url);

  offscreenWindow.webContents.on("did-finish-load", () => {
    let title = offscreenWindow.getTitle();
    offscreenWindow.webContents.capturePage().then(image => {
      // get the image as dataURL
      let screenshot = image.toDataURL();
      // execute callback with new item object
      callback({
        title,
        screenshot,
        url
      });

      offscreenWindow.close();
      offscreenWindow = null;
    });
  });
};
// retrieve the item screenshot and title
