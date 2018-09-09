import Renderer from "./Renderer";
import {findPoints, triangle, wave} from "./ImpossibleCalculator";


const myRenderer = new Renderer(window.innerWidth, window.innerHeight, window.devicePixelRatio);
document.body.appendChild( myRenderer.renderer.domElement );

const intersections = findPoints({x: 0, y:5, z:5}, {x: 0, y: 5, z: -5}, triangle, wave, 10);

myRenderer.renderPoints(intersections);

window.addEventListener('resize', () => {
    console.log("Resizing");
    myRenderer.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
});

const animate = function () {
    requestAnimationFrame( animate );
    myRenderer.render();
};

animate();
