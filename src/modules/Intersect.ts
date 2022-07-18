import { Mesh, Vector3 } from "three";

export function mouseMeshIntersection(
    mouse: Vector3, // mouse in 3D world space
    camera: Vector3, // camera position in 3D world space
    ...meshes: Mesh[]
): MouseMeshIntersection {
    // todo
    return { index: -1, position: new Vector3() };
}

export function optimizedMouseMeshIntersection(
    mouse: Vector3,
    camera: Vector3,
    ...meshes: Mesh[]
) {
    return mouseMeshIntersection(mouse, camera, ...meshes);
}

type MouseMeshIntersection =
    | { index: number; position: Vector3 } // on hit
    | { index: -1; position: Vector3 }; // on miss
