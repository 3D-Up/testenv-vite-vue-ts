/**
 * @module ThreeViewer Central Singleton Three.js 3D-Viewer
 */

import {
    AmbientLight,
    Color,
    DirectionalLight,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Raycaster,
    Scene,
    SphereBufferGeometry,
    Vector3,
    WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const raycaster = new Raycaster();

class Viewer {
    scene: Scene;
    camera: PerspectiveCamera;
    controls: OrbitControls;
    renderer: WebGLRenderer;
    mouseHelper: Mesh;

    constructor() {
        // Scene
        this.scene = new Scene();
        this.scene.background = new Color(0xf0f0f0);

        // camera
        this.camera = new PerspectiveCamera(75, 1200 / 800, 0.1, 1000);
        this.camera.up.set(0, 0, 1);
        this.camera.position.set(0, 0, 50);
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.camera.far = 3000;
        this.camera.near = 0.1;
        this.scene.add(this.camera);

        // renderer
        this.renderer = new WebGLRenderer({ antialias: true });

        // controls
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.controls.addEventListener("change", () => this.renderFrame());
        this.controls.target.set(0, 0, 0);
        this.controls.mouseButtons = {
            LEFT: 0, //rotate
            MIDDLE: 2, //pan
            RIGHT: 2, //pan
        };

        // Lights
        const ambientLight = new AmbientLight(0xffffff, 0.8);
        const directionalLight = new DirectionalLight(0xffffff, 0.2);
        directionalLight.position.set(500, 500, 500);
        directionalLight.target.position.set(0, 0, 0);
        this.scene.add(ambientLight, directionalLight);

        // mousehelper
        this.mouseHelper = new Mesh(
            new SphereBufferGeometry(0.3),
            new MeshBasicMaterial({ color: 0x000000 })
        );
        this.scene.add(this.mouseHelper);

        this.renderFrame();
    }

    attachTo(container: HTMLElement | null) {
        if (!container) {
            console.error("container not found");
            return;
        }

        container.appendChild(this.renderer.domElement);
        this.fitContainer(container);
        window.onresize = () => this.fitContainer(container);
    }

    // VIEWER FUNCTIONS

    fitContainer(container: HTMLElement) {
        let docWindow = container.ownerDocument.defaultView;
        if (!docWindow) {
            console.error("parent window not found");
            return;
        }
        const width = docWindow.innerWidth * 0.98;
        const height = docWindow.innerHeight * 0.98;

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderFrame();
    }

    renderFrame() {
        this.renderer.render(this.scene, this.camera);
    }

    mouseToWorld(event: MouseEvent) {
        const domElement = this.renderer.domElement;
        const mouse = {
            x: (event.offsetX / domElement.clientWidth) * 2 - 1,
            y: -(event.offsetY / domElement.clientHeight) * 2 + 1,
        };

        raycaster.setFromCamera(mouse, this.camera);
        return raycaster.ray;
    }

    mouseToDeviceCoordinates(event: MouseEvent) {
        let x = (event.clientX / window.innerWidth) * 2 - 1;
        let y = -(event.clientY / window.innerHeight) * 2 + 1;
        return { x, y };
    }
}

const threeViewer = new Viewer();
console.log("init viewer");
export default threeViewer;
