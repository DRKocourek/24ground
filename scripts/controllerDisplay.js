let controllers;
let airport_controllers = ["", "", ""];
let ctr_text = document.getElementById("CTR");
let twr_text = document.getElementById("TWR");
let gnd_text = document.getElementById("GND");
let controllersPosition = document.getElementById("controllersPosition");
let controllersDisplay = document.getElementById("controllers");
let footer = document.getElementById("footer");
let previous_controllers = ["", "", ""];
let airportChange = "IRFD";

async function fetchControllers() {
    previous_controllers = [...airport_controllers];
    let response = await fetch("https://somedoctorapi-eu-prg01.drkocourek.stream/api/controllers");
    controllers = await response.json();
    for(let i = 0; i < controllers.length; i++) {
        if(controllers[i].airport === airport.value) {
            airport_controllers[1] = controllers[i].holder;
            if(airport.value === "IMLR") {
                airport_controllers[0] = controllers[i-3].holder;
            }else {
            if(controllers[i-1].holder != null) {
                airport_controllers[0] = controllers[i-1].holder;
            } else {
                airport_controllers[0] = null;
            }
            }
            if(controllers[i+1].airport === airport.value && controllers[i+1].holder != null) {
                airport_controllers[2] = controllers[i+1].holder;
                break;
            } else {
                airport_controllers[2] = null;
                break;
            }
        } else {
            airport_controllers[1] = null;
        }
    }
    ctr_text.textContent = frequencies.find(e => e.position === (airport.value + "_CTR")).freq + " CTR: " + airport_controllers[0];
    twr_text.textContent = frequencies.find(e => e.position === (airport.value + "_TWR")).freq + " TWR: " + airport_controllers[1];
    gnd_text.textContent = frequencies.find(e => e.position === (airport.value + "_GND")).freq + " GND: " + airport_controllers[2];
    if(airport_controllers[0] === null){
        ctr_text.textContent = "CTR: offline";
    }
    if(airport_controllers[1] === null){
        twr_text.textContent = "TWR: offline";
    }     
    if(airport_controllers[2] === null){
        gnd_text.textContent = "GND: offline";
    }
    if(airport.value === airportChange) {
    if(airport_controllers[0] != previous_controllers[0]) {
        if(previous_controllers[0] != "") {
            controllerChanged("CTR", airport_controllers[0]);
        }
    } else if(airport_controllers[1] != previous_controllers[1]) {
        controllerChanged("TWR", airport_controllers[1]);
    } else if(airport_controllers[2] != previous_controllers[2]) {
        controllerChanged("GND", airport_controllers[2]);
    }
    } else {
        airportChange = airport.value;
    }
}

async function handleControllers() {
    previous_controllers = [...airport_controllers];
    for(let i = 0; i < controller_change.length; i++) {
        if(controller_change[i].airport === airport.value) {
            airport_controllers[1] = controller_change[i].holder;
            if(controller_change[i-1].holder != null) {
                airport_controllers[0] = controller_change[i-1].holder;
            } else {
                airport_controllers[0] = null;
            } 
            if(controller_change[i+1].airport === airport.value) {
                airport_controllers[2] = controller_change[i+1].holder;
                break;
            } else {
                airport_controllers[2] = null;
                break;
            }
        }
    }
    ctr_text.textContent = frequencies.find(e => e.position === (airport.value + "_CTR")).freq + " CTR: " + airport_controllers[0];
    twr_text.textContent = frequencies.find(e => e.position === (airport.value + "_TWR")).freq + " TWR: " + airport_controllers[1];
    gnd_text.textContent = frequencies.find(e => e.position === (airport.value + "_GND")).freq + " GND: " + airport_controllers[2];
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

function setupDisplayPosition() {
        switch(localStorage.getItem("controllersDisplay")) {
        case "top_right":
            controllersDisplay.style = "left: 80%; top: 5%;";
            footer.style = "position: absolute; left: 0;";
        break;
        case "bottom_right":
            controllersDisplay.style = "left: 80%; top: 88.5%;";
            footer.style = "position: absolute; left: 0;";
        break;
        case "bottom_left":
            controllersDisplay.style = "left: 1%; top: 88.5%;";
            footer.style = "position: absolute; left:76%";
        break;
        case "top_left":
            controllersDisplay.style = "left: 1%; top: 5%;";
            footer.style = "position: absolute; left: 0;";
        break;
    }
}

setupDisplayPosition();

function changeDisplayPosition() {
    switch(controllersPosition.value) {
        case "top_right":
            localStorage.setItem("controllersDisplay", "top_right");
            controllersDisplay.style = "left: 80%; top: 5%;";
            footer.style = "position: absolute; left: 0;";
        break;
        case "bottom_right":
            localStorage.setItem("controllersDisplay", "bottom_right");
            controllersDisplay.style = "left: 80%; top: 88.5%;";
            footer.style = "position: absolute; left: 0;";
        break;
        case "bottom_left":
            localStorage.setItem("controllersDisplay", "bottom_left");
            controllersDisplay.style = "left: 1%; top: 88.5%;";
            footer.style = "position: absolute; left:76%";
        break;
        case "top_left":
            localStorage.setItem("controllersDisplay", "top_left");
            controllersDisplay.style = "left: 1%; top: 5%;";
            footer.style = "position: absolute; left: 0;";
        break;
    }
}