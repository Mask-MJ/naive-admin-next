<template>
  <div class="relative h-full bg-black">
    <Earth />
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
  import Earth from './Earth/index.vue';
  import LoginForm from './loginForm.vue';
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: login
  noAuth: true
</route>
