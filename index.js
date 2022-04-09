const {app, BrowserWindow} = require("electron");

function load() {
    const lib = new BrowserWindow({
        width: 800,
        height: 1200
    });

    lib.loadFile("./index.html")
}

app.whenReady().then(() => {
    load()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length == 0) load()
    });
});