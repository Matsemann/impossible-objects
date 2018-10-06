import Renderer from "./Renderer";
import {
    arrow, findPoints, flip, halfCircle, halfStar, heartTop, inverse, line, M, shift, triangle,
    wave
} from "./ImpossibleCalculator";
import OBJExporter from "three-obj-exporter";
import {svgFunc} from "./svgCalc";

const myRenderer = new Renderer(window.innerWidth, window.innerHeight, window.devicePixelRatio);
document.body.appendChild( myRenderer.renderer.domElement );

// const intersections = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, svgFunc(""), triangle, 200);
// const intersections2 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(triangle), inverse(heartTop), 200);

// const intersections = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(halfCircle), shift(halfStar,0), 100);
// const intersections2 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, shift(halfCircle, 0), inverse(halfStar), 100);
// myRenderer.renderPoints(debugFunction((x) => Math.sqrt(1 - (x*x)/2) - .75, 100));
// myRenderer.renderPoints(debugFunction((x) => Math.sqrt(1 - x*x) / 3, 100));
myRenderer.renderPoints(debugFunction(svgFunc(""), 200));
// myRenderer.renderPoints(debugFunction(inverse(triangle), 100));
// myRenderer.renderPoints(debugFunction(triangle, 100));

// var svgFunc2 = svgFunc("yo");
//
// var now = new Date();
// for (var i = -1; i <= 1; i+= 0.1) {
//     console.log(i, svgFunc2(i));
// }
// console.log(new Date() - now);

// myRenderer.renderPoints(debugFunction(inverse(halfStar), 100));
// myRenderer.renderPoints(intersections);

/* // intersecting rectangles
const intersections = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, triangle, M, 200);
const intersections2 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(triangle), inverse(triangle), 200);

const intersections3 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, triangle, triangle, 200);
const intersections4 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(triangle), inverse(M), 200);

myRenderer.renderPoints([...intersections, ...(intersections2.reverse())]);
myRenderer.renderPoints(shiftPoints([...intersections3, ...(intersections4.reverse())], 0, .5, -1.5));
*/


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

// myRenderer.renderPoints([...intersections, ...(intersections2.reverse())]);
// myRenderer.renderPoints(shiftPoints([...intersections3, ...(intersections4.reverse())], 0, .5, -1.5));


function traversable(objects) {
    return {
        traverse: function (fn) {
            objects.forEach(o => {
                console.log("obj");
                fn(o);
            });
        }
    }
}
window.objFile = new OBJExporter().parse(traversable(myRenderer.renderedLines));
console.log("made file");

window.addEventListener('resize', () => {
    console.log("Resizing");
    myRenderer.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
});

const animate = function () {
    requestAnimationFrame( animate );
    myRenderer.render();
};

animate();

function debugFunction(fn, numPoints) {
    var now = new Date();
    const points = [];

    for (let i = 0; i <= numPoints; i++) {
        const xVal = i * (2 / numPoints) - 1;

        const fnX = fn(xVal);

        points.push({x: xVal, y: fnX, z: 4});
    }

    console.log("time used ", new Date() - now);
    return points;
}