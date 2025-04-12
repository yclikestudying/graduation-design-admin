<template>
  <div class="other-info">
    <el-form label-width="120px">
      <el-form-item label="性别">
        <el-input v-model="userGender" readonly />
      </el-form-item>
      <el-form-item label="生日">
        <el-input v-model="userBirthday" readonly />
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          style="max-height: 200px"
          type="textarea"
          v-model="userProfile"
        />
      </el-form-item>
      <el-form-item label="所在地">
        <el-input v-model="userLocation" readonly />
      </el-form-item>
      <el-form-item label="家乡">
        <el-input v-model="userHometown" readonly />
      </el-form-item>
      <el-form-item label="职业">
        <el-input :title="userProfession" v-model="userProfession" readonly />
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
const userGender = ref(
  userStore.userGender === 1 ? "男" : userStore.userGender === 0 ? "女" : "保密"
);
const userBirthday = ref(userStore.userBirthday);
const userProfile = ref(userStore.userProfile);
const userLocation = ref(userStore.userLocation);
const userHometown = ref(userStore.userHometown);
const userProfession = ref(JSON.parse(userStore.userProfession).text);

const open = () => {
  ElNotification({
    title: "提示",
    message: "请到用户端进行修改",
    type: "info",
  });
};
</script>

<style lang="less" scoped>
.other-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
