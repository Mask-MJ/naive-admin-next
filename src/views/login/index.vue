<template>
  <div class="relative h-full bg-black">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
  import LoginForm from './components/loginForm.vue';
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: login
  noAuth: true
</route>
