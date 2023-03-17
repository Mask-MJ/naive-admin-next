<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="theme.pageAnimateMode" mode="out-in" :appear="true">
      <keep-alive :include="tabStore.getCacheTabList">
        <div class="p-4" :key="route.fullPath">
          <component :is="Component" v-if="app.reloadFlag" />
        </div>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts" name="LayoutContent">
  interface Props {
    /** 显示padding */
    showPadding?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showPadding: true,
  });

  const app = useAppStore();
  const theme = useThemeStore();
  const tabStore = useMultipleTabStore();
</script>

<style scoped></style>
