const {app, BrowserWindow, ipcMain, Notification} = require("electron");
const ipc = ipcMain;
//const { update } = require("lodash");
const { CheckForUpdates, execute } = require("uaup-js");

app.whenReady().then(() => {
    load()
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length == 0) load()
    });
    app.on('window-all-closed', () => {
        app.quit();
    });
});

async function updateCheck() {
    const defaultStages = {
        Checking: "Checking...", // When Checking For Updates.
        Found: "Update Found!",  // If an Update is Found.
        NotFound: "You are up to date!", // If an Update is Not Found.
        Downloading: "Downloading Latest Version...", // When Downloading Update.
        Unzipping: "Installing...", // When Unzipping the Archive into the Application Directory.
        Cleaning: "Installing...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
        Launch: "Starting App.." // When Launching the Application.
    };
    
    const updateOptions = {
        gitRepo: "test-electron-project", // [Required] Your Repo Name
        gitUsername: "ahqsoftwares",  // [Required] Your GitHub Username.
    
        appName: "electron-project", //[Required] The Name of the app archive and the app folder.
        appExecutableName: "electron-project.exe", //[Required] The Executable of the Application to be Run after updating.
    
        progressBar: document.getElementById("download"), // {Default is null} [Optional] If Using Electron with a HTML Progressbar, use that element here, otherwise ignore
        label: document.getElementById("download-label"), // {Default is null} [Optional] If Using Electron, this will be the area where we put status updates using InnerHTML
        stageTitles: defaultStages, // {Default is defaultStages} [Optional] Sets the Status Title for Each Stage
    };

    return await CheckForUpdates(updateOptions);
}

const NOTIFICATION_TITLE = 'New Update'
const NOTIFICATION_BODY = 'Starting to download updates!'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

async function load() {
            const updater = new BrowserWindow({
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
        start(await(updateCheck()), updater);
}

execute(async function() {
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
});

async function start(update, updater) {
    if (update) {
        showNotification()
    }
        //old_win.close()
        updater.loadFile("./src/updater.html");

        // ipc.on("executeClosure", () => {
        //     updater.close()
        // });
}

app.whenReady().then(() => {
    load()
    app.on('window-all-closed', () => {
        app.quit();
    });
});
