<template>
  <div
    class="dark:bg-[#18181c] dark:text-white dark:text-opacity-82 transition-all duration-300 ease-in-out"
    :class="inverted ? 'bg-[#001428] text-white' : 'bg-white text-[#333639]'"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="DarkModeContainer">
  interface Props {
    inverted?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    inverted: false,
  });
  console.log(props);
</script>

<style scoped></style>
