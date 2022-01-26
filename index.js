const { app, BrowserWindow, Menu } = require("electron");
const { join } = require("node:path");

let win = null;

const indexHtml = "./app/index.html";

const isMac = process.platform === "darwin";

function createMenu() {
  const menu = [
    {
      label: "Window",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { type: "separator" },
        "darwin" ? { role: "close" } : { role: "quit" },
      ],
    },
    {
      label: "View",
      submenu: [{ role: "minimize" }],
    },
    {
      label: "Dev",
      submenu: [{ role: "toggleDevTools" }],
    },
  ];
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
}

function createWindow(obj, loadPath) {
  win = new BrowserWindow(
    obj
      ? obj
      : {
          width: 850,
          height: 700,
          resizable: false,
          show: false,
          webPreferences: {
            preload: join(__dirname, "./app/js/preload.js"),
          },
        }
  );

  win.loadFile(loadPath ? loadPath : indexHtml);
  win.on("ready-to-show", win.show);
}

app.on("ready", () => {
  createWindow();
  createMenu();

  win.on("closed", () => (win = null));
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});
