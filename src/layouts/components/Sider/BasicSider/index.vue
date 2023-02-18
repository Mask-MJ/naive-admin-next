<template>
  <dark-mode-container class="flex-col items-stretch h-full" :inverted="theme.sider.inverted">
    <logo
      v-if="!isHorizontalMix"
      :show-title="showTitle"
      :style="{ height: theme.header.height + 'px' }"
    />
    <basic-menu />
  </dark-mode-container>
</template>

<script setup lang="ts" name="BasicSider">
  import Logo from '../../Logo/index.vue';
  import BasicMenu from './components/BasicMenu.vue';

  const app = useAppStore();
  const theme = useThemeStore();
  const isHorizontalMix = computed(() => theme.layout.mode === 'horizontal-mix');
  const showTitle = computed(() => !app.siderCollapse && theme.layout.mode !== 'vertical-mix');
</script>

<style scoped></style>
