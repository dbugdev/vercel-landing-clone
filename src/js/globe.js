import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class App {
	constructor() {
		this.width = 1024;
		this.height = 500;
		// SCENE SETUP
		this.setup();
		// ANIMATION LOOP
		this.update();
		// WINDOW RESIZE
		window.addEventListener("resize", this.resize.bind(this));
	}

	setup() {
		this.addScene();
		this.addPerspectiveCamera();
		this.addRenderer();

		// this.addOrbitControl();
		// this.addAxes(60);
		this.addLights();

		// ADD STUFFS HERE 🎨
		this.addGlobe();
	}

	addGlobe() {
		const loader = new THREE.TextureLoader();
		loader.load(
			"https://assets.vercel.com/image/upload/v1595320886/front/home/globe-texture.jpg",
			(texture) => {
				const geometry = new THREE.SphereBufferGeometry(30, 50, 50);
				const material = new THREE.MeshStandardMaterial({
					map: texture,
				});
				this.globe = new THREE.Mesh(geometry, material);
				// this.globe.position.y = -20;
				this.scene.add(this.globe);
			}
		);
	}

	addLights() {
		this.light = new THREE.AmbientLight(0xffffff, 1);
		this.scene.add(this.light);
	}

	animate() {
		// ANIMATE STUFF HERE 🔮
		if (this.globe) {
			this.globe.rotation.y += 0.002;
		}
	}

	addRenderer() {
		// WEBGL RENDERER
		const root = document.getElementById("globe");
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor("white");
		root.appendChild(this.renderer.domElement);
	}

	addScene() {
		// 3D SCENE
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color("white");
	}

	addPerspectiveCamera() {
		// PERSPECTIVE CAMERA 🎥
		const fov = 85;
		const aspect = this.width / this.height;
		const near = 0.1;
		const far = 1000;
		this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		this.camera.position.set(30, 20, 30);
		this.camera.lookAt(this.scene.position);
	}

	addOrbitControl() {
		// ORBIT CONTROLS 🎮
		this.control = new OrbitControls(this.camera, this.renderer.domElement);
	}

	addAxes(size = 5) {
		// AXES HELPER 🌏
		const axes = new THREE.AxesHelper(size);
		this.scene.add(axes);
	}

	update() {
		this.animate();
		// this.control?.update?.();
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.update.bind(this));
	}

	resize() {
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setPixelRatio(window.devicePixelRatio);
	}
}

const app = new App();
