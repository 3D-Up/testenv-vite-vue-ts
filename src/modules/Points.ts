import {
    CircleBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene,
    Vector3,
} from "three";

const SET_RANDOM = false;
const [SIZE, SEGMENTS, COUNT, RADIUS] = [10, 100, 6, 20];

class Points {
    materials = {
        blue: new MeshBasicMaterial({ color: 0x5555ff }),
        gray: new MeshBasicMaterial({ color: 0x555555 }),
        red: new MeshBasicMaterial({ color: 0xff5555 }),
    };
    points = [] as Vector3[];
    meshes = [] as Mesh[];
    private ptGeometry = new CircleBufferGeometry(SIZE, SEGMENTS);
    selected: number;

    constructor(readonly count: number, readonly radius: number) {
        this.selected = SET_RANDOM ? Math.floor(Math.random() * count) : 0;

        for (let i = 0; i < count; i++) {
            let a = (2 * Math.PI * i) / count;
            let x = Math.sin(a) * this.radius;
            let y = Math.cos(a) * this.radius;
            this.points.push(new Vector3(x, y, 0));
        }

        this.points.forEach((pt) => {
            let m = new Mesh(this.ptGeometry, this.materials.gray);
            m.position.copy(pt);
            this.meshes.push(m);
        });
    }

    addToScene = (scene: Scene) => {
        /* let highlighted = new Mesh(this.ptGeometry, this.materials.red);
        highlighted.position.copy(this.meshes[this.selected].position);
        highlighted.scale.setScalar(1.3);
        highlighted.renderOrder = -1;

        scene.add(highlighted); */
        scene.add(...this.meshes);
    };

    highlight(highlighted: boolean[]) {
        this.meshes.forEach((m, i) => {
            m.material = highlighted[i]
                ? this.materials.blue
                : this.materials.gray;
        });
    }

    highlightOne(index: number) {
        this.meshes.forEach((m, i) => {
            m.material =
                i === index ? this.materials.blue : this.materials.gray;
        });
    }

    highlightNone() {
        this.meshes.forEach((m) => {
            m.material = this.materials.gray;
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
