<template>
  <hover-container
    class="w-40px h-full"
    tooltip-content="全屏"
    :inverted="theme.header.inverted"
    @click="toggle"
  >
    <i class="text-18px i-ant-design:fullscreen-exit-outlined" v-if="isFullscreen"></i>
    <i class="text-18px i-ant-design:fullscreen-outlined" v-else></i>
  </hover-container>
</template>

<script lang="ts" setup name="FullScreen">
  const { isFullscreen, toggle } = useFullscreen();
  const theme = useThemeStore();
</script>
