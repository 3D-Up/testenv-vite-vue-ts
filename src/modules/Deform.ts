import { BufferGeometry, Plane } from "three";
import { getMeasurements } from "./Intersect";

export function deform(
    type: string,
    value: number,
    geometry: BufferGeometry,
    planes: Plane[]
) {
    const before = getMeasurements(geometry, planes);
    console.log("deform", type, value, before);

    //TODO  adjust to measurements

    ////// sample code - do something with the geometry
    const v = geometry.attributes.position;
    const n = geometry.attributes.normal;
    const o = value;
    for (let i = 0, len = v.count * 3; i < len; i++) {
        v.setXYZ(
            i,
            v.getX(i) + n.getX(i) * o,
            v.getY(i) + n.getY(i) * o,
            v.getZ(i) + n.getZ(i) * o
        );
    }
    v.needsUpdate = true;
    //////

    const after = getMeasurements(geometry, planes);
    console.log(after);
    return after;
}
