<template>
  <div class="basic-info">
    <div class="menu">
      <el-button class="button" :type="current === '头像信息' ? type : ''" @click="changeCurrent('头像信息')">头像信息
      </el-button>
      <el-button class="button" :type="current === '必填信息' ? type : ''" @click="changeCurrent('必填信息')">必填信息
      </el-button>
      <el-button class="button" :type="current === '其他信息' ? type : ''" @click="changeCurrent('其他信息')">其他信息
      </el-button>
    </div>
    <div class="info">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import {ref} from 'vue';

const type = ref('primary')
const current = ref('头像信息')

const changeCurrent = (str) => {
  if (str === '头像信息') {
    router.push('/info/basicInfo/avatar')
  } else if (str === '必填信息') {
    router.push('/info/basicInfo/needInfo')
  } else {
    router.push('/info/basicInfo/otherInfo')
  }
  current.value = str
}
</script>

<style lang="less" scoped>
.basic-info {
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
