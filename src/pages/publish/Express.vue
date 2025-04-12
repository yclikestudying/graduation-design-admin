<template>
  <div class="express">
    <div style="display: flex; align-items: center">
      <el-button
          style="margin-right: 10px"
          type="danger"
          @click="deleteExpressBatch"
      >删除勾选跑腿服务
      </el-button
      >
      <div class="block">
        <el-date-picker
            v-model="time"
            type="date"
            placeholder="发布时间"
            :size="size"
            style="margin-right: 10px"
        />
      </div>
      <el-button style="margin-left: 10px" type="primary" @click="search(1)"
      >搜索
      </el-button
      >
      <el-button style="margin-left: 10px" type="primary" @click="reset"
      >重置
      </el-button
      >
    </div>
    <div class="list">
      <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"/>
        <el-table-column label="id">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布人名称">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.userName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布人头像">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <img
                  style="width: 40px; height: 40px;border-radius: 10px;"
                  :src="scope.row.userAvatar"
                  alt=""
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布内容">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <span :title="scope.row.expressContent" style="overflow-x: hidden;text-overflow: ellipsis;white-space: nowrap">{{ scope.row.expressContent }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布时间">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.createTime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="danger" @click="deleteExpress(scope.row.id)"
            >删除
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
          background
          :total="total"
          v-model:current-page="currentPage"
          v-model:page-size="size"
      />
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {
  queryExpressApi,
  deleteExpressApi,
  deleteExpressBatchApi,
  queryExpressByTimeApi
} from "@/api/publish/express.js";
import {formatDate} from "@/util/common";
import {ElTable, ElMessageBox, ElMessage} from "element-plus";

const total = ref(10);
const currentPage = ref(1);
const size = ref(8);
const tableData = ref(null);
const multipleSelection = ref([]);
const time = ref('')

// 分页查询跑腿服务方法
const queryExpress = async (current) => {
  const res = await queryExpressApi(current, size.value)
  if (res.code === 200) {
    tableData.value = res.data.express
    total.value = res.data.total
  }
}

// 挂载完成加载数据
onMounted(() => {
  queryExpress(1)
})

// 侦听页面切换
watch(currentPage, (newValue) => {
  if (time.value === '') {
    queryExpress(newValue)
  } else {
    search(newValue)
  }
})

// 删除单个跑腿服务
const deleteExpress = (expressId) => {
  ElMessageBox.alert("确认删除该跑腿服务吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const res = await deleteExpressApi(expressId)
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
              (express) => express.id !== expressId
          );
          total.value = total.value - 1;
          ElMessage.success("删除成功");
        } else {
          ElMessage.error("删除失败");
        }
      }
    },
  });
}

// 批量删除物品
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
const deleteExpressBatch = () => {
  ElMessageBox.alert("确认删除勾选跑腿服务吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const expressIdList = multipleSelection.value.map((express) => express.id);
        const res = await deleteExpressBatchApi(expressIdList);
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
              (express) => !expressIdList.includes(express.id)
          );
          total.value = total.value - expressIdList.length;
          ElMessage.success("删除成功");
        } else {
          ElMessage.error("删除失败");
        }
      }
    },
  });
};

// 搜索
const search = async (current) => {
  if (time.value === '') {
    return;
  }
  const newTime = formatDate(time.value)
  const res = await queryExpressByTimeApi(newTime, current, size.value)
  if (res.code === 200) {
    tableData.value = res.data.express
    total.value = res.data.total
  }
}

// 重置
const reset = () => {
  time.value = ''
  queryExpress(1)
}

</script>

<style lang="less" scoped>
.express {
  box-sizing: border-box;
  position: absolute;
  padding: 10px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 98%;
  height: 95%;
  margin: auto;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;

  .page {
    position: absolute;
    bottom: 0;
    padding: 10px;
  }
}
</style>
