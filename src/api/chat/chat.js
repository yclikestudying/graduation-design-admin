import { get, put, del, post } from "@/request/index.js";

/**
 * @description 分页查询群聊
 * @param current 当前页
 * @param size 每页数量
 */
export const queryGroupChatByPageApi = async (current, size) => {
    return await get(`/activity/queryGroupChatByPage?current=${current}&size=${size}`);
};

/**
 * @description 删除单个群聊
 * @param activityId 群聊id
 */
export const deleteActivityApi = async (activityId) => {
    return await del(`/activity/deleteActivity?activityId=${activityId}`);
};

/**
 * @description 批量删除群聊
 * @param activityIdList 群聊id集合
 */
export const deleteActivityBatchApi = async (activityIdList) => {
    return await put(`/activity/deleteActivityBatch`, activityIdList);
};

/**
 * @description 按时间搜索群聊
 * @param time 时间
 * @param current 当前页
 * @param size 每页数
 */
export const queryActivityByTimeApi = async (time, current, size) => {
    return await get(`/activity/queryActivityByTime?time=${time}&current=${current}&size=${size}`);
};
