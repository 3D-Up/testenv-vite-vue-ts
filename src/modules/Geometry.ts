import { BufferGeometry, Material, Mesh, Ray, Triangle, Vector3 } from "three";

export function getMeshFaceTriangle(mesh: Mesh, faceIndex: number): Triangle {
    const [a, b, c] = getFaceVertices(mesh, getMeshFace(mesh, faceIndex));
    return new Triangle(a, b, c);
}

export function getMeshFace(mesh: Mesh, faceIndex: number) {
    const faces = mesh.geometry.index;
    let fI = faceIndex * 3;
    const face: [number, number, number] = [
        faces?.array[fI] ?? fI,
        faces?.array[++fI] ?? fI,
        faces?.array[++fI] ?? fI,
    ];

    return face;
}

export function getFaceVertices(
    mesh: Mesh<BufferGeometry, Material | Material[]>,
    face: [number, number, number]
) {
    const vertices = mesh.geometry.getAttribute("position");
    const [a, b, c] = face.map((vI) => {
        return new Vector3(
            vertices.getX(vI),
            vertices.getY(vI),
            vertices.getZ(vI)
        );
    });
    return [a, b, c];
}

function intersectRayTriangle(ray: Ray, triangle: Triangle) {
    let { a, b, c } = triangle;
    return ray.intersectTriangle(a, b, c, false, new Vector3());
}
