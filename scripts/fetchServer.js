let server_url
let serverStatus = 0;

async function setupServer() {
    const res = await fetch("https://loadbalancer.drkocourek.workers.dev/");
    if(res.status === 503) {
        console.error("All available servers overloaded (running at full capacity)! Please try again later");
    } else if(res.status === 500) {
        console.error("All servers are unreachable, please try again later!");
    } else {
        server_url = await res.json();
    }
}
let serverPromise = setupServer();