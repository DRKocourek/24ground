const airportPositions = [
    {
        x: 1184,
        y: -2012,
        icao: "IRFD"
    },
    {
        x: 2701,
        y: -1336,
        icao: "IMLR"
    },
    {
        x: 5141,
        y: -2630,
        icao: "ISAU"
    },
    {
        x: 1652,
        y: 3722,
        icao: "ITKO"
    },
    {
        x: -689,
        y: 2484,
        icao: "IPPH"
    },
    {
        x: -3256,
        y: -150,
        icao: "IZOL"
    },
    {
        x: -1028,
        y: -3295,
        icao: "ILAR"
    },
];



function teleportToAirport() {
    let foundAirport = airportPositions.find(airpt => airpt.icao === airport.value);
    panX = foundAirport.x;
    panY = foundAirport.y;
    planes.style.transform = `translate(${panX}px, ${panY}px)`;
    zoomElement.style.transform = `scale(${zoom})`;
    zoom = 2;
}