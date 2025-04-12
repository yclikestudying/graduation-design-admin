<template>
  <div class="lost">
    <div style="display: flex; align-items: center">
      <el-button
        style="margin-right: 10px"
        type="danger"
        @click="deleteArticleBatch"
        >删除勾选动态</el-button
      >
      <div class="block">
        <el-date-picker
          v-model="startTime"
          type="date"
          placeholder="开始时间"
          :size="size"
          style="margin-right: 10px"
        />
      </div>
      <div class="block">
        <el-date-picker
          v-model="endTime"
          type="date"
          placeholder="结束时间"
          :size="size"
        />
      </div>
      <el-button style="margin-left: 10px" type="primary" @click="search(1)"
        >搜索</el-button
      >
      <el-button style="margin-left: 10px" type="primary" @click="reset"
        >重置</el-button
      >
    </div>
    <div class="list">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="id" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文本" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.lostType }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文本" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.lostName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文本" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.lostDescription }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="图片">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <template
                v-for="(photo, index) in JSON.parse(scope.row.lostPhoto)"
              >
                <img
                  style="
                    width: 80px;
                    height: 80px;
                    border-radius: 10px;
                    margin-right: 10px;
                  "
                  :src="photo"
                  alt=""
                />
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="120">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.createTime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-switch
              v-model="switchValue[`${scope.row.id}`]"
              size="large"
              active-text="同意"
              inactive-text="拒绝"
              @click="
                isShow(
                  scope.row.id,
                  switchValue[`${scope.row.id}`]
                )
              "
            />
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
import { onMounted, ref, watch } from "vue";
import {
  selectListByDateApi,
  selectListApi,
  deleteBatchIdsApi,
  showApi,
  notShowApi,
} from "@/api/publish/lost.js";
import { formatDate } from "@/util/common";
import { ElTable, ElMessageBox, ElMessage } from "element-plus";

let startTime = ref(null); // 开始时间
let endTime = ref(null); // 结束时间
let total = ref(10);
let currentPage = ref(1);
let size = ref(5);
let tableData = ref(null);
let multipleSelection = ref([]);
let switchValue = ref({});

onMounted(() => {
  queryAll(currentPage.value);
});

watch(currentPage, (newValue) => {
  if (startTime.value === null && endTime.value === null) {
    queryAll(newValue);
  } else {
    search(newValue);
  }
});

// 多选
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

// 查询
const queryAll = async (current) => {
  const res = await selectListApi((currentPage.value = current), size.value);
  if (res.code === 200) {
    total.value = res.data.total;
    tableData.value = res.data.lost;
  }
  tableData.value.map((lost) => {
    switchValue.value[`${lost.id}`] = lost.isShow === 1;
  });
};

// 搜索
const search = async (current) => {
  if (startTime.value === null || endTime.value === null) {
    ElMessage.error("搜索时间不能为空");
    return;
  }
  if (endTime.value < startTime.value) {
    ElMessage.error("结束时间应在开始时间后面");
    return;
  }
  const res = await selectListByDateApi(
    formatDate(startTime.value),
    formatDate(endTime.value),
    (currentPage.value = current),
    size.value
  );
  total.value = res.data.total;
  tableData.value = res.data.lost;
  tableData.value.map((lost) => {
    switchValue.value[`${lost.id}`] = lost.isShow === 1;
  });
};

// 重置搜索
const reset = () => {
  startTime.value = null;
  endTime.value = null;
  queryAll(1);
};

// 批量删除用户
const deleteArticleBatch = async () => {
  ElMessageBox.alert("确认删除勾选用户吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const lostIdList = multipleSelection.value.map(
          (lost) => lost.id
        );
        const res = await deleteBatchIdsApi(lostIdList);
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
            (lost) => !lostIdList.includes(lost.id)
          );
          total.value = total.value - lostIdList.length;
          ElMessage.success("批量删除成功");
        } else {
          ElMessage.error("批量删除失败");
        }
      }
    },
  });
};

// 是否展示
const isShow = async (lostId, flag) => {
  if (flag) {
    const res = await showApi(lostId);
    if (res.code === 200) {
      ElMessage.success("设置成功");
    }
  } else {
    const res = await notShowApi(lostId);
    if (res.code === 200) {
      ElMessage.success("设置成功");
    }
  }
};
</script>

<style lang="less" scoped>
.lost {
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
