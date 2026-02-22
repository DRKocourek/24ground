const GND_airports = ["IRFD", "ITKO", "IPPH", "IZOL", "ILAR"];
let selectionToggle = false;
let station_menu = document.getElementById("station_menu");
let airport = document.getElementById("airport");
let station = document.getElementById("station");
let display_station = document.getElementById("display_position");
let GND = document.getElementById("GND_station");
function selectStation() {

    if (GND_airports.includes(airport.value)) {
        GND.style = "";
    } else {
        GND.style.display = "none";
        station.value = "TWR";
    }
    display_station.textContent = airport.value + "_" + station.value;
}
function toggleStationMenu() {
    if(selectionToggle) {
        station_menu.style.display = "none";
        selectionToggle = false;
    } else {
        station_menu.style.display = "";
        selectionToggle = true;
    }
}