<template>
  <dark-mode-container
    class="global-tab flex-y-center w-full pl-16px"
    :style="{ height: theme.tab.height + 'px' }"
  >
    <div class="flex-1 overflow-hidden h-full">
      <tab-detail />
    </div>
    <reload-button />
  </dark-mode-container>
</template>

<script setup lang="ts" name="LayoutTab">
  import { useRoute } from 'vue-router';
  import ReloadButton from './components/ReloadButton.vue';
  import TabDetail from './components/TabDetail.vue';

  const route = useRoute();
  const theme = useThemeStore();
  const tab = useMultipleTabStore();

  tab.iniTabStore(route);

  watch(
    () => route.fullPath,
    () => {
      tab.addTab(route);
      tab.setActiveTab(route.fullPath);
    },
  );
</script>

<style scoped>
  .global-tab {
    box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
  }
</style>
