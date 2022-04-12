document.getElementById("updating").innerText = "Confirming Update Check";
const { autoUpdater } = require("electron-updater");
const { Notification } = require("electron");

function updateCheck() {
    autoUpdater.checkForUpdates()
}
async function start() {
    autoUpdater.downloadUpdate()
    autoUpdater.on('update-downloaded', async() => {
        document.getElementById("updating").innerText = "Starting Install";
        await new Notification({title: "Starting Install!", body: "Installing Update!"}).show()
        autoUpdater.quitAndInstall()
    });
}
async function load() {
    updateCheck()
    autoUpdater.on('update-available', () => {
        document.getElementById("updating").innerText = "Starting Download...";
        start(true);
    });
}
load()