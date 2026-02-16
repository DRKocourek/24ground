let banner = document.getElementById("cookie_Banner");
if(localStorage.getItem("cookie_read") === "true") {
    banner.style.display = "none";
    console.log("dont display");
} else {
    banner.style.display = "";
    console.log("display");
}
function closeBanner() {
    banner.style.display = "none";
    console.log("close clicked");
}
function dontShow() {
    localStorage.setItem("cookie_read", true);
    banner.style.display = "none";
    console.log(localStorage.getItem("cookie_read"));
}