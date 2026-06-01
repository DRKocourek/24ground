let IFRToggle = false;
let IFRMenu = document.getElementById("IFR_menu");
let IFRslot = document.getElementById("ifr_clearance");
let initial_climb = document.getElementById("initial_climb");
let no_flp = false;
initial_climb.value = "020";
function toggleIFRmenu() {
    if(IFRToggle) {
        IFRMenu.setAttribute("style", "display:none;");
        IFRToggle = false;
    } else {
        IFRMenu.setAttribute("style", "");
        IFRToggle = true;
    }
    generateIFR
}
let incorrect_FL  = false;
let need_odd_alt = false;
let template;


template = localStorage.getItem("IFR_format");        

function generateIFR() {
    try {
    const flp = flightplans.find(fp => fp.callsign === selectedAcft);
    const variables = {
        callsign: selectedAcft,
        route: flp.route,
        cruising: flp.flightlevel,
        departing: flp.departing,
        arriving: flp.arriving,
        minutes: 3,
        runway: rnw_select.value, 
        atis: atis.find(info => info.airport === airport.value).letter,
        squawk: Math.floor(Math.random() * (6999 - 3000) + 3000),
        initial: Number(initial_climb.value) * 100,
    };
    no_flp = false;

    //this line is vibe coded lmao
    const result = template.replace(/{(\w+)}/g, (_, key) => variables[key]);
    IFRslot.textContent = result;

    let departure_heading = calculateAbsBearing(flp.departing, flp.arriving);
    need_odd_alt = false;
    if (departure_heading >= 180) {
        need_odd_alt = false;
    } else {
        need_odd_alt = true;
    }
    let even;
    if(Math.floor(Number(flp.flightlevel)/10) % 2 === 0) {
        even = true;
    } else {
        even = false;
    }
    if (need_odd_alt && even) {
        incorrect_FL = true;
    } else if(!need_odd_alt && !even) {
        incorrect_FL = true;
    } else {
        incorrect_FL = false;
    }
    } catch(err) {
        no_flp = true;
        return;
    }
    toggleRule();

    
}

function getPrefferedRNW() {
    const str = atis.find(info => info.airport === airport.value).lines[1];
    const prefferedRNW = prefferedDepRNW.find(line => line.airport === airport.value);


    const match = str.match(/DEP\s+RWY\s+(.*?)\s+ARR/);

    let priorities = [0, 0, 0];
    const departureRunways = match ? match[1].trim().split(/\s+/) : [];
    for (let i = 0; i < departureRunways.length; i++) {
        if (departureRunways[i] === prefferedRNW.rnw_1) {
            priorities[i] = 1;
        } else if(departureRunways[i] === prefferedRNW.rnw_2) {
            priorities[i] = 2;
        } else if(departureRunways[i] === prefferedRNW.rnw_3) {
            priorities[i] = 3;
        } else {
            priorities[i] = 10;
        }
    }
    var lowest = 0;
    for (var i = 1; i < priorities.length; i++) {
        if (priorities[i] < priorities[lowest]) lowest = i;
    }

    if (lowest === 0) {
        return departureRunways[0];
    }
    return departureRunways[lowest-1];
}

let warning_semicircular = document.getElementById('semicircular_warning');
let use_semicircular = document.getElementById('use_semicircular');

function toggleRule() {
    if (use_semicircular.checked === true) {
        warning_semicircular.style.display = "none";
    } else {
        if(incorrect_FL) {
            warning_semicircular.style.display = "";
            if(need_odd_alt) {
                warning_semicircular.textContent = "Warning: this plane's flightlevel is not correct with the semi-circular rule! Give them an odd FL!";
            } else {
                warning_semicircular.textContent = "Warning: this plane's flightlevel is not correct with the semi-circular rule! Give them an even FL!";

            }
        } else {
            warning_semicircular.style.display = "none";
        }
    }
}
toggleRule();