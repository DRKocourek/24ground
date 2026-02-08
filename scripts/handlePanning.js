const planes = document.getElementById("main");

let isPanning = false;
let startX = 0;
let startY = 0;
let panX = 0;
let panY = 0;

document.addEventListener("contextmenu", e => e.preventDefault());

planes.style.transform = `translate(${panX}px, ${panY}px)`;

document.addEventListener("mousedown", e => {
  if (e.button === 2) {
    isPanning = true;
    startX = e.clientX;
    startY = e.clientY;
  }
});

document.addEventListener("mouseup", e => {
  if (e.button === 2) {
    isPanning = false;
  }
});

document.addEventListener("mousemove", e => {
  if (!isPanning) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  planes.style.transform = `translate(${panX + dx}px, ${panY + dy}px)`;
});

document.addEventListener("mouseleave", () => {
  if (!isPanning) return;
  panX += event.clientX - startX;
  panY += event.clientY - startY;
  isPanning = false;
});

document.addEventListener("mouseup", e => {
  if (e.button !== 2) return;

  panX += e.clientX - startX;
  panY += e.clientY - startY;
  isPanning = false;
});