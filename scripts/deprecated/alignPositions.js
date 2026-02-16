const airportPositions = [
    {name:"IRFD", x: -217, y: 2264, offset: 10, radius: 300},
    {name:"IRFD_SOUTH", x: -414, y: 3410, offset: 50, radius: 300},
    {name:"ITKO", x: -823, y: -3592, offset: -70, radius: 400},
    {name:"ITKO_20", x: -641, y: -3599, offset: -70, radius: 400},
    {name:"IPPH", x: 1685, y: -2162, offset: 10, radius: 400},
    {name:"ILAR", x: 1990, y: 3583, offset: 5, radius: 200}, 
];

function distance(acftX, acftY, aprtX, aprtY) {
  const x = aprtX - acftX;
  const y = aprtY - acftY;
  return Math.sqrt(x * x + y * y);
}

const parent = document.getElementById("planes");


function moveAcft() {
    for(const acft of parent.childNodes){
        if (acft.nodeType !== 1) continue;
        let distances = [];
        const acftX = parseFloat(acft.style.left);
        const acftY = parseFloat(acft.style.top);
        airportPositions.forEach(element => {
            let d = distance(acftX, acftY, element.x, element.y);
            distances.push(d);
        });
        const smallest_distance = Math.min(...distances);
        //check if too far away from any major airport
        const airport = airportPositions[distances.indexOf(smallest_distance)];
        if (smallest_distance >= airport.radius) continue;
        const offset = airport.offset; 

        if (acftX < airport.x) {
            acft.style.left = (((airport.x - acftX) / airport.radius) * offset + acftX) + "px";
        } else {
            acft.style.left = (((acftX - airport.x) / airport.radius) * offset + acftX) + "px";
        }
        if (acftY > airport.y) {
            acft.style.top = (((acftY - airport.y) / airport.radius) * offset + acftY) + "px";
        } else {
            acft.style.top = (((airport.y - (acftY)) / airport.radius) * offset + acftY) + "px";
        }
    }
}