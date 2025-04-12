<template>
  <div class="user">
    <div style="display: flex; align-items: center">
      <el-button
          style="margin-right: 10px"
          type="danger"
          @click="deleteUserBatch"
      >删除勾选用户
      </el-button
      >
      <el-input
          v-model="content"
          class="w-50 m-2"
          placeholder="用户名/手机号搜索"
          :prefix-icon="Search"
          style="width: 300px"
      />
      <el-button style="margin-left: 10px" type="primary" @click="search"
      >搜索
      </el-button
      >
      <el-button style="margin-left: 10px" type="primary" @click="reset"
      >重置
      </el-button
      >
    </div>
    <div class="list">
      <UserDrawer
          :isDrawer="isDrawer"
          :userInfo="userInfo"
          @cancel="cancel"
      ></UserDrawer>
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
        <el-table-column label="用户名">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.userName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.userPhone }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="头像">
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
        <el-table-column label="性别">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.userGender === 1 ? "男" : scope.row.userGender === '0' ? '女' : '保密' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="注册时间">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.createTime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)"
            >查看
            </el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="open(scope.row.id)"
            >删除
            </el-button
            >
            <el-button
                size="small"
                type="success"
                @click="settingAdmin(scope.row.id)"
            >设置管理员
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
import {ref, onMounted, watch} from "vue";
import {
  queryUserApi,
  queryLikeUserApi,
  deleteUserApi,
  deleteUserBatchApi,
  settingAdminApi
} from "@/api/user/user.js";
import {ElTable, ElMessageBox, ElMessage} from "element-plus";
import {Search} from "@element-plus/icons-vue";

let isDrawer = ref(false); // 是否展示抽屉
let tableData = ref([]); // 用户数据集合
let total = ref(0); // 总条数
let size = ref(8); // 每页的数量
let page = ref(0); // 总页数
let currentPage = ref(1); // 当前页
const multipleSelection = ref([]); // 多选框
let userInfo = ref(null); // 单个用户信息
let content = ref(""); // 搜索内容
let currentState = ref('all'); // 是查询全部还是模糊查询

onMounted(() => {
  queryUserList(currentPage.value, size.value);
});

watch(currentPage, (newValue) => {
  if (currentState.value === 'all') {
    queryUserList(newValue, size.value);
    return;
  }

  if (currentState.value === 'like') {
    queryLikeUser(newValue, size.value)
  }
});

watch(content, (newValue) => {
  currentState.value = newValue === '' ? 'all' : 'like'
})

// 查询用户
const queryUserList = async (currentPageNumber, size) => {
  try {
    const res = await queryUserApi(currentPageNumber, size);
    console.log(res)
    if (res.code === 200) {
      tableData.value = res.data.user;
      total.value = res.data.total;
      page.value = Math.ceil(total.value / size.value);
    }
  } catch (err) {
    console.log(err);
  }
};

// 多选
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

// 用户编辑
const handleEdit = (index, user) => {
  isDrawer.value = true;
  userInfo.value = user;
};

// 取消抽屉
const cancel = () => {
  isDrawer.value = false;
};

// 删除用户
const open = async (userId) => {
  ElMessageBox.alert("确认删除该用户吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const res = await deleteUserApi(userId);
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
              (user) => user.id !== userId
          );
          total.value--;
          ElMessage.success("删除成功");
        } else {
          ElMessage.error("删除失败");
        }
      }
    },
  });
};

// 批量删除用户
const deleteUserBatch = async () => {
  ElMessageBox.alert("确认删除勾选用户吗？", "警告", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const userIdList = multipleSelection.value.map((user) => user.id);
        const res = await deleteUserBatchApi(userIdList);
        if (res.code === 200) {
          tableData.value = tableData.value.filter(
              (user) => !userIdList.includes(user.id)
          );
          total.value = total.value - userIdList.length;
          ElMessage.success("批量删除成功");
        } else {
          ElMessage.error("批量删除失败");
        }
      }
    },
  });
};

// 搜索用户
const search = () => {
  if (content.value !== '') {
    queryLikeUser(currentPage.value = 1, size.value)
  }
};

const queryLikeUser = async (current, size) => {
  const res = await queryLikeUserApi(content.value, current, size);
  if (res.code === 200) {
    tableData.value = res.data.user;
    total.value = res.data.total;
  }
};

// 重置搜索内容
const reset = () => {
  content.value = ''
  queryUserList(currentPage.value = 1, size.value)
}

// 设置管理员
const settingAdmin = (userId) => {
  ElMessageBox.alert("设置当前用户为管理员吗？", "提示", {
    confirmButtonText: "确认",
    callback: async (action) => {
      if (action === "confirm") {
        const res = await settingAdminApi(userId)
        if (res.code === 200) {
          ElMessage.success("设置成功");
        } else {
          ElMessage.error(res.message);
        }
      }
    },
  });
}
</script>

<style lang="less" scoped>
.user {
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

  .list {
    margin-top: 10px;
  }

  .page {
    position: absolute;
    bottom: 0;
    padding: 10px;
  }
}
</style>
