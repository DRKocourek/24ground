let IFRToggle = false;
let IFRMenu = document.getElementById("IFR_menu");
let IFRslot = document.getElementById("ifr_clearance");
function toggleIFRmenu() {
    if(IFRToggle) {
        console.log("IFR turned off");
        IFRMenu.setAttribute("style", "display:none;");
        IFRToggle = false;
    } else {
        console.log("IFR turned on");
        IFRMenu.setAttribute("style", "");
        IFRToggle = true;
    }
    generateIFR
}
function generateIFR() {
    const flp = flightplans.find(fp => fp.callsign === selectedAcft);
    const variables = {
        callsign: selectedAcft,
        route: flp.route,
        cruising: flp.flightlevel,
        departing: flp.departing,
        arriving: flp.arriving,
        minutes: 3,
        runway: getPrefferedRNW(), 
        atis: atis.find(info => info.airport === airport.value).letter,
        squawk: Math.floor(Math.random() * (6999 - 3000) + 3000),
        initial: "020",
    };
    const template = "{callsign}, good day. Information {atis} is in effect. Cleared to {arriving} via {route}, expect runway {runway} for departure. Initial climb to FL{initial}, expect further climb to FL{cruising} {minutes} minutes after depature. Squawk {squawk}.";
    //this line is vibe coded lmao
    const result = template.replace(/{(\w+)}/g, (_, key) => variables[key]);
    IFRslot.textContent = result;

    console.log(result);


    
}

function getPrefferedRNW() {
    const str = atis.find(info => info.airport === airport.value).lines[1];
    const prefferedRNW = prefferedDepRNW.find(line => line.airport === airport.value);

    const match = str.match(/DEP\s+RWY\s+(.*?)\s+ARR/);

    let priorities = [0, 0, 0];
    const departureRunways = match ? match[1].trim().split(/\s+/) : [];
    console.log(departureRunways);
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
    console.log(lowest);
    return departureRunways[lowest-1];
}