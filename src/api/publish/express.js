import { get, put, del } from "@/request/index.js";

/**
 * @description 分页查询跑腿服务
 * @param current 当前页
 * @param size 每页数量
 */
export const queryExpressApi = async (current, size) => {
  return await get(`/express/queryExpressByPage?current=${current}&size=${size}`);
};

/**
 * @description 删除单个跑腿服务
 * @param expressId 跑腿服务id
 */
export const deleteExpressApi = async (expressId) => {
  return await del(`/express/deleteExpress?expressId=${expressId}`);
};

/**
 * @description 批量删除跑腿服务
 * @param expressIdList 跑腿服务id集合
 */
export const deleteExpressBatchApi = async (expressIdList) => {
  return await put(`/express/deleteExpressBatch`, expressIdList);
};

/**
 * @description 按时间搜索跑腿服务
 * @param time 时间
 * @param current 当前页
 * @param size 每页数
 */
export const queryExpressByTimeApi = async (time, current, size) => {
  return await get(`/express/queryExpressByTime?time=${time}&current=${current}&size=${size}`);
};
