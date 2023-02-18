<template>
  <hover-container
    class="w-40px h-full"
    tooltip-content="主题配置"
    :inverted="theme.header.inverted"
    @click="app.toggleSettingDrawerVisible()"
  >
    <i class="text-20px i-ant-design:setting-outlined"></i>
  </hover-container>
</template>

<script setup lang="ts" name="SettingButton">
  const app = useAppStore();
  const theme = useThemeStore();
</script>

<style scoped></style>
