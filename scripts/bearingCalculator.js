const airportRealCoord = [
    {
        x: 6682,
        y: -4780,
        icao: "IRFD"
    },    
    {
        x: 5150,
        y: -5488,
        icao: "IMLR"
    },
        {
        x: 6742,
        y: -3851,
        icao: "ITRC"
    },
    {
        x: 5944,
        y: -5221,
        icao: "IBLT"
    },
    {
        x: 5412,
        y: -4468,
        icao: "IGAR"
    },
    {
        x: 2685,
        y: -4108,
        icao: "ISAU"
    },
    {
        x: 2974,
        y: -7406,
        icao: "IGRV"
    },
    {
        x: 6230,
        y: -10875,
        icao: "ITKO"
    },
    {
        x: 6476,
        y: -11863,
        icao: "IDCS"
    },
    {
        x: 6935,
        y: -11356,
        icao: "IBRD"
    },
    {
        x: 8644,
        y: -9113,
        icao: "IPPH"
    },
    {
        x: 8995,
        y: -8953,
        icao: "ILKL"
    },
    {
        x: 10351,
        y: -7579,
        icao: "ISCM"
    },
    {
        x: 11222,
        y: -7096,
        icao: "IJAF"
    },
    {
        x: 11133,
        y: -6630,
        icao: "IZOL"
    },
    {
        x: 9810,
        y: -3350,
        icao: "IPAP"
    },
    {
        x: 8934,
        y: -3520,
        icao: "ILAR"
    },
    {
        x: 8650,
        y: -2698,
        icao: "IHEN"
    },
    {
        x: 9073,
        y: -2709,
        icao: "IIAB"
    },
    {
        x: 9512,
        y: -2979,
        icao: "IBAR"
    },
    {
        x: 7502,
        y: -7513,
        icao: "IBTH"
    },

]

function calculateAbsBearing(dep_airport, arr_airport) {
    let x0 = airportRealCoord.find(airport => airport.icao === dep_airport).x;
    let y0 = airportRealCoord.find(airport => airport.icao === dep_airport).y;
    let x1 = airportRealCoord.find(airport => airport.icao === arr_airport).x;
    let y1 = airportRealCoord.find(airport => airport.icao === arr_airport).y;
    let dx = x1 - x0;
    let dy = y1 - y0;

    let angle = Math.atan2(dy, dx) * 180 / Math.PI;

    angle = (90 + angle + 360) % 360;
    return angle;
}
