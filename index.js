const {app, BrowserWindow, ipcMain, Notification} = require("electron");
const ipc = ipcMain;
const { autoUpdater } = require("electron-updater");
autoUpdater.autoDownload = false;


function updateCheck() {
    autoUpdater.checkForUpdates()
    
}

const NOTIFICATION_TITLE = 'New Update'
const NOTIFICATION_BODY = 'Starting to download updates!'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

async function load() {
//loads the update check
const lib = new BrowserWindow({
    width: 1200,
    height: 600,
    minHeight: 560,
    minWidth: 940,
    thickFrame: true,
    frame: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devtools: true
    }
});

lib.loadFile("./src/index.html");

ipc.on("closeApp", () => {
lib.close()
});
ipc.on("minimiseApp", () => {
lib.minimize()
});
ipc.on("dockApp", () => {
if (lib.isMaximized()) {
    lib.restore()
} else {
    lib.maximize()
}
});
    updateCheck()
    autoUpdater.on('update-available', () => {
        start(true, lib);
    });
}

async function start(update, old_win) {
    if (update) {
        showNotification()
        old_win.close()

        const lib = new BrowserWindow({
            width: 600,
            height: 800,
            minHeight: 600,
            minWidth: 800,
            maxHeight: 600,
            maxWidth: 800,
            thickFrame: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devtools: true
            }
        });

        lib.loadFile("./src/updater.html");
    }
}

app.whenReady().then(() => {
    load()
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length == 0) load()
    });
    app.on('window-all-closed', () => {
        app.quit();
    });
});