<template>
  <div class="info">
    <div class="all-function">
      <div class="function">
        <el-button
          :type="current === '基本信息' ? type : ''"
          @click="changeCurrent('基本信息')"
          >基本信息</el-button
        >
        <el-button
          :type="current === '账号管理' ? type : ''"
          @click="changeCurrent('账号管理')"
          >账号管理</el-button
        >
      </div>
      <div class="function">
        <el-button type="info" @click="back">返回主页</el-button>
      </div>
    </div>
    <div class="main">
      <div class="infoAbout">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";

const type = ref("primary");
const current = ref("基本信息");

const changeCurrent = (str) => {
  if (str === "基本信息") {
    router.push("/info/basicInfo");
  } else {
    router.push("/info/security");
  }
  current.value = str;
};
const back = () => {
  router.push("/home");
};
</script>

<style lang="less" scoped>
.info {
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;

  .all-function {
    box-sizing: border-box;
    padding: 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
  }

  .main {
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    height: 85%;

    .infoAbout {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: #fff;
    }
  }
}
</style>
