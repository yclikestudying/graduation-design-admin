import { get, put, del } from "@/request/index.js";

/**
 * @description 分页查询动态
 * @param current 当前页
 * @param size 每页数量
 */
export const queryArticleApi = async (current, size) => {
  return await get(`/adminClient/queryArticle?current=${current}&size=${size}`);
};

/**
 * @description 根据id删除动态
 * @param articleId 动态id
 */
export const deleteArticleApi = async (articleId) => {
  return await del(`/article/deleteArticle?articleId=${articleId}`);
};

/**
 * @description 批量删除动态
 * @param articleIdList 动态id集合
 */
export const deleteArticleBatchApi = async (articleIdList) => {
  return await put(`/article/deleteArticleBatch`, articleIdList);
};

/**
 * @description 按时间搜索发布动态
 * @param time 时间
 * @param current 当前页
 * @param size 每页数
 */
export const queryArticleByTimeApi = async (time, current, size) => {
  return await get(`/article/queryArticleByTime?time=${time}&current=${current}&size=${size}`);
};

