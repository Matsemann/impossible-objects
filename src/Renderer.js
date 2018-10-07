import * as THREE from 'three';
import * as OrbitControlsSetup from 'three-orbit-controls';
import * as ReflectorSetup from 'three-reflector';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PointLight,
    AmbientLight,
    PointLightHelper,
    PlaneBufferGeometry,
    MeshPhongMaterial,
    Mesh,
    BoxGeometry
} from "three";

const OrbitControls = OrbitControlsSetup(THREE);
const Reflector = ReflectorSetup(THREE);

export default class Renderer {

    constructor(width, height, pixelRatio) {
        this.lights = [];
        this.renderedLines = [];

        this.scene = new Scene();
        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(pixelRatio);
        this.renderer.setSize(width, height);

        this.camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.z = 100;
        this.camera.position.y = 150;
        this.controls = new OrbitControls(this.camera);
        this.controls.target.set(0, 50, 0);
        this.controls.update();

        const viewAngle = this.controls.getPolarAngle();
        this.controls.minPolarAngle = viewAngle;
        this.controls.maxPolarAngle = viewAngle;

        this.setupLights();
        // this.addCube();
        this.addMirror(width, height, pixelRatio);
        this.addSkybox();
    }

    addCube() {
        const geometry = new BoxGeometry(10, 10, 10);
        const material = new MeshPhongMaterial({
            color: 0x555555,
            // specular: 0x444444,
            shininess: 10
        });
        const cube = new Mesh(geometry, material);
        // cube.castShadow = true;
        cube.position.y = 5;

        this.scene.add(cube);
    }

    addMirror(width, height, pixelRatio) {
        const mirrorGeometry = new PlaneBufferGeometry(30, 30);
        const mirror = new Reflector(mirrorGeometry, {
            clipBias: 0.003,
            textureWidth: width * pixelRatio,
            textureHeight: height * pixelRatio,
            color: 0x889999,
            recursion: 1
        });
        mirror.position.z = -20;
        mirror.position.y = 65;
        mirror.rotateX(Math.PI / 32);
        this.scene.add(mirror);
    }

    setupLights() {
        this.lights = [];

        this.lights.push(new AmbientLight(0xffffff, 0.5));

        this.lights.push(new PointLight(0xcccccc, 1, 250));
        this.lights[1].position.set(10, 95, 0);

        this.lights.push(new PointLight(0xeeeeee, 1, 1000));
        this.lights[2].position.set(-250, 30, 10);

        this.lights.push(new PointLight(0xffffff, 1, 1000));
        this.lights[3].position.set(300, 50, -40);

        this.lights.push(new PointLight(0xffffff, 1, 1000));
        this.lights[4].position.set(20, 10, 100);

        this.lights.push(new PointLight(0xffffff, .5, 100));
        this.lights[5].position.set(-5, 60, -20);

        this.lights.forEach(light => this.scene.add(light));
        // this.lights.forEach(light => this.scene.add(new PointLightHelper(light, 1)));
    }

    addSkybox() {
        const planeGeo = new THREE.PlaneBufferGeometry(100, 150);

        var planeTop = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({color: 0x444444}));
        planeTop.position.y = 100;
        planeTop.rotateX(Math.PI / 2);
        this.scene.add(planeTop);

        var planeBottom = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshPhongMaterial({color: 0x888888}));
        planeBottom.position.y = -25;
        planeBottom.rotateX(-Math.PI / 2);
        planeBottom.receiveShadow = true;
        this.scene.add(planeBottom);

        var planeFront = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({color: 0x7799aa}));
        planeFront.position.z = 50;
        planeFront.position.y = 50;
        planeFront.rotateY(Math.PI);
        this.scene.add(planeFront);

        var planeRight = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({color: 0x00ff00}));
        planeRight.position.x = 50;
        planeRight.position.y = 50;
        planeRight.rotateY(-Math.PI / 2);
        this.scene.add(planeRight);

        var planeLeft = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({color: 0xff0000}));
        planeLeft.position.x = -50;
        planeLeft.position.y = 50;
        planeLeft.rotateY(Math.PI / 2);
        this.scene.add(planeLeft);

        var planeBack = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({color: 0xccff55}));
        planeBack.position.z = -50;
        planeBack.position.y = 50;
        this.scene.add(planeBack);
    }

    render() {
        // this.line.rotation.y += 0.01;
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    renderPoints(points) {

        var material = new THREE.LineBasicMaterial( {
            color: 0x0000ff,
            linewidth: 1
        } );
        var geometry = new THREE.Geometry();

        points.forEach(point => {
            geometry.vertices.push(new THREE.Vector3(point.x * 10, point.y * 10 + 50, point.z * 10))
        });
        const line = new THREE.Line( geometry, material );

        this.scene.add(line);

        this.renderedLines.push(line);
    }

    resize(width, height, pixelRatio) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( width, height );
    }

}