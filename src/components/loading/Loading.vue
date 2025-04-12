<template>
  <div class="loading">
    <el-table v-loading="loading" style="width: 100%"> </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
const loading = ref(true);
</script>

<style scoped>
.loading {
  position: relative;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .5;
}
</style>
