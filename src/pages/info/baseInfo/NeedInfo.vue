<template>
  <div class="need-info">
    <el-form label-width="120px">
      <el-form-item label="用户id">
        <el-input v-model="userId" readonly />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userName" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userPhone" readonly />
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input v-model="createTime" readonly />
      </el-form-item>
      <el-form-item label="用户权限">
        <el-input v-model="userRole" readonly />
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-top: 10px" @click="open">修改信息</el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import { ElNotification } from "element-plus";

const userStore = useUserStore();
const userId = ref(userStore.userId);
const userName = ref(userStore.name);
const userPhone = ref(userStore.userPhone);
const createTime = ref(userStore.createTime);
const userRole = ref(userStore.userRole);

const open = () => {
  ElNotification({
    title: "提示",
    message: "请到用户端进行修改",
    type: "info",
  });
};
</script>

<style lang="less" scoped>
.need-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
