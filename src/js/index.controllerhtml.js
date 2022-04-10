const {ipcRenderer} = require("electron");

const ipc = ipcRenderer;

///close
closeBTN.addEventListener("click", () => {
    ipc.send("closeApp");
});
///minimise
minimiseBTN.addEventListener("click", () => {
    ipc.send("minimiseApp");
});
///dock
dockBTN.addEventListener("click", () => {
    ipc.send("dockApp");
    if (dockBTN.innerText == "◱") {
        dockBTN.innerText = "▢"
    } else {
        dockBTN.innerText = "◱"
    }
});
