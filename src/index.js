import * as THREE from 'three';
import * as OrbitControlsSetup from 'three-orbit-controls';

const OrbitControls = OrbitControlsSetup(THREE);

console.log("running2");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

var pointLight = new THREE.PointLight( 0xffffff, 1, 0 );
pointLight.position.set(0, 5, 0);
scene.add(pointLight);
var pointLight2 = new THREE.PointLight( 0xffffff, 1, 0 );
pointLight2.position.set(0, 5, 5);
scene.add(pointLight2);
var pointLight3 = new THREE.PointLight( 0xffffff, 1, 0 );
pointLight3.position.set(3, 5, -5);
scene.add(pointLight3);

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( {
    color: 0x555555,
    // specular: 0xffffff,
    // shininess: 50
} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );



const controls = new OrbitControls( camera );
// controls.autoRotate = true;
camera.position.z = 5;
controls.update();


var animate = function () {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    controls.update();

    renderer.render( scene, camera );
};

animate();