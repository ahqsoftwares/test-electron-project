const {app, BrowserWindow, ipcMain, Notification} = require("electron");
const ipc = ipcMain;
const uaup = require('./pre-lib/updater_script');



const NOTIFICATION_TITLE = 'New Update'
const NOTIFICATION_BODY = 'Starting to download updates!'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

async function load() {
    /*showNotification()*/

    const updateOptions = {
        gitRepoToken: "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",
        useGithub: true, // {Default is true} [Optional] Only Github is Currenlty Supported.
        gitRepo: "test-electron-project", // [Required] Your Repo Name
        gitUsername: "ahqsoftwares",  // [Required] Your GitHub Username.
        appName: "electron-project", //[Required] The Name of the app archive and the app folder.
        appExecutableName: "updater.exe", //[Required] The Executable of the Application to be Run after updating.
        progressBar: null, // {Default is null} [Optional] If Using Electron with a HTML Progressbar, use that element here, otherwise ignore
        label: null, // {Default is null} [Optional] If Using Electron, this will be the area where we put status updates using InnerHTML
        forceUpdate: true, // {Default is false} [Optional] If the Application should be forced updated.  This w
    };

    if (await(uaup.CheckForUpdates(updateOptions))) {
        showNotification()

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

        // lib.loadFile("./src/updater.html");

        uaup.Update(updateOptions);
    } else {
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

}

app.whenReady().then(() => {
    load()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length == 0) load()
    });
});