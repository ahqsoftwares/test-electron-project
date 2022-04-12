document.getElementById("updating").innerText = "Confirming Update Check";
const { autoUpdater } = require("electron-updater");
const { Notification } = require("electron");


autoUpdater.checkForUpdates()
autoUpdater.on('update-available', () => {
    document.getElementById("updating").innerText = "Starting Download...";
    autoUpdater.downloadUpdate()
    autoUpdater.on('update-downloaded', async() => {
        document.getElementById("updating").innerText = "Starting Install";
        await new Notification({title: "Starting Install!", body: "Installing Update!"}).show()
        autoUpdater.quitAndInstall({
            isSilent: true,
            isForceRunAfter: true
        });
    });
});
autoUpdater.on("error", async() => {
    document.getElementById("updating").innerText = "Error! Update from https://github.com/ahqsoftwares/test-electron-project";
});