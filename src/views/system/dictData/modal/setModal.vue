<template>
  <Modal @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { useForm } from '@/components/Form';
  import { editDictDataList, addDictDataList } from '@/api/system/dict';
  import { schemas } from './data';

  const emits = defineEmits(['success', 'register']);
  const isUpdate = ref(true);

  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    isUpdate.value = !!data.isUpdate;
    setModalProps({ title: data.isUpdate ? '修改字典选项' : '新增字典选项' });
    setPathsValue(data.isUpdate ? data.rowData : { dictType: data.dictType });
  });

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      await (unref(isUpdate) ? editDictDataList(result) : addDictDataList(result));
      emits('success');
      closeModal();
    } catch (error) {}
  };
</script>

<style scoped></style>
