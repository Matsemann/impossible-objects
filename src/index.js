import * as THREE from 'three';
import * as OrbitControlsSetup from 'three-orbit-controls';
import * as ReflectorSetup from 'three-reflector';

const OrbitControls = OrbitControlsSetup(THREE);
const Reflector = ReflectorSetup(THREE);

console.log("running2");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.AmbientLight( 0xffffff, 0.5 ); // soft white light
scene.add( light );

var pointLight = new THREE.PointLight( 0xcccccc, 1,  250);
pointLight.position.set(10, 95, 0);
// pointLight.castShadow = true;
scene.add(pointLight);
scene.add(new THREE.PointLightHelper( pointLight, 1 ));

var pointLight2 = new THREE.PointLight( 0xeeeeee, 1, 1000 );
pointLight2.position.set(-250, 30, 10);
scene.add(pointLight2);
scene.add(new THREE.PointLightHelper( pointLight2, 1 ));

var pointLight3 = new THREE.PointLight( 0xffffff, 1, 1000 );
pointLight3.position.set(300, 50, -40);
scene.add(pointLight3);
scene.add(new THREE.PointLightHelper( pointLight3, 1 ));

var pointLight4 = new THREE.PointLight( 0xffffff, 1, 1000 );
pointLight4.position.set(20, 10, 100);
scene.add(pointLight4);
scene.add(new THREE.PointLightHelper( pointLight4, 1 ));

var pointLight5 = new THREE.PointLight( 0xffffff, .5, 100 );
pointLight5.position.set(-5, 60, -20);
scene.add(pointLight5);
scene.add(new THREE.PointLightHelper( pointLight5, 1 ));



var geometry = new THREE.BoxGeometry( 10, 10, 10 );
var material = new THREE.MeshPhongMaterial( {
    color: 0x555555,
    // specular: 0x444444,
    shininess: 10
} );
var cube = new THREE.Mesh( geometry, material );
cube.castShadow = true;
cube.position.y = 5;
scene.add( cube );

var mirrorGeometry = new THREE.PlaneBufferGeometry( 30, 30 );
var mirror = new Reflector( mirrorGeometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x889999,
    recursion: 1
} );
mirror.position.z = -30;
mirror.position.y = 25;
mirror.rotateX(Math.PI / 12);
scene.add(mirror);

var planeGeo = new THREE.PlaneBufferGeometry( 100, 100 );

var planeTop = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x444444 } ) );
planeTop.position.y = 100;
planeTop.rotateX( Math.PI / 2 );
scene.add( planeTop );

var planeBottom = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x888888 } ) );
planeBottom.rotateX( - Math.PI / 2 );
planeBottom.receiveShadow = true;
scene.add( planeBottom );

var planeFront = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x2020ff } ) );
planeFront.position.z = 50;
planeFront.position.y = 50;
planeFront.rotateY( Math.PI );
scene.add( planeFront );

var planeRight = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ) );
planeRight.position.x = 50;
planeRight.position.y = 50;
planeRight.rotateY( - Math.PI / 2 );
scene.add( planeRight );

var planeLeft = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );
planeLeft.position.x = -50;
planeLeft.position.y = 50;
planeLeft.rotateY( Math.PI / 2 );
scene.add( planeLeft );

var planeBack = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xccff55 } ) );
planeBack.position.z = -50;
planeBack.position.y = 50;
scene.add( planeBack );

const controls = new OrbitControls( camera );
// controls.autoRotate = true;

camera.position.z = 40;
camera.position.y = 40;
controls.target.set(0, 10, 0);
controls.update();


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

var animate = function () {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    controls.update();

    renderer.render( scene, camera );
};

animate();
