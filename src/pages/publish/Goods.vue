<template>
  <div class="goods">
    <div style="display: flex; align-items: center">
      <el-button
          style="margin-right: 10px"
          type="danger"
          @click="deleteGoodsBatch"
      >删除勾选物品
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
        <el-table-column label="物品名称">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.goodsTitle }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="旧价格">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>￥{{ scope.row.goodsOldPrice }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="新价格">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>￥{{ scope.row.goodsPrice }}</span>
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
            <el-button size="small" type="primary" @click="detail(scope.row.goodsContent, scope.row.goodsPhotos)"
            >详情
            </el-button
            >
            <el-button size="small" type="danger" @click="deleteGoods(scope.row.id)"
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
      {{ goodsContent }}
    </div>
    <!--图片展示-->
    <el-image
      style="width: 100px; height: 100px"
      :src="goodsPhoto"
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
import {onMounted, ref, watch} from "vue";
import {
  queryGoodsApi,
  deleteGoodsApi,
  deleteGoodsBatchApi,
  queryGoodsByTimeApi
} from "@/api/publish/goods.js";
import {formatDate} from "@/util/common";
import {ElTable, ElMessageBox, ElMessage} from "element-plus";

let total = ref(10);
let currentPage = ref(1);
let size = ref(8);
let tableData = ref(null);
let multipleSelection = ref([]);
const time = ref('')
const centerDialogVisible = ref(false)
const goodsContent = ref('')
const goodsPhoto = ref('')
const srcList = ref([])

// 查询物品方法
const queryGoods = async (current) => {
  const res = await queryGoodsApi(current, size.value)
  if (res.code === 200) {
    tableData.value = res.data.goods
    total.value = res.data.total
  }
}

// 挂载完成加载数据
onMounted(() => {
  queryGoods(1)
})

// 侦听切换页面时，查询新页面的数据
watch(currentPage, (newValue) => {
  if (time.value === '') {
    queryGoods(newValue)
  } else {
    search(newValue)
  }
})

// 删除单个物品
const deleteGoods = (goodsId) => {
  ElMessageBox.alert("确认删除该物品吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const res = await deleteGoodsApi(goodsId)
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
              (goods) => goods.id !== goodsId
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
const deleteGoodsBatch = () => {
  ElMessageBox.alert("确认删除勾选物品吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const goodsIdList = multipleSelection.value.map((goods) => goods.id);
        const res = await deleteGoodsBatchApi(goodsIdList);
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
              (goods) => !goodsIdList.includes(goods.id)
          );
          total.value = total.value - goodsIdList.length;
          ElMessage.success("删除成功");
        } else {
          ElMessage.error("删除失败");
        }
      }
    },
  });
};

// 按时间搜索发布物品
const search = async (current) => {
  if (time.value === '') {
    return;
  }
  const newTime = formatDate(time.value)
  const res = await queryGoodsByTimeApi(newTime, current, size.value)
  if (res.code === 200) {
    total.value = res.data.total;
    tableData.value = res.data.goods;
  }
}

// 重置
const reset = () => {
  time.value = ''
  queryGoods(1)
}

// 详情
const detail = (content, photo) => {
  centerDialogVisible.value = true
  goodsContent.value = content
  goodsPhoto.value = photo
  srcList.value.push(goodsPhoto.value)
}
</script>

<style lang="less" scoped>
.goods {
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
