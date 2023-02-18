<template>
  <hover-container
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="toggleSiderCollapse"
  >
    <div class="text-16px i-line-md:menu-fold-right" v-if="app.siderCollapse"></div>
    <div class="text-16px i-line-md:menu-fold-left" v-else></div>
  </hover-container>
</template>

<script setup lang="ts" name="MenuCollapse">
  const app = useAppStore();
  const theme = useThemeStore();
  const toggleSiderCollapse = () => {
    app.setSiderCollapse(!app.siderCollapse);
  };
</script>

<style scoped></style>
