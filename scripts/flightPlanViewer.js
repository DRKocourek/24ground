const flp_menu = document.getElementById("flightplan_menu");
let flp_menu_toggle = false;
const acft_type_text = document.getElementById("acft_type");
const dep_apt_text = document.getElementById("dep_apt");
const arr_apt_text = document.getElementById("arr_apt");
const cruising_text = document.getElementById("cruise");
const flightrules_text = document.getElementById("flight_rules");
const route_text = document.getElementById("route");




function displayFlightplan() {
    const flp = flightplans.find(fp => fp.callsign === selectedAcft);
    acft_type_text.textContent = flp.aircraft;
    dep_apt_text.textContent = flp.departing;
    arr_apt_text.textContent = flp.arriving;
    cruising_text.textContent = "FL" + flp.flightlevel;
    flightrules_text.textContent = flp.flightrules;
    route_text.textContent = flp.route;

}

function toggleFlpMenu() {
    if(flp_menu_toggle) {
        flp_menu.style.display = "none";
        flp_menu_toggle = false;
    } else {
        flp_menu.style = "";
        flp_menu_toggle = true;
    }
}