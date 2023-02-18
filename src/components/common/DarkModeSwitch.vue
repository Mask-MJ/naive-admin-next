<template>
  <div class="flex-center text-18px cursor-pointer" @click="handleSwitch">
    <i v-if="darkMode" class="i-line-md:moon"></i>
    <i v-else class="i-line-md:sunny-outline"></i>
  </div>
</template>

<script setup lang="ts" name="DarkModeSwitch">
  import { computed } from 'vue';

  interface Props {
    /** 暗黑模式 */
    dark?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    dark: false,
  });

  interface Emits {
    (e: 'update:dark', darkMode: boolean): void;
  }

  const emit = defineEmits<Emits>();

  const darkMode = computed({
    get() {
      return props.dark;
    },
    set(newValue: boolean) {
      emit('update:dark', newValue);
    },
  });

  function handleSwitch() {
    darkMode.value = !darkMode.value;
  }
</script>

<style scoped></style>
