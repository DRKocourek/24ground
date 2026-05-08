let selectedAcft;
let previousElement = null;
let ifrCallsign = document.getElementById('ifr_callsign');
let flpCallsign = document.getElementById('flp_callsign');

function selectAcft(acft) {
    selectedAcft = acft;
    generateIFR();
    displayFlightplan();
    ifrCallsign.textContent = selectedAcft;
    flpCallsign.textContent = selectedAcft;
    let selectedElement = document.getElementsByClassName(acft)[1];
    if (!selectedElement) return;
    if (previousElement) {
        previousElement.setAttribute("id", "");
    }
    previousElement = selectedElement;  
    selectedElement.setAttribute("id", "selected");
}