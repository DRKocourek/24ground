let flp_ws;
let flightplans;
async function setupFLPws() {
  await serverPromise;
    flp_ws = new WebSocket(server_url + "/api/flight-plans");


    flp_ws.onopen = () => {
      console.log("Flightplan WebSocket open");
    };
    flp_ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      flightplans = message;
    }
    flp_ws.onclose = () => {
      console.log("Websocket closed");
    }


    flp_ws.onerror = (err) => {
      reject(err);
    };
  };

const flpPromise = setupFLPws();
