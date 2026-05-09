let controllers;
let airport_controllers = ["", "", ""];
let ctr_text = document.getElementById("CTR");
let twr_text = document.getElementById("TWR");
let gnd_text = document.getElementById("GND");
let previous_controllers = ["", "", ""];

async function fetchControllers() {
    let response = await fetch("https://somedoctorapi-eu-prg01.drkocourek.stream/api/controllers");
    controllers = await response.json();
    for(let i = 0; i < controllers.length; i++) {
        if(controllers[i].airport === airport.value && controllers[i].holder != null) {
            airport_controllers[1] = controllers[i].holder;
            if(controllers[i-1].holder != null) {
                airport_controllers[0] = controllers[i-1].holder;
            } else {
                airport_controllers[0] = null;
            }
            if(controllers[i+1].airport === airport.value && controllers[i+1].holder != null) {
                airport_controllers[2] = controllers[i+1].holder;
                break;
            } else {
                airport_controllers[2] = null;
            }
        } else {
            airport_controllers[1] = null;
        }
    }
    ctr_text.textContent = "CTR: " + airport_controllers[0];
    twr_text.textContent = "TWR: " + airport_controllers[1];
    gnd_text.textContent = "GND: " + airport_controllers[2];
    if(airport_controllers[0] === null){
        ctr_text.textContent = "CTR: offline";
    }
    if(airport_controllers[1] === null){
        twr_text.textContent = "TWR: offline";
    }     
    if(airport_controllers[2] === null){
        gnd_text.textContent = "GND: offline";
    }
}
fetchControllers();

async function handleControllers() {
    previous_controllers = airport_controllers;
    for(let i = 0; i < controller_change.length; i++) {
        if(controller_change[i].airport === airport.value && controller_change[i].holder != null) {
            airport_controllers[1] = controller_change[i].holder;
            if(controller_change[i-1].holder != null) {
                airport_controllers[0] = controller_change[i-1].holder;
            }
            if(controller_change[i+1].airport === airport.value && controllers[i+1].holder != null) {
                airport_controllers[2] = controller_change[i+1].holder;
                break;
            } 
        }
    }
    ctr_text.textContent = "CTR: " + airport_controllers[0];
    twr_text.textContent = "TWR: " + airport_controllers[1];
    gnd_text.textContent = "GND: " + airport_controllers[2];
    if(airport_controllers[0] === null){
        ctr_text.textContent = "CTR: offline";
    }
    if(airport_controllers[1] === null){
        twr_text.textContent = "TWR: offline";
    }     
    if(airport_controllers[2] === null){
        gnd_text.textContent = "GND: offline";
    }
    if(airport_controllers[0] != previous_controllers[0]) {
        controllerChanged("CTR", airport_controllers[0]);
    } else if(airport_controllers[1] != previous_controllers[1]) {
        controllerChanged("TWR", airport_controllers[1]);
    } else if(airport_controllers[2] != previous_controllers[2]) {
        controllerChanged("GND", airport_controllers[2]);
    }
}

let atc_online = new Audio("sfx/atc_online.wav");
let atc_offline = new Audio("sfx/atc_offline.wav");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function controllerChanged(position, holder) {
    if (holder === null) {
        atc_offline.play();
        if (position === "CTR") {
            for(let i = 0; i <= 5; i++) {
                ctr_text.setAttribute("style", "color: red;");
                await sleep(1000);
                ctr_text.setAttribute("style", "");
                await sleep(1000);
            }
        } else if (position === "TWR") {
            for(let i = 0; i <= 5; i++) {
                twr_text.setAttribute("style", "color: red;");
                await sleep(1000);
                twr_text.setAttribute("style", "");
                await sleep(1000);
            }
        } else if (position === "GND") {
            for(let i = 0; i <= 5; i++) {
                gnd_text.setAttribute("style", "color: red;");
                await sleep(1000);
                gnd_text.setAttribute("style", "");
                await sleep(1000);
            }
        }
    } else {
        atc_online.play();
        if (position === "CTR") {
            for(let i = 0; i <= 5; i++) {
                ctr_text.setAttribute("style", "color: lightgreen;");
                await sleep(1000);
                ctr_text.setAttribute("style", "");
                await sleep(1000);
            }
        } else if (position === "TWR") {
            for(let i = 0; i <= 5; i++) {
                twr_text.setAttribute("style", "color: lightgreen;");
                await sleep(1000);
                twr_text.setAttribute("style", "");
                await sleep(1000);
            }
        } else if (position === "GND") {
            for(let i = 0; i <= 5; i++) {
                gnd_text.setAttribute("style", "color: lightgreen;");
                await sleep(1000);
                gnd_text.setAttribute("style", "");
                await sleep(1000);
            }
        }
    }

}