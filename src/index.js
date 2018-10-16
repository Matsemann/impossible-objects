import Renderer from "./Renderer";
import {calculateIntersections, debugFigureFunctions, debugFunction, findPoints} from "./ImpossibleCalculator";
import {
    svgBatmanBottom,
    svgBatmanTop,
    svgDiamondInner,
    svgDiamondInnerCircle,
    svgDiamondOuter,
    svgFlower,
    svgFuncBinary,
    svgHalfCircle,
    svgHeartBottom,
    svgHeartTop,
    svgPointyArrow2,
    svgSoftArrow,
    svgStar, svgSupermanTop,
    svgTriangle, svgTwistedDiamondBottom, svgTwistedDiamondV
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

let arrowFunc = svgSoftArrow;
let arrow = [
    {func1: svgFuncBinary(arrowFunc), func2: flip(svgFuncBinary(arrowFunc))},
    {func1: inverse(svgFuncBinary(arrowFunc)), func2: inverse(flip(svgFuncBinary(arrowFunc)))}
];

let starFlower = [
    {func1: svgFuncBinary(svgStar), func2: svgFuncBinary(svgFlower)},
    {func1: inverse(svgFuncBinary(svgStar)), func2: inverse(svgFuncBinary(svgFlower))}
];

let starCircle = [
    {func1: svgFuncBinary(svgStar), func2: svgFuncBinary(svgHalfCircle)},
    {func1: inverse(svgFuncBinary(svgStar)), func2: inverse(svgFuncBinary(svgHalfCircle))}
];

let flowerCircle = [
    {func1: svgFuncBinary(svgFlower), func2: svgFuncBinary(svgHalfCircle)},
    {func1: inverse(svgFuncBinary(svgFlower)), func2: inverse(svgFuncBinary(svgHalfCircle))}
];

let supermanvsbatman = [
    {func1: svgFuncBinary(svgBatmanTop), func2: svgFuncBinary(svgTriangle)},
    {func1: inverse(svgFuncBinary(svgBatmanBottom)), func2: inverse(svgFuncBinary(svgSupermanTop))}
];

let diamond4circles = [
    {func1: svgFuncBinary(svgTwistedDiamondBottom), func2: svgFuncBinary(svgHalfCircle)},
    {func1: inverse(flip(shift(svgFuncBinary(svgTwistedDiamondV), -0.5))), func2: inverse(svgFuncBinary(svgHalfCircle))},
];
// let points2 = debugFunction(svgFuncBinary(svgDiamondInner), 100, -0.46, 0.46);
// console.log(points2);
// myRenderer.renderPoints(points2);

const usingDef = diamond4circles;

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