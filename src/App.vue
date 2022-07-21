<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { reactive } from "vue";
import * as Hello from "./modules/hello";
import GreetUser from "./components/GreetUser.vue";

let state = reactive({ greeting: "HI!" });

const echo = (userSaid: string) => {
  Hello.addGreeting(userSaid);
  state.greeting = Hello.getRandomGreeting();
};
</script>

<template>
  <img
    alt="Vue logo"
    src="https://3dup.app/wp-content/uploads/2022/04/logo.png"
  />
  <GreetUser :msg="state.greeting" v-on:said-hello="echo" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
