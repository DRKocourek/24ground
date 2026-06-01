let banner = document.getElementById("cookie_Banner");
if(localStorage.getItem("cookie_read") === "true") {
    banner.style.display = "none";
} else {
    banner.style.display = "";
}
function closeBanner() {
    banner.style.display = "none";
}
function dontShow() {
    localStorage.setItem("cookie_read", true);
    banner.style.display = "none";
}