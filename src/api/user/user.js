import { get, put, del, post } from "@/request/index.js";

/**
 * @description 分页查询用户
 * @param current 当前页
 * @param size 每页数量
 */
export const queryUserApi = async (current, size) => {
  return await get(`/adminClient/queryUser?current=${current}&size=${size}`);
};

/**
 * @description 模糊查询用户
 * @param keyword 关键字
 * @param current 当前页
 * @param size 每页数量
 */
export const queryLikeUserApi = async (keyword, current, size) => {
  return await get(`/adminClient/queryLikeUser?keyword=${keyword}&current=${current}&size=${size}`);
};

/**
 * @description 删除单个用户
 * @param userId 用户id
 */
export const deleteUserApi = async (userId) => {
  return await del(`/adminClient/deleteUser?userId=${userId}`);
};

/**
 * @description 批量删除用户
 * @param userIdList 用户id集合
 */
export const deleteUserBatchApi = async (userIdList) => {
  return await put(`/adminClient/deleteUserBatch`, userIdList);
};

/**
 * @description 设置用户为管理员
 * @param userId 用户id
 */
export const settingAdminApi = async (userId) => {
  return await post('/adminClient/settingAdmin', {'userId': userId})
}



/**
 * @description 普通用户用户名查询
 * @param current 当前页
 * @param keyword 搜索关键字
 */
export const selectUserByConditionApi = async (current, keyword) => {
  return await get(`/admin/selectUserByCondition?current=${current}&keyword=${keyword}`)
}

/**
 * @description 管理员用户名查询
 * @param current 当前页
 * @param keyword 搜索关键字
 */
export const selectAdminByConditionApi = async (current, keyword) => {
  return await get(`/admin/selectAdminByCondition?current=${current}&keyword=${keyword}`)
}
