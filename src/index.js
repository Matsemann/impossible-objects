import Renderer from "./Renderer";
import {findPoints, halfCircle, halfStar, inverse, M, shift, triangle, wave} from "./ImpossibleCalculator";


const myRenderer = new Renderer(window.innerWidth, window.innerHeight, window.devicePixelRatio);
document.body.appendChild( myRenderer.renderer.domElement );

// const intersections = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, triangle, halfCircle, 200);
// const intersections2 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(triangle), inverse(halfCircle), 200);

// const intersections = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(halfCircle), shift(halfStar,0), 100);
// const intersections2 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, shift(halfCircle, 0), inverse(halfStar), 100);
// myRenderer.renderPoints(debugFunction(M, 100));
// myRenderer.renderPoints(debugFunction(inverse(halfStar), 100));
// myRenderer.renderPoints(intersections);


const intersections = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, triangle, M, 200);
const intersections2 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(triangle), inverse(triangle), 200);

const intersections3 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, triangle, triangle, 200);
const intersections4 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(triangle), inverse(M), 200);


function shiftPoints(points, x, y, z) {
    return points.map(p => ({
        x: p.x + x,
        y: p.y + y,
        z: p.z + z
    }));
}

myRenderer.renderPoints([...intersections, ...(intersections2.reverse())]);
myRenderer.renderPoints(shiftPoints([...intersections3, ...(intersections4.reverse())], 0, .5, -1.5));

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
    const points = [];

    for (let i = 0; i <= numPoints; i++) {
        const xVal = i * (2 / numPoints) - 1;

        const fnX = fn(xVal);

        points.push({x: xVal, y: fnX, z: 4});
    }

    return points;
}