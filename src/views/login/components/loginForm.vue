<template>
  <div class="loginForm">
    <div class="text-2xl font-bold mb-6">登陆</div>
    <BasicForm @register="register" @submit="handleSubmit">
      <template #code="{ model, path }">
        <n-input-group>
          <n-input v-model:value="model[path]" placeholder="请输入图片验证码" />
          <n-image
            class="border-l-1 cursor-pointer"
            object-fit="cover"
            :src="loginForm.url"
            preview-disabled
            @click="initCode"
          />
        </n-input-group>
      </template>
    </BasicForm>
    <n-button block type="primary" :loading="loading" @click="submit">提交</n-button>
  </div>
</template>

<script setup lang="ts">
  import type { FormSchema } from '@/components/Form';
  import { useForm, BasicForm } from '@/components/Form';
  import { getPictureCode } from '@/api/basic/user';
  import { NAvatar } from 'naive-ui';

  const schemas: FormSchema[] = [
    {
      path: 'username',
      component: 'NInput',
      rule: { required: true, message: '请输入账号', trigger: 'blur' },
      defaultValue: 'admin',
      giProps: { span: 24 },
      componentProps: { placeholder: '请输入账号' },
    },
    {
      path: 'password',
      component: 'NInput',
      rule: { required: true, message: '请输入密码', trigger: 'blur' },
      defaultValue: 'admin123',
      giProps: { span: 24 },
      componentProps: { placeholder: '请输入密码', type: 'password', showPasswordOn: 'click' },
    },
    {
      path: 'code',
      component: 'NInput',
      rule: { required: true, message: '请输入验证码', trigger: 'blur' },
      slot: 'code',
      giProps: { span: 24 },
      componentProps: { placeholder: '请输入图片验证码' },
    },
  ];

  const [register, { submit }] = useForm({
    labelWidth: 120,
    size: 'large',
    gridProps: { collapsed: false },
    schemas,
  });

  const { t } = useI18n();
  const userStore = useUserStore();
  const loading = ref(false);
  const loginForm = reactive({
    url: '',
    uuid: '',
  });

  async function initCode() {
    const pictureCode = await getPictureCode();
    loginForm.url = `data:image/gif;base64,${pictureCode.img}`;
    loginForm.uuid = pictureCode.uuid;
  }

  onMounted(() => {
    initCode();
  });

  const handleSubmit = async (e) => {
    loading.value = true;
    try {
      const userInfo = await userStore.login({ ...e, uuid: loginForm.uuid });
      if (userInfo) {
        window.$notification.success({
          title: t('login.loginSuccessTitle'),
          description: `${t('login.loginSuccessDesc')}: ${userInfo.nickName}`,
          duration: 3000,
          avatar: () => h(NAvatar, { size: 'small', round: true, src: `${userInfo.avatar}` }),
        });
      }
    } finally {
      loading.value = false;
    }
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
