<script setup lang="ts">
import { onMounted } from "vue";
import Viewer from "../src/modules/Viewer";
import Points from "../src/modules/Points";
import { updateSelection } from "../src/modules/Select"

console.clear()
Points.addPtsToScene(Viewer.scene);

function updatePointSelection(e: MouseEvent) {
    let curr = Points.closest(Viewer.mouseToWorld(e))
    let sel = updateSelection(Points.selected, curr, Points.count)
    Points.highlight(sel)
    Viewer.renderFrame()
  }

onMounted(() => {
  let container = document.getElementById("container");
  Viewer.attach(container);
  container?.addEventListener("mousemove", updatePointSelection)
});
</script>

<template>
  <div id="container"></div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
