<script setup lang="ts">
defineProps<{ msg: string }>();

let userGreeting = "say hi";
</script>

<template>
  <h1>{{ msg }}</h1>
  <input type="text" v-model="userGreeting" />
  <button v-on:click="$emit('said-hello', userGreeting)">save</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
