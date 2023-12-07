<script setup lang="ts">
import { onMounted } from "vue";
import Viewer from "../src/modules/Viewer";
import * as Geometry from "../src/modules/Geometry";
import { deform } from "../src/modules/Deform";
import { getMeasurements } from "../src/modules/Intersect";
import { BufferGeometry } from "three";

onMounted(() => {
  console.clear()
  
  let container = document.getElementById("container");
  Viewer.attachTo(container);
  Viewer.camera.position.set(200, 200, 20);
  Viewer.camera.lookAt(0, 0, 0);
  Viewer.camera.updateProjectionMatrix();
  Viewer.controls.update();

  Geometry.addToScene(Viewer.scene);
  Geometry.updateLINES(
    getMeasurements(Geometry.GEOMETRY, Geometry.PLANES)
    .flatMap(m => m.intersections)
  )

  Viewer.renderFrame();
});


function onSliderChange(e: Event) {
  const slider = e.target as HTMLInputElement;
  const id = slider.id;
  const value = parseFloat(slider.value);
  const measurements = deform(id, value, Geometry.GEOMETRY, Geometry.PLANES)
  Geometry.updateLINES(measurements.flatMap(m => m.intersections))
  Viewer.renderFrame();
}

</script>

<template>
  <div id="controls" style="position: absolute;">
    <input id="someInput" type="range" min="-1" max="1" step="0.01" value="0" :oninput="onSliderChange" />
  </div>
  <div id="container" oncontextmenu="return false;">
    
    
  </div>
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
""./modules/MeshSample