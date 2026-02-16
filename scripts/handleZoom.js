const zoomElement = document.getElementById("zoomable");
let zoom = 1;
const ZOOM_SPEED = 0.1;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

document.addEventListener("wheel", function (e) {
  e.preventDefault();

  if (e.deltaY > 0) {
    zoom = Math.max(MIN_ZOOM, zoom - ZOOM_SPEED);
  } else {
    zoom = Math.min(MAX_ZOOM, zoom + ZOOM_SPEED);
  }

  zoomElement.style.transform = `scale(${zoom})`;
}, { passive: false });