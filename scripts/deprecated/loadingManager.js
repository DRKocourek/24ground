const loadingScreen = document.getElementById("loading_screen");
const errorScreen = document.getElementById("error_screen");
async function loadScripts() {
    await serverPromise;
    if (serverStatus === 500) {
        let errorMessage = document.createElement("h1");
        errorMessage.textContent = "All servers are unreachable and propably down, please try again";
        loadingScreen.style = "display: none";
    }
}
loadScripts();
