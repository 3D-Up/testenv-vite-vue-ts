<script setup lang="ts">
import { onMounted } from "vue";
import Viewer from "../src/modules/Viewer";
import Points from "../src/modules/Points";
import * as Events from "../src/modules/Events"

onMounted(() => {
  console.clear()
  let container = document.getElementById("container");
  Points.addToScene(Viewer.scene);
  Viewer.attachTo(container);
  Events.attachTo(container)

});
</script>

<template>
  <div id="container" oncontextmenu="return false;"></div>
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
""