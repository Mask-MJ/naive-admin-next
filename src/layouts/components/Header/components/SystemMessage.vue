<template>
  <hover-container class="w-40px h-full" :inverted="theme.header.inverted">
    <i class="text-16px i-line-md:bell"></i>
  </hover-container>
</template>

<script setup lang="ts">
  const theme = useThemeStore();
</script>

<style scoped></style>
