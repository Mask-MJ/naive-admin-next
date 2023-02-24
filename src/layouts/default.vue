<template>
  <n-layout has-sider class="wh-full">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :width="width"
      :collapsed-width="collapsedWidth"
      :native-scrollbar="false"
      :collapsed="siderCollapse"
      content-style="height: 100%"
    >
      <LayoutSider />
    </n-layout-sider>
    <n-layout content-style="display:flex; flex-flow: column">
      <n-layout-header>
        <LayoutHeader v-bind="headerProps" />
        <LayoutTabs />
      </n-layout-header>
      <n-layout-content content-style="flex: 1">
        <LayoutContent />
      </n-layout-content>
    </n-layout>
  </n-layout>
  <back-top />
  <setting-drawer />
</template>

<script setup lang="ts">
  import LayoutSider from './components/Sider/index.vue';
  import LayoutHeader from './components/Header/index.vue';
  import LayoutTabs from './components/Tabs/index.vue';
  import LayoutContent from './components/Content/index.vue';
  import BackTop from './components/BackTop/index.vue';
  import SettingDrawer from './components/SettingDrawer/index.vue';
  const app = useAppStore();
  const theme = useThemeStore();
  const width = computed(() => theme.sider.width);
  const collapsedWidth = computed(() => theme.sider.collapsedWidth);
  const siderCollapse = computed(() => app.siderCollapse);
  // const themeSide = computed(() => theme.state.sider);
  const { headerProps } = useBasicLayout();
</script>
