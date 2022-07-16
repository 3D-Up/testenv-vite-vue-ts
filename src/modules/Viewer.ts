/**
 * @module ThreeViewer Central Singleton Three.js 3D-Viewer
 */

import {
    AmbientLight,
    Color,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    PlaneBufferGeometry,
    Raycaster,
    Scene,
    Vector3,
    WebGLRenderer,
} from "three";

const raycaster = new Raycaster();

class Viewer {
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    floor: Mesh;

    constructor() {
        // Scene
        this.scene = new Scene();
        this.scene.background = new Color(0xf0f0f0);

        // camera
        this.camera = new PerspectiveCamera(75, 1200 / 800, 0.1, 1000);
        this.camera.up.set(0, 0, 1);
        this.camera.position.set(0, 0, 50);
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.scene.add(this.camera);

        // renderer
        this.renderer = new WebGLRenderer({ antialias: true });

        // Lights
        const ambientLight = new AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        // floor
        this.floor = new Mesh(
            new PlaneBufferGeometry(100, 100),
            new MeshBasicMaterial({ color: 0x0000ff })
        );
        this.floor.visible = false;
        this.scene.add(this.floor);

        this.renderFrame();
    }

    attach(container: HTMLElement | null) {
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

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderFrame();
    }

    renderFrame() {
        this.renderer.render(this.scene, this.camera);
    }

    mouseToWorld(event: MouseEvent): Vector3 {
        const domElement = this.renderer.domElement;
        const mouse = {
            x: (event.offsetX / domElement.clientWidth) * 2 - 1,
            y: -(event.offsetY / domElement.clientHeight) * 2 + 1,
        };

        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObject(this.floor, false);
        if (intersects.length == 0) return new Vector3();
        const intersectPt = intersects[0].point;
        return intersectPt;
    }
}

const threeViewer = new Viewer();
console.log("init viewer");
export default threeViewer;
