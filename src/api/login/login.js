import { post, del } from "@/request/index.js"

/**
 * 管理员登录
 */
export const loginApi = async (data) => {
    return await post('/admin/login', data)
}

/**
 * 管理员退出
 */
export const logoutApi = async () => {
    return await post('/admin/logout', null)
}
