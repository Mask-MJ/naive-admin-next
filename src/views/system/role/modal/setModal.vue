<template>
  <BasicModal @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { setSchemas } from './data';
  import { useForm } from '@/components/Form';
  import { getRole, getRoleMenuTree, setRole, addRole } from '@/api/system/role';

  const emits = defineEmits(['success', 'register']);
  const roleId = ref();
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas: setSchemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    setModalProps({ title: data ? '修改角色' : '新增角色' });
    if (data) {
      roleId.value = data.roleId;
      const result = await getRole(data.roleId);
      const treeData = await getRoleMenuTree(data.roleId);
      result.menuIds = treeData.checkedKeys;
      await setPathsValue(result);
    }
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      if (roleId.value) {
        result.roleId = roleId.value;
        await setRole(result);
      } else {
        result.deptIds = [];
        result.deptCheckStrictly = true;
        result.menuCheckStrictly = true;
        await addRole(result);
      }
      emits('success');
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
</script>

<style scoped></style>
