let ws;
async function setup() {
  await serverPromise;
  await flpPromise;
  return new Promise((resolve, reject) => {
    ws = new WebSocket(
      server_url.replace(/^https?:\/\//, "wss://") + "/api/acft-data"
    ); 

    ws.onopen = () => {
      console.log("Acft data WebSocket open");
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      deleteInactive(message);
      positionPlanes(message);
    }
    ws.onclose = () => {
      console.log("Acft data websocket closed");
      setTimeout(    
        ws = new WebSocket(server_url.replace(/^https?:\/\//, "wss://") + "/api/acft-data"),
        3000
      );
    }


    ws.onerror = (err) => {
      reject(err);
    };
  });
}

const acftPromise = setup();



const WORLD_MIN_X = -60000;
const WORLD_MAX_X =  60000;
const WORLD_MIN_Y = -60000;
const WORLD_MAX_Y =  60000;
const MAP_WIDTH  = 13500;
const MAP_HEIGHT = 13500;
const MAP_SIZE = 13500;
const WORLD_SIZE = 160000;

const SCALE = MAP_SIZE / WORLD_SIZE;

let previousCallsign = []





function deleteInactive(message) {
  //check if the array is empty
  if (previousCallsign.length === 0) {
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
      const elements = document.getElementsByClassName(aircraft);
      if (elements.length > 1) {
        elements[0].remove();
        elements[0].remove();

      }
    }
  }
  previousCallsign = allAcft;
}




function worldToMap(x, y) {
  const mapCenterX = MAP_WIDTH / 2;
  const mapCenterY = MAP_HEIGHT / 2;
  const Xoffset = 0; //220
  const Yoffset = 0; //350
  const scaleX = 0.09169189771376439 * 100; //0.09169189771376439 * 100
  const scaleY = 0.10923732569011675 * 100; // 0.10923732569011675 * 100

  const basemap = {
    scale: { x: scaleX, y: scaleY },
    position: { x: Xoffset, y: Yoffset }
  };
  
  return {
    x: (x / 100) * basemap.scale.x + basemap.position.x,
    y: (y / 100) * basemap.scale.y + basemap.position.y
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
    let coordinates = worldToMap(plane.position.x, plane.position.y);
    const img = document.createElement('img');
    img.width = 20;
    img.src = "other/airplane_gradient.png";
    img.style.position = "absolute";
    img.style.top= `${coordinates.y}px`;
    img.style.left = `${coordinates.x}px`;
    img.style.transform = `rotate(${plane.heading-45}deg)`;
    img.setAttribute("class", planeId);
    img.dataset.id = planeId;
    const callsign = document.createElement("p");
    const flp = flightplans.find(fp => fp.robloxName === plane.playerName);
    if (flp) {
      callsign.textContent = flp.callsign;
      callsign.setAttribute("onclick", "selectAcft('" + flp.callsign + "');");
    } else {
      callsign.textContent = planeId;
      callsign.setAttribute("onclick", 'selectAcft("' + planeId + '");');
    }
    if (callsign.textContent === selectedAcft) {
      callsign.setAttribute("id", "selected");
    }
    callsign.style.position = "absolute";
    callsign.style.top = `${coordinates.y}px`;
    callsign.style.left = `${coordinates.x}px`;
    callsign.setAttribute("class", planeId);

    let planediv = document.getElementById("planes");
    planediv.appendChild(img);
    planediv.appendChild(callsign);
  }
  //after finished positioning aircraft align the aircraft more precisely
  //moveAcft();
}

