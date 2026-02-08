const ws = new WebSocket("wss://somedoctorapi.drkocourek.stream/api/acft-data");

let previousCallsign = []

ws.onopen = () => {
  console.log("Websocket open");
}


ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    deleteInactive(message);
    positionPlanes(message);

}
ws.onerror = (error) => {
  console.log("Error: ", error);
}

ws.onclose = () => {
  console.log("Websocket closed");
}
//values to make the plane positions more accurate
const transformValues = {
  a: 0.0916941146400288,
  b: -0.000881511833883436,
  c: 6977.31441719659,
  d: 0.00005261229739573006,
  e: 0.10897350737845249,
  f: -7089.5796073984175
}

function deleteInactive(message) {
  //check if the array is empty
  if (previousCallsign.length === 0) {
    console.log("empty");
    for(const aircraft in message.d){
      previousCallsign.push(aircraft);
    }
    return;
  }
  //check for any new aircraft
  let allAcft = [];
  for(aircraft in message.d){
    if (!previousCallsign.includes(aircraft)) {
      previousCallsign.push(aircraft)
    }
    allAcft.push(aircraft);
  }
  for(aircraft of previousCallsign) {
    if(!allAcft.includes(aircraft)){
      console.log("Aircraft " + aircraft + " is inactive");
      console.log(message.d);
      const elements = document.getElementsByClassName(aircraft);
      if (elements.length > 1) {
        elements[0].remove();
        elements[0].remove();

      }
      console.log(previousCallsign);
    }
  }
  previousCallsign = allAcft;
}




function worldToMap(x, y) {
  //fancy math with the transform values to get the correct aircraft position (affine transform)
  return { 
    x: transformValues.a * x + transformValues.b * y + transformValues.c,
    y: transformValues.d * x + transformValues.e * y + transformValues.f
};
}

function positionPlanes(message) {
  const planes = message.d;

  
  for (const planeId in planes) {
    const plane = planes[planeId];
    //safely delete the non updated aircraft
    try {
    let delete_previous = document.getElementsByClassName(planeId)[0].remove();
    delete_previous = document.getElementsByClassName(planeId)[0].remove();  
  } catch(err) {}
  //create and place the elements onto the map
  if(planeId === "Shamrock-1060") {console.log(plane);}
    let coordinates = worldToMap(plane.position.x, plane.position.y);
    const img = document.createElement('img');
    img.width = 20;
    img.src = "other/airplane_gradient.png";
    img.style.position = "absolute";
    img.style.top = `${coordinates.y}px`;
    img.style.left = `${coordinates.x}px`;
    img.style.transform = `rotate(${plane.heading-45}deg)`;
    img.setAttribute("class", planeId);
    img.dataset.id = planeId;
    const callsign = document.createElement("p");
    callsign.textContent = planeId;
    callsign.style.position = "absolute";
    callsign.style.top = `${coordinates.y}px`;
    callsign.style.left = `${coordinates.x}px`;
    callsign.setAttribute("class", planeId);

    let planediv = document.getElementById("planes");
    planediv.appendChild(img);
    planediv.appendChild(callsign);
  }
}

