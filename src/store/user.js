import { defineStore } from "pinia";
import { loginApi, logoutApi } from "@/api/login/login.js";
import { ElMessage } from "element-plus";
import router from "@/router";

// 定义并导出 userStore
export const useUserStore = defineStore("user", {
  // State
  state: () => ({
    user: null, // 用户信息
    token: null, // 登录状态
    currentMenu: null, // 当前菜单信息
    breadCrumb: null // 面包屑
  }),

  getters: {
    // 获取头像
    avatar: (state) => state.user.userAvatar,
    // 获取用户名字
    name: (state) => state.user.userName,
    // 获取用户id
    userId: (state) => state.user.id,
    // 获取手机号
    userPhone: (state) => state.user.userPhone,
    // 获取注册时间
    createTime: (state) => state.user.createTime,
    // 获取用户权限
    userRole: (state) => state.user.userRole,
    // 获取用户性别
    userGender: (state) => state.user.userGender,
    // 获取用户生日
    userBirthday: (state) => state.user.userBirthday,
    // 获取用户简介
    userProfile: (state) => state.user.userProfile,
    // 获取用户所在地
    userLocation: (state) => state.user.userLocation,
    // 获取用户家乡
    userHometown: (state) => state.user.userHometown,
    // 获取用户职业
    userProfession: (state) => state.user.userProfession,
    // 获取用户密码
    userPassword: (state) => state.user.userPassword
  },

  actions: {
    // 登录操作
    async login(data) {
      const res = await loginApi(data);
      if (res.code === 200) {
        this.user = res.data.user;
        this.token = res.data.token;
        router.push("/home");
        ElMessage.success("登录成功");
      } else {
        ElMessage.error(res.message);
      }
    },

    // 退出操作
    async logout() {
      const res = await logoutApi();
      if (res.code === 200) {
        this.user = null;
        this.token = null;
        ElMessage.success("退出成功");
        router.push("/");
      }
    },

    // 设置当前菜单
    settingMenu(name) {
      this.currentMenu = name;
    },
  },
  persist: true,
});
