let flp_ws;
let flightplans;
let atis;
let controller_change;
let airport_change = true;
async function setupGeneralWS() {
  await serverPromise;
    flp_ws = new WebSocket(server_url + "/api/general");


    flp_ws.onopen = () => {
      console.log("General WebSocket open");
    };
    flp_ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "FLIGHT_PLAN") {
        flightplans = message.data;
      } else if (message.type === "ATIS") {
        atis = message.data;
        selectStation();
      } else if (message.type === "CONTROLLERS") {
        controller_change = message.data;
        handleControllers();
      }
    }
    flp_ws.onclose = () => {
      console.log("General websocket closed, reconnecting in 3 seconds...");
      setTimeout( () => {
        ws = new WebSocket(server_url.replace(/^https?:\/\//, "wss://") + "/api/acft-data"),
        3000
      });
    }


    flp_ws.onerror = (err) => {
      reject(err);
    };
  };

const flpPromise = setupGeneralWS();
