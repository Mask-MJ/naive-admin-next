<template>
  <div class="loginForm">
    <div class="text-2xl font-bold mb-6">登陆</div>
    <Form @register="register">
      <template #code="{ model, path }">
        <n-form-item-gi>
          <n-input-group>
            <n-input v-model:value="model[path]" placeholder="请输入图片验证码" />
            <n-button type="primary" ghost>
              <n-image
                width="120"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                preview-disabled
              />
            </n-button>
          </n-input-group>
        </n-form-item-gi>
      </template>
    </Form>
    <n-button block type="primary" @click="handleSubmit">提交</n-button>
  </div>
</template>

<script setup lang="ts">
  import type { FormSchema } from '@/components/Form/types/form';
  import { useForm } from '@/components/Form/hooks/useForm';
  const schemas: FormSchema[] = [
    {
      path: 'username',
      component: 'NInput',
      rule: { required: true, message: '请输入账号' },
      giProps: { span: 24 },
      componentProps: { placeholder: '请输入账号' },
    },
    {
      path: 'password',
      component: 'NInput',
      rule: { required: true, message: '请输入密码' },
      giProps: { span: 24 },
      componentProps: { placeholder: '请输入密码' },
    },
    {
      path: 'code',
      component: 'NInput',
      slot: 'code',
      giProps: { span: 24 },
      componentProps: { placeholder: '请输入图片验证码' },
    },
  ];

  const [register, { getPathsValue }] = useForm({
    labelWidth: 120,
    schemas,
    actionGiOptions: { span: 24 },
  });

  const handleSubmit = () => {
    console.log(getPathsValue());
  };
</script>

<style lang="scss" scoped>
  .loginForm {
    position: absolute;
    top: calc(50% - 250px);
    right: 10%;
    background-color: rgba($color: #fff, $alpha: 0.8);
    width: 350px;
    height: 450px;
    border-radius: 24px;
    padding: 32px 24px;
  }
</style>
