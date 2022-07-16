import Points from "./Points";
import Viewer from "./Viewer";
import { updateSelection } from "./Select";

export function attachTo(element: HTMLElement | null) {
    if (!element) {
        console.error("no html element to attach to");
        return;
    }
    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mousedown", mouseDown);
}

function mouseMove(e: MouseEvent) {
    // update point selection
    let curr = Points.closest(Viewer.mouseToWorld(e));
    let sel = updateSelection(Points.selected, curr, Points.count);
    Points.highlight(sel);
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
