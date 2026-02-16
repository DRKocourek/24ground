const map = document.getElementById("main");

map.addEventListener("click", (e) => {
  const rect = map.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  console.log("MAP PIXELS:", x.toFixed(2), y.toFixed(2));
});