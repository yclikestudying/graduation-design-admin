<template>
  <div class="phone">
    <el-form label-width="120px">
      <el-form-item label="手机号">
        <el-input v-model="userPhone" readonly />
      </el-form-item>
      <el-form-item label="新手机号">
        <el-input/>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-top: 10px" @click="open">更换手机</el-button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import { ElNotification } from "element-plus";

const userStore = useUserStore();
const userPhone = ref(userStore.userPhone);

const open = () => {
  ElNotification({
    title: "提示",
    message: "请到用户端进行修改",
    type: "info",
  });
};
</script>

<style lang="less" scoped>
.phone {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
