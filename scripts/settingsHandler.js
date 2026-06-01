let settings_menu = document.getElementById("settings_menu");
let settings_hidden = true;
const ifr_field = document.getElementById("IFR_format");

function toggleSettings() {
    if(settings_hidden) {
        settings_hidden = false;
        settings_menu.style = "";
    } else {
        settings_hidden = true;
        settings_menu.style = "display: none;";
    }
}

if(localStorage.getItem("IFR_format") === null) {
    localStorage.setItem("IFR_format", "{callsign}, good day. Information {atis} is current. Cleared to {arriving} via {route}, expect runway {runway} for departure. Initial climb to {initial}ft, expect further climb to FL{cruising} {minutes} minutes after depature. Squawk {squawk}.");
}
ifr_field.value = localStorage.getItem("IFR_format");


function updateIFR() {
    localStorage.setItem("IFR_format", ifr_field.value);
    template = ifr_field.value;
}