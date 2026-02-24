const map = document.getElementById("background");
console.log(map);

map.addEventListener("click", (e) => {
  console.log("clicked");
  const rect = map.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.bottom;

  console.log("MAP PIXELS:", x.toFixed(2), y.toFixed(2));
});