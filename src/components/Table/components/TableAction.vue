<template>
  <div class="flex justify-between" @click="onCellClick">
    <template v-for="(action, index) in getActions" :key="index">
      <n-tooltip v-if="action.tooltip" placement="top">
        <template #trigger>
          <n-button :class="index ? 'ml-2' : ''" v-bind="action">
            <template #icon v-if="action.icon">
              <i :class="action.icon"></i>
            </template>
            <template v-if="action.label">{{ action.label }}</template>
          </n-button>
        </template>
        {{ action.tooltip }}
      </n-tooltip>
      <n-popconfirm v-else-if="action.popConfirm" v-bind="action">
        <template #trigger>
          <n-button :class="index ? 'ml-2' : ''" v-bind="action">
            <template #icon v-if="action.icon">
              <i :class="action.icon"></i>
            </template>
          </n-button>
        </template>
        <template v-if="action.label">{{ action.label }}</template>
      </n-popconfirm>
      <n-button v-else :class="index ? 'ml-2' : ''" v-bind="action">
        <template #icon v-if="action.icon">
          <i :class="action.icon"></i>
        </template>
        <template v-if="action.label">{{ action.label }}</template>
      </n-button>
    </template>
    <n-dropdown
      trigger="hover"
      :options="getDropdownList"
      v-if="dropDownActions && getDropdownList.length > 0"
    >
      <n-button text size="small" v-if="!$slots.more" class="ml-2">
        <i class="i-ant-design:ellipsis-outlined"></i>
      </n-button>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts" name="TableAction">
  import type { DropdownOption } from 'naive-ui';
  import type { ActionItem } from '../types/tableAction';
  // import { Size, Type } from 'naive-ui/es/button/src/interface';
  // import type { TableActionType } from '../types/table';

  import { isBoolean, isFunction } from 'lodash-es';

  const props = defineProps({
    actions: {
      type: Array as PropType<ActionItem[]>,
      default: null,
    },
    dropDownActions: {
      type: Array as PropType<ActionItem[]>,
      default: null,
    },
    divider: { type: Boolean, default: true },
    outside: { type: Boolean, default: false },
    stopButtonPropagation: { type: Boolean, default: false },
  });

  /** 根据权限展示 */
  // const hasPermission = (auth?: string | string[]) => true;

  function isIfShow(action: ActionItem | DropdownOption): boolean {
    const ifShow = action.ifShow;

    let isIfShow = true;

    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(action);
    }
    return isIfShow;
  }

  const getActions = computed((): ActionItem[] => {
    return (toRaw(props.actions) || [])
      .filter((action) => isIfShow(action))
      .map((action) => {
        const { popConfirm } = action;
        return {
          type: 'primary',
          size: 'small',
          ...action,
          ...(popConfirm || {}),
          onPositiveClick: popConfirm?.onPositiveClick,
          onNegativeClick: popConfirm?.onNegativeClick,
          enable: !!popConfirm,
        };
      });
  });

  const getDropdownList = computed((): DropdownOption[] => {
    return (toRaw(props.dropDownActions) || [])
      .filter((dropDownActions) => isIfShow(dropDownActions))
      .map((action) => {
        return {
          label: action.tooltip,
          key: action.icon,
          icon: () => h('i', { class: action.icon }),
          props: { onClick: action?.onClick },
        } as DropdownOption;
      });
  });

  const onCellClick = (e: MouseEvent) => {
    if (!props.stopButtonPropagation) return;
    const path = e.composedPath() as HTMLElement[];
    const isInButton = path.find((ele) => {
      return ele.tagName?.toUpperCase() === 'BUTTON';
    });
    isInButton && e.stopPropagation();
  };
</script>

<style scoped></style>
