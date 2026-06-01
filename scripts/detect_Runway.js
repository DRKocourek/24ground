const obj = document.getElementById("runway_warning");

let svg, runway;

/*obj.addEventListener("load", () => {
    svg = obj.contentDocument.querySelector("svg");
    runway = svg.getElementById("runway_shape");
});*/

function isOnApproach(clientX, clientY) {
    if (!svg || !runway) return false;

    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;

    const svgPoint = pt.matrixTransform(
        svg.getScreenCTM().inverse()
    );

    return runway.isPointInFill(svgPoint);
}