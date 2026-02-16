let IFRToggle = true;
let IFRMenu = document.getElementById("IFR_menu");
function generateIFR() {
    const flp = flightplans.find(fp => fp.callsign === selectAcft);
    const variables = {
        callsign: selectAcft,
        route: flp.route,
        flightlevel: flp.flightlevel,
        departing: flp.departing,
        arriving: flp.arriving
    };
    //this line is vibe coded lmao
    const result = template.replace(/{(\w+)}/g, (_, key) => variables[key]);

    if(IFRToggle) {
        console.log("IFR turned off");
        IFRMenu.setAttribute("style", "display:none;");
        IFRToggle = false;
    } else {
        console.log("IFR turned on");
        IFRMenu.setAttribute("style", "");
        IFRToggle = true;
    }
    
}

