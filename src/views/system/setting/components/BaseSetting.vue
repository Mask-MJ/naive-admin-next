<template>
  <n-grid class="p-8" x-gap="36" :cols="4">
    <n-gi :span="2">
      <Form @register="registerForm" />
      <n-button type="primary" @click="handleSubmit">更新基本信息</n-button>
    </n-gi>
    <n-gi>
      <div>头像</div>
      <CropperAvatar
        :uploadApi="uploadApi"
        :value="avatar"
        btnText="更换头像"
        @change="updateAvatar"
        width="150"
      />
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
  import { useForm } from '@/components/Form';
  import { schemas } from '../data';
  import { uploadAvatar, getProfile, setProfile } from '@/api/system/user';
  import headerImg from '@/assets/images/header.jpg';

  const userStore = useUserStore();
  const uploadApi = uploadAvatar as any;
  let userInfo: any;

  const avatar = computed(() => {
    return userStore.userInfo.avatar || headerImg;
  });

  const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
    labelWidth: 80,
    schemas,
  });

  const updateAvatar = (src: string) => {
    const userInfo = userStore.userInfo;
    userInfo.avatar = src;
    userStore.setUserInfo(userInfo);
  };

  const handleSubmit = async () => {
    try {
      await validate();
      const result = getPathsValue();
      let params = { ...userInfo, ...result };
      await setProfile(params);
      window.$message.success('更新成功！');
    } catch (err) {
      window.$message.error('更新失败！');
    }
  };

  onMounted(async () => {
    userInfo = await getProfile();
    setPathsValue(userInfo);
  });
</script>

<style scoped></style>
