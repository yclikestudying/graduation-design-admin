<template>
  <div class="drawer">
    <el-drawer
      v-model="drawer"
      title="查看用户详情"
      :modal="false"
      @close="close"
    >
      <el-form
        label-position="left"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <div style="display: flex; justify-content: center; margin-bottom: 5px">
          <el-avatar
            style="width: 100px; height: 100px"
            :src="userInfo.userAvatar"
          />
        </div>
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.userName" readonly />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formLabelAlign.userPhone" readonly />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="formLabelAlign.userGender" readonly />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="formLabelAlign.userProfile" readonly />
        </el-form-item>
        <el-form-item label="所在地">
          <el-input v-model="formLabelAlign.userLocation" readonly />
        </el-form-item>
        <el-form-item label="家乡">
          <el-input v-model="formLabelAlign.userHometown" readonly />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="formLabelAlign.userProfession" readonly />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="formLabelAlign.userTags" readonly />
        </el-form-item>
        <el-form-item label="注册时间">
          <el-input v-model="formLabelAlign.createTime" readonly />
        </el-form-item>
      </el-form>
<!--      <template #footer>-->
<!--        <div style="flex: auto">-->
<!--          <el-button @click="cancel">取消</el-button>-->
<!--          <el-button type="primary" @click="confirm">确认</el-button>-->
<!--        </div>-->
<!--      </template>-->
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineEmits } from "vue";
import { settingAdminApi } from "@/api/user/user.js";
import { ElMessage } from "element-plus";

const emits = defineEmits(["cancel"]);
const props = defineProps({
  isDrawer: {
    type: Boolean,
    default: false,
  },
  userInfo: {
    type: Object,
    default: null,
  },
});

let drawer = ref(props.isDrawer);
let formLabelAlign = ref(props.userInfo);

watch([() => props.isDrawer, () => props.userInfo], ([newVal, newVal2]) => {
  drawer.value = newVal;
  if (newVal2) {
    formLabelAlign.value = newVal2;
  }
});

// 取消抽屉
const close = () => {
  emits("cancel");
};
</script>

<style scoped>
.drawer {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
