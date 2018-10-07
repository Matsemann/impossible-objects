import Renderer from "./Renderer";
import {calculateIntersections, debugFigureFunctions, findPoints} from "./ImpossibleCalculator";
import {svgFuncBinary, svgHalfCircle, svgHeartBottom, svgHeartTop, svgSoftArrow, svgTriangle} from "./svgCalc";
import {flip, inverse, M, shift, triangle} from "./lineFunctions";
import {exportToObj} from "./exporter";

const myRenderer = new Renderer(window.innerWidth, window.innerHeight, window.devicePixelRatio);
document.body.appendChild( myRenderer.renderer.domElement );


let circleSquare = [
    {func1: svgFuncBinary(svgHalfCircle), func2: svgFuncBinary(svgTriangle)},
    {func1: inverse(svgFuncBinary(svgHalfCircle)), func2: inverse(svgFuncBinary(svgTriangle))},
];

let start = new Date();
const intersections = calculateIntersections(circleSquare);
console.log("intersections calculation ms", new Date() - start);

intersections.forEach(points => myRenderer.renderPoints(points));
exportToObj(myRenderer.renderedLines);

debugFigureFunctions(circleSquare).forEach(points => myRenderer.renderPoints(points));



window.addEventListener('resize', () => {
    console.log("Resizing");
    myRenderer.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
});

const animate = function () {
    requestAnimationFrame( animate );
    myRenderer.render();
};

animate();


function shiftPoints(points, x, y, z) {
    return points.map(p => ({
        x: p.x + x,
        y: p.y + y,
        z: p.z + z
    }));
}

function scalePoints(points, s) {
    return points.map(p => ({
        x: p.x * s,
        y: p.y * s,
        z: p.z * s
    }));
}