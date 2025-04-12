<template>
  <div class="article">
    <div style="display: flex; align-items: center">
      <el-button
          style="margin-right: 10px"
          type="danger"
          @click="deleteArticleBatch"
      >删除勾选动态
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
        <el-table-column label="发布时间">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.createTime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="checkDetail(scope.row.articleContent, scope.row.articlePhotos)"
            >详情
            </el-button
            >
            <el-button size="small" type="danger" @click="deleteArticle(scope.row.id)"
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
    <el-dialog v-model="centerDialogVisible" title="动态文本及图片" width="60%" center>
    <div>
      {{ articleContent }}
    </div>
      <div style="display: flex">
        <template v-for="(photo, index) in JSON.parse(articlePhotos)">
          <div class="demo-image__preview">
            <el-image
                style="width: 100px; height: 100px"
                :src="photo"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="srcList"
                :initial-index="4"
                fit="cover"
            />
          </div>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {
  queryArticleApi,
  deleteArticleApi,
  deleteArticleBatchApi,
  queryArticleByTimeApi
} from "@/api/publish/article.js";
import {ElTable, ElMessageBox, ElMessage} from "element-plus";
import {formatDate} from "@/util/common.js";

let total = ref();
let currentPage = ref(1);
let size = ref(8);
let tableData = ref(null);
let multipleSelection = ref([]);
const time = ref('')
const centerDialogVisible = ref(false)
const articleContent = ref(null)
const articlePhotos = ref(null)
const srcList = ref(null)

onMounted(() => {
  queryArticle(currentPage.value);
});

watch(currentPage, (newValue) => {
  if (time.value === '') {
    queryArticle(newValue);
  } else {
    search(newValue)
  }
});

// 多选
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

// 查询
const queryArticle = async (current) => {
  const res = await queryArticleApi(current, size.value);
  if (res.code === 200) {
    total.value = res.data.total;
    tableData.value = res.data.article;
  }
};

// 搜索
const search = async (current) => {
  if (time.value === '') {
    return;
  }
  const newTime = formatDate(time.value)
  const res = await queryArticleByTimeApi(newTime, current, size.value)
  if (res.code === 200) {
    total.value = res.data.total;
    tableData.value = res.data.article;
  }
}

// 重置
const reset = () => {
  time.value = ''
  queryArticle(1)
}

// 批量删除动态
const deleteArticleBatch = () => {
  ElMessageBox.alert("确认删除勾选动态吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const articleIdList = multipleSelection.value.map((article) => article.id);
        const res = await deleteArticleBatchApi(articleIdList);
        console.log(res)
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
              (article) => !articleIdList.includes(article.id)
          );
          total.value = total.value - articleIdList.length;
          ElMessage.success("删除成功");
        } else {
          ElMessage.error("删除失败");
        }
      }
    },
  });
};

// 删除动态
const deleteArticle = (articleId) => {
  ElMessageBox.alert("确认删除该动态吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const res = await deleteArticleApi(articleId)
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
              (article) => article.id !== articleId
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

// 查看详情
const checkDetail = (content, photos) => {
  centerDialogVisible.value = true
  articleContent.value = content
  articlePhotos.value = photos
  srcList.value = JSON.parse(articlePhotos.value)
}
</script>

<style lang="less" scoped>
.article {
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

.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
