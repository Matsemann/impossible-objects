import Renderer from "./Renderer";
import { findPoints, halfCircle, halfStar, inverse, shift, triangle, wave } from "./ImpossibleCalculator";


const myRenderer = new Renderer(window.innerWidth, window.innerHeight, window.devicePixelRatio);
document.body.appendChild( myRenderer.renderer.domElement );

const intersections = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(shift(triangle, -1)), shift(halfCircle,0), 200);
const intersections2 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, shift(triangle, -1), inverse(halfCircle), 200);

// const intersections = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(halfCircle), shift(halfStar,0), 100);
// const intersections2 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, shift(halfCircle, 0), inverse(halfStar), 100);
// myRenderer.renderPoints(debugFunction(halfStar, 100));
// myRenderer.renderPoints(debugFunction(inverse(halfStar), 100));
myRenderer.renderPoints(intersections);
myRenderer.renderPoints(intersections2);

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