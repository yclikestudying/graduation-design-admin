<template>
  <div class="avatar">
    <el-avatar :size="300">
      <img :src="avatar" />
    </el-avatar>
    <el-button type="primary" style="margin-top: 10px" @click="open"
      >上传头像</el-button
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import { ElNotification } from "element-plus";

const userStore = useUserStore();
const avatar = ref(userStore.avatar);
const open = () => {
  ElNotification({
    title: "提示",
    message: "请到用户端进行修改",
    type: "info",
  });
};
</script>

<style lang="less" scoped>
.avatar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
