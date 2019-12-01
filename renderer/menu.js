// standalone script that runs once
const { remote, shell } = require("electron"); // access main modules

const template = [
  {
    label: "Items",
    submenu: [
      {
        label: "Add New",
        click: window.newItem,
        accelerator: "CmdOrCtrl+O"
      },
      {
        label: "Read Item",
        accelerator: "CmdOrCtrl+Enter",
        click: window.openItem
      },
      {
        label: "Delete Item",
        accelerator: "CmdOrCtrl+Backspace",
        click: window.deleteItem
      },
      {
        label: "Open in Browser",
        accelerator: "CmdOrCtrl+Shift+O",
        click: window.openItemNative
      },
      {
        label: "Search Items",
        accelerator: "CmdOrCtrl+S",
        click: window.searchItems
      }
    ]
  },
  {
    role: "editMenu"
  },
  {
    role: "windowMenu"
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn more",
        click: () => {
          shell.openExternal("https://getconduit.co");
        }
      }
    ]
  }
];

// Set Mac-specific first menu item
if (process.platform === "darwin") {
  template.unshift({
    label: remote.app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  });
}

const menu = remote.Menu.buildFromTemplate(template);

// set as main app menu
remote.Menu.setApplicationMenu(menu);
