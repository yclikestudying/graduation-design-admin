import { get, put, del, post } from "@/request/index.js";

/**
 * @description 分页查询管理员
 * @param current 当前页
 * @param size 每页数量
 */
export const queryAdminApi = async (current, size) => {
    return await get(`/adminClient/queryAdmin?current=${current}&size=${size}`);
};

/**
 * @description 模糊查询管理员
 * @param keyword 关键字
 * @param current 当前页
 * @param size 每页数量
 */
export const queryLikeAdminApi = async (keyword, current, size) => {
    return await get(`/adminClient/queryLikeAdmin?keyword=${keyword}&current=${current}&size=${size}`);
};

/**
 * @description 设置管理员为普通用户
 * @param userId 用户id
 */
export const settingUserApi = async (userId) => {
    return await post('/adminClient/settingUser', {'userId': userId})
}
