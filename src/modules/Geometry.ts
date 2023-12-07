import {
    BufferAttribute,
    BufferGeometry,
    CylinderBufferGeometry,
    Line3,
    LineSegments,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    Plane,
    PlaneBufferGeometry,
    Quaternion,
    Scene,
    Vector3,
} from "three";

export const GEOMETRY = new CylinderBufferGeometry(100, 100, 400, 24, 10, false)
    .rotateX(Math.PI / 2)
    .rotateX(Math.PI / 30)
    .rotateY(Math.PI / 30);
GEOMETRY.computeVertexNormals();

const plane1 = new Plane(new Vector3(0, 0, 1), -150);
const plane2 = new Plane(new Vector3(0, 0, 1), 0);
const plane3 = new Plane(new Vector3(0, 0, 1), 150);
export const PLANES = [plane1, plane2, plane3];

export const LINES = new BufferGeometry().setFromPoints([]);

export function updateLINES(lines: Line3[]) {
    LINES.deleteAttribute("position");
    const xyzArr = lines.flatMap((l) => [
        ...l.start.toArray(),
        ...l.end.toArray(),
    ]);
    LINES.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(xyzArr), 3)
    );
}

// Display Meshes

const materials = {
    blue: new MeshLambertMaterial({
        color: 0x5555ff,
        transparent: true,
        opacity: 0.1,
        depthTest: false,
    }),
    wireframe: new MeshLambertMaterial({
        color: 0,
        wireframe: true,
    }),
    green: new MeshBasicMaterial({
        color: 0x00ff00,
        depthTest: false,
    }),
};

// cylinder meshes share geometry
const cylinder = new Mesh(GEOMETRY, materials.blue);
const cylinderWireframe = new Mesh(GEOMETRY, materials.wireframe);

const planePreviews = PLANES.map((p, i) => {
    const v = p.normal.clone().multiplyScalar(p.constant);
    const geometry = new PlaneBufferGeometry(300, 300).translate(v.x, v.y, v.z);

    return new Mesh(geometry, materials.wireframe);
});

const intersectionPreview = new LineSegments(LINES, materials.green);

export const addToScene = (scene: Scene) =>
    scene.add(
        cylinder,
        //cylinderWireframe,
        ...planePreviews,
        intersectionPreview
    );
