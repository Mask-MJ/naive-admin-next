<template>
  <dark-mode-container
    class="flex-y-center h-full border-b-1 border-gray-200"
    :style="{ height }"
    :inverted="header.inverted"
  >
    <logo
      v-if="showLogo"
      :show-title="true"
      class="h-full"
      :style="{ width: theme.sider.width + 'px' }"
    />
    <div v-if="!showHeaderMenu" class="flex-1 overflow-hidden flex-y-center h-full">
      <menu-collapse v-if="showMenuCollapse || isMobile" />
      <breadcrumb v-if="header.crumb.visible && !isMobile" />
    </div>
    <header-menu v-else />
    <div class="flex justify-end h-full">
      <full-screen />
      <theme-mode />
      <system-message />
      <user-avatar />
      <setting-button />
    </div>
  </dark-mode-container>
</template>

<script setup lang="ts" name="LayoutHeader">
  import Logo from '@/layouts/components/Logo/index.vue';
  import {
    MenuCollapse,
    Breadcrumb,
    HeaderMenu,
    FullScreen,
    ThemeMode,
    SystemMessage,
    SettingButton,
    UserAvatar,
  } from './components';

  defineProps({
    showLogo: { type: Boolean },
    showHeaderMenu: { type: Boolean },
    showMenuCollapse: { type: Boolean },
  });
  const theme = useThemeStore();
  const { isMobile } = useBasicLayout();
  const header = computed(() => {
    return theme.header;
  });

  const height = computed(() => `${header.value.height}px`);
</script>

<style scoped>
  .global-header {
    box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
  }
</style>
