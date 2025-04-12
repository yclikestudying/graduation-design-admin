<template>
  <div class="home">
    <div class="left">
      <Menu></Menu>
    </div>
    <div class="right">
      <div class="top">
        <div class="menu">
          <span>{{ currentMenu }}</span>
        </div>
        <div class="bread-crumb">{{ breadCrumb }}</div>
        <div class="avatar">
          <div class="img">
            <img :src="avatar" alt=""/>
          </div>
          <el-dropdown style="cursor: pointer">
            <span class="el-dropdown-link">
              {{ name }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="info">个人信息</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="bottom">
        <!-- <Loading></Loading> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Menu from "@/components/menu/Menu.vue";
import {useUserStore} from "@/store/user.js";
import router from "@/router";
import {ref, watch} from "vue";

const userStore = useUserStore();
const avatar = userStore.avatar; // 获取头像
const name = userStore.name; // 获取名称
const currentMenu = userStore.currentMenu; // 获取当前菜单
const breadCrumb = ref(userStore.breadCrumb); // 面包屑

// 对面包屑进行监听
watch(() => userStore.breadCrumb, (newValue) => {
  breadCrumb.value = newValue
})

// 退出登录
const logout = async () => {
  await userStore.logout()
}

// 查询个人信息
const info = () => {
  router.push("/info")
}

</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;

  .left {
    width: 200px;
    height: 100%;
    background-color: #545c64;
  }

  .right {
    width: calc(100% - 200px);
    height: 100%;

    .top {
      position: relative;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      padding: 5px 0;

      .menu {
        margin-left: 20px;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .avatar {
        position: absolute;
        display: flex;
        align-items: center;
        right: 20px;
        height: 100%;

        .img {
          margin-right: 10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }

    .bottom {
      position: relative;
      width: 100%;
      height: calc(100% - 50px);
      background-color: #F2F2F2;
    }
  }
}
</style>
