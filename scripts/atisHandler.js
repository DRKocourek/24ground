let atis_hidden = true;
let atis_menu = document.getElementById("atis_menu");
let atis_menu_gnd = document.getElementById("atis_menu_GND");
let atis_text = document.getElementById("atis_display");
let dep_rnw_input = document.getElementById("dep_runways");
let arr_rnw_input = document.getElementById("arr_runways");
let chart_link = document.getElementById("charts_link");
let atis_title = document.getElementById("atis_title");
let atis_text_gnd = document.getElementById("atis_display_GND");
let atis_notification_text = document.getElementById("atis_notification_text");

let dep_runways = [];
let arr_runways = [];

let atis_letter = "A";


let previousATIS;

dep_rnw_input.addEventListener("input", updateATIS);
arr_rnw_input.addEventListener("input", updateATIS);

let atis_notification = new Audio("sfx/atis_notification.wav");

async function atisHandler() {
    atis_menu.style= "display: none";
    atis_menu_gnd.style= "display: none";
    atis_hidden = true;
    for(let i = 0; i < atis.length; i++) {
        if (atis[i].airport === airport.value) {
            atis_letter = atis[i].letter;
            if(station.value === "GND") {
                atis_title.textContent = "ATIS Viewer";
                atis_text_gnd.textContent = atis[i].content;


            } else {
                atis_title.textContent = "ATIS Editor";
                atis_text.textContent = atis[i].content;

            }
                if (previousATIS != atis[i].content) {
                    atis_notification.currentTime = 0;
                    await atis_notification.play();
                    previousATIS = atis[i].content;
                    atis_notification_text.style="";
                    await sleep(6000);
                    atis_notification_text.style="display: none;";
                }
            break;
        }
    }

}

function updateATIS() {
    const now = new Date()
    let minutes_zero = ""
    if (now.getUTCMinutes < 10) {
        minutes_zero = "0";
    }  else {
        minutes_zero = "";
    }
    atis_text.textContent = airport.value + " ATIS INFO " + atis_letter + " TIME " + now.getUTCHours() + minutes_zero + now.getUTCMinutes() + "Z DEP RWY " + dep_rnw_input.value + " ARR RWY " + arr_rnw_input.value +  "360/00 9999 FEW040 10/14 Q1013 TRANSITION LEVEL 030 ACKNOWLEDGE RECEIPT OF INFORMATION " + atis_letter + " AMD ADVISE AFCT TYPE ON FIRST CONTACT WITH " + airport.value + " END OF INFORMATION " + atis_letter;
}

function toggleATISMenu() {
    if(atis_hidden) {
        if(station.value === "GND") {
            atis_menu_gnd.style = "";
        } else {
            atis_menu.style = "";
        }
        atis_hidden = false;
    } else {
        if(station.value === "GND") {
            atis_menu_gnd.style = "display: none;";
        } else {
            atis_menu.style = "display: none;";
        }
        atis_hidden = true;
    }
}

function copyATIS() {
    navigator.clipboard.writeText("/updateatis airport:" + airport.value + " arr_rwys:" + arr_rnw_input.value + " dep_rwys:" + dep_rnw_input.value + " chart_link:" + chart_link.value);
}