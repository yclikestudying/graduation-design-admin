import { get, put, del } from "@/request/index.js";

/**
 * @description 分页查询物品
 * @param current 当前页
 * @param size 每页数量
 */
export const queryGoodsApi = async (current, size) => {
  return await get(`/goods/queryGoodsByPage?current=${current}&size=${size}`);
};

/**
 * @description 删除单个物品
 * @param goodsId 物品id
 */
export const deleteGoodsApi = async (goodsId) => {
  return await del(`/goods/deleteGoods?goodsId=${goodsId}`);
};


/**
 * @description 批量删除物品
 * @param goodsIdList 物品id集合
 */
export const deleteGoodsBatchApi = async (goodsIdList) => {
  return await put(`/goods/deleteGoodsBatch`, goodsIdList);
};

/**
 * @description 按时间搜索发布物品
 * @param time 时间
 * @param current 当前页
 * @param size 每页数
 */
export const queryGoodsByTimeApi = async (time, current, size) => {
  return await get(`/goods/queryGoodsByTime?time=${time}&current=${current}&size=${size}`);
};
