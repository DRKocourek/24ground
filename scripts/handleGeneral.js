let flp_ws;
let flightplans;
let atis;
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
      } else {
        atis = message.data;
        console.log(atis);
      }
      console.log(flightplans);
    }
    flp_ws.onclose = () => {
      console.log("General websocket closed, reconnecting in 3 seconds...");
      setTimeout(    
        ws = new WebSocket(server_url.replace(/^https?:\/\//, "wss://") + "/api/acft-data"),
        3000
      );
    }


    flp_ws.onerror = (err) => {
      reject(err);
    };
  };

const flpPromise = setupGeneralWS();
