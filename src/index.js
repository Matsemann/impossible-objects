import Renderer from "./Renderer";
import { findPoints, halfCircle, inverse, shift, triangle, wave } from "./ImpossibleCalculator";


const myRenderer = new Renderer(window.innerWidth, window.innerHeight, window.devicePixelRatio);
document.body.appendChild( myRenderer.renderer.domElement );

const intersections = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, shift(triangle, -1), shift(halfCircle,0), 50);
const intersections2 = findPoints({x: 0, y:50, z:50}, {x: 0, y: 50, z: -50}, inverse(shift(triangle, -1)), inverse(halfCircle), 50);

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
