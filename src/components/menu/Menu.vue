<template>
  <div class="menu">
    <el-row class="tac">
    <el-col :span="23">
      <div
        style="
          height: 60px;
          font-size: 20px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <span>校园集市后台管理</span>
      </div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1-1"
        text-color="#fff"
        @select="select"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="1-1">普通用户管理</el-menu-item>
          <el-menu-item index="1-2">管理员管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Search /></el-icon>
            <span>发布审核</span>
          </template>
          <el-menu-item index="2-1">动态审核</el-menu-item>
          <el-menu-item index="2-2">物品审核</el-menu-item>
          <el-menu-item index="2-3">跑腿服务审核</el-menu-item>
          <el-menu-item index="2-4">寻物启事审核</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Finished /></el-icon>
            <span>群聊管理</span>
          </template>
          <el-menu-item index="3-1">群聊管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><ChatDotSquare /></el-icon>
            <span>反馈管理</span>
          </template>
          <el-menu-item index="4-1">用户建议</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="4-1">系统通知</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
  </div>
</template>

<script setup>
import router from "@/router";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  User,
  Search,
  ChatDotSquare,
  Finished
} from "@element-plus/icons-vue";
import {useUserStore} from "@/store/user.js";
const userStore = useUserStore()

// 方法
const select = (index) => {
  const routes = {
    "1-1": "/home/user",
    "1-2": "/home/admin",
    "2-1": "/home/article",
    "2-2": "/home/goods",
    "2-3": "/home/service",
    "2-4": "/home/lost"
  }

  if (index === "1-1") {
    userStore.breadCrumb = "用户管理 > 普通用户管理"
  } else if (index === "1-2") {
    userStore.breadCrumb = "用户管理 > 管理员管理"
  } else if (index === "2-1") {
    userStore.breadCrumb = "发布审核 > 动态审核"
  } else if (index === "2-2") {
    userStore.breadCrumb = "发布审核 > 物品审核"
  } else if (index === "2-3") {
    userStore.breadCrumb = "发布审核 > 跑腿服务审核"
  } else if (index === "2-4") {
    userStore.breadCrumb = "发布审核 > 寻物启事审核"
  }

  const url = routes[`${index}`]
  router.push(url)
}
</script>

<style scoped>
  .menu {
    width: 100%;
    height: 100%;
  }
</style>
