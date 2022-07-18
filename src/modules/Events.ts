import Viewer from "./Viewer";
import {
    mouseMeshIntersection,
    optimizedMouseMeshIntersection,
} from "./Intersect";
import pts from "./Points";

const USE_OPTIMIZED = false;

export function attachTo(element: HTMLElement | null) {
    if (!element) {
        console.error("no html element to attach to");
        return;
    }
    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mousedown", mouseDown);
}

function mouseMove(e: MouseEvent) {
    let mouse = Viewer.mouseToWorld(e);
    Viewer.mouseHelper.position.copy(mouse);

    // mesh intersect
    let timerStart = new Date().getTime();
    let { index, position } = mouseMeshIntersection(
        mouse,
        Viewer.camera.position,
        ...pts.meshes
    );
    let timerEnd = new Date().getTime();
    logTime("default", timerEnd - timerStart);

    // optimized mesh intersect
    if (USE_OPTIMIZED) {
        timerStart = new Date().getTime();
        let intersection = optimizedMouseMeshIntersection(
            mouse,
            Viewer.camera.position,
            ...pts.meshes
        );

        timerEnd = new Date().getTime();
        logTime("optimized", timerEnd - timerStart);
        let def = _timings["default"].avg ?? 0;
        let opt = _timings["optimized"].avg ?? 0;

        console.log(
            `default: ${(def * 1).toFixed(3)} μs, optimized: ${(
                opt * 1
            ).toFixed(3)} μs`
        );

        index = intersection.index;
        position = intersection.position;
    }

    if (index >= 0) pts.highlightOne(index);
    else pts.highlightNone();

    Viewer.renderFrame();
}

function mouseDown(e: MouseEvent) {
    if (e.buttons === 1) leftClick(e);
    if (e.buttons === 2) rightClick(e);
}

function leftClick(e: MouseEvent) {
    console.log("LMB");
}

function rightClick(e: MouseEvent) {
    console.log("RMB");
}

// runtime eval
const _timings = {
    default: { logs: 0, avg: null as null | number },
    optimized: { logs: 0, avg: null as null | number },
};
function logTime(name: "default" | "optimized", durationMs: number) {
    if (_timings[name].avg == null) {
        _timings[name].avg = durationMs;
        _timings[name].logs = 1;
    } else {
        let adjustment = durationMs - _timings[name].avg!;
        adjustment /= _timings[name].logs;
        _timings[name].avg! += adjustment;
        _timings[name].logs += 1;
    }
}
