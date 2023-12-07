import {
    BufferGeometry,
    Line3,
    Matrix4,
    Plane,
    Quaternion,
    Vector3,
} from "three";

export function getMeasurements(geometry: BufferGeometry, planes: Plane[]) {
    const measurements = planes.map((plane) => {
        const intersections = geometryPlaneIntersection(geometry, plane);
        const endPts = intersections.flatMap((i) => [i.start, i.end]);
        const circumference = intersections
            .map((i) => i.distance())
            .reduce((a, b) => a + b, 0);

        const t = plane.coplanarPoint(new Vector3()).negate();
        const r = new Quaternion().setFromUnitVectors(
            plane.normal,
            new Vector3(0, 0, 1)
        );
        const m4 = new Matrix4()
            .makeRotationFromQuaternion(r)
            .premultiply(new Matrix4().makeTranslation(t.x, t.y, t.z));

        const rotatedGeometry = new BufferGeometry()
            .setFromPoints(endPts)
            .applyMatrix4(m4);
        rotatedGeometry.computeBoundingBox();
        const size =
            rotatedGeometry.boundingBox?.getSize(new Vector3()) ??
            new Vector3();

        return { intersections, circumference, x: size.x, y: size.y };
    });
    return measurements;
}

/**
 * Intersect a BufferGeometry with a Plane
 *
 * @param plane Plane to intersect with
 * @param geometry BufferGeometry to intersect with
 * @returns Array of Line3s representing the intersection
 */
export function geometryPlaneIntersection(
    geometry: BufferGeometry,
    plane: Plane
) {
    const intersections: Line3[] = [];

    const faceVertices: [Vector3, Vector3, Vector3][] = [];
    const v = geometry.attributes.position;
    const f = geometry.index?.array ?? [...Array(v.count * 3).keys()];
    for (let i = 0; i < f.length; ) {
        faceVertices.push([
            new Vector3(v.getX(f[i]), v.getY(f[i]), v.getZ(f[i++])),
            new Vector3(v.getX(f[i]), v.getY(f[i]), v.getZ(f[i++])),
            new Vector3(v.getX(f[i]), v.getY(f[i]), v.getZ(f[i++])),
        ]);
    }

    const line = new Line3();
    faceVertices.forEach((fV3) => {
        const faceIntersections: Vector3[] = [];
        [
            [fV3[0], fV3[1]],
            [fV3[1], fV3[2]],
            [fV3[2], fV3[0]],
        ].forEach(([v1, v2]) => {
            const isx = plane.intersectLine(line.set(v1, v2), new Vector3());
            if (isx) faceIntersections.push(isx);
        });
        if (faceIntersections.length === 2)
            intersections.push(new Line3(...faceIntersections));
    });

    return intersections;
}
