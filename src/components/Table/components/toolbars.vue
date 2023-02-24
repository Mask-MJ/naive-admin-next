<template>
  <div class="flex">
    <!--刷新-->
    <n-tooltip trigger="hover">
      <template #trigger>
        <div class="cursor-pointer">
          <n-icon size="18" @click="reload"> <i class="i-ant-design:reload-outlined"></i> </n-icon>
        </div>
      </template>
      <span>刷新</span>
    </n-tooltip>
    <n-divider vertical />
    <!--斑马纹-->
    <n-tooltip trigger="hover">
      <template #trigger>
        <div class="cursor-pointer">
          <n-dropdown
            :value="isStriped"
            trigger="click"
            :options="stripedOptions"
            @select="stripedSelect"
          >
            <n-icon size="18"> <i class="i-ant-design:pic-center-outlined"></i> </n-icon>
          </n-dropdown>
        </div>
      </template>
      <span>表格斑马纹</span>
    </n-tooltip>
    <n-divider vertical />
    <!--密度-->
    <n-tooltip trigger="hover">
      <template #trigger>
        <div class="cursor-pointer">
          <n-dropdown
            :value="size"
            trigger="click"
            :options="densityOptions"
            @select="densitySelect"
          >
            <n-icon size="18"><i class="i-ant-design:column-height-outlined"></i> </n-icon>
          </n-dropdown>
        </div>
      </template>
      <span>密度</span>
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
  const emits = defineEmits(['changeTableSetting']);
  const props = defineProps({
    striped: { type: Boolean },
    size: { type: String },
  });

  const isStriped = computed(() => String(props.striped));

  const stripedOptions = [
    { label: '显示', key: 'true' },
    { label: '不显示', key: 'false' },
  ];
  const densityOptions = [
    { label: '紧凑', key: 'small' },
    { label: '默认', key: 'medium' },
    { label: '宽松', key: 'large' },
  ];

  const reload = () => {};
  const stripedSelect = (e) => {
    emits('changeTableSetting', { type: 'striped', value: Boolean(e) });
  };
  const densitySelect = (e) => {
    emits('changeTableSetting', { type: 'size', value: e });
  };
</script>

<style scoped></style>
