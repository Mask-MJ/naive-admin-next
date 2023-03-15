<template>
  <Modal @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { schemas } from './data';
  import { useForm } from '@/components/Form';
  import { getDept, setDept, addDept } from '@/api/system/dept';

  const emits = defineEmits(['success', 'register']);
  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    setModalProps({ title: data.deptId ? '修改部门' : '新增部门' });
    if (data.deptId) {
      const result = await getDept(data.deptId);
      await setPathsValue(result);
    }
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (result.postId ? setDept(result) : await addDept(result));
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>
