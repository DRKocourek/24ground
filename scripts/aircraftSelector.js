let selectedAcft;
let previousElement = null;
let ifrCallsign = document.getElementById('ifr_callsign');
function selectAcft(acft) {
    const ifrCallsign = document.getElementById("ifr_callsign");
    selectedAcft = acft;
    generateIFR();
    console.log(selectedAcft);
    ifrCallsign.textContent = selectedAcft;
    let selectedElement = document.getElementsByClassName(acft)[1];
    if (!selectedElement) return;
    if (previousElement) {
        previousElement.setAttribute("id", "");
    }
    previousElement = selectedElement;  
    selectedElement.setAttribute("id", "selected");
}