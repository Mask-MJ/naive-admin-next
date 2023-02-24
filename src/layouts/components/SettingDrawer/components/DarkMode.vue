<template>
  <n-divider title-placement="center">主题模式</n-divider>
  <n-space vertical size="large">
    <setting-menu label="深色主题">
      <n-switch :value="theme.darkMode" @update:value="theme.setDarkMode">
        <template #checked>
          <i class="text-14px text-primary icon-line-md:sunny-outline"></i>
        </template>
        <template #unchecked>
          <i class="text-14px text-primary icon-line-md:moon-filled"></i>
        </template>
      </n-switch>
    </setting-menu>
    <setting-menu label="跟随系统">
      <n-switch :value="theme.followSystemTheme" @update:value="theme.setFollowSystemTheme">
        <template #checked>
          <i class="text-14px text-primary icon-ant-design:stop-outlined"></i>
        </template>
        <template #unchecked>
          <i class="text-14px text-primary icon-ant-design:clock-circle-outlined"></i>
        </template>
      </n-switch>
    </setting-menu>
  </n-space>
</template>

<script lang="ts" setup name="DarkMode">
  import SettingMenu from './SettingMenu.vue';

  const theme = useThemeStore();
</script>
<style scoped>
  :deep(.n-switch__rail) {
    background-color: #000e1c !important;
  }
</style>
