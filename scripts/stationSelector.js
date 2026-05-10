const GND_airports = ["IRFD", "ITKO", "IPPH", "IZOL", "ILAR", "IKFL"];
let selectionToggle = false;
let station_menu = document.getElementById("station_menu");
let airport = document.getElementById("airport");
let station = document.getElementById("station");
let display_station = document.getElementById("display_position");
let GND = document.getElementById("GND_station");
let rnw_select = document.getElementById("rnw_select");
airport.value = "IRFD";
async function selectStation() {
    fetchControllers();
    airport_change = true;
    atisHandler();

    if (GND_airports.includes(airport.value)) {
        GND.style = "";
    } else {
        GND.style.display = "none";
        station.value = "TWR";
    }
    display_station.textContent = airport.value + "_" + station.value;

    rnw_select.innerHTML = '';
    const str = atis.find(info => info.airport === airport.value).lines[1];

    const match = str.match(/DEP\s+RWY\s+(.*?)\s+ARR/);

    const departureRunways = match ? match[1].trim().split(/\s+/) : [];
    for (let i = 0; i < departureRunways.length; i++) {
        const option = document.createElement('option');
        option.value = departureRunways[i];
        option.textContent = departureRunways[i];

        rnw_select.appendChild(option);
    }
    rnw_select.value = getPrefferedRNW();
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