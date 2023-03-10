<template>
  <n-scrollbar>
    <n-menu
      :value="activeKey"
      :collapsed="app.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      :collapsed-icon-size="22"
      :options="menus"
      :expanded-keys="expandedKeys"
      accordion
      :indent="18"
      :inverted="theme.sider.inverted"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </n-scrollbar>
</template>

<script setup lang="ts">
  // import type { Menu } from '#/router';
  // import type { MenuOption } from 'naive-ui';

  const route = useRoute();
  const app = useAppStore();
  const theme = useThemeStore();
  const routerStore = useRouterStore();

  const expandedKeys = ref<string[]>([]);

  const menus = computed(() => routerStore.menuList);
  const activeKey = computed(() => route.path);

  const handleUpdateExpandedKeys = (keys: string[]) => {
    expandedKeys.value = keys;
  };

  watch(
    () => route.path,
    () => {
      expandedKeys.value = [route.meta.parentName];
    },
    { immediate: true },
  );
</script>

<style scoped></style>
