import { get, put, del } from "@/request/index.js";

/**
 * @description 分页查询寻物启事
 * @param current 当前页
 * @param size 每页数量
 */
export const queryLostApi = async (current, size) => {
  return await get(`/lost/queryLostByPage?current=${current}&size=${size}`);
};

/**
 * @description 删除单个寻物启事
 * @param lostId 寻物启事id
 */
export const deleteLostApi = async (lostId) => {
  return await del(`/lost/deleteLost?lostId=${lostId}`);
};

/**
 * @description 批量删除寻物启事
 * @param lostIdList 寻物启事id集合
 */
export const deleteLostBatchApi = async (lostIdList) => {
  return await put(`/lost/deleteLostBatch`, lostIdList);
};

/**
 * @description 按时间搜索寻物启事
 * @param time 时间
 * @param current 当前页
 * @param size 每页数
 */
export const queryLostByTimeApi = async (time, current, size) => {
  return await get(`/lost/queryLostByTime?time=${time}&current=${current}&size=${size}`);
};
