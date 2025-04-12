<template>
  <div class="login">
    <div class="form">
      <div class="title">
        <span>校园集市后台管理</span>
      </div>
      <el-form :inline="true" :model="loginInfo" class="demo-form-inline">
        <el-form-item label="账号">
          <el-input
            v-model="loginInfo.userPhone"
            placeholder="输入手机号"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="loginInfo.userPassword"
            placeholder="输入密码"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isLoading"
            type="primary"
            @click="onSubmit"
            :disabled="disabled"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { reactive, ref, watch } from "vue";
import { useUserStore } from "@/store/user";
import { ElMessage } from "element-plus";

// 数据
let disabled = ref(true); // 手机号密码为空，不能点击登录按钮
let isLoading = ref(false); // 登录时按钮的加载动画
const userStore = useUserStore();
let loginInfo = reactive({
  userPhone: "17823257046",
  userPassword: "11111111",
});

// 对账号密码进行监听，设置登录按钮的 disabled 属性
watch(
  () => [loginInfo.userPhone, loginInfo.userPassword], // 监听 phone 和 password 的变化
  ([newPhone, newPassword]) => {
    if (newPhone.length > 0 && newPassword.length > 0) {
      disabled.value = false; // 如果 phone 和 password 都不为空，启用按钮
    } else {
      disabled.value = true; // 否则禁用按钮
    }
  },
  { immediate: true } // 立即执行一次，初始化 disabled 状态
);

// 登录提交
const onSubmit = async () => {
  try {
    isLoading.value = true;
    await userStore.login(loginInfo)
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/backgroundimage.png") no-repeat;
  background-position: center;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .demo-form-inline {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
