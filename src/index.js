import Renderer from "./Renderer";
import {calculateIntersections, debugFigureFunctions, debugFunction, findPoints} from "./ImpossibleCalculator";
import {
    svgDiamondInner, svgDiamondInnerCircle,
    svgDiamondOuter, svgFuncBinary, svgHalfCircle, svgHeartBottom, svgHeartTop, svgSoftArrow,
    svgTriangle
} from "./svgCalc";
import {flip, heartTop, inverse, M, shift, triangle} from "./lineFunctions";
import {exportToObj} from "./exporter";

const myRenderer = new Renderer(window.innerWidth, window.innerHeight, window.devicePixelRatio);
document.body.appendChild(myRenderer.renderer.domElement);


let circleSquare = [
    {func1: svgFuncBinary(svgHalfCircle), func2: svgFuncBinary(svgTriangle)},
    {func1: inverse(svgFuncBinary(svgHalfCircle)), func2: inverse(svgFuncBinary(svgTriangle))},
];

let heart = [
    {func1: svgFuncBinary(svgHeartTop), func2: svgFuncBinary(svgHeartBottom)},
    {func1: inverse(svgFuncBinary(svgHeartBottom)), func2: inverse(svgFuncBinary(svgHeartTop))},
];

let intersectingSquare = [ // needs special render
    {func1: shift(inverse(triangle), -1), func2: shift(inverse(triangle), -1)},
    {func1: shift(triangle, -1), func2: shift(M, -1)},

    {func1: shift(inverse(triangle), 1), func2: shift(inverse(M), 1)},
    {func1: shift(triangle, 1), func2: shift(triangle, 1)},
];

let diamond = [
    {func1: svgFuncBinary(svgHalfCircle), func2: svgFuncBinary(svgDiamondOuter)},
    {func1: inverse(svgFuncBinary(svgHalfCircle)), func2: inverse(svgFuncBinary(svgDiamondOuter))},

    {func1: svgFuncBinary(svgDiamondInnerCircle), func2: svgFuncBinary(svgDiamondInner), lo: -0.46, hi: 0.46},
    {func1: inverse(svgFuncBinary(svgDiamondInnerCircle)), func2: inverse(svgFuncBinary(svgDiamondInner)), lo: -0.46, hi: 0.46}
];

// let points2 = debugFunction(svgFuncBinary(svgDiamondInner), 100, -0.46, 0.46);
// console.log(points2);
// myRenderer.renderPoints(points2);

const usingDef = diamond;

let start = new Date();
const intersections = calculateIntersections(usingDef);
console.log("intersections calculation ms", new Date() - start);

intersections.forEach(points => myRenderer.renderPoints(points));
exportToObj(myRenderer.renderedLines);

debugFigureFunctions(usingDef).forEach(points => myRenderer.renderPoints(shiftPoints(points, 3, 0, 0)));


window.addEventListener('resize', () => {
    console.log("Resizing");
    myRenderer.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
});

const animate = function () {
    requestAnimationFrame(animate);
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