<template>
  <div class="security">
    <div class="menu">
      <el-button class="button" :type="current === '更换手机' ? type : ''" @click="changeCurrent('更换手机')">更换手机
      </el-button>
      <el-button class="button" :type="current === '修改密码' ? type : ''" @click="changeCurrent('修改密码')">修改密码
      </el-button>
    </div>
    <div class="info">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import router from '@/router';

const type = ref('primary')
const current = ref('更换手机')

const changeCurrent = (str) => {
  if (str === '更换手机') {
    router.push('/info/security/phone')
  } else {
    router.push('/info/security/password')
  }
  current.value = str
}
</script>

<style lang="less" scoped>
.security {
  width: 100%;
  height: 100%;

  .menu {
    width: 100%;
    padding: 5px;
  }

  .info {
    width: 100%;
    height: 94%;
  }
}
</style>
