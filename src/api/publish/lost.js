import { get, put, del } from "@/request/index.js";

/**
 * @description 按时间查询
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @param current 当前页数
 * @param size 每页条数
 */
export const selectListByDateApi = async (startTime, endTime, current, size) => {
  return await get(`/admin/selectLostListByDate?startTime=${startTime}&endTime=${endTime}&current=${current}&size=${size}`)
}

/**
 * @description 查询所有失物招领
 * @param current 当前页数
 * @param size 每页条数
 */
export const selectListApi = async (current, size) => {
  return await get(`/admin/selectLostList?current=${current}&size=${size}`)
}

/**
 * @description 批量删除失物招领
 * @param lostIdList 失物招领id
 */
export const deleteBatchIdsApi = async (lostIdList) => {
  return await put('/admin/deleteLostBatchIds', lostIdList)
}

/**
 * @description 允许展示
 * @param lostId 失物招领id
 */
export const showApi = async (lostId) => {
  return await put(`/admin/lostShow?lostId=${lostId}`)
}

/**
 * @description 拒绝展示
 * @param lostId 失物招领id
 */
export const notShowApi = async (lostId) => {
  return await put(`/admin/lostNotShow?lostId=${lostId}`)
}
