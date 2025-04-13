<template>
  <div class="lost">
    <div style="display: flex; align-items: center">
      <el-button
          style="margin-right: 10px"
          type="danger"
          @click="deleteActivityBatch"
      >删除勾选群聊</el-button
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
        <el-table-column type="selection"/>
        <el-table-column label="id">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="群聊头像">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <img
                  style="width: 40px; height: 40px;border-radius: 10px;"
                  :src="scope.row.activityPhoto"
                  alt=""
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="群聊名称">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.activityName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="群聊描述">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span :title="scope.row.activityDescription" style="overflow-x: hidden;text-overflow: ellipsis;white-space: nowrap">{{ scope.row.activityDescription }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="群聊人数">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.currentPeople + "/" + scope.row.activityMaxPeople }}</span>
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
            <el-button size="small" type="primary" @click="detail(scope.row.lostDescription, scope.row.lostPhoto)"
            >详情
            </el-button
            >
            <el-button size="small" type="danger" @click="deleteActivity(scope.row.id)"
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
  <!--物品描述-->
  <el-dialog v-model="centerDialogVisible" title="物品描述" width="30%" center>
    <div>
      {{ lostDescription }}
    </div>
    <!--图片展示-->
    <el-image
        style="width: 100px; height: 100px"
        :src="lostPhoto"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="srcList"
        :initial-index="4"
        fit="cover"
    />
  </el-dialog>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import {
  queryGroupChatByPageApi,
  deleteActivityApi,
  deleteActivityBatchApi,
  queryActivityByTimeApi
} from "@/api/chat/chat.js";
import { formatDate } from "@/util/common";
import { ElTable, ElMessageBox, ElMessage } from "element-plus";

const total = ref(10);
const currentPage = ref(1);
const size = ref(8);
const tableData = ref(null);
const multipleSelection = ref([]);
const time = ref('')
const centerDialogVisible = ref(false)
const lostDescription = ref('')
const lostPhoto = ref('')
const srcList = ref([])

// 分页查询群聊方法
const queryGroupChat = async (current) => {
  const res = await queryGroupChatByPageApi(current, size.value)
  if (res.code === 200) {
    tableData.value = res.data.groupChat
    total.value = res.data.total
  }
}

// 挂载完成加载数据
onMounted(() => {
  queryGroupChat(1)
})

// 侦听页面切换
watch(currentPage, (newValue) => {
  if (time.value === '') {
    queryGroupChat(newValue)
  } else {

  }
})

// 删除单个群聊
const deleteActivity = (activityId) => {
  ElMessageBox.alert("确认删除该群聊吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const res = await deleteActivityApi(activityId)
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
              (activity) => activity.id !== activityId
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

// 批量删除寻物启事
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
const deleteActivityBatch = () => {
  ElMessageBox.alert("确认删除勾选群聊吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const activityIdList = multipleSelection.value.map((activity) => activity.id);
        const res = await deleteActivityBatchApi(activityIdList);
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
              (activity) => !activityIdList.includes(activity.id)
          );
          total.value = total.value - activityIdList.length;
          ElMessage.success("删除成功");
        } else {
          ElMessage.error("删除失败");
        }
      }
    },
  });
};

// 重置
const reset = () => {
  queryGroupChat(1)
}

// 搜索
const search = (current) => {
  if (time.value !== '') {
    queryActivityByTime(current)
  }
}
const queryActivityByTime = async (current) => {
  const newTime = formatDate(time.value)
  const res = await queryActivityByTimeApi(newTime, current, size.value)
  if (res.code === 200) {
    total.value = res.data.total;
    tableData.value = res.data.groupChat;
  }
}
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
