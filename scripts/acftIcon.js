const icon_path = "/acft/"
const acft_to_icon = [
    //airbus lineup
    {icao: "AIRBUS A220", icon: "a320.svg", width: 9},
    {icao: "AIRBUS A320", icon: "a320.svg", width: 9},
    {icao: "AIRBUS A330", icon: "a330.svg", width: 11},
    {icao: "AIRBUS A330 CARGO", icon: "a330.svg", width: 11},
    {icao: "A330 MRTT", icon: "a330.svg", width: 11},

    {icao: "AIRBUS A340", icon: "a340.svg", width: 12},
    //generic icons for A350
    {icao: "AIRBUS A350", icon: "a4.svg", width: 13},
    {icao: "AIRBUS A380", icon: "a380.svg", width: 17},
    //beluga generic icons
    {icao: "AIRBUS BELUGA", icon: "a3.svg", width: 12},
    //generic icons for the 707 and 727
    {icao: "BOEING 707", icon: "a5.svg"},
    {icao: "BOEING 727 CARGO", icon: "a4.svg"},
    {icao: "BOEING 727", icon: "a4.svg"},
    {icao: "BOEING 737 CARGO", icon: "b737.svg", width: 10},
    {icao: "BOEING 737", icon: "b737.svg", width: 10},
    {icao: "BOEING 747 CARGO", icon: "b747.svg", width: 12},
    {icao: "BOEING 747", icon: "b747.svg", width: 12},
    //generic icon for 757
    {icao: "BOEING 757 CARGO", icon: "a3.svg", width: 9},
    {icao: "BOEING 757", icon: "a3.svg", width: 9},
    {icao: "BOEING 767 CARGO", icon: "b767.svg"},
    {icao: "BOEING 767", icon: "b767.svg", width: 9},
    {icao: "BOEING 777 CARGO", icon: "b777.svg", width: 13},
    {icao: "BOEING 777", icon: "b777.svg", width: 13},
    {icao: "BOEING 787", icon: "b787.svg", width: 12},
    {icao: "DREAMLIFTER", icon: "b747.svg", widht: 13},
    //something something
    {icao: "C130", icon: "c130.svg"},
    {icao: "C-130", icon: "c130.svg"},
    {icao: "C-130 HERCULES", icon: "c130.svg"},
    {icao: "C130 HERCULES", icon: "c130.svg"},
    {icao: "C17", icon: "c130.svg", width: 13},

    //cessnas
    {icao: "CESSNA 172", icon: "cessna.svg", width: 4},
    {icao: "CESSNA 172 STUDENT", icon: "cessna.svg", width: 4},
    {icao: "CESSNA 402", icon: "cessna.svg", width: 4}, 
    {icao: "CESSNA CARAVAN CARGO", icon: "cessna.svg", width: 5},
    {icao: "CESSNA CARAVAN", icon: "cessna.svg", width: 5}, 



    //lotta CRJs
    {icao: "BOMBARDIER CRJ700", icon: "crjx.svg", width: 6},
    {icao: "CRJ", icon: "crjx.svg"},
    {icao: "CRJX", icon: "crjx.svg"},

    {icao: "BOMBARDIER Q400", icon: "dh8a.svg"},
    //lotta names for DH-8
    {icao: "DH-8", icon: "dh8a.svg"},
    {icao: "DH 8", icon: "dh8a.svg"},
    {icao: "DHC-8 TWIN OTTER", icon: "dh8a.svg"},
    {icao: "DHC-6 TWIN OTTER", icon: "dh8a.svg"},
    // no E190 specific icons :( so E195 it is cuz close enough
    {icao: "E190", icon: "e195.svg", width: 9},
    {icao: "E195", icon: "e195.svg"},
    {icao: "DOUGLAS MD11", icon: "md11.svg"},
    //RIP concorde, gets a generic icon
    {icao: "CONCORDE", icon: "a0.svg", width: 7},
    //antonovs
    {icao: "AN 22", icon: "a5.svg"},
    {icao: "AN 225", icon: "a5.svg", width: 20},
    //ATRs
    {icao: "ATR72", icon: "dh8a.svg", width: 12},

    // WHY IS THERE SO MANY FUCKING MILITARY AIRCRAFT ON ATC24
    //prop planes
    {icao: "A6M ZERO", icon: "a1.svg"},
    {icao: "A6M", icon: "a1.svg"},
    {icao: "F4U", icon: "a1.svg"},
    {icao: "F4U CORSAIR", icon: "a1.svg"},
    {icao: "P51", icon: "a1.svg"},
    {icao: "P-51", icon: "a1.svg"},
    {icao: "P51 MUSTANG", icon: "a1.svg"},    
    {icao: "P-51 MUSTANG", icon: "a1.svg"},    
    
    //fighter jets
    {icao: "VULCAN", icon: "a6.svg"},
    {icao: "AVRO VULCAN", icon: "a6.svg"},
    {icao: "EUROFIGHTER TYPHOON", icon: "a6.svg"},
    {icao: "F14", icon: "a6.svg"},
    {icao: "F14", icon: "a6.svg"},
    {icao: "B2", icon: "a6.svg"},
    {icao: "F15E", icon: "a6.svg"},
    {icao: "F16", icon: "a6.svg", width: 9},
    {icao: "F22", icon: "a6.svg"},
    {icao: "F35B", icon: "a6.svg"},

    //other military
    {icao: "A330 MRTT", icon: "a330.svg"},
    {icao: "B29", icon: "a0.svg"},
    {icao: "E3", icon: "a5.svg"},
    {icao: "E-3", icon: "a5.svg"},
    {icao: "E-3 SENTRY", icon: "a5.svg"},
    {icao: "E3 SENTRY", icon: "a5.svg"},
    {icao: "A10", icon: "a2.svg"},
    {icao: "A10 WARTHOG", icon: "a2.svg"},
    {icao: "A10 WARTHOG", icon: "a2.svg"},

    //HELICOPTER HELICOPTER... PARACOPER PARACOPER
    {icao: "H135", icon: "a7.svg", width: 6},    
    {icao: "UH-60", icon: "a7.svg"},    
    {icao: "AIRBUS H135", icon: "a7.svg"},    
    {icao: "B412", icon: "a7.svg"},    
    {icao: "BELL 412", icon: "a7.svg"},    
    {icao: "CHINOOK", icon: "a7.svg"},    
]

function getIconByICAO(rcv_icao) {
    let iconAvailable = acft_to_icon.find(icon => icon.icao === rcv_icao.toUpperCase());
    if(iconAvailable === undefined) {
        //console.log(rcv_icao);
        return icon_path + "a0.svg";
    } else {
        return icon_path + iconAvailable.icon;
    }

}

function getWidthByICAO(rcv_icao) {
    let iconAvailable = acft_to_icon.find(icon => icon.icao === rcv_icao.toUpperCase());
    if(iconAvailable === undefined || iconAvailable.width === undefined) {
        //console.log(rcv_icao);
        return 12;
    } else {
        return iconAvailable.width;
    }
}