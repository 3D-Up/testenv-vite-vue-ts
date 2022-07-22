import {
    CircleBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene,
    Vector3,
} from "three";

const SET_RANDOM = false;
const [COUNT, RADIUS] = [50, 20];

class Points {
    materials = {
        blue: new MeshBasicMaterial({ color: 0x5555ff }),
        gray: new MeshBasicMaterial({ color: 0x555555 }),
        red: new MeshBasicMaterial({ color: 0xff5555 }),
    };
    points = [] as Vector3[];
    private meshes = [] as Mesh[];
    private ptGeometry = new CircleBufferGeometry(1, 25);
    selected: number;

    constructor(readonly count: number, readonly radius: number) {
        this.selected = SET_RANDOM ? Math.floor(Math.random() * count) : 0;

        for (let i = 0; i < count; i++) {
            let angle = Math.PI * 1.5; // start from 12:00 position
            angle += (2 * Math.PI * i) / count;
            let x = Math.sin(angle) * this.radius;
            let y = Math.cos(angle) * this.radius;
            this.points.push(new Vector3(x, y, 0));
        }

        this.points.forEach((pt) => {
            let m = new Mesh(this.ptGeometry, this.materials.gray);
            m.position.copy(pt);
            this.meshes.push(m);
        });
    }

    addToScene = (scene: Scene) => {
        let highlighted = new Mesh(this.ptGeometry, this.materials.red);
        highlighted.position.copy(this.meshes[this.selected].position);
        highlighted.scale.setScalar(1.3);
        highlighted.renderOrder = -1;

        scene.add(highlighted);
        scene.add(...this.meshes);
    };

    highlight(highlighted: boolean[]) {
        highlighted.forEach((h, i) => {
            this.meshes[i].material = h
                ? this.materials.blue
                : this.materials.gray;
        });
    }

    closest(ref: Vector3): number {
        let index = -1;
        let dist = Number.MAX_VALUE;
        this.points.forEach((pt, i) => {
            let thisDist = pt.distanceTo(ref);
            if (thisDist > dist) return;
            [index, dist] = [i, thisDist];
        });
        return index;
    }
}

const pts = new Points(COUNT, RADIUS);
export default pts;
