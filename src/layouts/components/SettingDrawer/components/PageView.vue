<template>
  <n-divider title-placement="center">界面显示</n-divider>
  <n-space vertical size="large">
    <setting-menu label="面包屑">
      <n-switch :value="header.crumb.visible" @update:value="theme.setHeaderCrumbVisible" />
    </setting-menu>
    <setting-menu label="面包屑图标">
      <n-switch :value="header.crumb.showIcon" @update:value="theme.setHeaderCrumbIconVisible" />
    </setting-menu>
    <setting-menu label="多页签">
      <n-switch :value="tab.visible" @update:value="theme.setTabVisible" />
    </setting-menu>
    <setting-menu label="多页签风格">
      <n-select
        class="w-120px"
        size="small"
        :value="tab.mode"
        :options="tab.modeList"
        @update:value="theme.setTabMode"
      />
    </setting-menu>
    <setting-menu label="页面切换动画">
      <n-switch :value="page.animate" @update:value="theme.setPageIsAnimate" />
    </setting-menu>
    <setting-menu label="页面切换动画类型">
      <n-select
        class="w-120px"
        size="small"
        :value="page.animateMode"
        :options="page.animateModeList"
        @update:value="theme.setPageAnimateMode"
      />
    </setting-menu>
  </n-space>
</template>

<script lang="ts" setup name="PageView">
  import SettingMenu from './SettingMenu.vue';

  const theme = useThemeStore();
  const header = computed(() => theme.header);
  const tab = computed(() => theme.tab);
  const page = computed(() => theme.page);
</script>

<style scoped></style>
