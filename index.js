const {app, BrowserWindow, ipcMain, Notification} = require("electron");
const ipc = ipcMain;

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

function load() {
    /*showNotification()*/
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
}

app.whenReady().then(() => {
    load()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length == 0) load()
    });
});